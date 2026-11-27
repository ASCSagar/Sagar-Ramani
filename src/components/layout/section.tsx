import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  theme?: "inherit" | "dark" | "light";
  spacing?: "default" | "compact" | "none";
  className?: string;
  id?: string;
  as?: ElementType;
}

const spacingStyles: Record<NonNullable<SectionProps["spacing"]>, string> = {
  default: "py-16 sm:py-20 md:py-24 lg:py-32",
  compact: "py-10 sm:py-14 md:py-16 lg:py-20",
  none: "py-0",
};

export function Section({
  children,
  theme = "inherit",
  spacing = "default",
  className,
  id,
  as: Component = "section",
  ...props
}: SectionProps) {
  return (
    <Component
      id={id}
      data-section-theme={theme !== "inherit" ? theme : undefined}
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-300",
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
