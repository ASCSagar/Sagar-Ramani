import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { ScrollReveal, StaggerReveal } from "@/components/animations/scroll-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import {
  AnimatedExperienceTimeline,
  type TimelineEmployerItem,
  type TimelineProjectSummary,
} from "@/components/experience/animated-experience-timeline";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  experienceData,
  getEmployerDurationFormatted,
  getRoleDurationFormatted,
  getTotalCareerDurationFormatted,
} from "@/data/experience";
import { getProjectBySlug, projectKindLabels } from "@/data/projects";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: "Experience",
  description:
    "Reverse chronological career timeline across ETD, Anant Soft Computing, and La Net Team with verified dates and calculated durations.",
  path: "/experience",
});

export default function ExperiencePage() {
  const totalCareerDuration = getTotalCareerDurationFormatted();
  const totalRoles = experienceData.reduce((sum, emp) => sum + emp.roles.length, 0);

  const timelineItems: TimelineEmployerItem[] = experienceData.map((employer) => {
    const roleDurations: Record<string, string> = {};
    for (const role of employer.roles) {
      roleDurations[role.id] = getRoleDurationFormatted(role);
    }

    const projects: TimelineProjectSummary[] = employer.relatedProjectSlugs
      .map((slug) => getProjectBySlug(slug))
      .filter((project): project is NonNullable<typeof project> => Boolean(project))
      .map((project) => ({
        slug: project.slug,
        title: project.title,
        kindLabel: projectKindLabels[project.kind],
      }));

    return {
      employer,
      companyDuration: getEmployerDurationFormatted(employer),
      roleDurations,
      projects,
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 xl:px-12">
      <PageHeader
        eyebrow="Career Timeline"
        title="Professional Experience"
        description="Reverse chronological employment history with grouped designations, confirmed dates, calculated durations, and associated systems."
      />

      {/* Career Progression Overview */}
      <StaggerReveal className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div data-stagger-item>
          <SpotlightCard className="h-full">
            <CardContent className="space-y-1 py-5">
              <p className="font-mono text-xs font-semibold tracking-wider text-accent-highlight uppercase">
                Calculated Total Tenure
              </p>
              <p className="font-heading text-2xl font-bold tracking-tight text-foreground">
                {totalCareerDuration}
              </p>
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                Computed from confirmed start and end dates
              </p>
            </CardContent>
          </SpotlightCard>
        </div>

        <div data-stagger-item>
          <SpotlightCard className="h-full">
            <CardContent className="space-y-1 py-5">
              <p className="font-mono text-xs font-semibold tracking-wider text-accent-highlight uppercase">
                Employers & Progression
              </p>
              <p className="font-heading text-2xl font-bold tracking-tight text-foreground">
                {experienceData.length} Companies · {totalRoles} Roles
              </p>
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                Trainee → Software Developer → React Developer → FSD Grade 2
              </p>
            </CardContent>
          </SpotlightCard>
        </div>

        <div data-stagger-item>
          <SpotlightCard className="h-full">
            <CardContent className="space-y-1 py-5">
              <p className="font-mono text-xs font-semibold tracking-wider text-accent-highlight uppercase">
                Employment Timeline Span
              </p>
              <p className="font-heading text-2xl font-bold tracking-tight text-foreground">2022 – 2026</p>
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                All listed tenures are completed historical roles
              </p>
            </CardContent>
          </SpotlightCard>
        </div>
      </StaggerReveal>

      {/* Responsive Animated Timeline */}
      <AnimatedExperienceTimeline items={timelineItems} />

      <ScrollReveal>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/60 p-6">
          <div className="space-y-1">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Explore the Systems Built Across These Roles
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse the filterable project catalog or review the role-tailored résumé centre.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton>
              <Link href="/projects" className={cn(buttonVariants({ variant: "default" }))}>
                Browse Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
            <Link href="/resume" className={cn(buttonVariants({ variant: "outline" }))}>
              View Résumé
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
