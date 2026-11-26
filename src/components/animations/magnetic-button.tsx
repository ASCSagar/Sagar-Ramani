"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.22,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();
  const { isDesktopFinePointer } = useMotionCapabilities();

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || shouldReduceMotion || !isDesktopFinePointer) {
      return;
    }

    const xTo = gsap.quickTo(element, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.35, ease: "power3.out" });

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      const offsetX = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const offsetY = (event.clientY - (rect.top + rect.height / 2)) * strength;
      const maxOffset = 8;
      xTo(Math.max(-maxOffset, Math.min(maxOffset, offsetX)));
      yTo(Math.max(-maxOffset, Math.min(maxOffset, offsetY)));
    };

    const handlePointerLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", handlePointerLeave);
      gsap.set(element, { clearProps: "x,y" });
    };
  }, [shouldReduceMotion, isDesktopFinePointer, strength]);

  return (
    <div ref={wrapperRef} className={cn("inline-flex", className)} {...props}>
      {children}
    </div>
  );
}
