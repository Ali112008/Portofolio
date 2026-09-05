"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Zap, Sparkles, ArrowRight } from "lucide-react";
import { fadeUp } from "./SectionHeading";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center grid-pattern overflow-hidden"
    >
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_70%)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 pt-16"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-sm text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
            >
              I Build Sites That{" "}
              <span className="gradient-text">Win Clients</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Frontend developer with 2+ years of experience crafting{" "}
              <span className="text-white font-medium">pixel-perfect</span>,{" "}
              <span className="text-white font-medium">blazing-fast</span>{" "}
              websites that turn visitors into customers. Every project ships
              with
              <span className="text-white font-medium"> PageSpeed 100</span> —
              not as a feature, as a standard.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#contact"
                className="group px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all duration-200 flex items-center gap-2 shadow-xl shadow-primary/25"
              >
                <Sparkles className="w-4 h-4" />
                Let&apos;s Build Yours
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl border border-border text-white font-medium text-sm hover:bg-surface-light hover:border-muted-foreground transition-all duration-200"
              >
                See My Work
              </a>
            </motion.div>
          </div>

          {/* Profile image + floating stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="relative flex-shrink-0"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-2xl scale-110" />
              {/* Border ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="absolute inset-1 rounded-full border border-border" />
              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Ali Mahmoud - Frontend Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-surface border border-border shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold">
                    100
                    <span className="text-muted-foreground font-normal">
                      /100
                    </span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
