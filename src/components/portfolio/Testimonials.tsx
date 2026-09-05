"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, CheckCircle2, ExternalLink } from "lucide-react";
import { TESTIMONIALS, SOCIALS } from "@/data/portfolio";
import { SectionHeading, fadeUp, stagger } from "./SectionHeading";

const VISIBLE_INITIALLY = 6;

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? TESTIMONIALS
    : TESTIMONIALS.slice(0, VISIBLE_INITIALLY);

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          label="Testimonials"
          title="What Clients Say"
          subtitle="Don't take my word for it — here's what the people I've worked with have to say. All reviews come from verified Khamsat transactions."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-5"
        >
          {visible.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              custom={i}
              layout
              className="group relative flex flex-col min-h-[220px] p-5 rounded-2xl border border-border bg-surface/80 backdrop-blur-sm hover:border-primary/40 hover:bg-surface transition-all duration-300"
            >
              {/* Top row: quote icon + rating */}
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/15">
                  <Quote className="w-4 h-4 text-primary" />
                </div>
                <div
                  className="flex gap-0.5"
                  role="img"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial text */}
              <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author footer */}
              <figcaption className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[11px] text-muted">{t.role}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </figcaption>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            </motion.figure>
          ))}
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {TESTIMONIALS.length > VISIBLE_INITIALLY && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-xl border border-border bg-surface hover:border-primary/40 hover:text-primary transition-all duration-200"
              aria-expanded={expanded}
            >
              {expanded
                ? "Show fewer reviews"
                : `Show all ${TESTIMONIALS.length} reviews`}
            </button>
          )}
          <a
            href={SOCIALS.khamsat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Read all reviews on Khamsat</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
