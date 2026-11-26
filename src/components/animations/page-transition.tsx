"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { MOTION_DURATIONS, MOTION_EASES } from "@/config/motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { shouldReduceMotion } = useAnimationSettings();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.92 }}
      animate={{
        opacity: 1,
        transition: { duration: MOTION_DURATIONS.ui, ease: MOTION_EASES.framer.out },
      }}
    >
      {children}
    </motion.div>
  );
}
