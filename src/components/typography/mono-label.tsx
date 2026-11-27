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
        "font-mono text-xs font-medium tracking-wider uppercase text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
