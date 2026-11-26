import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import { ResumeCenter } from "@/components/resume/resume-center";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { educationData } from "@/data/education";
import {
  experienceData,
  getEmployerDurationFormatted,
  getRoleDurationFormatted,
  getTotalCareerDurationFormatted,
} from "@/data/experience";
import { profileData } from "@/data/profile";
import { getPublishedProjects, type ProjectEntry } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { skillsData } from "@/data/skills";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Résumé",
  description: `Role-specific résumé centre and print-friendly web résumé for ${profileData.name} (${profileData.designation}).`,
  path: "/resume",
});

export default function ResumePage() {
  const publishedProjects = getPublishedProjects();
  const projectsBySlug: Record<string, ProjectEntry> = {};
  for (const project of publishedProjects) {
    projectsBySlug[project.slug] = project;
  }
  const totalCareerDuration = getTotalCareerDurationFormatted();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="print:hidden">
        <PageHeader
          eyebrow="Résumé Centre"
          title={profileData.name}
          description={`${profileData.designation} · ${profileData.experience} (${totalCareerDuration}) · ${profileData.location}`}
        />
      </div>

      <div className="space-y-8">
        <ResumeCenter versions={profileData.resumeVersions} projectsBySlug={projectsBySlug} />

        {/* Print-Friendly Structured Web Résumé */}
        <section aria-label="Web-based résumé summary" className="space-y-6">
          <div className="hidden border-b border-border pb-4 print:block">
            <h1 className="font-heading text-2xl font-bold text-foreground">{profileData.name}</h1>
            <p className="text-sm text-muted-foreground">
              {profileData.designation} · {profileData.location} · {siteConfig.email}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              LinkedIn: {siteConfig.social.linkedin} · GitHub: {siteConfig.social.github}
            </p>
          </div>

          <Card className="border-border/80 bg-card/60">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-lg">Professional Summary</CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground print:hidden">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                    {profileData.location}
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    <Mail className="size-3.5 text-primary" aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{profileData.headline}</p>
              <p>{profileData.summary}</p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Confirmed Experience ({totalCareerDuration})</CardTitle>
              <Link
                href="/experience"
                className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring print:hidden"
              >
                Full Timeline
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-5">
              {experienceData.map((employer) => (
                <div
                  key={employer.id}
                  className="space-y-2 border-b border-border/60 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-heading text-sm font-semibold text-foreground">
                      {employer.company}
                      {employer.location ? ` · ${employer.location}` : ""}
                    </p>
                    <span className="font-mono text-xs text-muted-foreground">
                      {employer.totalPeriod} ({getEmployerDurationFormatted(employer)})
                    </span>
                  </div>
                  <div className="space-y-2 pl-3">
                    {employer.roles.map((role) => (
                      <div key={role.id} className="space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-medium text-foreground">{role.title}</p>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {role.period} ({getRoleDurationFormatted(role)})
                          </span>
                        </div>
                        <ul className="list-disc space-y-0.5 pl-4 text-xs text-muted-foreground">
                          {role.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-border/80 bg-card/60">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Technical Skills</CardTitle>
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline print:hidden"
                >
                  Matrix
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {skillsData.map((group) => (
                  <div key={group.id}>
                    <p className="text-xs font-semibold text-foreground">{group.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {group.skills.join(", ")}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-card/60">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Education</CardTitle>
                <Link
                  href="/education"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline print:hidden"
                >
                  Details
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {educationData.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-foreground">
                        {edu.degree}
                        {edu.specialization ? ` — ${edu.specialization}` : ""}
                      </p>
                      <Badge variant="outline" className="text-[10px]">
                        {edu.grade}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {edu.institution} · {edu.period}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
