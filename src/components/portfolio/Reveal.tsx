"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Bulletproof scroll-reveal.
 *
 * Content is rendered VISIBLE by default (SSR + no-JS). Only after React
 * hydrates and this effect runs do we add `motion-ready` to <html>, which
 * lets CSS hide not-yet-revealed elements. An IntersectionObserver then adds
 * `.is-visible` to animate them in.
 *
 * If JavaScript / hydration ever fails, `motion-ready` is never added, so CSS
 * never hides anything — the whole page stays fully visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  /** vertical travel distance in px */
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // Mark JS as alive — only now does CSS hide unrevealed content.
    document.documentElement.classList.add("motion-ready");
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "-40px 0px -40px 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{
        transitionDelay: `${delay}ms`,
        ["--reveal-y" as string]: `${y}px`,
      }}
    >
      {children}
    </div>
  );
}
