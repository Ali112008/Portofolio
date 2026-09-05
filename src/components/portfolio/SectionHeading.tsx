"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const CUSTOM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: CUSTOM_EASE },
  }),
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mb-12"
    >
      <span className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted mt-3 max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}
