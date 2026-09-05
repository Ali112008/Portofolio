"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
import { SectionHeading, fadeUp, stagger } from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  Globe,
  ShoppingCart,
  Layers,
  Sparkles,
  Gauge,
};

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          subtitle="Fixed-scope packages with transparent starting prices. You'll know the cost and timeline before we start — no surprises."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Zap;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                className={`relative flex flex-col p-6 rounded-2xl border bg-surface transition-all duration-300 group hover:-translate-y-1 ${
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

                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
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

                <div className="flex items-end justify-between pt-5 border-t border-border">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                      Starting at
                    </span>
                    <span className="text-2xl font-bold tracking-tight">
                      ${service.startingPrice}
                      <span className="text-xs font-normal text-muted-foreground ml-1">
                        USD
                      </span>
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-light transition-colors group/link"
                    aria-label={`Get a quote for ${service.title}`}
                  >
                    Get a quote
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xs text-muted mt-8"
        >
          Every project is quoted after a free discovery call. Need something
          custom?{" "}
          <a
            href="#contact"
            className="text-primary hover:text-primary-light underline underline-offset-4"
          >
            Let&apos;s talk
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
