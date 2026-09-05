"use client";

import {
  Zap,
  Globe,
  ShoppingCart,
  Layers,
  Sparkles,
  Gauge,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  Globe,
  ShoppingCart,
  Layers,
  Sparkles,
  Gauge,
};

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          subtitle="Every project is scoped to your goals and budget. Tell me what you need — you'll get a free, no-obligation quote with a clear timeline before we start."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Zap;
            return (
              <Reveal key={service.title} delay={(i % 3) * 100}>
                <div
                  className={`relative flex flex-col p-6 rounded-2xl border bg-surface transition-all duration-300 group hover:-translate-y-1 h-full ${
                    service.popular
                      ? "border-primary/50 shadow-xl shadow-primary/10"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {service.popular && (
                    <span className="absolute -top-3 left-6 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                      Most Popular
                    </span>
                  )}

                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-px" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-5 border-t border-border">
                    <a
                      href="#contact"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
                      aria-label={`Get a free quote for ${service.title}`}
                    >
                      Get a Free Quote
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center mt-8">
          <p className="text-xs text-muted">
            Every project is quoted after a free discovery call. Need something
            custom?{" "}
            <a
              href="#contact"
              className="text-primary hover:text-primary-light underline underline-offset-4"
            >
              Let&apos;s talk
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
