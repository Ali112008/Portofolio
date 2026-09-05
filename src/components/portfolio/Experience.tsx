"use client";

import { ChevronRight } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Experience"
          title="Where I've Worked"
          subtitle="Hands-on roles and intensive training that shaped how I build for the real web."
        />

        <div className="space-y-6 max-w-3xl">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 100}>
              <article className="p-6 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <h3 className="font-semibold">
                    {exp.role}{" "}
                    <span className="text-primary">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  {exp.description}
                </p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-xs text-muted flex items-center gap-2"
                    >
                      <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
