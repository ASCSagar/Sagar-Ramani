"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cpu, ExternalLink, Layers, Workflow } from "lucide-react";

import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MOTION_EASES } from "@/config/motion";
import { projectKindLabels, type ProjectEntry } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ShowcaseItem {
  project: ProjectEntry;
  moduleCount: number;
}

interface HorizontalProjectShowcaseProps {
  items: ShowcaseItem[];
}

export function HorizontalProjectShowcase({ items }: HorizontalProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const pinContainer = pinContainerRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;
      const counter = counterRef.current;

      if (!pinContainer || !viewport || !track || shouldReduceMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const getScrollDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        if (getScrollDistance() <= 0) return;

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: MOTION_EASES.gsap.none,
          scrollTrigger: {
            trigger: pinContainer,
            pin: true,
            scrub: 0.7,
            start: "top 12%",
            end: () => `+=${Math.max(getScrollDistance(), 360)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) {
                progressBar.style.transform = `scaleX(${self.progress.toFixed(4)})`;
              }
              const nextIdx = Math.min(
                items.length - 1,
                Math.max(0, Math.round(self.progress * (items.length - 1)))
              );
              if (counter) {
                counter.textContent = `${String(nextIdx + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
              }
              setActiveIndex(nextIdx);
            },
          },
        });

        return () => {
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion, items.length] }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-projects-heading"
      data-testid="horizontal-project-showcase"
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      <div ref={pinContainerRef} className="space-y-6">
        {/* Showcase Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-1.5">
            <p className="font-mono text-xs tracking-wider text-primary uppercase">
              Featured Showcase
            </p>
            <SplitTextReveal
              as="h2"
              id="featured-projects-heading"
              text="Platforms & Production Applications"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            />
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Selected verified enterprise platforms, AI-enabled systems, and web applications with grouped module architecture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!shouldReduceMotion ? (
              <span
                ref={counterRef}
                className="hidden font-mono text-xs text-muted-foreground lg:inline"
              >
                {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            ) : null}
            <Link
              href="/projects"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
            >
              Explore All Projects
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Desktop horizontal scroll track / Mobile & Reduced-motion responsive grid */}
        <div ref={viewportRef} className="relative lg:overflow-hidden rounded-2xl">
          {/* Subtle edge fades on desktop for smooth horizontal entrance and exit */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-10 bg-gradient-to-r from-background via-background/60 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-16 bg-gradient-to-l from-background via-background/60 to-transparent lg:block"
          />

          <div
            ref={trackRef}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex lg:w-max lg:flex-nowrap lg:gap-6 py-2 px-1"
          >
            {items.map(({ project, moduleCount }, index) => {
              const Icon =
                project.kind === "platform"
                  ? Layers
                  : project.kind === "service"
                  ? Workflow
                  : Cpu;

              return (
                <div
                  key={project.slug}
                  data-cursor="project"
                  data-cursor-label="View"
                  className="w-full lg:w-[420px] lg:shrink-0"
                >
                  <SpotlightCard className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/70 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        {/* Visual Banner */}
                        <div className="relative">
                          {project.coverImage ? (
                            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/70 bg-muted">
                              <Image
                                src={project.coverImage.src}
                                alt={project.coverImage.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 420px"
                                className="object-cover transition-transform duration-500 group-hover/spotlight:scale-105"
                              />
                            </div>
                          ) : (
                            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary/15 via-background to-accent-secondary/15 p-4 flex items-center justify-center">
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-25"
                                style={{
                                  backgroundImage:
                                    "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
                                  backgroundSize: "16px 16px",
                                }}
                              />
                              <div className="absolute top-3.5 left-3.5 z-10">
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
                          )}

                          {/* Index Badge cleanly placed in top right */}
                          <span className="absolute top-3.5 right-3.5 z-10 rounded-lg border border-border/80 bg-background/90 px-2.5 py-1 font-mono text-xs font-semibold text-primary shadow-xs backdrop-blur-md">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 sm:p-6 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Badge variant="outline" className="text-xs font-medium">
                              {project.employer}
                            </Badge>
                            <Badge variant="secondary" className="font-mono text-[11px]">
                              {projectKindLabels[project.kind]}
                            </Badge>
                          </div>

                          <div>
                            <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground transition-colors group-hover/spotlight:text-primary">
                              {project.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                              {project.shortDescription}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="bg-background/60 text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {moduleCount > 0 ? (
                            <p className="inline-flex items-center gap-1.5 pt-1 font-mono text-xs text-primary">
                              <Layers className="size-3.5" aria-hidden="true" />
                              Groups {moduleCount} platform modules
                            </p>
                          ) : null}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between gap-2 border-t border-border/50 px-5 py-4 sm:px-6">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          View Project
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            Live
                            <ExternalLink className="size-3" aria-hidden="true" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop horizontal scroll progress bar */}
        {!shouldReduceMotion ? (
          <div className="hidden items-center gap-3 lg:flex" aria-hidden="true">
            <span className="font-mono text-[11px] text-muted-foreground">Scroll showcase</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-border/70">
              <div
                ref={progressBarRef}
                className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-accent-secondary"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
