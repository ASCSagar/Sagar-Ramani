import Link from "next/link";
import { ArrowLeft, Compass, Layers } from "lucide-react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <div className="relative mb-6 flex size-24 items-center justify-center">
        <span
          aria-hidden="true"
          className="ambient-animated absolute inset-0 animate-ping rounded-3xl border border-primary/30 bg-primary/5 [animation-duration:3s]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-1.5 rounded-2xl border border-dashed border-accent-secondary/35"
        />
        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-primary/35 bg-primary/10 text-primary shadow-sm">
          <Compass className="size-7" aria-hidden="true" />
        </div>
      </div>

      <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">404: Not Found</p>
      <SplitTextReveal
        as="h1"
        text="Page Could Not Be Found"
        immediate
        className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      />
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        The route or project case study you requested does not exist, has moved, or is currently held in draft pending verification.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <MagneticButton>
          <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Return to Home
          </Link>
        </MagneticButton>
        <MagneticButton>
          <Link href="/projects" className={cn(buttonVariants({ variant: "outline" }))}>
            <Layers className="size-4" aria-hidden="true" />
            Explore Projects
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
