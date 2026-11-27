"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application boundary caught an exception:", error.message);
  }, [error]);

  return (
    <html lang="en" className="dark h-full">
      <body className="flex min-h-full flex-col items-center justify-center bg-[#09090B] px-4 text-center font-sans text-[#FAFAFA]">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
          <AlertTriangle className="size-8" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono text-xs tracking-wider text-red-400 uppercase">
          Critical Application Error
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Application Error
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#A1A1AA]">
          A critical rendering error occurred. Please reload the application or return to the main portfolio.
        </p>
        {error ? (
          <div className="mt-4 max-w-xl overflow-auto rounded-lg border border-red-500/20 bg-red-950/40 p-4 text-left font-mono text-xs text-red-300">
            <p className="font-semibold text-red-200">{error.message || "Unknown error"}</p>
            {error.digest ? <p className="mt-1 text-[11px] text-red-400">Digest: {error.digest}</p> : null}
            {error.stack ? <pre className="mt-2 text-[10px] whitespace-pre-wrap text-red-300/80">{error.stack}</pre> : null}
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            <span>Reload Application</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-[#FAFAFA] transition-colors hover:bg-white/5"
          >
            Return to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
