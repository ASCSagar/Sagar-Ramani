import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MonoLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  className?: string;
}

export function MonoLabel({
  children,
  className,
  ...props
}: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-[clamp(0.6875rem,0.15vw+0.65rem,0.8125rem)] font-medium tracking-wider uppercase text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
