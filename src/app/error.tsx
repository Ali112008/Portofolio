"use client";

import { useEffect } from "react";
import { RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in the console / monitoring in production
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 grid-pattern">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm text-primary mb-3">
          Something broke on our end
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Unexpected error
        </h1>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          The page hit an unexpected error. Try reloading — if the problem
          persists, head back home or reach out directly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all shadow-xl shadow-primary/25"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-surface-light transition-all"
          >
            <Home className="w-4 h-4" />
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
