import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.hoisted(() => {
  if (typeof window !== "undefined" && !window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  }
  if (typeof globalThis.ResizeObserver === "undefined") {
    globalThis.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  if (typeof window !== "undefined") {
    window.scrollTo = () => {};
  }
});

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { AnimatedCounter } from "@/components/animations/animated-counter";
import { TechnologyMarquee } from "@/components/effects/technology-marquee";
import { TechnologyOrbit } from "@/components/effects/technology-orbit";
import {
  AnimationProvider,
  useAnimationSettings,
} from "@/components/providers/animation-provider";
import { HeroSphereFallback } from "@/components/three/hero-sphere-fallback";
import {
  MOTION_DURATIONS,
  SCROLL_TRIGGER_DEFAULTS,
  THREE_QUALITY_PRESETS,
} from "@/config/motion";

function AnimationControlHarness() {
  const { ambientMotionPaused, shouldReduceMotion, toggleAmbientMotion } =
    useAnimationSettings();

  return (
    <div>
      <span data-testid="paused-state">{String(ambientMotionPaused)}</span>
      <span data-testid="reduced-state">{String(shouldReduceMotion)}</span>
      <button type="button" onClick={toggleAmbientMotion}>
        Toggle Motion
      </button>
    </div>
  );
}

describe("Phase 4 motion configuration & interactive components", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("exports centralized motion design tokens and bounded 3D quality presets", () => {
    expect(MOTION_DURATIONS.micro).toBeLessThanOrEqual(0.25);
    expect(MOTION_DURATIONS.reveal).toBeGreaterThanOrEqual(0.5);
    expect(SCROLL_TRIGGER_DEFAULTS.once).toBe(true);
    expect(THREE_QUALITY_PRESETS.desktop.dpr[1]).toBeLessThanOrEqual(1.5);
    expect(THREE_QUALITY_PRESETS.mobile.particleCount).toBeLessThan(
      THREE_QUALITY_PRESETS.desktop.particleCount
    );
    expect(THREE_QUALITY_PRESETS.reduced.particleCount).toBe(0);
  });

  it("initializes AnimationProvider and toggles persistent ambient motion pause", () => {
    render(
      <AnimationProvider>
        <AnimationControlHarness />
      </AnimationProvider>
    );

    expect(screen.getByTestId("paused-state")).toHaveTextContent("false");
    fireEvent.click(screen.getByRole("button", { name: "Toggle Motion" }));
    expect(screen.getByTestId("paused-state")).toHaveTextContent("true");
    expect(screen.getByTestId("reduced-state")).toHaveTextContent("true");
    expect(document.documentElement.dataset.ambientMotion).toBe("paused");
  });

  it("supports paused fallback state on HeroSphereFallback", () => {
    render(<HeroSphereFallback reason="paused" />);
    const fallback = screen.getByTestId("hero-sphere-fallback");
    expect(fallback).toHaveAttribute("data-fallback-reason", "paused");
    expect(screen.getByText("Ambient 3D paused")).toBeInTheDocument();
  });

  it("renders TechnologyMarquee with pause/resume controls and hidden duplicates", () => {
    const { container } = render(
      <AnimationProvider>
        <TechnologyMarquee />
      </AnimationProvider>
    );

    const pauseBtn = screen.getByRole("button", { name: /Pause Stream/i });
    expect(pauseBtn).toHaveAttribute("aria-pressed", "false");
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(2);

    fireEvent.click(pauseBtn);
    expect(screen.getByRole("button", { name: /Resume Stream/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("allows switching active capability domain and pausing orbit in TechnologyOrbit", () => {
    render(
      <AnimationProvider>
        <TechnologyOrbit />
      </AnimationProvider>
    );

    const backendTab = screen.getByRole("tab", { name: "Backend Development" });
    fireEvent.click(backendTab);
    expect(backendTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Django REST Framework")).toBeInTheDocument();

    const pauseOrbitBtn = screen.getByRole("button", { name: /Pause Orbit/i });
    fireEvent.click(pauseOrbitBtn);
    expect(screen.getByRole("button", { name: /Resume Orbit/i })).toBeInTheDocument();
  });

  it("renders exact verified values in AnimatedCounter when reduced motion is active", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <AnimationProvider>
        <AnimatedCounter value="4+ years" />
        <AnimatedCounter value="14" />
        <AnimatedCounter value="8.4 / 10" />
      </AnimationProvider>
    );

    expect(screen.getByText("4+ years")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("8.4 / 10")).toBeInTheDocument();
  });
});
