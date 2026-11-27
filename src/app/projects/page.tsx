import { Suspense } from "react";

import { ProjectsCatalog } from "@/components/projects/projects-catalog";
import { PageHeader } from "@/components/shared/page-header";
import {
  getDraftProjects,
  getPlatformModules,
  getPublishedProjects,
  getTopLevelProjects,
  type ProjectEntry,
} from "@/data/projects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Filterable project catalog across enterprise SaaS platforms, grouped modules, AI automation pipelines, and production web applications.",
  path: "/projects",
});

export default function ProjectsPage() {
  const topLevelProjects = getTopLevelProjects();
  const publishedProjects = getPublishedProjects();
  const draftProjects = getDraftProjects();

  const modulesByPlatform: Record<string, ProjectEntry[]> = {};
  for (const project of topLevelProjects) {
    if (project.kind === "platform") {
      modulesByPlatform[project.slug] = getPlatformModules(project.slug);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 xl:px-12">
      <PageHeader
        eyebrow="Work & Systems"
        title="Projects Catalog"
        description={`Confirmed platforms, grouped product modules, supporting services, and standalone applications (${publishedProjects.length} published entries; ${draftProjects.length} unverified records remain in draft).`}
      />

      <Suspense
        fallback={
          <div
            className="space-y-8"
            aria-busy="true"
            aria-label="Loading project catalog"
          >
            <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-4">
              <div className="h-10 w-full rounded-md bg-muted/60" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="h-10 rounded-md bg-muted/40" />
                <div className="h-10 rounded-md bg-muted/40" />
                <div className="h-10 rounded-md bg-muted/40" />
                <div className="h-10 rounded-md bg-muted/40" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="h-80 rounded-xl border border-border/60 bg-card/40 p-6 space-y-4"
                >
                  <div className="h-4 w-24 rounded bg-muted/60" />
                  <div className="h-6 w-48 rounded bg-muted/80" />
                  <div className="h-16 w-full rounded bg-muted/40" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <ProjectsCatalog
          topLevelProjects={topLevelProjects}
          modulesByPlatform={modulesByPlatform}
          totalPublishedCount={publishedProjects.length}
        />
      </Suspense>
    </div>
  );
}
