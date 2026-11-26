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
      <div className="space-y-1.5">
        <p className="font-mono text-xs tracking-wider text-primary uppercase">{eyebrow}</p>
        <SplitTextReveal
          as="h2"
          id={id}
          text={title}
          className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        />
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3.5 py-2 text-xs font-medium text-foreground transition-colors outline-none hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          {actionLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
