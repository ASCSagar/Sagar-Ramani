"use client";

import { cn } from "@/lib/utils";

export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden bg-canvas", className)}
    >
      {/* Fine minimal engineering grid */}
      <div className="bg-engineering-grid absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_40%,transparent_100%)]" />
    </div>
  );
}
