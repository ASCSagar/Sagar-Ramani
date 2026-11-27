import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { Badge } from "@/components/ui/badge";
import { MOTION_DURATIONS } from "@/config/motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
}: PageHeaderProps) {
  return (
    <header className="mb-10 space-y-4 border-b border-border/70 pb-8">
      {backHref && backLabel ? (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 rounded-full font-body text-[clamp(0.8125rem,0.15vw+0.75rem,0.875rem)] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {backLabel}
        </Link>
      ) : null}

      <div className="space-y-3">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 font-mono text-[clamp(0.6875rem,0.15vw+0.65rem,0.8125rem)] text-primary">
          {eyebrow}
        </Badge>
        <SplitTextReveal
          as="h1"
          text={title}
          immediate
          duration={MOTION_DURATIONS.reveal}
          className="font-heading text-[clamp(2.25rem,3.5vw+0.75rem,5rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.08]"
        />
        <p className="max-w-2xl font-body text-[clamp(1rem,0.25vw+0.9375rem,1.125rem)] leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}
