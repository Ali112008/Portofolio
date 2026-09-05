import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact form endpoint.
 *
 * Delivery strategy (in order):
 *  1. If RESEND_API_KEY is set → send a real email via Resend.
 *  2. Otherwise → return 200 with a `mailto:` link so the visitor's
 *     own email client delivers the message (works with zero config).
 *
 * Spam protection: zod validation + honeypot field + in-memory rate limit.
 */

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  budget: z.string().max(40).optional(),
  message: z.string().min(10).max(2000),
  company: z.string().max(0).optional(), // honeypot
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
      // fall through to mailto on failure
    }

    /* 2) Zero-config mailto fallback */
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
