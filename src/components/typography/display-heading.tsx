import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DisplayHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  as?: "h1" | "h2" | "h3" | "div" | "span";
  outline?: boolean;
  className?: string;
}

export function DisplayHeading({
  children,
  as: Component = "h1",
  outline = false,
  className,
  ...props
}: DisplayHeadingProps) {
  return (
    <Component
      className={cn(
        "font-display font-bold tracking-[-0.038em] leading-[1.02] text-foreground transition-colors",
        "text-[clamp(3.25rem,5.5vw+1rem,7rem)]", /* Hero: 80–112px */
        outline && "text-outline",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
