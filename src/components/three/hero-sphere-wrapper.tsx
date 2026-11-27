"use client";

import { Component, useEffect, useState } from "react";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import {
  HeroSphereFallback,
  type SphereFallbackReason,
} from "@/components/three/hero-sphere-fallback";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { detectWebGLSupport, prefersReducedMotion } from "@/lib/webgl";

const EngineeringSphere = dynamic(() => import("@/components/three/engineering-sphere"), {
  ssr: false,
  loading: () => <HeroSphereFallback reason="loading" />,
});

interface BoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface HeroSphereWrapperProps {
  variant?: "default" | "background";
}

export function HeroSphereWrapper({ variant = "background" }: HeroSphereWrapperProps = {}) {
  const { ambientMotionPaused } = useAnimationSettings();
  const { qualityTier } = useMotionCapabilities();
  const [fallbackReason, setFallbackReason] = useState<SphereFallbackReason | null>(() => {
    if (typeof window !== "undefined") {
      if (prefersReducedMotion()) return "reduced-motion";
      if (!detectWebGLSupport()) return "webgl-unavailable";
    }
    return "loading";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      if (prefersReducedMotion() || mediaQuery.matches) {
        setFallbackReason("reduced-motion");
        return;
      }
      if (ambientMotionPaused) {
        setFallbackReason("paused");
        return;
      }
      if (!detectWebGLSupport()) {
        setFallbackReason("webgl-unavailable");
        return;
      }
      setFallbackReason(null);
    };

    evaluate();
    mediaQuery.addEventListener("change", evaluate);

    return () => {
      mediaQuery.removeEventListener("change", evaluate);
    };
  }, [ambientMotionPaused]);

  if (fallbackReason !== null) {
    return <HeroSphereFallback reason={fallbackReason} variant={variant} />;
  }

  return (
    <ThreeErrorBoundary fallback={<HeroSphereFallback reason="error" variant={variant} />}>
      <EngineeringSphere
        variant={variant}
        qualityTier={qualityTier}
        onContextError={() => setFallbackReason("webgl-unavailable")}
      />
    </ThreeErrorBoundary>
  );
}
