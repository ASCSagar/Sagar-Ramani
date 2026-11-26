import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSphereFallback } from "@/components/three/hero-sphere-fallback";
import { detectWebGLSupport, prefersReducedMotion } from "@/lib/webgl";

describe("WebGL & Fallback Foundations", () => {
  it("renders accessible static fallback with reason attribute", () => {
    render(<HeroSphereFallback reason="reduced-motion" />);

    const fallback = screen.getByTestId("hero-sphere-fallback");
    expect(fallback).toHaveAttribute("data-fallback-reason", "reduced-motion");
    expect(fallback).toHaveAttribute("role", "img");
    expect(screen.getByText("Reduced motion active")).toBeInTheDocument();
  });

  it("returns boolean safely for detectWebGLSupport and prefersReducedMotion in jsdom", () => {
    expect(typeof detectWebGLSupport()).toBe("boolean");
    expect(typeof prefersReducedMotion()).toBe("boolean");
  });
});
