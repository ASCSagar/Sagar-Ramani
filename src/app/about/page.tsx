import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Code2,
  Compass,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
} from "lucide-react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import {
  ParallaxImage,
  ScrollReveal,
  StaggerReveal,
} from "@/components/animations/scroll-reveal";
import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { PageHeader } from "@/components/shared/page-header";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { educationData } from "@/data/education";
import { getTotalCareerDurationFormatted } from "@/data/experience";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: "About",
  description: `About ${profileData.name}, ${profileData.designation} with ${profileData.experience} of full-stack software development experience in Vadodara, Gujarat, India.`,
  path: "/about",
});

export default function AboutPage() {
  const totalTenure = getTotalCareerDurationFormatted();

  const expertisePillars = [
    {
      title: "Full Stack Development",
      icon: Layers,
      content: profileData.aboutNarrative.fullStackExpertise,
    },
    {
      title: "Frontend Engineering",
      icon: Code2,
      content: profileData.aboutNarrative.frontendExpertise,
    },
    {
      title: "Backend & API Engineering",
      icon: Server,
      content: profileData.aboutNarrative.backendExpertise,
    },
    {
      title: "Enterprise Applications",
      icon: Briefcase,
      content: profileData.aboutNarrative.enterpriseExperience,
    },
    {
      title: "AI Integration & Automation",
      icon: Bot,
      content: profileData.aboutNarrative.aiAutomationExperience,
    },
    {
      title: "Development Philosophy",
      icon: Compass,
      content: profileData.aboutNarrative.developmentPhilosophy,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 xl:px-12">
      <PageHeader
        eyebrow="About"
        title={profileData.name}
        description={profileData.headline}
      />

      <div className="space-y-12">
        {/* Editorial Intro & Portrait */}
        <ScrollReveal className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Card className="overflow-hidden border-border/80 bg-card/60 pt-0">
              <ParallaxImage className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src={profileData.aboutImage}
                  alt={`${profileData.name}, ${profileData.designation}`}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </ParallaxImage>
              <CardContent className="space-y-4 pt-5">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border">
                    <Image
                      src={profileData.portraitImage}
                      alt={`${profileData.name} portrait`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">
                      {profileData.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{profileData.designation}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                    {profileData.location}
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {profileData.experience} ({totalTenure})
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <Mail className="size-3.5 text-primary" aria-hidden="true" />
                    Email
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <LinkedInIcon className="size-3.5 text-primary" />
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <GitHubIcon className="size-3.5 text-primary" />
                    GitHub
                  </a>
                  <a
                    href={siteConfig.legacyPortfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5 text-primary" aria-hidden="true" />
                    Legacy Portfolio
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <Card className="border-border/80 bg-card/60">
              <CardHeader>
                <CardTitle className="text-xl">Career Overview</CardTitle>
                <CardDescription>
                  Verified professional summary across three engineering organizations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>{profileData.summary}</p>
                <p>{profileData.aboutNarrative.careerOverview}</p>
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-card/60">
              <CardHeader>
                <CardTitle className="text-lg">Core Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {profileData.expertise.map((area) => (
                  <Badge
                    key={area}
                    variant="outline"
                    className="bg-background/70 px-3 py-1 text-xs"
                  >
                    {area}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              <MagneticButton>
                <Link href="/resume" className={cn(buttonVariants({ variant: "default" }))}>
                  <FileText className="size-4" aria-hidden="true" />
                  View Résumé Centre
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
                  <Mail className="size-4" aria-hidden="true" />
                  Contact Me
                </Link>
              </MagneticButton>
              <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }))}>
                Explore Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Engineering Pillars */}
        <section aria-labelledby="engineering-pillars-heading" className="space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wider text-accent-highlight uppercase">
              Engineering Focus
            </p>
            <SplitTextReveal
              as="h2"
              id="engineering-pillars-heading"
              text="Technical Expertise & Engineering Philosophy"
              className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            />
          </div>

          <StaggerReveal className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {expertisePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} data-stagger-item>
                  <SpotlightCard className="h-full">
                    <div className="flex h-full flex-col gap-3 py-5">
                      <CardHeader>
                        <Icon className="mb-1 size-5 text-primary" aria-hidden="true" />
                        <CardTitle className="text-base">{pillar.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {pillar.content}
                        </p>
                      </CardContent>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </StaggerReveal>
        </section>

        {/* Professional Strengths & Education Summary */}
        <ScrollReveal className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Card className="border-border/80 bg-card/60 lg:col-span-7">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
                Professional Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profileData.strengths.map((strength) => (
                <div
                  key={strength.id}
                  className="rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/35"
                >
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {strength.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {strength.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/60 lg:col-span-5">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <GraduationCap className="size-4 text-primary" aria-hidden="true" />
                Education Summary
              </CardTitle>
              <Link
                href="/education"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Full Timeline
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {educationData.slice(0, 2).map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/35"
                >
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {edu.degree}
                    {edu.specialization ? ` (${edu.specialization})` : ""}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{edu.institution}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {edu.period}
                    </span>
                    <Badge variant="outline" className="border-primary/30 text-xs text-primary">
                      {edu.scoreLabel}: {edu.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
