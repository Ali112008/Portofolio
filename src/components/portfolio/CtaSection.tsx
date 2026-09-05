"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { SOCIALS } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      <Reveal className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
          Ready to Build Something{" "}
          <span className="gradient-text">Remarkable</span>?
        </h2>
        <p className="text-muted text-base sm:text-lg mb-8 leading-relaxed">
          Let&apos;s turn your vision into a digital experience that wins
          clients, drives revenue, and makes your competition irrelevant.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group px-8 py-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all duration-200 flex items-center gap-2 shadow-xl shadow-primary/25"
          >
            <Sparkles className="w-4 h-4" />
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={`mailto:${SOCIALS.email}`}
            className="px-8 py-4 rounded-xl border border-border text-white font-medium text-sm hover:bg-surface-light hover:border-muted-foreground transition-all duration-200"
          >
            Email Me Directly
          </a>
        </div>
      </Reveal>
    </section>
  );
}
