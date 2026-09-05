"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
import { SOCIALS } from "@/data/portfolio";
import { SectionHeading, fadeUp, stagger } from "./SectionHeading";

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
  /* honeypot — must stay empty */
  company: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const BUDGETS = [
  "$100 – $300",
  "$300 – $700",
  "$700 – $1,500",
  "$1,500+",
  "Not sure yet",
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("sent");
        reset();
        /* If no email service is configured server-side, open the
           visitor's mail client with the message pre-filled as a fallback. */
        if (data?.mailto) {
          window.location.assign(data.mailto);
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* ── Contact form ── */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-5"
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
                  className="w-full rounded-lg bg-surface-light border border-border px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
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
                  className="w-full rounded-lg bg-surface-light border border-border px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
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
                className="w-full rounded-lg bg-surface-light border border-border px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
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
                className="w-full rounded-lg bg-surface-light border border-border px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-y"
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
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-emerald-400"
                role="status"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Thanks! Your message is ready — your email app should open to
                confirm it. I&apos;ll get back to you within a few hours.
              </motion.p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400" role="alert">
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
          </motion.form>

          {/* ── Direct channels ── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-2 flex flex-col gap-4"
          >
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
                  <div className="text-sm font-medium truncate">{item.value}</div>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
