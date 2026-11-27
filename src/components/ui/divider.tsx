import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  strong?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Divider({
  strong = false,
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "w-px h-full self-stretch",
          strong ? "bg-border-strong" : "bg-border/60",
          className
        )}
        {...props}
      />
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "w-full border-none h-px my-8 sm:my-12",
        strong ? "bg-border-strong" : "bg-border/60",
        className
      )}
      {...props}
    />
  );
}
