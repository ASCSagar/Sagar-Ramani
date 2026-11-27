"use client";

import { useAnimationSettings } from "@/components/providers/animation-provider";

const MARQUEE_ITEMS = [
  "Full Stack Development",
  "Frontend Engineering",
  "Backend Engineering",
  "AI Automation",
];

// Replicated sequence for seamless mathematical wrapping across any viewport
const SEQUENCE_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

function MarqueeStar() {
  return (
    <span
      className="inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5 sm:size-7 lg:size-9 fill-[#CCFF33] text-[#CCFF33] drop-shadow-[0_0_12px_rgba(204,255,51,0.45)] transition-transform duration-300 hover:scale-125"
      >
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
      </svg>
    </span>
  );
}

export function TypographyMarquee() {
  const { shouldReduceMotion } = useAnimationSettings();

  return (
    <section
      aria-label="Core Engineering Disciplines Marquee"
      className="relative w-full overflow-hidden border-y border-border/40 bg-background py-8 sm:py-12 lg:py-14 select-none"
    >
      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
        {/* Row 1: Right to Left */}
        <div className="flex w-full overflow-hidden">
          <div
            className="flex w-max shrink-0 animate-marquee-left items-center hover:[animation-play-state:paused]"
            style={shouldReduceMotion ? { animationPlayState: "paused" } : undefined}
          >
            {/* Primary Track Sequence */}
            <div className="flex shrink-0 items-center">
              {SEQUENCE_ITEMS.map((item, idx) => (
                <span key={`r1-primary-${idx}`} className="flex items-center">
                  <span className="font-display text-[clamp(3.25rem,7.5vw,7.5rem)] font-bold tracking-[-0.038em] leading-none text-marquee-outline whitespace-nowrap cursor-default">
                    {item}
                  </span>
                  <MarqueeStar />
                </span>
              ))}
            </div>

            {/* Seamless Duplicate Track Sequence */}
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {SEQUENCE_ITEMS.map((item, idx) => (
                <span key={`r1-dup-${idx}`} className="flex items-center">
                  <span className="font-display text-[clamp(3.25rem,7.5vw,7.5rem)] font-bold tracking-[-0.038em] leading-none text-marquee-outline whitespace-nowrap cursor-default">
                    {item}
                  </span>
                  <MarqueeStar />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex w-full overflow-hidden">
          <div
            className="flex w-max shrink-0 animate-marquee-right items-center hover:[animation-play-state:paused]"
            style={shouldReduceMotion ? { animationPlayState: "paused" } : undefined}
          >
            {/* Primary Track Sequence */}
            <div className="flex shrink-0 items-center">
              {SEQUENCE_ITEMS.map((item, idx) => (
                <span key={`r2-primary-${idx}`} className="flex items-center">
                  <span className="font-display text-[clamp(3.25rem,7.5vw,7.5rem)] font-bold tracking-[-0.038em] leading-none text-marquee-outline whitespace-nowrap cursor-default">
                    {item}
                  </span>
                  <MarqueeStar />
                </span>
              ))}
            </div>

            {/* Seamless Duplicate Track Sequence */}
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {SEQUENCE_ITEMS.map((item, idx) => (
                <span key={`r2-dup-${idx}`} className="flex items-center">
                  <span className="font-display text-[clamp(3.25rem,7.5vw,7.5rem)] font-bold tracking-[-0.038em] leading-none text-marquee-outline whitespace-nowrap cursor-default">
                    {item}
                  </span>
                  <MarqueeStar />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
