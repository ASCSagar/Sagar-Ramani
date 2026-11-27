"use client";

import { useRef, type ReactNode } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import {
  MOTION_DISTANCES,
  MOTION_DURATIONS,
  MOTION_EASES,
  MOTION_STAGGER,
  SCROLL_TRIGGER_DEFAULTS,
} from "@/config/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  immediate?: boolean;
}

export function ScrollReveal({
  children,
  className,
  y = MOTION_DISTANCES.md,
  x = 0,
  delay = 0,
  duration = MOTION_DURATIONS.reveal,
  immediate = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element || shouldReduceMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(element, {
          y,
          x,
          opacity: 0,
          delay,
          duration,
          ease: MOTION_EASES.gsap.out,
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
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [shouldReduceMotion, y, x, delay, duration, immediate] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
}

export function StaggerReveal({
  children,
  className,
  itemSelector = "[data-stagger-item]",
  stagger = MOTION_STAGGER.base,
  y = MOTION_DISTANCES.md,
  duration = MOTION_DURATIONS.reveal,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || shouldReduceMotion) return;

      const items = container.querySelectorAll(itemSelector);
      if (items.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(items, {
          y,
          opacity: 0,
          duration,
          stagger,
          ease: MOTION_EASES.gsap.out,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: container,
            start: SCROLL_TRIGGER_DEFAULTS.start,
            once: SCROLL_TRIGGER_DEFAULTS.once,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [shouldReduceMotion, itemSelector, stagger, y, duration] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left";
  delay?: number;
  duration?: number;
}

export function MaskReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = MOTION_DURATIONS.cinematic,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element || shouldReduceMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fromClip =
          direction === "up"
            ? "inset(0% 0% 100% 0%)"
            : "inset(0% 100% 0% 0%)";
        gsap.fromTo(
          element,
          { clipPath: fromClip, opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            delay,
            duration,
            ease: MOTION_EASES.gsap.expoOut,
            clearProps: "clipPath,opacity",
            scrollTrigger: {
              trigger: element,
              start: SCROLL_TRIGGER_DEFAULTS.start,
              once: SCROLL_TRIGGER_DEFAULTS.once,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [shouldReduceMotion, direction, delay, duration] }
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxImage({
  children,
  className,
  speed = 18,
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const inner = innerRef.current;
      if (!wrapper || !inner || shouldReduceMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.fromTo(
          inner,
          { yPercent: -speed / 2, scale: 1.06 },
          {
            yPercent: speed / 2,
            scale: 1.06,
            ease: MOTION_EASES.gsap.none,
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: wrapperRef, dependencies: [shouldReduceMotion, speed] }
  );

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
}
