import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: "wide" | "default" | "narrow" | "full";
  className?: string;
  as?: ElementType;
}

const variantStyles: Record<NonNullable<ContainerProps["variant"]>, string> = {
  wide: "max-w-[1600px]",
  default: "max-w-[1360px]",
  narrow: "max-w-[760px]",
  full: "max-w-full",
};

export function Container({
  children,
  variant = "default",
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
