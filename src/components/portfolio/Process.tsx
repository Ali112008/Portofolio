"use client";

import {
  MessageSquare,
  Palette,
  Code2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { PROCESS_STEPS } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  MessageSquare,
  Palette,
  Code2,
  Rocket,
};

export function Process() {
  return (
    <section id="process" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="How I Work"
          title="From Idea to Launch"
          subtitle="A proven process that eliminates guesswork and delivers results every time."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon] ?? Code2;
            return (
              <Reveal key={step.title} delay={i * 90}>
                <div className="relative p-6 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300 group h-full">
                  {/* Step number */}
                  <span className="absolute top-4 right-4 text-3xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                    0{i + 1}
                  </span>
                  <Icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
