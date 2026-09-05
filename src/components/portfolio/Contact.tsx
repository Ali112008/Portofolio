"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Linkedin,
  Github,
  Globe,
  Send,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { SOCIALS, WEB3FORMS_ACCESS_KEY } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Tell me a bit more — at least 10 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
  /* honeypot (Web3Forms calls it "botcheck") — must stay empty; filled = bot */
  company: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const BUDGETS = [
  "$100 – $300",
  "$300 – $700",
  "$700 – $1,500",
  "$1,500+",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-lg bg-surface-light border border-border px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all";

/* Contact form temporarily disabled while Web3Forms deliverability is being
   sorted with their support (submissions return success but don't arrive —
   usually a suppression-list / spam issue only they can clear). Flip to
   `true` to bring the form back once a test email lands in the inbox. */
const CONTACT_FORM_ENABLED = false;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [sentMsg, setSentMsg] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("sending");

    // Honeypot tripped by a bot — pretend success and drop silently.
    if (values.company && values.company.length > 0) {
      setStatus("sent");
      setSentMsg(
        "Message sent successfully! I'll get back to you within a few hours."
      );
      reset();
      return;
    }

    const subject = `New project inquiry from ${values.name}`;
    const bodyText = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.budget ? `Budget: ${values.budget}` : null,
      "",
      "Message:",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    // Send to Web3Forms straight from the browser using FormData — exactly
    // the format in Web3Forms' official React example (the public key is
    // safe client-side; FormData is the most reliable, CORS-friendly path).
    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", subject);
      formData.append("message", bodyText);
      formData.append("botcheck", values.company ?? ""); // honeypot

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        // NOTE: no Content-Type — the browser sets multipart/form-data itself
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json().catch(() => null);
      // Helpful diagnostic in the browser console (open DevTools → Console)
      console.info("[contact] Web3Forms response:", data);

      if (res.ok && data?.success) {
        setStatus("sent");
        setSentMsg(
          "Message sent successfully! I'll get back to you within a few hours."
        );
        reset();
        return;
      }
      // fall through to mailto if Web3Forms reports failure
    } catch {
      // network/blocked — fall through to mailto
    }

    // Fallback: open the visitor's email app with everything pre-filled.
    setStatus("sent");
    setSentMsg(
      "Almost done — your email app should open with the message ready. Just press Send, and I'll receive it."
    );
    const mailto = `mailto:${SOCIALS.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyText)}`;
    window.location.assign(mailto);
    reset();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SOCIALS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: SOCIALS.email,
      href: `mailto:${SOCIALS.email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "alimahmoud-dev",
      href: SOCIALS.linkedin,
    },
    { icon: Github, label: "GitHub", value: "Ali112008", href: SOCIALS.github },
    { icon: Globe, label: "Khamsat", value: "ali_mahmmoud", href: SOCIALS.khamsat },
  ];

  return (
    <section id="contact" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's Make It Happen"
          subtitle="Got a project in mind? Fill in the form below or reach out directly — I usually reply within a few hours."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Contact form (or direct-contact card while disabled) ── */}
          <Reveal className="lg:col-span-3">
            {!CONTACT_FORM_ENABLED ? (
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface h-full flex flex-col justify-center text-center sm:text-left">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-5">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Let&apos;s talk about your project
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  The quickest way to reach me is by email — I usually reply
                  within a few hours. Prefer WhatsApp-style chat? My Khamsat
                  inbox works too, or message me on LinkedIn.
                </p>

                <a
                  href={`mailto:${SOCIALS.email}`}
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all duration-200 shadow-xl shadow-primary/25"
                >
                  <Send className="w-4 h-4" />
                  Email me now
                  <span className="hidden sm:inline text-xs font-normal opacity-80">
                    {SOCIALS.email}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3 rounded-xl border border-dashed border-border text-xs text-muted-foreground hover:text-white hover:border-primary/30 transition-all duration-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Email copied to clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy email address
                    </>
                  )}
                </button>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-5 h-full"
              noValidate
            >
              {/* Honeypot (hidden from humans) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register("company")}
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-muted-foreground mb-2"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-muted-foreground mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    {...register("email")}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-xs font-medium text-muted-foreground mb-2"
                >
                  Project budget{" "}
                  <span className="text-muted-foreground/50">(optional)</span>
                </label>
                <select
                  id="budget"
                  {...register("budget")}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Select a range…</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-muted-foreground mb-2"
                >
                  Project details
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project — goals, timeline, and what success looks like for you…"
                  {...register("message")}
                  className={`${inputClass} resize-y`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1.5">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all duration-200 shadow-xl shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {status === "sent" && (
                <p
                  className="flex items-start gap-2 text-sm text-emerald-400"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    {sentMsg ||
                      "Thanks! I'll get back to you within a few hours."}
                  </span>
                </p>
              )}
              {status === "error" && (
                <p
                  className="flex items-center gap-2 text-sm text-red-400"
                  role="alert"
                >
                  Something went wrong sending your message. Please email me
                  directly at{" "}
                  <a
                    href={`mailto:${SOCIALS.email}`}
                    className="underline underline-offset-2"
                  >
                    {SOCIALS.email}
                  </a>
                  .
                </p>
              )}
            </form>
            )}
          </Reveal>

          {/* ── Direct channels ── */}
          <Reveal className="lg:col-span-2">
            <div className="flex flex-col gap-4 h-full">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-4 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surface-light transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium truncate">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}

              {/* Copy email */}
              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dashed border-border text-xs text-muted-foreground hover:text-white hover:border-primary/30 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Email copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy email address
                  </>
                )}
              </button>

              <div className="mt-auto p-5 rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-xs text-muted leading-relaxed">
                  <span className="text-white font-medium">Prefer Arabic?</span>{" "}
                  No problem — I&apos;m fully bilingual and deliver Arabic-first
                  RTL websites for clients across the MENA region.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
