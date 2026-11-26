"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Code2, GraduationCap, Layers, Mail } from "lucide-react";
import { motion } from "motion/react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { StaggerReveal } from "@/components/animations/scroll-reveal";
import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { SpotlightCard, TiltCard } from "@/components/effects/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { MOTION_VARIANTS } from "@/config/motion";
import { educationData } from "@/data/education";
import { experienceData } from "@/data/experience";
import { profileData } from "@/data/profile";
import { getTopLevelProjects } from "@/data/projects";
import { skillsData } from "@/data/skills";

export function BentoOverview() {
  const featuredProjects = getTopLevelProjects().filter((project) => project.featured);
  const primaryEducation = educationData[0];

  return (
    <section
      aria-labelledby="overview-heading"
      className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8"
    >
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <p className="font-mono text-xs tracking-wider text-primary uppercase">
            Engineering Overview
          </p>
          <SplitTextReveal
            as="h2"
            id="overview-heading"
            text="Verified Portfolio Snapshot"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          />
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Structured across confirmed experience, projects, skills, and education.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3.5 py-2 text-xs font-medium text-foreground transition-colors outline-none hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          Explore All Work
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <StaggerReveal className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {/* Card 1: Featured Systems */}
        <motion.div
          data-stagger-item
          whileHover={MOTION_VARIANTS.cardHover}
          className="md:col-span-6 lg:col-span-7"
        >
          <TiltCard maxTilt={2.5} className="h-full">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary">
                      <Layers className="size-3.5 text-primary" aria-hidden="true" />
                      Featured Systems
                    </Badge>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      All projects
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      Enterprise SaaS & Web Platforms
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      Highlights across TrueValue Platform, FlyOverseas.ai, Study Streak, and Tube Master.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {featuredProjects.slice(0, 4).map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      data-cursor="project"
                      data-cursor-label="Inspect"
                      className="group rounded-xl border border-border/80 bg-background/70 p-3.5 transition-all duration-200 hover:border-primary/50 hover:bg-background hover:shadow-xs focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-heading text-sm font-medium text-foreground group-hover:text-primary">
                          {project.title}
                        </p>
                        <ArrowRight
                          className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{project.employer}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </TiltCard>
        </motion.div>

        {/* Card 2: Experience */}
        <motion.div
          data-stagger-item
          whileHover={MOTION_VARIANTS.cardHover}
          className="md:col-span-6 lg:col-span-5"
        >
          <TiltCard maxTilt={2.5} className="h-full">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary">
                      <Briefcase className="size-3.5 text-primary" aria-hidden="true" />
                      Experience
                    </Badge>
                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Timeline
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {profileData.experience} Professional History
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      Three confirmed engineering tenures from 2022 to 2026.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {experienceData.map((employer) => (
                    <div
                      key={employer.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/60 px-3.5 py-2.5 transition-colors hover:border-primary/40 hover:bg-background/90"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm font-medium text-foreground">
                          {employer.company}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {employer.roles[0]?.title}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                        {employer.id === "etd"
                          ? "Aug 2025 – Oct 2026"
                          : employer.id === "anant-soft-computing"
                          ? "Sep 2023 – Jul 2025"
                          : "Jan 2022 – Sep 2023"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </TiltCard>
        </motion.div>

        {/* Card 3: Skills Matrix */}
        <motion.div
          data-stagger-item
          whileHover={MOTION_VARIANTS.cardHover}
          className="md:col-span-6 lg:col-span-5"
        >
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary">
                    <Code2 className="size-3.5 text-primary" aria-hidden="true" />
                    Skills Matrix
                  </Badge>
                  <Link
                    href="/skills"
                    className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Explore stack
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    Full-Stack & AI Tooling
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Core production languages, frameworks, and architecture patterns.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {skillsData.slice(0, 4).map((category) => (
                  <div key={category.id} className="space-y-1">
                    <p className="text-xs font-medium text-foreground">{category.title}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {category.skills.slice(0, 4).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Card 4: Education & Profile */}
        <motion.div
          data-stagger-item
          whileHover={MOTION_VARIANTS.cardHover}
          className="md:col-span-6 lg:col-span-4"
        >
          <SpotlightCard className="h-full">
            <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary">
                    <GraduationCap className="size-3.5 text-primary" aria-hidden="true" />
                    Education & Profile
                  </Badge>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    About
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {primaryEducation.degree}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {primaryEducation.shortInstitution} · {primaryEducation.period} ({primaryEducation.grade})
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border">
                    <Image
                      src={profileData.portraitImage}
                      alt={profileData.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-foreground">{profileData.name}</p>
                    <p className="truncate font-mono text-[11px] text-muted-foreground">
                      {profileData.location}
                    </p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Focused on clean SaaS architecture, maintainable UI systems, and reliable API integrations.
                </p>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Card 5: Contact */}
        <motion.div
          data-stagger-item
          whileHover={MOTION_VARIANTS.cardHover}
          className="md:col-span-12 lg:col-span-3"
        >
          <SpotlightCard className="h-full border-primary/30 bg-primary/[0.04]">
            <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
              <div className="space-y-3">
                <Badge variant="outline" className="w-fit gap-1.5 border-primary/30 bg-background/80 text-primary">
                  <Mail className="size-3.5 text-primary" aria-hidden="true" />
                  Contact
                </Badge>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    Start a Conversation
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Discuss full-stack engineering, SaaS architecture, or collaboration opportunities.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div className="rounded-lg border border-primary/20 bg-background/70 px-3 py-2 text-center">
                  <p className="font-mono text-[11px] text-muted-foreground">Available for engineering roles</p>
                </div>
                <MagneticButton className="w-full">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Open Contact Form
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </StaggerReveal>
    </section>
  );
}
