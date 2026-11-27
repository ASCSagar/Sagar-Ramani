"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationSettings } from "@/components/providers/animation-provider";

interface FooterRevealProps {
  children: React.ReactNode;
}

// 80px fixed header height + 16px safety buffer
const HEADER_CLEARANCE = 96;

export function FooterReveal({ children }: FooterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const { shouldReduceMotion } = useAnimationSettings();

  useEffect(() => {
    const content = footerContentRef.current;
    if (!content) return;

    const updateDimensions = () => {
      const height = content.offsetHeight;
      const windowHeight = window.innerHeight;
      const maxAllowedHeight = windowHeight - HEADER_CLEARANCE;

      if (height > 0) {
        setFooterHeight(height);
      }

      // If reduced motion is preferred or footer exceeds viewport height minus header clearance,
      // fall back to natural static flow so every link is 100% reachable with zero clipping
      if (shouldReduceMotion || height > maxAllowedHeight) {
        setIsSupported(false);
      } else {
        setIsSupported(true);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(content);

    window.addEventListener("resize", updateDimensions);

    // IntersectionObserver to only show the fixed footer when near or entering viewport
    const container = containerRef.current;
    let io: IntersectionObserver | null = null;
    if (container) {
      io = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { rootMargin: "350px 0px 0px 0px" }
      );
      io.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
      if (io) io.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [shouldReduceMotion]);

  // Fallback for reduced motion or overflowing screens: render normal static block flow
  if (shouldReduceMotion || !isSupported) {
    return <div className="relative z-0 w-full">{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative z-0 w-full"
      style={{ height: footerHeight > 0 ? `${footerHeight}px` : "auto" }}
    >
      <div
        ref={footerContentRef}
        className="fixed bottom-0 left-0 w-full z-0 will-change-transform"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
