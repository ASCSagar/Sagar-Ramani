import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  number?: string;
  className?: string;
}

export function Eyebrow({
  children,
  number,
  className,
  ...props
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-accent-highlight",
        className
      )}
      {...props}
    >
      {number && <span className="opacity-80">{number} /</span>}
      <span>{children}</span>
    </div>
  );
}
