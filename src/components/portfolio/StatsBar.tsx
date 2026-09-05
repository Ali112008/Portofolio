"use client";

import {
  Briefcase,
  Layers,
  Zap,
  Award,
  type LucideIcon,
} from "lucide-react";
import { STATS } from "@/data/portfolio";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  Layers,
  Zap,
  Award,
};

export function StatsBar() {
  return (
    <section
      className="py-12 border-y border-border/50 bg-surface/30"
      aria-label="Key statistics"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = ICONS[stat.icon] ?? Zap;
            return (
              <Reveal key={stat.label} delay={i * 80} className="text-center group">
                <Icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
