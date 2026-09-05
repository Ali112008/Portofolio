import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact form endpoint.
 *
 * Delivery strategy (first one that works wins):
 *  1. Web3Forms  → pre-configured with a public access key (free 250/mo,
 *                  no domain verification). Override via WEB3FORMS_ACCESS_KEY.
 *  2. FormSubmit  → keyless backup that forwards to OWNER_EMAIL (needs a
 *                  one-time activation click on the first live submission).
 *  3. Resend      → if RESEND_API_KEY is set.
 *  4. mailto:     → last resort: open the visitor's own email client.
 *
 * Spam / abuse protection: zod validation + honeypot + per-IP rate limit.
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

/* Web3Forms public access key — safe to ship in client/server code (it only
   routes form submissions to the verified email). Override with
   WEB3FORMS_ACCESS_KEY if you ever swap forms/providers. */
const WEB3FORMS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ??
  "e392e032-ce29-4485-b689-d741fb88c985";

/* ── In-memory sliding-window rate limiter (per server instance) ── */
const WINDOW_MS = 5 * 60_000; // 5 minutes
const MAX_SUBMISSIONS = 5; // max submissions per IP per window
const hits = new Map<string, number[]>();

function rateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= MAX_SUBMISSIONS) {
    const retryAfter = Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
    return { limited: true, retryAfter: Math.max(retryAfter, 1) };
  }

  recent.push(now);
  hits.set(ip, recent);
  return { limited: false, retryAfter: 0 };
}

/** POST JSON that returns false instead of throwing on network/HTTP error. */
async function postJson(
  url: string,
  payload: Record<string, unknown>,
  extraHeaders?: Record<string, string>
): Promise<{ ok: boolean; data: Record<string, unknown> | null }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...extraHeaders,
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as
      | Record<string, unknown>
      | null;
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: null };
  }
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

    /* 1) Web3Forms — free 250/mo, public access key (already configured) */
    const w3 = await postJson("https://api.web3forms.com/submit", {
      access_key: WEB3FORMS_KEY,
      name,
      email, // Web3Forms uses this as the reply-to address
      subject,
      message: bodyText,
      botcheck: company ?? "", // honeypot; Web3Forms also filters spam
    });
    if (w3.ok && w3.data?.success) {
      return NextResponse.json({ ok: true, delivered: true });
    }

    /* 2) FormSubmit — keyless backup that forwards to OWNER_EMAIL */
    const formSubmit = await postJson(
      `https://formsubmit.co/ajax/${OWNER_EMAIL}`,
      {
        name,
        email,
        Budget: budget ?? "Not specified",
        Message: message,
        _subject: subject,
        _replyto: email, // lets you reply directly to the sender
        _captcha: "false", // seamless AJAX flow; honeypot + rate limit guard us
      }
    );
    if (formSubmit.ok && formSubmit.data?.success == true) {
      return NextResponse.json({ ok: true, delivered: true });
    }

    /* 3) Resend */
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const r = await postJson(
        "https://api.resend.com/emails",
        {
          from:
            process.env.RESEND_FROM ?? `Portfolio <onboarding@resend.dev>`,
          to: [OWNER_EMAIL],
          reply_to: email,
          subject,
          text: bodyText,
        },
        { Authorization: `Bearer ${resendKey}` }
      );
      if (r.ok) {
        return NextResponse.json({ ok: true, delivered: true });
      }
    }

    /* 4) Zero-config mailto fallback */
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
