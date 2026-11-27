import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { AnimatedCounter } from "@/components/animations/animated-counter";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { ParallaxImage, ScrollReveal, StaggerReveal } from "@/components/animations/scroll-reveal";
import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { TechnologyMarquee } from "@/components/effects/technology-marquee";
import { HorizontalProjectShowcase } from "@/components/sections/horizontal-project-showcase";
import { SectionHeading } from "@/components/shared/section-heading";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { educationData } from "@/data/education";
import {
  experienceData,
  getTotalCareerDurationFormatted,
} from "@/data/experience";
import { profileData } from "@/data/profile";
import {
  getPlatformModules,
  getProjectBySlug,
  getPublishedProjects,
  type ProjectEntry,
} from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { skillsData } from "@/data/skills";
import { testimonialsData } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const SHOWCASE_SLUGS = [
  "truevalue-platform",
  "flyoverseas-ai",
  "automated-job-aggregation",
  "study-streak",
  "tube-master",
  "pabau",
] as const;

export function HomeSections() {
  const publishedProjects = getPublishedProjects();
  const totalCareerDuration = getTotalCareerDurationFormatted();
  const primaryEducation = educationData[0];

  const showcaseItems = SHOWCASE_SLUGS.map((slug) => getProjectBySlug(slug))
    .filter((project): project is ProjectEntry => Boolean(project))
    .map((project) => ({
      project,
      moduleCount: project.kind === "platform" ? getPlatformModules(project.slug).length : 0,
    }));

  return (
    <div className="space-y-20 pb-24">
      {/* About Me Overview */}
      <section aria-labelledby="about-overview-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <SectionHeading
          id="about-overview-heading"
          eyebrow="About Me"
          title="Engineering Mindset & Career Overview"
          description="Full-stack delivery grounded in modular SaaS architecture, responsive UI systems, and practical AI integration."
          actionHref="/about"
          actionLabel="Full About Page"
        />

        <ScrollReveal className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Card className="overflow-hidden border-border/80 bg-card/60 pt-0 lg:col-span-5">
            <ParallaxImage className="relative aspect-[4/3] w-full bg-muted">
              <Image
                src={profileData.aboutImage}
                alt={`${profileData.name}, ${profileData.designation}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </ParallaxImage>
            <CardContent className="flex flex-wrap items-center justify-between gap-2 pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                {profileData.location}
              </span>
              <Badge variant="secondary" className="font-mono text-xs">
                {profileData.experience}
              </Badge>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between border-border/80 bg-card/60 lg:col-span-7">
            <CardHeader>
              <CardTitle className="text-xl">{profileData.designation}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {profileData.aboutNarrative.careerOverview}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>{profileData.aboutNarrative.fullStackExpertise}</p>
              <div className="flex flex-wrap gap-2">
                {profileData.expertise.map((area) => (
                  <Badge key={area} variant="outline" className="bg-background/70 text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-wrap justify-between gap-3">
              <Link
                href="/about"
                className={cn(buttonVariants({ variant: "default", size: "sm" }))}
              >
                Read Engineering Background
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                View Career Timeline
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </CardFooter>
          </Card>
        </ScrollReveal>
      </section>

      {/* Academic Foundation */}
      <section aria-labelledby="education-preview-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <SectionHeading
          id="education-preview-heading"
          eyebrow="Credentials"
          title="Academic Foundation"
          description="Verified degree credentials, academic honors, and engineering foundation."
        />

        <ScrollReveal className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {educationData.slice(0, 2).map((edu) => (
            <Card key={edu.id} className="border-border/80 bg-card/60">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="inline-flex items-center gap-2 text-lg">
                    <GraduationCap className="size-4 text-primary" aria-hidden="true" />
                    {edu.degree}
                  </CardTitle>
                  <CardDescription>{edu.institution}</CardDescription>
                </div>
                <Badge variant="outline" className="border-primary/30 text-xs text-primary">
                  {edu.scoreLabel}: {edu.grade}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                {edu.specialization && (
                  <p className="font-heading text-sm font-medium text-foreground">
                    Specialization: {edu.specialization}
                  </p>
                )}
                <p className="font-mono text-xs text-muted-foreground">{edu.period}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollReveal>
      </section>

      {/* Professional Strengths */}
      <section aria-labelledby="strengths-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <SectionHeading
          id="strengths-heading"
          eyebrow="Engineering Strengths"
          title="How I Deliver Software"
          description="Core strengths demonstrated across enterprise SaaS suites, client platforms, and automation systems."
        />

        <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profileData.strengths.map((strength) => (
            <div key={strength.id} data-stagger-item>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col gap-3 py-4">
                  <CardHeader>
                    <ShieldCheck className="mb-1 size-5 text-primary" aria-hidden="true" />
                    <CardTitle className="text-base">{strength.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {strength.description}
                    </p>
                  </CardContent>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* Résumé Center Preview */}
      <section aria-labelledby="resume-preview-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <ScrollReveal>
          <SpotlightCard>
            <div className="py-5">
              <CardHeader className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="space-y-1.5">
                  <Badge variant="outline" className="w-fit gap-1.5 border-primary/30 bg-primary/10 font-mono text-xs text-primary">
                    <FileText className="size-3.5" aria-hidden="true" />
                    Résumé Centre
                  </Badge>
                  <CardTitle id="resume-preview-heading" className="text-2xl">
                    Role-Focused Résumé & Web Summary
                  </CardTitle>
                  <CardDescription className="max-w-2xl">
                    Review the structured, print-friendly web résumé or explore the 6 approved role-specific tracks. Verified PDF downloads activate automatically once final PDF files are attached.
                  </CardDescription>
                </div>
                <MagneticButton>
                  <Link
                    href="/resume"
                    className={cn(buttonVariants({ variant: "default", size: "lg" }), "shrink-0")}
                  >
                    Open Résumé Centre
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </MagneticButton>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pt-3">
                {profileData.resumeVersions.map((version) => (
                  <Badge key={version.id} variant="secondary" className="px-3 py-1 text-xs">
                    <CheckCircle2 className="mr-1 size-3 text-primary" aria-hidden="true" />
                    {version.title}
                  </Badge>
                ))}
              </CardContent>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </section>
    </div>
  );
}
