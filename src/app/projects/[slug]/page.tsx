import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Info,
  Layers,
  Puzzle,
  ShieldAlert,
  Wrench,
} from "lucide-react";

import {
  MaskReveal,
  ParallaxImage,
  ScrollReveal,
  StaggerReveal,
} from "@/components/animations/scroll-reveal";
import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/shared/breadcrumbs";
import { ConceptualPreview } from "@/components/shared/conceptual-preview";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOTION_DURATIONS } from "@/config/motion";
import {
  getAdjacentProjects,
  getPlatformModules,
  getProjectBySlug,
  getPublishedProjects,
  getRelatedProjects,
  projectKindLabels,
} from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildProjectJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildPageMetadata({
      title: "Project Not Found",
      description: "The requested project case study could not be found.",
      path: `/projects/${slug}`,
    });
  }

  return buildPageMetadata({
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.shortDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const parentPlatform = project.parentPlatformSlug
    ? getProjectBySlug(project.parentPlatformSlug)
    : undefined;
  const modules = project.kind === "platform" ? getPlatformModules(project.slug) : [];
  const relatedProjects = getRelatedProjects(project);
  const { previous, next } = getAdjacentProjects(project.slug);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    ...(parentPlatform
      ? [{ label: parentPlatform.title, href: `/projects/${parentPlatform.slug}` }]
      : []),
    { label: project.title },
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.siteUrl}/` },
    { name: "Projects", url: `${siteConfig.siteUrl}/projects` },
    ...(parentPlatform
      ? [
          {
            name: parentPlatform.title,
            url: `${siteConfig.siteUrl}/projects/${parentPlatform.slug}`,
          },
        ]
      : []),
    { name: project.title, url: `${siteConfig.siteUrl}/projects/${project.slug}` },
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, buildProjectJsonLd(project)]),
        }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Project Hero */}
      <header className="mb-10 space-y-6 border-b border-border/70 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 font-mono text-xs text-primary">
            {project.employer} · {projectKindLabels[project.kind]}
          </Badge>
          <Badge
            variant={project.caseStudyStatus === "overview" ? "secondary" : "outline"}
            className="font-mono text-xs"
          >
            {project.caseStudyStatus === "overview"
              ? "Verified Case Study Overview"
              : "Detailed Case Study Pending Verification"}
          </Badge>
          {project.featured ? (
            <Badge variant="outline" className="font-mono text-xs">
              Featured
            </Badge>
          ) : null}
        </div>

        <div className="space-y-3">
          <SplitTextReveal
            as="h1"
            text={project.title}
            immediate
            duration={MOTION_DURATIONS.reveal}
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {parentPlatform ? (
            <Link
              href={`/projects/${parentPlatform.slug}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <Layers className="size-3.5 text-primary" aria-hidden="true" />
              Part of {parentPlatform.title}
            </Link>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Visit Live Website
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Public Repository
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
          <Link href="/projects" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to Projects
          </Link>
        </div>

        <MaskReveal>
          {project.coverImage ? (
            <ParallaxImage className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
            </ParallaxImage>
          ) : (
            <ConceptualPreview project={project} />
          )}
        </MaskReveal>
      </header>

      <div className="space-y-8">
        {/* Pending Verification Notice if applicable */}
        {project.caseStudyStatus === "pending-details" ? (
          <ScrollReveal>
            <Card className="border-border/80 bg-card/60">
              <CardContent className="flex items-start gap-3 pt-2 text-sm text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <p>
                  Only verified baseline information is shown for this entry. Additional architecture diagrams, technical challenges, and approved screenshots are hidden until confirmed rather than fabricated.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : null}

        {/* Project Overview + Project Metadata */}
        <ScrollReveal className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <Card className="border-border/80 bg-card/60 md:col-span-7">
            <CardHeader>
              <CardTitle className="text-lg">Project Overview & Responsibilities</CardTitle>
              <CardDescription>Verified project summary and engineering scope</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              {project.detailedOverview ? <p>{project.detailedOverview}</p> : null}
              {project.responsibilities && project.responsibilities.length > 0 ? (
                <div className="space-y-2">
                  <p className="font-heading text-xs font-semibold tracking-wider text-foreground uppercase">
                    Individual Responsibilities
                  </p>
                  <ul className="list-disc space-y-1.5 pl-5">
                    {project.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>{project.responsibilitiesNote}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/60 md:col-span-5">
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <span className="text-xs text-muted-foreground">Company</span>
                <span className="font-medium text-foreground">{project.employer}</span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <span className="text-xs text-muted-foreground">Classification</span>
                <span className="font-medium text-foreground">
                  {projectKindLabels[project.kind]}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <span className="text-xs text-muted-foreground">Category</span>
                <span className="font-medium text-foreground">{project.category}</span>
              </div>
              {project.industry ? (
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                  <span className="text-xs text-muted-foreground">Industry</span>
                  <span className="text-right font-medium text-foreground">{project.industry}</span>
                </div>
              ) : null}
              {project.role ? (
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                  <span className="text-xs text-muted-foreground">Role</span>
                  <span className="font-medium text-foreground">{project.role}</span>
                </div>
              ) : null}
              {project.startDate || project.endDate ? (
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                  <span className="text-xs text-muted-foreground">Timeline</span>
                  <span className="font-mono text-xs text-foreground">
                    {[project.startDate, project.endDate].filter(Boolean).join(" – ")}
                  </span>
                </div>
              ) : null}

              <div className="pt-1">
                <p className="mb-2 text-xs text-muted-foreground">Technology Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-background/70 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Business Problem & Solution (shown only when verified) */}
        {project.businessProblem || project.solutionSummary ? (
          <ScrollReveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.businessProblem ? (
              <Card className="border-border/80 bg-card/60">
                <CardHeader>
                  <CardTitle className="inline-flex items-center gap-2 text-lg">
                    <ShieldAlert className="size-4 text-primary" aria-hidden="true" />
                    Business Problem
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  <p>{project.businessProblem}</p>
                </CardContent>
              </Card>
            ) : null}

            {project.solutionSummary ? (
              <Card className="border-border/80 bg-card/60">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="inline-flex items-center gap-2 text-lg">
                      <Wrench className="size-4 text-primary" aria-hidden="true" />
                      {project.solutionType === "proposed"
                        ? "Proposed Solution"
                        : "Implemented Solution"}
                    </CardTitle>
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase">
                      {project.solutionType === "proposed" ? "Proposed" : "Implemented"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  <p>{project.solutionSummary}</p>
                </CardContent>
              </Card>
            ) : null}
          </ScrollReveal>
        ) : null}

        {/* Key Features & Third-Party Integrations */}
        {(project.keyFeatures && project.keyFeatures.length > 0) ||
        (project.thirdPartyIntegrations && project.thirdPartyIntegrations.length > 0) ? (
          <ScrollReveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.keyFeatures && project.keyFeatures.length > 0 ? (
              <Card className="border-border/80 bg-card/60">
                <CardHeader>
                  <CardTitle className="inline-flex items-center gap-2 text-lg">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.keyFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 size-3.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            {project.thirdPartyIntegrations && project.thirdPartyIntegrations.length > 0 ? (
              <Card className="border-border/80 bg-card/60">
                <CardHeader>
                  <CardTitle className="inline-flex items-center gap-2 text-lg">
                    <Puzzle className="size-4 text-primary" aria-hidden="true" />
                    Third-Party Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.thirdPartyIntegrations.map((integration) => (
                    <Badge
                      key={integration}
                      variant="outline"
                      className="bg-background/70 px-3 py-1 text-xs"
                    >
                      {integration}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </ScrollReveal>
        ) : null}

        {/* Technical Challenges & Engineering Solutions */}
        {(project.technicalChallenges && project.technicalChallenges.length > 0) ||
        (project.engineeringSolutions && project.engineeringSolutions.length > 0) ? (
          <ScrollReveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.technicalChallenges && project.technicalChallenges.length > 0 ? (
              <Card className="border-border/80 bg-card/60">
                <CardHeader>
                  <CardTitle className="text-lg">Technical Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {project.technicalChallenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            {project.engineeringSolutions && project.engineeringSolutions.length > 0 ? (
              <Card className="border-border/80 bg-card/60">
                <CardHeader>
                  <CardTitle className="text-lg">Engineering Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {project.engineeringSolutions.map((solution) => (
                      <li key={solution}>{solution}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </ScrollReveal>
        ) : null}

        {/* Public-Safe Architecture */}
        {project.architecture ? (
          <ScrollReveal>
            <Card className="border-border/80 bg-card/60">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-lg">
                  <Code2 className="size-4 text-primary" aria-hidden="true" />
                  System Architecture Overview
                </CardTitle>
                <CardDescription>{project.architecture.summary}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {project.architecture.layers.map((layer) => (
                  <div
                    key={layer.name}
                    className="rounded-xl border border-border/70 bg-background/60 p-3.5"
                  >
                    <p className="font-heading text-xs font-semibold text-primary uppercase">
                      {layer.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {layer.detail}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : null}

        {/* Approved Screenshot Gallery */}
        {project.gallery && project.gallery.length > 0 ? (
          <ScrollReveal>
            <Card className="border-border/80 bg-card/60">
              <CardHeader>
                <CardTitle className="text-lg">Screenshot Gallery</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.gallery.map((image) => (
                  <figure
                    key={image.src}
                    data-cursor="gallery"
                    data-cursor-label="Inspect"
                    className="space-y-2"
                  >
                    <MaskReveal className="rounded-xl border border-border bg-muted">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 450px"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </MaskReveal>
                    {image.caption ? (
                      <figcaption className="text-xs text-muted-foreground">{image.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : null}

        {/* Verified Achievements */}
        {project.verifiedAchievements && project.verifiedAchievements.length > 0 ? (
          <ScrollReveal>
            <Card className="border-border/80 bg-card/60">
              <CardHeader>
                <CardTitle className="text-lg">Verified Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  {project.verifiedAchievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : null}

        {/* Grouped Application Modules (TrueValue Platform) */}
        {modules.length > 0 ? (
          <ScrollReveal>
            <Card className="border-border/80 bg-card/60">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-lg">
                  <Layers className="size-4 text-primary" aria-hidden="true" />
                  Application Modules ({modules.length})
                </CardTitle>
                <CardDescription>
                  Individual modules grouped within {project.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StaggerReveal className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {modules.map((mod) => (
                    <Link
                      key={mod.slug}
                      data-stagger-item
                      data-cursor="project"
                      data-cursor-label="View"
                      href={`/projects/${mod.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/60 p-4 transition-colors outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div>
                        <p className="font-heading text-sm font-semibold text-foreground group-hover:text-primary">
                          {mod.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {mod.shortDescription}
                        </p>
                      </div>
                      <ArrowRight
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </StaggerReveal>
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : null}

        {/* Related Projects */}
        {relatedProjects.length > 0 ? (
          <section aria-labelledby="related-projects-heading" className="space-y-4">
            <h2
              id="related-projects-heading"
              className="font-heading text-xl font-semibold text-foreground"
            >
              Related Projects
            </h2>
            <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((rel) => (
                <div key={rel.slug} data-stagger-item>
                  <SpotlightCard className="h-full">
                    <Link
                      href={`/projects/${rel.slug}`}
                      data-cursor="project"
                      data-cursor-label="View"
                      className="group flex h-full flex-col justify-between p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] text-primary uppercase">
                            {rel.employer}
                          </span>
                          <ArrowRight
                            className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-2 font-heading text-sm font-semibold text-foreground group-hover:text-primary">
                          {rel.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {rel.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </SpotlightCard>
                </div>
              ))}
            </StaggerReveal>
          </section>
        ) : null}

        {/* Previous / Next Navigation */}
        <nav
          aria-label="Project sequence navigation"
          className="flex flex-col justify-between gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 px-4 py-3 text-left transition-colors outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">
                  Previous Project
                </p>
                <p className="font-heading text-sm font-medium text-foreground group-hover:text-primary">
                  {previous.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex items-center justify-end gap-2 rounded-xl border border-border/80 bg-card/60 px-4 py-3 text-right transition-colors outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">
                  Next Project
                </p>
                <p className="font-heading text-sm font-medium text-foreground group-hover:text-primary">
                  {next.title}
                </p>
              </div>
              <ArrowRight
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
