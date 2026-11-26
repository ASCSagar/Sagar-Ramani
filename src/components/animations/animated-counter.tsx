"use client";

import { useRef } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { MOTION_DURATIONS, MOTION_EASES, SCROLL_TRIGGER_DEFAULTS } from "@/config/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/webgl";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function parseDisplayValue(value: string): {
  numeric: number | null;
  decimals: number;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { numeric: null, decimals: 0, prefix: "", suffix: value };
  }
  const [, prefix, numStr, suffix] = match;
  const numeric = Number.parseFloat(numStr);
  if (Number.isNaN(numeric)) {
    return { numeric: null, decimals: 0, prefix: "", suffix: value };
  }
  const decimalPart = numStr.split(".")[1];
  return {
    numeric,
    decimals: decimalPart ? decimalPart.length : 0,
    prefix,
    suffix,
  };
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const element = elRef.current;
      if (!element) return;
      if (shouldReduceMotion || prefersReducedMotion()) {
        element.textContent = value;
        return;
      }

      const parsed = parseDisplayValue(value);
      if (parsed.numeric === null) return;

      const targetValue = parsed.numeric;
      const counter = { current: 0 };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(counter, {
          current: targetValue,
          duration: MOTION_DURATIONS.counter,
          ease: MOTION_EASES.gsap.out,
          immediateRender: false,
          scrollTrigger: {
            trigger: element,
            start: SCROLL_TRIGGER_DEFAULTS.start,
            once: SCROLL_TRIGGER_DEFAULTS.once,
          },
          onUpdate: () => {
            const formatted =
              parsed.decimals > 0
                ? counter.current.toFixed(parsed.decimals)
                : String(Math.round(counter.current));
            element.textContent = `${parsed.prefix}${formatted}${parsed.suffix}`;
          },
          onComplete: () => {
            element.textContent = value;
          },
        });
      });

      return () => {
        element.textContent = value;
        mm.revert();
      };
    },
    { scope: elRef, dependencies: [value, shouldReduceMotion] }
  );

  return (
    <span ref={elRef} className={className} aria-label={value}>
      {value}
    </span>
  );
}
