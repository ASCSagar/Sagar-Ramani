import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: "body" | "lead" | "caption" | "muted";
  as?: ElementType;
  children?: ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<TextProps["variant"]>, string> = {
  body: "text-[clamp(1rem,0.25vw+0.9375rem,1.125rem)] leading-relaxed text-foreground font-normal",
  lead: "text-[clamp(1.125rem,0.4vw+1rem,1.375rem)] leading-relaxed text-foreground-secondary font-normal",
  caption: "text-[clamp(0.8125rem,0.15vw+0.75rem,0.875rem)] leading-normal text-muted-foreground font-normal",
  muted: "text-[clamp(1rem,0.25vw+0.9375rem,1.125rem)] leading-relaxed text-muted-foreground font-normal",
};

export function Text({
  variant = "body",
  as: Component = "p",
  children,
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn("font-body", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
