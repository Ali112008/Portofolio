"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Terminal, Palette } from "lucide-react";
import { SKILLS, TECH_MARQUEE } from "@/data/portfolio";
import { SectionHeading, fadeUp, stagger } from "./SectionHeading";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-4 h-4 text-primary" />,
  "Backend & DB": <Terminal className="w-4 h-4 text-primary" />,
  "AI & Tools": <Palette className="w-4 h-4 text-primary" />,
};

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Tech Stack"
          title="Tools of the Trade"
          subtitle="The modern stack I use to build fast, scalable, and beautiful web applications."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {Object.entries(SKILLS).map(([category, skills], catIdx) => (
            <motion.div
              key={category}
              variants={fadeUp}
              custom={catIdx}
              className="p-6 rounded-xl bg-surface border border-border"
            >
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                {CATEGORY_ICONS[category]}
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-lg bg-surface-light border border-border text-muted hover:text-white hover:border-primary/30 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Infinite tech marquee */}
      <div className="mt-14 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap text-xs font-mono px-4 py-2 rounded-full border border-border bg-surface text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
