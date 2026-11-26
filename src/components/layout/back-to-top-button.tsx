"use client";

import { ArrowUp } from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { Button } from "@/components/ui/button";

export function BackToTopButton() {
  const { shouldReduceMotion } = useAnimationSettings();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      onClick={handleClick}
      aria-label="Scroll back to top"
      className="gap-1.5"
    >
      <ArrowUp className="size-3.5 text-primary" aria-hidden="true" />
      Back to top
    </Button>
  );
}
