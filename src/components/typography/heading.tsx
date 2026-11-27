import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
  children?: ReactNode;
  className?: string;
}

const levelStyles: Record<HeadingProps["level"], string> = {
  1: "text-[clamp(2.75rem,6vw,6.5rem)] leading-[1.05] tracking-[-0.035em] font-bold",
  2: "text-[clamp(2rem,4.5vw,4.75rem)] leading-[1.12] tracking-[-0.025em] font-semibold",
  3: "text-[clamp(1.5rem,3vw,3rem)] leading-[1.2] tracking-[-0.02em] font-semibold",
  4: "text-[clamp(1.125rem,1.8vw,1.75rem)] leading-[1.3] tracking-[-0.015em] font-semibold",
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
