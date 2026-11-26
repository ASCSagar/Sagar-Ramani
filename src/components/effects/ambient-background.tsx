"use client";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { cn } from "@/lib/utils";

export function AmbientBackground({ className }: { className?: string }) {
  const { shouldReduceMotion } = useAnimationSettings();

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden", className)}
    >
      {/* Fine engineering grid */}
      <div className="bg-engineering-grid absolute inset-0 opacity-[0.34] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_18%,#000_55%,transparent_100%)]" />

      {/* Subtle aurora radial highlights */}
      <div
        className={cn(
          "absolute -top-36 left-1/4 h-[420px] w-[580px] -translate-x-1/2 rounded-full opacity-35 blur-3xl",
          !shouldReduceMotion && "animate-aurora"
        )}
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 26%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className={cn(
          "absolute top-32 right-0 h-[360px] w-[460px] rounded-full opacity-30 blur-3xl",
          !shouldReduceMotion && "animate-aurora"
        )}
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--accent-secondary) 24%, transparent) 0%, transparent 72%)",
          animationDelay: "-6s",
        }}
      />
    </div>
  );
}
