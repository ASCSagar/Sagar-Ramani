import { Cpu, Layers, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { projectKindLabels, type ProjectEntry } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ConceptualPreviewProps {
  project: ProjectEntry;
  compact?: boolean;
  className?: string;
}

export function ConceptualPreview({
  project,
  compact = false,
  className,
}: ConceptualPreviewProps) {
  const Icon =
    project.kind === "platform" ? Layers : project.kind === "service" ? Workflow : Cpu;

  if (compact) {
    return (
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary/15 via-background to-accent-secondary/15 p-4 flex items-center justify-center",
          className
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute top-3 left-3 z-10">
          <Badge
            variant="outline"
            className="border-border/80 bg-background/85 font-mono text-[10px] tracking-wider uppercase text-muted-foreground backdrop-blur-xs"
          >
            Conceptual Preview
          </Badge>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl border border-primary/30 bg-background/90 text-primary shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover/spotlight:scale-105">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            {project.category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-primary/10 via-background to-accent-secondary/10 p-6 sm:p-8",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 flex flex-col justify-between gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="bg-background/80 font-mono text-[10px] uppercase">
            Conceptual Preview
          </Badge>
          <span className="font-mono text-[11px] text-muted-foreground">
            {projectKindLabels[project.kind]}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-background/85 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold text-foreground">
              {project.title}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {project.employer} · {project.category}
            </p>
          </div>
        </div>

        {project.moduleSlugs && project.moduleSlugs.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.moduleSlugs.map((modSlug) => (
              <span
                key={modSlug}
                className="rounded-md border border-border/70 bg-background/75 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {modSlug}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
