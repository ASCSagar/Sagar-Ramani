"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Calendar, Layers, MapPin, TrendingUp } from "lucide-react";

import { SpotlightCard } from "@/components/effects/spotlight-card";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOTION_DISTANCES, MOTION_DURATIONS, MOTION_EASES, MOTION_STAGGER } from "@/config/motion";
import type { EmployerExperience } from "@/data/experience";
import { gsap, useGSAP } from "@/lib/gsap";

export interface TimelineProjectSummary {
  slug: string;
  title: string;
  kindLabel: string;
}

export interface TimelineEmployerItem {
  employer: EmployerExperience;
  companyDuration: string;
  roleDurations: Record<string, string>;
  projects: TimelineProjectSummary[];
}

interface AnimatedExperienceTimelineProps {
  items: TimelineEmployerItem[];
}

export function AnimatedExperienceTimeline({ items }: AnimatedExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const container = containerRef.current;
      const line = lineRef.current;
      if (!container || shouldReduceMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: MOTION_EASES.gsap.none,
              scrollTrigger: {
                trigger: container,
                start: "top 75%",
                end: "bottom 75%",
                scrub: 0.5,
              },
            }
          );
        }

        const articles = gsap.utils.toArray<HTMLElement>("[data-timeline-card]", container);
        articles.forEach((article) => {
          gsap.from(article, {
            y: MOTION_DISTANCES.md,
            opacity: 0,
            duration: MOTION_DURATIONS.reveal,
            ease: MOTION_EASES.gsap.out,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: article,
              start: "top 86%",
              once: true,
            },
          });

          const bullets = article.querySelectorAll("[data-timeline-bullet]");
          if (bullets.length > 0) {
            gsap.from(bullets, {
              x: -10,
              opacity: 0,
              duration: 0.45,
              stagger: MOTION_STAGGER.tight,
              ease: MOTION_EASES.gsap.out,
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: article,
                start: "top 82%",
                once: true,
              },
            });
          }

          const techChips = article.querySelectorAll("[data-timeline-tech]");
          if (techChips.length > 0) {
            gsap.from(techChips, {
              scale: 0.92,
              opacity: 0,
              duration: 0.35,
              stagger: 0.03,
              ease: MOTION_EASES.gsap.out,
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: article,
                start: "top 78%",
                once: true,
              },
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [shouldReduceMotion, items.length] }
  );

  return (
    <div ref={containerRef} className="relative space-y-8 md:pl-8">
      {/* Static base track */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-3 hidden w-px bg-border/60 md:block"
      />
      {/* Progressive animated timeline line */}
      <div
        ref={lineRef}
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-3 hidden w-px origin-top bg-gradient-to-b from-primary via-accent-secondary to-primary md:block"
      />

      {items.map(({ employer, companyDuration, roleDurations, projects }, index) => (
        <article key={employer.id} data-timeline-card className="relative">
          <div
            aria-hidden="true"
            className="absolute top-7 -left-8 hidden size-6 items-center justify-center rounded-full border border-primary/50 bg-background text-primary shadow-xs md:flex"
          >
            <span className="font-mono text-[10px] font-semibold">
              {items.length - index}
            </span>
          </div>

          <SpotlightCard>
            <div className="py-5">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Briefcase className="size-4 text-primary" aria-hidden="true" />
                      <CardTitle className="text-xl">{employer.company}</CardTitle>
                      <Badge variant="outline" className="font-mono text-[11px]">
                        Past Employer
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {employer.location ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                          {employer.location}
                        </span>
                      ) : null}
                      {employer.progressionNote ? (
                        <span className="inline-flex items-center gap-1 text-primary">
                          <TrendingUp className="size-3.5" aria-hidden="true" />
                          {employer.progressionNote}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {companyDuration}
                    </Badge>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Calendar className="size-3 text-primary" aria-hidden="true" />
                      {employer.totalPeriod}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-5">
                {/* Grouped Designations / Promotions */}
                <div className="space-y-4">
                  {employer.roles.map((role) => (
                    <div
                      key={role.id}
                      className="rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/30"
                    >
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-heading text-base font-semibold text-foreground">
                            {role.title}
                          </h2>
                          {role.highlightsPending ? (
                            <Badge variant="outline" className="font-mono text-[10px]">
                              Résumé bullets pending verification
                            </Badge>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="font-mono text-[11px]">
                            {roleDurations[role.id]}
                          </Badge>
                          <span className="font-mono text-xs text-muted-foreground">
                            {role.period}
                          </span>
                        </div>
                      </div>

                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                        {role.highlights.map((highlight) => (
                          <li key={highlight} data-timeline-bullet>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Technologies Used */}
                <div className="space-y-2">
                  <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Technologies & Focus
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {employer.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        data-timeline-tech
                        variant="outline"
                        className="bg-background/70 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Associated Published Projects */}
                {projects.length > 0 ? (
                  <div className="space-y-2">
                    <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                      <Layers className="size-3.5 text-primary" aria-hidden="true" />
                      Associated Published Projects
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          data-cursor="project"
                          data-cursor-label="Inspect"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground transition-colors outline-none hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span>{project.title}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            ({project.kindLabel})
                          </span>
                          <ArrowRight className="size-3" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </div>
          </SpotlightCard>
        </article>
      ))}
    </div>
  );
}
