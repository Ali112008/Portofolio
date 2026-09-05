import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact form endpoint.
 *
 * Delivery strategy (first one configured wins):
 *  1. RESEND_API_KEY        → send via Resend (https://resend.com)
 *  2. WEB3FORMS_ACCESS_KEY  → send via Web3Forms (https://web3forms.com,
 *                             free, no domain verification needed)
 *  3. Neither set           → return 200 with a `mailto:` link so the
 *                             visitor's own email client delivers the message.
 *
 * Spam protection: zod validation + honeypot field + in-memory rate limit.
 */

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  budget: z.string().max(40).optional(),
  message: z.string().min(10).max(2000),
  // Honeypot — accept anything; a filled value is silently dropped below.
  company: z.string().optional(),
});

const OWNER_EMAIL = process.env.CONTACT_EMAIL ?? "ali.mahmoud.developer@gmail.com";

/* ── Tiny in-memory rate limiter (per server instance) ── */
const HITS = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 4;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || entry.resetAt < now) {
    HITS.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    const { name, email, budget, message, company } = parsed.data;

    /* Honeypot tripped — pretend success but drop the message */
    if (company) {
      return NextResponse.json({ ok: true });
    }

    const subject = `New project inquiry from ${name}`;
    const bodyText = [
      `Name: ${name}`,
      `Email: ${email}`,
      budget ? `Budget: ${budget}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    /* 1) Resend delivery */
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? `Portfolio <onboarding@resend.dev>`,
          to: [OWNER_EMAIL],
          reply_to: email,
          subject,
          text: bodyText,
        }),
      });

      if (res.ok) {
        return NextResponse.json({ ok: true, delivered: true });
      }
      // fall through to Web3Forms / mailto on failure
    }

    /* 2) Web3Forms delivery (free, no domain verification) */
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject,
          from_name: name,
          email, // sender's address; Web3Forms sets reply-to automatically
          to_email: OWNER_EMAIL,
          botcheck: company ?? "", // honeypot
          message: bodyText,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        return NextResponse.json({ ok: true, delivered: true });
      }
      // fall through to mailto on failure
    }

    /* 3) Zero-config mailto fallback */
    const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyText)}`;

    return NextResponse.json({ ok: true, delivered: false, mailto });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please email me directly." },
      { status: 500 }
    );
  }
}
