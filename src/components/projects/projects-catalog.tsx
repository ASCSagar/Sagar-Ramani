"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ExternalLink,
  Layers,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { SpotlightCard, TiltCard } from "@/components/effects/spotlight-card";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { ConceptualPreview } from "@/components/shared/conceptual-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOTION_EASES, MOTION_VARIANTS } from "@/config/motion";
import { projectKindLabels, type ProjectEntry } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectsCatalogProps {
  topLevelProjects: ProjectEntry[];
  modulesByPlatform: Record<string, ProjectEntry[]>;
  totalPublishedCount: number;
}

type ViewMode = "grid" | "list";

export function ProjectsCatalog({
  topLevelProjects,
  modulesByPlatform,
  totalPublishedCount,
}: ProjectsCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { shouldReduceMotion } = useAnimationSettings();

  const searchQuery = searchParams.get("q") ?? "";
  const companyFilter = searchParams.get("company") ?? "all";
  const categoryFilter = searchParams.get("category") ?? "all";
  const industryFilter = searchParams.get("industry") ?? "all";
  const techFilter = searchParams.get("tech") ?? "all";
  const featuredOnly = searchParams.get("featured") === "true";
  const viewMode: ViewMode = searchParams.get("view") === "list" ? "list" : "grid";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === "all" || value === "false") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const companies = useMemo(
    () => Array.from(new Set(topLevelProjects.map((p) => p.employer))),
    [topLevelProjects]
  );

  const categories = useMemo(
    () => Array.from(new Set(topLevelProjects.map((p) => p.category))).sort(),
    [topLevelProjects]
  );

  const industries = useMemo(
    () =>
      Array.from(
        new Set(topLevelProjects.map((p) => p.industry).filter((i): i is string => Boolean(i)))
      ).sort(),
    [topLevelProjects]
  );

  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    for (const project of topLevelProjects) {
      for (const tech of project.technologies) {
        techSet.add(tech);
      }
      const modules = modulesByPlatform[project.slug] ?? [];
      for (const mod of modules) {
        for (const tech of mod.technologies) {
          techSet.add(tech);
        }
      }
    }
    return Array.from(techSet).sort();
  }, [topLevelProjects, modulesByPlatform]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return topLevelProjects.filter((project) => {
      const childModules = modulesByPlatform[project.slug] ?? [];

      if (companyFilter !== "all" && project.employer !== companyFilter) {
        return false;
      }
      if (categoryFilter !== "all" && project.category !== categoryFilter) {
        return false;
      }
      if (industryFilter !== "all" && project.industry !== industryFilter) {
        return false;
      }
      if (featuredOnly && !project.featured) {
        return false;
      }
      if (techFilter !== "all") {
        const hasTech =
          project.technologies.includes(techFilter) ||
          childModules.some((mod) => mod.technologies.includes(techFilter));
        if (!hasTech) {
          return false;
        }
      }
      if (normalizedQuery.length > 0) {
        const searchableText = [
          project.title,
          project.shortDescription,
          project.employer,
          project.category,
          project.industry ?? "",
          ...project.technologies,
          ...childModules.flatMap((mod) => [mod.title, mod.shortDescription, ...mod.technologies]),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });
  }, [
    topLevelProjects,
    modulesByPlatform,
    searchQuery,
    companyFilter,
    categoryFilter,
    industryFilter,
    techFilter,
    featuredOnly,
  ]);

  const hasActiveFilters =
    searchQuery.length > 0 ||
    companyFilter !== "all" ||
    categoryFilter !== "all" ||
    industryFilter !== "all" ||
    techFilter !== "all" ||
    featuredOnly;

  const clearAllFilters = () => {
    updateParams({
      q: null,
      company: null,
      category: null,
      industry: null,
      tech: null,
      featured: null,
    });
  };

  return (
    <div className="space-y-8">
      {/* Filter & Search Bar */}
      <Card className="border-border/80 bg-card/60">
        <CardContent className="space-y-4 pt-2">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  updateParams({ q: event.target.value ? event.target.value : null })
                }
                placeholder="Search projects, modules, technologies, or industries..."
                aria-label="Search projects"
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={featuredOnly ? "default" : "outline"}
                aria-pressed={featuredOnly}
                onClick={() => updateParams({ featured: featuredOnly ? null : "true" })}
                className="transition-transform active:scale-95"
              >
                <Sparkles className="size-3.5" aria-hidden="true" />
                Featured Only
              </Button>

              <div
                className="inline-flex items-center rounded-lg border border-border bg-background/70 p-0.5"
                role="group"
                aria-label="Catalog layout view"
              >
                <Button
                  type="button"
                  size="xs"
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Grid view"
                  onClick={() => updateParams({ view: null })}
                >
                  <LayoutGrid className="size-3.5" aria-hidden="true" />
                  Grid
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  aria-pressed={viewMode === "list"}
                  aria-label="List view"
                  onClick={() => updateParams({ view: "list" })}
                >
                  <List className="size-3.5" aria-hidden="true" />
                  List
                </Button>
              </div>
            </div>
          </div>

          {/* Facet Filters */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              value={companyFilter}
              onValueChange={(value) => updateParams({ company: value === "all" ? null : value })}
            >
              <SelectTrigger aria-label="Filter by company" className="w-full">
                <SelectValue>
                  {companyFilter === "all" ? "All Companies" : companyFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={categoryFilter}
              onValueChange={(value) => updateParams({ category: value === "all" ? null : value })}
            >
              <SelectTrigger aria-label="Filter by category" className="w-full">
                <SelectValue>
                  {categoryFilter === "all" ? "All Categories" : categoryFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={industryFilter}
              onValueChange={(value) => updateParams({ industry: value === "all" ? null : value })}
            >
              <SelectTrigger aria-label="Filter by industry" className="w-full">
                <SelectValue>
                  {industryFilter === "all" ? "All Industries" : industryFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={techFilter}
              onValueChange={(value) => updateParams({ tech: value === "all" ? null : value })}
            >
              <SelectTrigger aria-label="Filter by technology" className="w-full">
                <SelectValue>
                  {techFilter === "all" ? "All Technologies" : techFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technologies</SelectItem>
                {technologies.map((tech) => (
                  <SelectItem key={tech} value={tech}>
                    {tech}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <motion.p
              key={`${filteredProjects.length}-${viewMode}`}
              initial={shouldReduceMotion ? false : { opacity: 0.65, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="font-mono"
              aria-live="polite"
            >
              Showing {filteredProjects.length} of {topLevelProjects.length} top-level entries (
              {totalPublishedCount} total published records including grouped modules)
            </motion.p>
            {hasActiveFilters ? (
              <Button type="button" size="xs" variant="ghost" onClick={clearAllFilters}>
                <X className="size-3.5" aria-hidden="true" />
                Clear all filters
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Empty State or Animated Catalog */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={shouldReduceMotion ? false : MOTION_VARIANTS.filterItem.initial}
            animate={MOTION_VARIANTS.filterItem.animate}
            exit={shouldReduceMotion ? undefined : MOTION_VARIANTS.filterItem.exit}
          >
            <Card className="border-border/80 bg-card/60 py-14 text-center">
              <CardContent className="space-y-3">
                <p className="font-heading text-lg font-semibold text-foreground">
                  No projects match your current filters
                </p>
                <p className="mx-auto max-w-md text-sm text-muted-foreground">
                  Try clearing your search keyword or resetting one of the company, category, industry, or technology filters.
                </p>
                <Button type="button" variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key={`catalog-${viewMode}`}
            layout={!shouldReduceMotion}
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2"
                : "flex flex-col gap-5"
            )}
          >
            {filteredProjects.map((project) => {
              const modules = modulesByPlatform[project.slug] ?? [];

              const cardBody = (
                <SpotlightCard className="flex h-full flex-col justify-between">
                  <div className={cn("flex flex-1 flex-col", viewMode === "list" && "md:flex-row")}>
                    {viewMode === "grid" ? <ConceptualPreview project={project} compact /> : null}

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <CardHeader className="pt-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Badge variant="outline" className="text-xs">
                                {project.employer}
                              </Badge>
                              <Badge variant="secondary" className="font-mono text-[10px]">
                                {projectKindLabels[project.kind]}
                              </Badge>
                              {project.featured ? (
                                <Badge
                                  variant="outline"
                                  className="border-primary/35 bg-primary/10 font-mono text-[10px] text-primary"
                                >
                                  Featured
                                </Badge>
                              ) : null}
                            </div>

                            <Badge
                              variant={
                                project.caseStudyStatus === "overview" ? "secondary" : "outline"
                              }
                              className="font-mono text-[10px]"
                            >
                              {project.caseStudyStatus === "overview"
                                ? "Overview Ready"
                                : "Details Pending"}
                            </Badge>
                          </div>

                          <CardTitle className="pt-2 text-lg">{project.title}</CardTitle>
                          <CardDescription className="leading-relaxed">
                            {project.shortDescription}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4 pt-3">
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="bg-background/60 text-xs transition-colors hover:border-primary/40"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {modules.length > 0 ? (
                            <div className="space-y-2 rounded-xl border border-border/70 bg-background/50 p-3">
                              <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-primary uppercase">
                                <Layers className="size-3.5" aria-hidden="true" />
                                Grouped Modules ({modules.length})
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {modules.map((mod) => (
                                  <Link
                                    key={mod.slug}
                                    href={`/projects/${mod.slug}`}
                                    className="rounded-md border border-border/80 bg-card px-2 py-0.5 text-xs text-muted-foreground transition-colors outline-none hover:border-primary/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                                  >
                                    {mod.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </CardContent>
                      </div>

                      <CardFooter className="mt-4 justify-between gap-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          data-cursor="project"
                          data-cursor-label="Inspect"
                          className="group/link inline-flex items-center gap-1.5 rounded text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          View Project
                          <ArrowRight
                            className="size-4 transition-transform group-hover/link:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            Live Site
                            <ExternalLink className="size-3" aria-hidden="true" />
                          </a>
                        ) : null}
                      </CardFooter>
                    </div>
                  </div>
                </SpotlightCard>
              );

              return (
                <motion.div
                  key={project.slug}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : MOTION_VARIANTS.filterItem.initial}
                  animate={MOTION_VARIANTS.filterItem.animate}
                  transition={{ duration: 0.25, ease: MOTION_EASES.framer.out }}
                  className="h-full"
                >
                  {viewMode === "grid" ? (
                    <TiltCard maxTilt={2.5} className="h-full">
                      {cardBody}
                    </TiltCard>
                  ) : (
                    cardBody
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
