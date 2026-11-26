import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
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
  getEmployerDurationFormatted,
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

  const stats = [
    {
      label: "Confirmed Experience",
      value: profileData.experience,
      detail: `${totalCareerDuration} cumulative across 3 employers`,
    },
    {
      label: "Published Systems & Modules",
      value: String(publishedProjects.length),
      detail: "Including TrueValue Platform & 6 grouped modules",
    },
    {
      label: "Engineering Tenures",
      value: String(experienceData.length),
      detail: "ETD, Anant Soft Computing, La Net Team",
    },
    {
      label: "Academic Standing",
      value: primaryEducation.grade,
      detail: `${primaryEducation.degree} · ${primaryEducation.shortInstitution}`,
    },
  ];

  const featuredSkillCategories = skillsData.filter((category) =>
    [
      "frontend-development",
      "backend-development",
      "databases",
      "apis-integrations",
      "ai-automation",
    ].includes(category.id)
  );

  const visibleTestimonials = siteConfig.features.showTestimonials
    ? testimonialsData.filter((item) => item.verifiedForPublication)
    : [];

  return (
    <div className="space-y-20 pb-24">
      {/* Professional Statistics */}
      <section aria-labelledby="stats-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="stats-heading" className="sr-only">
          Professional Statistics
        </h2>
        <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-stagger-item>
              <SpotlightCard className="h-full">
                <CardContent className="space-y-1.5 py-5">
                  <p className="font-mono text-xs tracking-wider text-primary uppercase">
                    {stat.label}
                  </p>
                  <p className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{stat.detail}</p>
                </CardContent>
              </SpotlightCard>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* About Me Overview */}
      <section aria-labelledby="about-overview-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
                alt={`${profileData.name} — ${profileData.designation}`}
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

      {/* Horizontal Featured Project Showcase */}
      <HorizontalProjectShowcase items={showcaseItems} />

      {/* Featured Technology Stack */}
      <section aria-labelledby="featured-stack-heading" className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="featured-stack-heading"
          eyebrow="Technology Stack"
          title="Core Engineering Capabilities"
          description="Production technologies spanning React/Next.js frontends, Node.js and Python/Django backends, databases, APIs, and AI automation."
          actionHref="/skills"
          actionLabel="View Complete Skills Matrix"
        />

        <TechnologyMarquee />

        <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSkillCategories.map((category) => (
            <div key={category.id} data-stagger-item>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col gap-3 py-4">
                  <CardHeader>
                    <CardTitle className="text-base">{category.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <Badge key={item.name} variant="outline" className="bg-background/70 text-xs">
                        {item.name}
                      </Badge>
                    ))}
                  </CardContent>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* Experience & Education Preview */}
      <section aria-labelledby="experience-education-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="experience-education-heading"
          eyebrow="Background"
          title="Experience & Academic Foundation"
          description="Confirmed employment progression in reverse chronological order alongside academic credentials."
        />

        <ScrollReveal className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Card className="border-border/80 bg-card/60 lg:col-span-7">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div className="space-y-1">
                <CardTitle className="inline-flex items-center gap-2 text-lg">
                  <Briefcase className="size-4 text-primary" aria-hidden="true" />
                  Professional Experience
                </CardTitle>
                <CardDescription>
                  Total calculated tenure: {totalCareerDuration}
                </CardDescription>
              </div>
              <Link
                href="/experience"
                className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary hover:underline"
              >
                Full Timeline
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {experienceData.map((employer) => (
                <div
                  key={employer.id}
                  className="rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/35"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {employer.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {employer.roles.map((r) => r.title).join(" · ")}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-[11px]">
                        {getEmployerDurationFormatted(employer)}
                      </Badge>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {employer.totalPeriod}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between border-border/80 bg-card/60 lg:col-span-5">
            <div>
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="inline-flex items-center gap-2 text-lg">
                    <GraduationCap className="size-4 text-primary" aria-hidden="true" />
                    Education
                  </CardTitle>
                  <CardDescription>Verified academic credentials</CardDescription>
                </div>
                <Link
                  href="/education"
                  className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary hover:underline"
                >
                  Details
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {educationData.slice(0, 2).map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/35"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {edu.degree}
                        {edu.specialization ? ` — ${edu.specialization}` : ""}
                      </p>
                      <Badge variant="outline" className="border-primary/30 text-xs text-primary">
                        {edu.scoreLabel}: {edu.grade}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{edu.institution}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">{edu.period}</p>
                  </div>
                ))}
              </CardContent>
            </div>
          </Card>
        </ScrollReveal>
      </section>

      {/* Professional Strengths */}
      <section aria-labelledby="strengths-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
      <section aria-labelledby="resume-preview-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

      {/* Testimonials — strictly gated behind showTestimonials && verifiedForPublication */}
      {visibleTestimonials.length > 0 ? (
        <section aria-labelledby="testimonials-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="testimonials-heading"
            eyebrow="Endorsements"
            title="Verified Testimonials"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {visibleTestimonials.map((item) => (
              <Card key={item.id} className="border-border/80 bg-card/60">
                <CardContent className="space-y-3 pt-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">“{item.quote}”</p>
                  <p className="font-heading text-sm font-semibold text-foreground">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {/* Contact Call-to-Action */}
      <section aria-labelledby="contact-cta-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col justify-between gap-6 py-8 md:flex-row md:items-center">
              <div className="space-y-2">
                <p className="font-mono text-xs tracking-wider text-primary uppercase">
                  Contact & Collaboration
                </p>
                <SplitTextReveal
                  as="h2"
                  id="contact-cta-heading"
                  text="Let’s Discuss Engineering & Product Architecture"
                  className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                />
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Reach out via the validated contact form or connect directly through email, LinkedIn, or GitHub.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    <Mail className="size-3.5 text-primary" aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    <LinkedInIcon className="size-3.5 text-primary" />
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground"
                  >
                    <GitHubIcon className="size-3.5 text-primary" />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className={cn(buttonVariants({ variant: "default", size: "lg" }))}
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    Contact Me
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/projects"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                  >
                    Explore My Work
                  </Link>
                </MagneticButton>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>
    </div>
  );
}
