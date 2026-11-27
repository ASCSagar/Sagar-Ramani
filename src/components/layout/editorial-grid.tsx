import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EditorialGridProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  cols?: 12 | "split" | "auto";
  className?: string;
  as?: ElementType;
}

export function EditorialGrid({
  children,
  cols = 12,
  className,
  as: Component = "div",
  ...props
}: EditorialGridProps) {
  return (
    <Component
      className={cn(
        cols === 12 && "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 md:gap-8",
        cols === "split" && "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12",
        cols === "auto" && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
