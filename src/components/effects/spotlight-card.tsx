"use client";

import { useCallback, useRef, type PointerEvent, type ReactNode } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightClassName?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightClassName,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();
  const { isDesktopFinePointer } = useMotionCapabilities();

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !isDesktopFinePointer || event.pointerType !== "mouse") return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
    },
    [shouldReduceMotion, isDesktopFinePointer]
  );

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={cn(
        "group/spotlight font-body relative overflow-hidden rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xs transition-colors duration-200 hover:border-primary/40 [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]",
        className
      )}
    >
      {!shouldReduceMotion && isDesktopFinePointer ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100",
            spotlightClassName
          )}
          style={{
            background:
              "radial-gradient(380px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklch, var(--primary) 14%, transparent), transparent 72%)",
          }}
        />
      ) : null}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 4 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();
  const { isDesktopFinePointer } = useMotionCapabilities();

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !isDesktopFinePointer || event.pointerType !== "mouse") return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = px * maxTilt * 2;
      const rotateX = -py * maxTilt * 2;
      el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    },
    [shouldReduceMotion, isDesktopFinePointer, maxTilt]
  );

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
    </div>
  );
}

export function GradientBorder({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br from-primary/30 via-border/60 to-accent-secondary/30 p-px",
        className
      )}
    >
      <div className="h-full w-full rounded-[calc(var(--radius-2xl)-1px)] bg-background/95">
        {children}
      </div>
    </div>
  );
}
