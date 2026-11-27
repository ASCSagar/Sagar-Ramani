import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  "aria-label": string;
  icon?: ReactNode;
  children?: ReactNode;
  size?: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  variant?: "primary" | "secondary" | "inverse" | "outline" | "ghost" | "default";
  className?: string;
}

export function IconButton({
  "aria-label": ariaLabel,
  icon,
  children,
  size = "icon",
  variant = "secondary",
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      aria-label={ariaLabel}
      size={size}
      variant={variant}
      className={cn("rounded-full shrink-0", className)}
      {...props}
    >
      {icon ?? children}
    </Button>
  );
}
