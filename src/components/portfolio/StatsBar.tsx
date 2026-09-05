"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Layers,
  Zap,
  Award,
  type LucideIcon,
} from "lucide-react";
import { STATS } from "@/data/portfolio";
import { fadeUp, stagger } from "./SectionHeading";
import { CountUp } from "./CountUp";

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  Layers,
  Zap,
  Award,
};

export function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-12 border-y border-border/50 bg-surface/30"
      aria-label="Key statistics"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = ICONS[stat.icon] ?? Zap;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="text-center group"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
