import Link from "next/link";
import type { Metadata } from "next";
import { Home, Search, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

const POPULAR_LINKS = [
  { href: "/#projects", label: "My Work" },
  { href: "/#services", label: "Services" },
  { href: "/#certifications", label: "Certificates" },
  { href: "/#contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center grid-pattern px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center max-w-lg">
        <p className="font-mono text-7xl sm:text-8xl font-bold gradient-text mb-4">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          This page drifted off the web
        </h1>
        <p className="text-muted text-sm sm:text-base mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
          Don&apos;t worry — even the best deployments have a broken link
          sometimes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all shadow-xl shadow-primary/25"
          >
            <Home className="w-4 h-4" />
            Back Home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-surface-light hover:border-muted-foreground transition-all"
          >
            <Search className="w-4 h-4" />
            Report a broken link
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground mr-1 inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Popular pages:
          </span>
          {POPULAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-border text-muted-foreground hover:text-white hover:border-primary/40 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
