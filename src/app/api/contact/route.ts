import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact form endpoint.
 *
 * Delivery strategy (first one configured wins):
 *  1. WEB3FORMS_ACCESS_KEY  → send via Web3Forms (https://web3forms.com,
 *                             free 250/mo, no domain verification needed).
 *  2. RESEND_API_KEY        → send via Resend (https://resend.com).
 *  3. Neither set           → return 200 with a `mailto:` link so the
 *                             visitor's own email client delivers the message.
 *
 * Spam / abuse protection: zod validation + honeypot field + per-IP rate
 * limit. Web3Forms/Resend also filter spam on their side.
 */

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  budget: z.string().max(40).optional(),
  message: z.string().min(10).max(2000),
  // Honeypot — accept anything; a filled value is silently dropped below.
  company: z.string().optional(),
});

const OWNER_EMAIL =
  process.env.CONTACT_EMAIL ?? "ali.mahmoud.developer@gmail.com";

/* ── In-memory sliding-window rate limiter (per server instance) ──
   Legit users submit once; this only stops bots/scripted floods. On Vercel
   each warm function instance keeps its own window, which is plenty for
   abuse protection.                                                        */
const WINDOW_MS = 5 * 60_000; // 5 minutes
const MAX_SUBMISSIONS = 5; // max submissions per IP per window
const hits = new Map<string, number[]>();

function rateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Drop timestamps outside the window
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= MAX_SUBMISSIONS) {
    const oldest = recent[0];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    return { limited: true, retryAfter: Math.max(retryAfter, 1) };
  }

  recent.push(now);
  hits.set(ip, recent);
  return { limited: false, retryAfter: 0 };
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const { limited, retryAfter } = rateLimited(ip);
    if (limited) {
      return NextResponse.json(
        {
          error:
            "Too many messages. Please wait a few minutes before trying again.",
        },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
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

    /* Honeypot tripped — pretend success but silently drop the message. */
    if (company && company.length > 0) {
      return NextResponse.json({ ok: true, delivered: true });
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

    /* 1) Web3Forms — free, no domain verification, built-in spam filter */
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email, // Web3Forms sets this as the reply-to address
          subject,
          message: bodyText,
          botcheck: company ?? "", // honeypot
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        return NextResponse.json({ ok: true, delivered: true });
      }
      // fall through to Resend / mailto on failure
    }

    /* 2) Resend */
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM ?? `Portfolio <onboarding@resend.dev>`,
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
