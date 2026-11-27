"use client";

import { Badge } from "@/components/ui/badge";

export type SphereFallbackReason =
  | "loading"
  | "reduced-motion"
  | "paused"
  | "webgl-unavailable"
  | "error";

interface HeroSphereFallbackProps {
  reason?: SphereFallbackReason;
  variant?: "default" | "background";
}

const REASON_LABELS: Record<SphereFallbackReason, string> = {
  loading: "Initializing 3D preview",
  "reduced-motion": "Reduced motion active",
  paused: "Ambient 3D paused",
  "webgl-unavailable": "Static fallback (WebGL unavailable)",
  error: "Static architecture preview",
};

export function HeroSphereFallback({
  reason = "webgl-unavailable",
  variant = "default",
}: HeroSphereFallbackProps) {
  if (variant === "background") {
    return (
      <div
        data-testid="hero-sphere-fallback"
        data-fallback-reason={reason}
        role="img"
        aria-label="Architectural engineering sphere illustration representing full-stack systems"
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-transparent border-0"
      >
        <svg
          viewBox="0 0 280 280"
          className="relative z-10 size-60 text-[#849E26] opacity-35"
          aria-hidden="true"
        >
          <circle
            cx="140"
            cy="140"
            r="98"
            fill="none"
            stroke="#46551C"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="4 4"
          />
          <ellipse
            cx="140"
            cy="140"
            rx="116"
            ry="42"
            transform="rotate(-24 140 140)"
            fill="none"
            stroke="#CCFF33"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <ellipse
            cx="140"
            cy="140"
            rx="42"
            ry="116"
            transform="rotate(-24 140 140)"
            fill="none"
            stroke="#667A25"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      data-testid="hero-sphere-fallback"
      data-fallback-reason={reason}
      role="img"
      aria-label="Architectural engineering sphere illustration representing full-stack systems"
      className="relative flex h-[340px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 sm:h-[400px] lg:h-[440px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_68%)]"
      />

      <svg
        viewBox="0 0 280 280"
        className="relative z-10 size-52 text-primary sm:size-60"
        aria-hidden="true"
      >
        <circle
          cx="140"
          cy="140"
          r="98"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          strokeDasharray="4 4"
        />
        <ellipse
          cx="140"
          cy="140"
          rx="116"
          ry="42"
          transform="rotate(-24 140 140)"
          fill="none"
          stroke="var(--accent-secondary)"
          strokeWidth="1.4"
          strokeOpacity="0.55"
        />
        <ellipse
          cx="140"
          cy="140"
          rx="116"
          ry="42"
          transform="rotate(28 140 140)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />
        <polygon
          points="140,56 212,98 212,182 140,224 68,182 68,98"
          fill="color-mix(in oklch, var(--primary) 10%, transparent)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        <polygon
          points="140,84 188,112 188,168 140,196 92,168 92,112"
          fill="none"
          stroke="var(--accent-secondary)"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
        <line x1="140" y1="56" x2="140" y2="224" stroke="currentColor" strokeOpacity="0.25" />
        <line x1="68" y1="98" x2="212" y2="182" stroke="currentColor" strokeOpacity="0.25" />
        <line x1="212" y1="98" x2="68" y2="182" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="140" cy="56" r="4" fill="currentColor" />
        <circle cx="212" cy="98" r="4" fill="var(--accent-secondary)" />
        <circle cx="212" cy="182" r="4" fill="currentColor" />
        <circle cx="140" cy="224" r="4" fill="var(--accent-secondary)" />
        <circle cx="68" cy="182" r="4" fill="currentColor" />
        <circle cx="68" cy="98" r="4" fill="var(--accent-secondary)" />
        <circle cx="140" cy="140" r="6" fill="currentColor" />
      </svg>

      <div className="relative z-10 mt-3 flex flex-wrap items-center justify-center gap-2 text-center">
        <Badge variant="outline" className="bg-background/80 font-mono text-[11px]">
          {REASON_LABELS[reason]}
        </Badge>
      </div>
    </div>
  );
}

export const SceneFallback = HeroSphereFallback;
