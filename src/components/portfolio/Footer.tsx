"use client";

import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { NAV_LINKS, SOCIALS } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#"
            className="font-mono text-base font-bold tracking-tight"
            aria-label="Back to top"
          >
            <span className="text-primary">&lt;</span>
            Ali
            <span className="text-primary">/&gt;</span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.slice(0, 6).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SOCIALS.khamsat}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Khamsat profile"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${SOCIALS.email}`}
              aria-label="Email Ali Mahmoud"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Designed &amp; Built by{" "}
            <span className="text-muted">Ali Mahmoud</span> ·{" "}
            {new Date().getFullYear()}
          </p>
          <p className="text-[11px] text-muted-foreground/70 font-mono">
            Next.js 16 · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
