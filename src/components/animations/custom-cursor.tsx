"use client";

import { useEffect, useRef, useState } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { siteConfig } from "@/data/site-config";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CursorMode = "default" | "interactive" | "project" | "gallery" | "sphere";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string>("");

  const { shouldReduceMotion } = useAnimationSettings();
  const { isDesktopFinePointer } = useMotionCapabilities();

  const enabled =
    siteConfig.features.enableCustomCursor && !shouldReduceMotion && isDesktopFinePointer;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const resolveTargetContext = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setMode("default");
        setLabel("");
        return;
      }

      const customTarget = target.closest<HTMLElement>("[data-cursor]");
      if (customTarget) {
        const cursorType = (customTarget.dataset.cursor as CursorMode) || "interactive";
        setMode(cursorType);
        setLabel(customTarget.dataset.cursorLabel || "");
        return;
      }

      const interactiveTarget = target.closest("a, button, [role='button'], summary");
      if (interactiveTarget) {
        setMode("interactive");
        setLabel("");
        return;
      }

      setMode("default");
      setLabel("");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setVisible(true);
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
      resolveTargetContext(event.target);
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const hasLabel = label.length > 0;
  const isExpanded = mode !== "default";

  return (
    <div
      aria-hidden="true"
      data-testid="custom-cursor"
      className={cn(
        "pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-200 print:hidden",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        ref={ringRef}
        className={cn(
          "fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-200",
          hasLabel
            ? "flex h-9 w-auto min-w-16 items-center justify-center border-primary/60 bg-primary/90 px-3 text-[11px] font-medium text-primary-foreground shadow-sm backdrop-blur-sm"
            : isExpanded
              ? "size-11 border-primary/70 bg-primary/10"
              : "size-7 border-primary/45 bg-transparent"
        )}
      >
        {hasLabel ? <span className="font-mono tracking-wide whitespace-nowrap">{label}</span> : null}
      </div>
      <div
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-150",
          hasLabel ? "opacity-0" : "opacity-90"
        )}
      />
    </div>
  );
}
