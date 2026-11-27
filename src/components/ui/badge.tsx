import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-3 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-ring [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-[#D0FF35] text-[#0C0C0C] font-semibold border border-[#D0FF35]",
        accent: "bg-[#D0FF35] text-[#0C0C0C] font-semibold border border-[#D0FF35]",
        secondary:
          "bg-surface text-foreground border border-border/70",
        surface:
          "bg-surface text-foreground border border-border/80",
        destructive:
          "bg-destructive/15 text-destructive border border-destructive/25",
        outline:
          "border-border/80 text-foreground bg-transparent",
        ghost:
          "hover:bg-surface hover:text-foreground",
        mono:
          "font-mono text-[11px] tracking-wider uppercase bg-surface text-muted-foreground border border-border/70",
        link: "text-accent-highlight underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
