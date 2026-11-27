import Link from "next/link";
import { ArrowRight, Award, Calendar, GraduationCap, MapPin } from "lucide-react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { ScrollReveal, StaggerReveal } from "@/components/animations/scroll-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { certificationsData, educationData } from "@/data/education";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: "Education",
  description:
    "Academic qualifications including Bachelor of Engineering in Computer Engineering from SVIT, Vasad and Higher Secondary Education from Nutan Vidyalaya.",
  path: "/education",
});

export default function EducationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 xl:px-12">
      <PageHeader
        eyebrow="Academic Background"
        title="Education"
        description="Verified academic credentials in Computer Engineering and Science."
      />

      <div className="space-y-10">
        {/* Responsive Education Timeline */}
        <StaggerReveal className="relative space-y-6 md:pl-8">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-3 hidden w-px bg-gradient-to-b from-primary/60 via-border to-border md:block"
          />

          {educationData.map((entry) => (
            <article key={entry.id} data-stagger-item className="relative">
              <div
                aria-hidden="true"
                className="absolute top-6 -left-8 hidden size-6 items-center justify-center rounded-full border border-primary/40 bg-background text-primary md:flex"
              >
                <GraduationCap className="size-3.5" />
              </div>

              <SpotlightCard>
                <div className="py-5">
                  <CardHeader className="flex flex-col justify-between gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">
                        {entry.degree}
                        {entry.specialization ? ` (${entry.specialization})` : ""}
                      </CardTitle>
                      <CardDescription className="font-body text-sm font-medium text-foreground-secondary">
                        {entry.institution}
                      </CardDescription>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                      <Badge variant="outline" className="border-primary/30 text-xs text-primary">
                        {entry.scoreLabel}: {entry.grade}
                      </Badge>
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                        <Calendar className="size-3 text-primary" aria-hidden="true" />
                        {entry.period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-4">
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                    {entry.location ? (
                      <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                        {entry.location}
                      </p>
                    ) : null}
                  </CardContent>
                </div>
              </SpotlightCard>
            </article>
          ))}
        </StaggerReveal>

        {/* Certifications: Only display verified entries */}
        <ScrollReveal>
          <Card className="border-border/80 bg-card/60">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <Award className="size-4 text-primary" aria-hidden="true" />
                Verified Certifications
              </CardTitle>
              <CardDescription>
                Only verified external certifications are published on this site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {certificationsData.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {certificationsData.map((cert) => (
                    <div
                      key={cert.id}
                      className="rounded-xl border border-border/70 bg-background/60 p-4"
                    >
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {cert.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {cert.issuer} · {cert.issuedDate}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No additional third-party certifications are listed at this time; all qualifications above reflect confirmed academic credentials.
                </p>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3">
          <MagneticButton>
            <Link href="/experience" className={cn(buttonVariants({ variant: "default" }))}>
              View Experience
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
          <Link href="/resume" className={cn(buttonVariants({ variant: "outline" }))}>
            Open Résumé Centre
          </Link>
        </div>
      </div>
    </div>
  );
}
