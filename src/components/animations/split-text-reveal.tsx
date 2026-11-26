"use client";

import { useRef } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import {
  MOTION_DURATIONS,
  MOTION_EASES,
  MOTION_STAGGER,
  SCROLL_TRIGGER_DEFAULTS,
} from "@/config/motion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type HeadingTag = "h1" | "h2" | "h3" | "p" | "span";

interface SplitTextRevealProps {
  text: string;
  as?: HeadingTag;
  id?: string;
  className?: string;
  splitBy?: "words" | "lines" | "chars";
  delay?: number;
  duration?: number;
  stagger?: number;
  immediate?: boolean;
}

export function SplitTextReveal({
  text,
  as: Tag = "h2",
  id,
  className,
  splitBy = "words",
  delay = 0,
  duration = MOTION_DURATIONS.reveal,
  stagger = MOTION_STAGGER.tight,
  immediate = false,
}: SplitTextRevealProps) {
  const elRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const element = elRef.current;
      if (!element || shouldReduceMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(element, {
          type: splitBy,
          mask: splitBy,
          aria: "auto",
        });

        const targets =
          splitBy === "chars" ? split.chars : splitBy === "lines" ? split.lines : split.words;

        if (!targets || targets.length === 0) {
          split.revert();
          return;
        }

        const tween = gsap.from(targets, {
          yPercent: 105,
          opacity: 0,
          delay,
          duration,
          stagger,
          ease: MOTION_EASES.gsap.expoOut,
          clearProps: "transform,opacity",
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: element,
                  start: SCROLL_TRIGGER_DEFAULTS.start,
                  once: SCROLL_TRIGGER_DEFAULTS.once,
                },
              }),
          onComplete: () => {
            split.revert();
          },
        });

        return () => {
          tween.kill();
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: elRef, dependencies: [text, splitBy, delay, duration, stagger, immediate, shouldReduceMotion] }
  );

  return (
    <Tag
      ref={elRef as React.RefObject<never>}
      id={id}
      aria-label={text}
      className={className}
    >
      {text}
    </Tag>
  );
}

export const TextReveal = SplitTextReveal;
