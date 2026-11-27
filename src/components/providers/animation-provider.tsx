"use client";

import "lenis/dist/lenis.css";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import { MotionConfig } from "motion/react";

import { SCROLL_TRIGGER_DEFAULTS } from "@/config/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const AMBIENT_PAUSE_STORAGE_KEY = "portfolio-v2-ambient-motion-paused";

function getAmbientServerSnapshot(): boolean {
  return false;
}

interface AnimationContextValue {
  prefersReducedMotion: boolean;
  ambientMotionPaused: boolean;
  shouldReduceMotion: boolean;
  setAmbientMotionPaused: (paused: boolean) => void;
  toggleAmbientMotion: () => void;
}

const AnimationContext = createContext<AnimationContextValue>({
  prefersReducedMotion: false,
  ambientMotionPaused: false,
  shouldReduceMotion: false,
  setAmbientMotionPaused: () => {},
  toggleAmbientMotion: () => {},
});

export function useAnimationSettings(): AnimationContextValue {
  return useContext(AnimationContext);
}

function LenisGsapSync({ lenisRef }: { lenisRef: React.RefObject<LenisRef | null> }) {
  const pathname = usePathname();

  useEffect(() => {
    ScrollTrigger.defaults({
      start: SCROLL_TRIGGER_DEFAULTS.start,
      once: SCROLL_TRIGGER_DEFAULTS.once,
      invalidateOnRefresh: SCROLL_TRIGGER_DEFAULTS.invalidateOnRefresh,
    });

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    const lenis = lenisRef.current?.lenis;
    const unsubscribeScroll = lenis?.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      unsubscribeScroll?.();
      gsap.ticker.remove(update);
    };
  }, [lenisRef]);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimationProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getAmbientServerSnapshot
  );
  const [ambientMotionPaused, setAmbientMotionPausedState] = useState(false);

  const setAmbientMotionPaused = useCallback((paused: boolean) => {
    setAmbientMotionPausedState(paused);
  }, []);

  const toggleAmbientMotion = useCallback(() => {
    setAmbientMotionPausedState((prev) => !prev);
  }, []);

  const shouldReduceMotion = prefersReducedMotion || ambientMotionPaused;

  useEffect(() => {
    try {
      window.localStorage.removeItem(AMBIENT_PAUSE_STORAGE_KEY);
    } catch {
      // Ignore storage access errors.
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.ambientMotion = ambientMotionPaused ? "paused" : "active";
  }, [ambientMotionPaused]);

  const contextValue = useMemo<AnimationContextValue>(
    () => ({
      prefersReducedMotion,
      ambientMotionPaused,
      shouldReduceMotion,
      setAmbientMotionPaused,
      toggleAmbientMotion,
    }),
    [prefersReducedMotion, ambientMotionPaused, shouldReduceMotion, setAmbientMotionPaused, toggleAmbientMotion]
  );

  return (
    <AnimationContext.Provider value={contextValue}>
      <MotionConfig reducedMotion={ambientMotionPaused ? "always" : "user"}>
        {!shouldReduceMotion ? (
          <ReactLenis
            root
            ref={lenisRef}
            options={{
              autoRaf: false,
              lerp: 0.1,
              smoothWheel: true,
              prevent: (node) =>
                Boolean(node.closest("[data-lenis-prevent], [role='dialog'], [data-slot='sheet-content']")),
            }}
          >
            <LenisGsapSync lenisRef={lenisRef} />
          </ReactLenis>
        ) : null}
        {children}
      </MotionConfig>
    </AnimationContext.Provider>
  );
}
