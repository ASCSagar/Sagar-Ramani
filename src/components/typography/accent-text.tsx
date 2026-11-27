import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccentTextProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: string;
}

export function AccentText({
  children,
  className,
  ...props
}: AccentTextProps) {
  return (
    <span
      className={cn(
        "text-accent-highlight font-semibold transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
