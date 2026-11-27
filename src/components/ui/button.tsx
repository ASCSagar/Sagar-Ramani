import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button font-body inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#D0FF35] text-[#0C0C0C] font-semibold border border-[#D0FF35] hover:bg-[#BDEB28] hover:border-[#BDEB28] active:bg-[#ACD91E] shadow-xs hover:shadow-[0_0_20px_rgba(208,255,55,0.22)] rounded-full",
        default:
          "bg-[#D0FF35] text-[#0C0C0C] font-semibold border border-[#D0FF35] hover:bg-[#BDEB28] hover:border-[#BDEB28] active:bg-[#ACD91E] shadow-xs hover:shadow-[0_0_20px_rgba(208,255,55,0.22)] rounded-full",
        secondary:
          "border border-border/80 bg-surface text-foreground font-medium hover:bg-surface-elevated hover:border-border-strong rounded-full",
        inverse:
          "bg-[#0C0C0C] text-[#F2F0EB] font-medium hover:bg-[#1F1F1F] active:bg-[#292929] border border-[#292929] dark:bg-[#F2F0EB] dark:text-[#0C0C0C] dark:hover:bg-[#E5E3DE] rounded-full",
        outline:
          "border border-border/80 bg-transparent text-foreground font-medium hover:bg-surface hover:border-border-strong rounded-full",
        ghost:
          "text-muted-foreground hover:bg-surface hover:text-foreground font-medium rounded-full",
        destructive:
          "bg-destructive text-white font-medium hover:bg-destructive/90 rounded-full",
        link:
          "rounded-none p-0 text-foreground underline-offset-4 hover:underline hover:text-accent-highlight",
      },
      size: {
        xs: "h-7 gap-1 px-3 text-[clamp(0.6875rem,0.15vw+0.65rem,0.75rem)]",
        sm: "h-9 gap-1.5 px-4 text-[clamp(0.8125rem,0.15vw+0.75rem,0.875rem)]",
        default: "h-11 gap-2 px-6 text-[clamp(0.875rem,0.2vw+0.825rem,1rem)]",
        lg: "h-[52px] gap-2.5 px-8 text-[clamp(0.9375rem,0.2vw+0.875rem,1.0625rem)]",
        xl: "h-[60px] gap-3 px-10 text-[clamp(1rem,0.25vw+0.9375rem,1.125rem)]",
        "icon-xs": "size-7 rounded-full p-0",
        "icon-sm": "size-9 rounded-full p-0",
        icon: "size-11 rounded-full p-0",
        "icon-lg": "size-[52px] rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
