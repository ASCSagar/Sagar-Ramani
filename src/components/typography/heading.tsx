import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
  children?: ReactNode;
  className?: string;
}

const levelStyles: Record<HeadingProps["level"], string> = {
  1: "text-[clamp(3.25rem,5.5vw+1rem,7rem)] leading-[1.02] tracking-[-0.038em] font-bold",        /* Hero: 80–112px */
  2: "text-[clamp(2.25rem,3.5vw+0.75rem,5rem)] leading-[1.08] tracking-[-0.03em] font-semibold",  /* Section: 56–80px */
  3: "text-[clamp(1.75rem,1.8vw+0.75rem,3rem)] leading-[1.18] tracking-[-0.022em] font-semibold", /* Subheading: 32–48px */
  4: "text-[clamp(1.25rem,0.8vw+0.65rem,1.75rem)] leading-[1.28] tracking-[-0.018em] font-semibold", /* Card Title: 22–28px */
};

const defaultTag: Record<HeadingProps["level"], ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

export function Heading({
  level,
  as,
  children,
  className,
  ...props
}: HeadingProps) {
  const Component = as ?? defaultTag[level];

  return (
    <Component
      className={cn(
        "font-heading text-foreground transition-colors",
        levelStyles[level],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
