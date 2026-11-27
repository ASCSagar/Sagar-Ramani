import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: "canvas" | "surface" | "elevated" | "bordered";
  className?: string;
  as?: ElementType;
}

const surfaceVariants: Record<NonNullable<SurfaceProps["variant"]>, string> = {
  canvas: "bg-canvas text-foreground",
  surface: "bg-surface text-foreground border border-border/80",
  elevated: "bg-surface-elevated text-foreground border border-border shadow-xs",
  bordered: "bg-transparent text-foreground border border-border/80",
};

export function Surface({
  children,
  variant = "surface",
  className,
  as: Component = "div",
  ...props
}: SurfaceProps) {
  return (
    <Component
      className={cn(
        "font-body rounded-2xl transition-colors duration-200",
        surfaceVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function MinimalCard({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group font-body relative rounded-2xl border border-border/80 bg-card/75 p-6 sm:p-8 backdrop-blur-xs transition-colors duration-200 hover:border-border-strong hover:bg-card/90",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
