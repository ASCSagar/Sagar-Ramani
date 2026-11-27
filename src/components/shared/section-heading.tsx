import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SplitTextReveal } from "@/components/animations/split-text-reveal";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="space-y-2">
        <p className="font-mono text-[clamp(0.6875rem,0.15vw+0.65rem,0.8125rem)] font-semibold tracking-wider text-accent-highlight uppercase">{eyebrow}</p>
        <SplitTextReveal
          as="h2"
          id={id}
          text={title}
          className="font-heading text-[clamp(2.25rem,3.5vw+0.75rem,5rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.08]"
        />
        {description ? (
          <p className="max-w-2xl font-body text-[clamp(1rem,0.25vw+0.9375rem,1.125rem)] leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-4 py-2 font-body text-[clamp(0.875rem,0.2vw+0.825rem,1rem)] font-medium text-foreground transition-colors outline-none hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          {actionLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
