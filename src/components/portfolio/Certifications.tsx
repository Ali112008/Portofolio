"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Award, X, ZoomIn } from "lucide-react";
import { CERTIFICATIONS } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Certifications() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(
    null
  );

  /* close on Escape + lock scroll */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Certifications"
          title="Verified Credentials"
          subtitle="800+ hours of structured learning from world-class institutions — not just tutorials, real computer science and engineering."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.title} delay={(i % 4) * 80} className="flex">
              <button
                onClick={() => setLightbox({ src: cert.image, title: cert.title })}
                className="group relative w-full rounded-xl border border-border bg-surface overflow-hidden hover:border-primary/30 transition-all duration-300 text-left cursor-pointer"
                aria-label={`View certificate: ${cert.title}`}
              >
                {/* Certificate image preview */}
                <div className="relative h-32 overflow-hidden bg-surface-light">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    loading="lazy"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                  {/* Zoom hint */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-1.5 rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30">
                      <ZoomIn className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Award className="w-3 h-3 text-primary" />
                    <span>{cert.issuer}</span>
                  </div>
                  <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted font-mono">
                      {cert.date}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {cert.highlight}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-w-5xl w-full max-h-[90vh] rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2 text-sm font-medium text-white truncate">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{lightbox.title}</span>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Close certificate preview"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Certificate Image */}
              <div className="relative w-full aspect-[1.414/1] max-h-[75vh] overflow-auto">
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  width={1200}
                  height={850}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
