"use client";

import { useEffect, useRef, useState } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { siteConfig } from "@/data/site-config";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CursorMode = "default" | "interactive" | "project" | "gallery" | "sphere" | "view" | "drag";

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
        setLabel(
          customTarget.dataset.cursorLabel ||
            (cursorType === "view" ? "VIEW" : cursorType === "drag" ? "DRAG" : "")
        );
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

    const handlePointerDown = () => {
      if (ring) {
        gsap.to(ring, { scale: 0.9, duration: 0.12, ease: "power2.out" });
      }
    };

    const handlePointerUp = () => {
      if (ring) {
        gsap.to(ring, { scale: 1, duration: 0.2, ease: "power2.out" });
      }
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setMode("default");
      setLabel("");
    };

    const handleReset = () => {
      setMode("default");
      setLabel("");
      if (ring) {
        gsap.to(ring, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("blur", handleReset);
    window.addEventListener("popstate", handleReset);
    window.addEventListener("cursor:reset", handleReset);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", handleReset);
      window.removeEventListener("popstate", handleReset);
      window.removeEventListener("cursor:reset", handleReset);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const isViewMode = mode === "view";
  const isDragMode = mode === "drag";
  const isSpecialMode = isViewMode || isDragMode;
  const hasLabel = label.length > 0 && !isSpecialMode;
  const isExpanded = mode !== "default" && !isSpecialMode;

  return (
    <div
      aria-hidden="true"
      data-testid="custom-cursor"
      className={cn(
        "pointer-events-none fixed inset-0 z-[90] overflow-hidden transition-opacity duration-200 print:hidden",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        ref={ringRef}
        className={cn(
          "fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color,opacity] duration-250 ease-out",
          isViewMode
            ? "size-[112px] border-white/85 bg-transparent flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.08)] backdrop-blur-[0.5px]"
            : isDragMode
              ? "size-[96px] border-[#0C0C0C]/80 bg-transparent flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.06)] backdrop-blur-[0.5px]"
              : hasLabel
                ? "flex h-9 w-auto min-w-16 items-center justify-center border-primary/60 bg-primary/90 px-3 text-[11px] font-medium text-primary-foreground shadow-sm backdrop-blur-sm"
                : isExpanded
                  ? "size-11 border-primary/70 bg-primary/10"
                  : "size-7 border-primary/45 bg-transparent"
        )}
      >
        {isViewMode ? (
          <span className="font-mono text-xs font-semibold tracking-[0.22em] text-white select-none uppercase">
            VIEW
          </span>
        ) : isDragMode ? (
          <span className="font-mono text-xs font-semibold tracking-[0.22em] text-[#0C0C0C] select-none uppercase">
            DRAG
          </span>
        ) : hasLabel ? (
          <span className="font-mono tracking-wide whitespace-nowrap">{label}</span>
        ) : null}
      </div>
      <div
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-150",
          hasLabel || isSpecialMode ? "opacity-0" : "opacity-90"
        )}
      />
    </div>
  );
}
