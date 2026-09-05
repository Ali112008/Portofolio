"use client";

import {
  Zap,
  Target,
  Clock,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { WHY_ME } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  Target,
  Clock,
  Shield,
};

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="About Me" title="Why Work With Me" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal className="space-y-5 text-muted leading-relaxed">
            <p>
              I&apos;m a{" "}
              <span className="text-white font-medium">Frontend Developer</span>{" "}
              based in{" "}
              <span className="text-white font-medium">Suez, Egypt</span> — and
              I don&apos;t just build websites. I build{" "}
              <span className="text-white font-medium">
                revenue-generating digital experiences
              </span>{" "}
              that make your business impossible to ignore.
            </p>
            <p>
              Every project I deliver comes with production-grade performance,
              pixel-perfect design implementation, and SEO that actually works.
              I treat your deadline as a promise, not a suggestion — and
              I&apos;ve{" "}
              <span className="text-white font-medium">never missed one</span>.
            </p>
            <p>
              When I&apos;m not shipping code, I&apos;m exploring new web
              technologies, studying design trends, and pushing the boundaries
              of what&apos;s possible on the web.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_ME.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Zap;
              return (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 group h-full">
                    <Icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-semibold mb-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
