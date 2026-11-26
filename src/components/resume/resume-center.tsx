"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Info,
  Printer,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { useAnimationSettings } from "@/components/providers/animation-provider";
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
import { MOTION_EASES } from "@/config/motion";
import type { ResumeVersion } from "@/data/profile";
import type { ProjectEntry } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ResumeCenterProps {
  versions: ResumeVersion[];
  projectsBySlug: Record<string, ProjectEntry>;
}

export function ResumeCenter({ versions, projectsBySlug }: ResumeCenterProps) {
  const [selectedId, setSelectedId] = useState<string>(versions[0]?.id ?? "");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  const selectedVersion = versions.find((v) => v.id === selectedId) ?? versions[0];
  const previewVersion = versions.find((v) => v.id === previewId && v.pdfAvailable && v.pdfPath);

  return (
    <div className="space-y-8">
      {/* Action Bar */}
      <Card className="border-primary/30 bg-primary/5 print:hidden">
        <CardContent className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
              <Info className="size-4 text-primary" aria-hidden="true" />
              Verified PDF Availability
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              PDF preview and download buttons remain disabled until verified role-specific PDFs are attached. You can inspect each role track or print the structured web résumé below.
            </p>
          </div>
          <MagneticButton>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="shrink-0"
            >
              <Printer className="size-4" aria-hidden="true" />
              Print Web Résumé
            </Button>
          </MagneticButton>
        </CardContent>
      </Card>

      {/* Role-Specific Résumé Cards */}
      <section aria-labelledby="resume-versions-heading" className="space-y-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="resume-versions-heading" className="font-heading text-xl font-semibold">
            Approved Role-Specific Résumé Versions ({versions.length})
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            Active Focus: {selectedVersion?.title}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {versions.map((version) => {
            const isSelected = version.id === selectedVersion?.id;
            const hasPdf = version.pdfAvailable && Boolean(version.pdfPath);

            return (
              <motion.div
                key={version.id}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.18 }}
                className="h-full"
              >
                <SpotlightCard
                  className={cn(
                    "h-full",
                    isSelected && "border-primary/50 ring-1 ring-primary/30"
                  )}
                >
                  <div className="flex h-full flex-col justify-between py-5">
                    <div>
                      <CardHeader>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <Badge
                            variant={hasPdf ? "default" : "outline"}
                            className="font-mono text-[10px]"
                          >
                            {hasPdf ? "PDF Ready" : "Pending Verified PDF"}
                          </Badge>
                          <span className="font-mono text-[10px] text-muted-foreground">PDF</span>
                        </div>
                        <CardTitle className="pt-1 text-base">{version.title}</CardTitle>
                        <CardDescription className="text-xs leading-relaxed">
                          {version.focusSummary}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3 pt-3">
                        <div className="flex flex-wrap gap-1">
                          {version.keyTechnologies.slice(0, 6).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="bg-background/60 text-[11px]"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="truncate font-mono text-[11px] text-muted-foreground">
                          File: {version.expectedFilename}
                        </p>
                      </CardContent>
                    </div>

                    <CardFooter className="mt-4 flex-wrap justify-between gap-2">
                      <Button
                        type="button"
                        size="xs"
                        variant={isSelected ? "default" : "secondary"}
                        aria-pressed={isSelected}
                        onClick={() => setSelectedId(version.id)}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="size-3.5" aria-hidden="true" />
                            Focused
                          </>
                        ) : (
                          "Focus Summary"
                        )}
                      </Button>

                      <div className="flex items-center gap-1.5">
                        {hasPdf && version.pdfPath ? (
                          <>
                            <Button
                              type="button"
                              size="xs"
                              variant="outline"
                              onClick={() => setPreviewId(version.id)}
                            >
                              <Eye className="size-3.5" aria-hidden="true" />
                              Preview
                            </Button>
                            <a
                              href={version.pdfPath}
                              download={version.expectedFilename}
                              className="inline-flex h-6 items-center gap-1 rounded-md bg-primary px-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                            >
                              <Download className="size-3" aria-hidden="true" />
                              Download
                            </a>
                          </>
                        ) : (
                          <>
                            <Button type="button" size="xs" variant="outline" disabled>
                              <Eye className="size-3.5" aria-hidden="true" />
                              Preview
                            </Button>
                            <Button type="button" size="xs" variant="outline" disabled>
                              <Download className="size-3" aria-hidden="true" />
                              PDF
                            </Button>
                          </>
                        )}
                      </div>
                    </CardFooter>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PDF Preview Panel — only rendered when an approved PDF exists and is selected */}
      <AnimatePresence>
        {previewVersion && previewVersion.pdfPath ? (
          <motion.div
            key={previewVersion.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: MOTION_EASES.framer.out }}
          >
            <Card className="border-primary/40 bg-card/80 print:hidden">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="inline-flex items-center gap-2 text-base">
                  <FileText className="size-4 text-primary" aria-hidden="true" />
                  PDF Preview: {previewVersion.title}
                </CardTitle>
                <Button type="button" size="xs" variant="ghost" onClick={() => setPreviewId(null)}>
                  Close Preview
                </Button>
              </CardHeader>
              <CardContent>
                <object
                  data={previewVersion.pdfPath}
                  type="application/pdf"
                  className="h-[600px] w-full rounded-lg border border-border"
                >
                  <p className="text-sm text-muted-foreground">
                    Inline PDF preview is unavailable in this browser. Use the Download link instead.
                  </p>
                </object>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Focused Role Highlight Banner */}
      <AnimatePresence mode="wait">
        {selectedVersion ? (
          <motion.div
            key={selectedVersion.id}
            initial={shouldReduceMotion ? false : { opacity: 0.6, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: MOTION_EASES.framer.out }}
          >
            <Card className="border-border/80 bg-card/60">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 font-mono text-xs text-primary">
                    Role Focus: {selectedVersion.targetRole}
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground">
                    {selectedVersion.pdfAvailable ? "Verified PDF Attached" : "Web Summary Active"}
                  </span>
                </div>
                <CardTitle className="pt-1 text-lg">{selectedVersion.title} Track</CardTitle>
                <CardDescription>{selectedVersion.focusSummary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {selectedVersion.keyTechnologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    Highlighted Projects:
                  </span>
                  {selectedVersion.relevantProjectSlugs.map((slug) => {
                    const project = projectsBySlug[slug];
                    if (!project) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {project.title}
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
