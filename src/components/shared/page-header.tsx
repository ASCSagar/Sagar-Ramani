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
          className="inline-flex items-center gap-1.5 rounded text-xs font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {backLabel}
        </Link>
      ) : null}

      <div className="space-y-3">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 font-mono text-xs text-primary">
          {eyebrow}
        </Badge>
        <SplitTextReveal
          as="h1"
          text={title}
          immediate
          duration={MOTION_DURATIONS.reveal}
          className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        />
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}
