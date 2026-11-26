"use client";

import dynamic from "next/dynamic";

const TechnologyOrbit = dynamic(
  () => import("@/components/effects/technology-orbit").then((mod) => mod.TechnologyOrbit),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex min-h-[480px] w-full flex-col justify-between rounded-xl border border-border/80 bg-card/40 p-6"
        aria-busy="true"
        aria-label="Loading interactive capability constellation"
      >
        <div className="space-y-2">
          <div className="h-3 w-32 rounded bg-muted/60" />
          <div className="h-6 w-48 rounded bg-muted/80" />
          <div className="h-4 w-96 max-w-full rounded bg-muted/40" />
        </div>
        <div className="my-auto flex items-center justify-center py-12">
          <div className="flex size-44 items-center justify-center rounded-full border border-dashed border-border/70 text-xs text-muted-foreground">
            Loading interactive orbit...
          </div>
        </div>
      </div>
    ),
  }
);

export function TechnologyOrbitLazy() {
  return <TechnologyOrbit />;
}
