"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { useAnimationSettings } from "@/components/providers/animation-provider";

export function ScrollProgress() {
  const { shouldReduceMotion } = useAnimationSettings();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-0.5 origin-left bg-gradient-to-r from-primary via-accent-secondary to-primary print:hidden"
    />
  );
}
