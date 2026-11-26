"use client";

import { useEffect, useRef, useState } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { siteConfig } from "@/data/site-config";
import { gsap } from "@/lib/gsap";

const PRELOADER_SESSION_KEY = "portfolio-v2-preloader-seen";

export function Preloader() {
  const [active, setActive] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useEffect(() => {
    if (!siteConfig.features.enablePreloader || shouldReduceMotion) {
      return;
    }

    try {
      if (window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1") {
        return;
      }
      window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
    } catch {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      setActive(true);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!active) return;

    const overlay = overlayRef.current;
    const monogram = monogramRef.current;
    const line = lineRef.current;
    if (!overlay || !monogram || !line) {
      const rafId = window.requestAnimationFrame(() => setActive(false));
      return () => window.cancelAnimationFrame(rafId);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(false);
      },
    });

    tl.fromTo(
      monogram,
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.24, ease: "power3.out" }
    )
      .fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.28, ease: "power2.inOut" },
        "-=0.08"
      )
      .to(overlay, {
        yPercent: -100,
        opacity: 0,
        duration: 0.42,
        ease: "power3.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      data-testid="cinematic-preloader"
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md print:hidden"
    >
      <div ref={monogramRef} className="flex flex-col items-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 font-heading text-xl font-semibold tracking-widest text-primary shadow-sm">
          {siteConfig.shortName}
        </span>
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          {siteConfig.name}
        </p>
      </div>
      <div className="mt-4 h-0.5 w-28 overflow-hidden rounded-full bg-border">
        <div ref={lineRef} className="h-full w-full origin-left bg-primary" />
      </div>
    </div>
  );
}
