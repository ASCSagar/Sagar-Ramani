"use client";

import { useEffect, useState } from "react";

import { MOTION_BREAKPOINTS, type MotionQualityTier } from "@/config/motion";

export interface MotionCapabilities {
  isDesktopFinePointer: boolean;
  isTouchDevice: boolean;
  qualityTier: Exclude<MotionQualityTier, "reduced">;
  isDocumentVisible: boolean;
}

export function useMotionCapabilities(): MotionCapabilities {
  const [capabilities, setCapabilities] = useState<MotionCapabilities>({
    isDesktopFinePointer: false,
    isTouchDevice: false,
    qualityTier: "desktop",
    isDocumentVisible: true,
  });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const update = () => {
      const width = window.innerWidth;
      const cores = navigator.hardwareConcurrency ?? 8;
      const isLowCore = cores > 0 && cores <= 4;

      let qualityTier: Exclude<MotionQualityTier, "reduced"> = "desktop";
      if (width < MOTION_BREAKPOINTS.tablet) {
        qualityTier = "mobile";
      } else if (width < MOTION_BREAKPOINTS.desktop || isLowCore) {
        qualityTier = "tablet";
      }

      setCapabilities({
        isDesktopFinePointer: pointerQuery.matches && width >= MOTION_BREAKPOINTS.desktop,
        isTouchDevice: coarseQuery.matches || !pointerQuery.matches,
        qualityTier,
        isDocumentVisible: document.visibilityState !== "hidden",
      });
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    pointerQuery.addEventListener("change", update);
    coarseQuery.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      window.removeEventListener("resize", update);
      pointerQuery.removeEventListener("change", update);
      coarseQuery.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return capabilities;
}
