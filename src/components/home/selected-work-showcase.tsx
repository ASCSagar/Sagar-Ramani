"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Box,
  CheckCircle2,
  Cpu,
  FileText,
  Layers,
  Volume2,
} from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { getProjectBySlug, type ProjectEntry } from "@/data/projects";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface WorkProjectItem {
  number: string;
  project: ProjectEntry;
  badgeValue: string;
  badgeLabel: string;
}

const projectTrueValue = getProjectBySlug("truevalue-platform")!;
const projectFlyOverseas = getProjectBySlug("flyoverseas-ai")!;
const projectStudyStreak = getProjectBySlug("study-streak")!;
const projectTubeMaster = getProjectBySlug("tube-master")!;

const SELECTED_WORK_ITEMS: WorkProjectItem[] = [
  {
    number: "01",
    project: projectTrueValue,
    badgeValue: `${projectTrueValue.moduleSlugs?.length || 6} Modules`,
    badgeLabel: "Unified Enterprise SaaS",
  },
  {
    number: "02",
    project: projectFlyOverseas,
    badgeValue: "OpenAI API",
    badgeLabel: "AI Guidance Platform",
  },
  {
    number: "03",
    project: projectStudyStreak,
    badgeValue: "4 Modules",
    badgeLabel: "Exam State Engine",
  },
  {
    number: "04",
    project: projectTubeMaster,
    badgeValue: "Full Lifecycle",
    badgeLabel: "Manufacturing ERP & CRM",
  },
];

function ProjectVisualPreview({ item }: { item: WorkProjectItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { shouldReduceMotion } = useAnimationSettings();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isPaused = !isVisible || Boolean(shouldReduceMotion);
  const { project } = item;

  switch (item.number) {
    case "01": {
      // TrueValue Platform: Customer communications & multi-module SaaS workflow
      const moduleList = [
        "CRM",
        "APPOINTMENTS",
        "MARKETING",
        "PBX TELEPHONY",
        "WHATSAPP",
        "SITEFLOW",
      ];

      return (
        <div
          ref={containerRef}
          className={cn(
            "relative flex h-full w-full flex-col justify-between p-5 sm:p-7 md:p-8 select-none",
            isPaused && "work-preview-paused"
          )}
        >
          {/* Top Row: Stat Badge */}
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm select-none">
              <span className="block font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#0C0C0C] leading-none">
                {item.badgeValue}
              </span>
              <span className="mt-1 block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0C0C0C]/60 font-semibold">
                {item.badgeLabel}
              </span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/50 uppercase tracking-widest">
              {project.employer} {"//"} {project.category}
            </span>
          </div>

          {/* Center: Communication & dispatch exchange mirroring Raglic reference */}
          <div className="my-auto flex flex-col items-center justify-center gap-2.5 sm:gap-3 py-1 text-center">
            {/* User request bubble with subtle float */}
            <div className="animate-work-float rounded-2xl border border-white/10 bg-white/5 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm text-white/80 max-w-[85%] font-body backdrop-blur-sm">
              <span>Unify CRM, appointments, marketing, PBX telephony &amp; WhatsApp communication</span>
            </div>

            {/* Asynchronous connection indicator with signal dots */}
            <div className="flex items-center gap-1.5 py-0.5" aria-hidden="true">
              <div className="h-2 w-[1px] bg-white/20" />
              <span className="flex items-center gap-1">
                <span className="size-1 rounded-full bg-[#D0FF35] animate-ping" />
                <span className="size-1 rounded-full bg-[#D0FF35]/70" />
                <span className="size-1 rounded-full bg-[#D0FF35]/40" />
              </span>
              <div className="h-2 w-[1px] bg-white/20" />
            </div>

            {/* Neon lime system response bubble */}
            <div className="rounded-2xl bg-[#D0FF35] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#0C0C0C] max-w-[88%] font-body shadow-[0_0_20px_rgba(208,255,55,0.12)]">
              <span>TrueValue Platform: All operational modules connected under one centralized suite.</span>
            </div>

            {/* Status indicator with radar ping on checkmark */}
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10.5px] sm:text-[11.5px] text-[#D0FF35]">
              <div className="relative flex items-center justify-center">
                <span className="animate-work-radar absolute size-3.5 rounded-full bg-[#D0FF35]/40" />
                <CheckCircle2 className="relative size-3.5 text-[#D0FF35]" />
              </div>
              <span className="font-semibold uppercase tracking-wider">VERIFIED SAAS SUITE · MULTI-MODULE ECOSYSTEM</span>
            </div>
          </div>

          {/* Bottom Module Pills with sequential highlight cycle */}
          <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-mono">
            {moduleList.map((mod, idx) => (
              <span
                key={mod}
                className="animate-work-module rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-white/40 transition-colors"
                style={{
                  animationDelay: `${idx * 1}s`,
                }}
              >
                {mod}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case "02": {
      // FlyOverseas.ai: Real-time LLM advisory & candidate evaluation
      return (
        <div
          ref={containerRef}
          className={cn(
            "relative flex h-full w-full flex-col justify-between p-5 sm:p-7 md:p-8 select-none",
            isPaused && "work-preview-paused"
          )}
        >
          {/* Top Row: Stat Badge */}
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm select-none">
              <span className="block font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#0C0C0C] leading-none">
                {item.badgeValue}
              </span>
              <span className="mt-1 block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0C0C0C]/60 font-semibold">
                {item.badgeLabel}
              </span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-[#D0FF35] uppercase tracking-widest">
              {project.employer} {"//"} {project.category}
            </span>
          </div>

          {/* Center: Candidate Scoring & Evaluation Panel */}
          <div className="my-auto w-full max-w-md mx-auto space-y-3 py-1">
            <div className="flex items-center gap-3">
              <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#D0FF35] font-mono font-bold text-xs text-[#0C0C0C]">
                <span className="animate-work-radar absolute inset-0 rounded-lg bg-[#D0FF35]/50 pointer-events-none" />
                <Bot className="size-4.5 text-[#0C0C0C]" />
              </div>
              <div className="text-left">
                <span className="block font-heading text-xs sm:text-sm font-semibold text-white">
                  FlyOverseas.ai Web Platform &amp; Conversational Assistant
                  <span className="inline-block size-1.5 rounded-full bg-[#D0FF35] animate-ping ml-2 align-middle" />
                </span>
                <span className="block font-mono text-[10px] text-white/50">
                  AI-enabled guidance platform developed during engineering tenure at ETD
                </span>
              </div>
            </div>

            {/* Verified Architectural Workflows with dynamic signal lines and shimmer beams */}
            <div className="space-y-2 text-left font-mono text-[10.5px]">
              <div>
                <div className="flex items-center justify-between pb-0.5">
                  <span className="text-white/70">OpenAI API Conversational Assistant</span>
                  <span className="flex items-center gap-1.5 text-[#D0FF35]">
                    <span className="size-1.5 rounded-full bg-[#D0FF35]" />
                    Active
                  </span>
                </div>
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 w-[94%] rounded-full bg-[#D0FF35]" />
                  <div className="animate-work-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pb-0.5">
                  <span className="text-white/70">Overseas Guidance &amp; Consultation Workflows</span>
                  <span className="flex items-center gap-1.5 text-[#D0FF35]">
                    <span className="size-1.5 rounded-full bg-[#D0FF35]" />
                    Verified
                  </span>
                </div>
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 w-[88%] rounded-full bg-[#D0FF35]" />
                  <div
                    className="animate-work-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pb-0.5">
                  <span className="text-white/70">Scalable Full Stack Architecture</span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Production
                  </span>
                </div>
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 w-[96%] rounded-full bg-emerald-400" />
                  <div
                    className="animate-work-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    style={{ animationDelay: "1.2s" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#D0FF35] pt-0.5">
              <div className="relative flex items-center justify-center">
                <span className="animate-work-radar absolute size-3.5 rounded-full bg-[#D0FF35]/40" />
                <CheckCircle2 className="relative size-3.5 text-[#D0FF35]" />
              </div>
              <span className="font-semibold uppercase tracking-wider">VERIFIED ARCHITECTURE · PRODUCTION AI INTEGRATION</span>
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-mono text-white/40">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                {tech.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case "03": {
      // Study Streak: Online test preparation & multi-section exam state
      const WAVE_HEIGHTS = [
        45, 75, 30, 90, 60, 35, 85, 100, 50, 70, 85, 40, 95, 55, 80, 45, 90, 65, 35, 75, 95, 50, 70, 40,
      ];

      return (
        <div
          ref={containerRef}
          className={cn(
            "relative flex h-full w-full flex-col justify-between p-5 sm:p-7 md:p-8 select-none",
            isPaused && "work-preview-paused"
          )}
        >
          {/* Top Row: Stat Badge */}
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm select-none">
              <span className="block font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#0C0C0C] leading-none">
                {item.badgeValue}
              </span>
              <span className="mt-1 block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0C0C0C]/60 font-semibold">
                {item.badgeLabel}
              </span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/50 uppercase tracking-widest">
              {project.employer} {"//"} {project.category}
            </span>
          </div>

          {/* Center: Standardized Test Assessment Interface */}
          <div className="my-auto w-full max-w-md mx-auto space-y-3 py-1 text-center">
            {/* 4 Test Section Pills */}
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px]">
              <span className="rounded border border-[#D0FF35] bg-[#D0FF35]/10 px-1 py-1 text-[#D0FF35] font-semibold">
                Reading
              </span>
              <span className="rounded border border-white/10 bg-white/5 px-1 py-1 text-white/60">
                Writing
              </span>
              <span className="flex items-center justify-center gap-1 rounded border border-[#D0FF35] bg-[#D0FF35] px-1 py-1 text-[#0C0C0C] font-bold">
                <span>Listening</span>
                <span className="relative flex size-1.5">
                  <span className="absolute size-full rounded-full bg-[#0C0C0C] animate-ping" />
                  <span className="relative size-1.5 rounded-full bg-[#0C0C0C]" />
                </span>
              </span>
              <span className="rounded border border-white/10 bg-white/5 px-1 py-1 text-white/60">
                Speaking
              </span>
            </div>

            {/* Listening Waveform Track with active dynamic equalizer & sweeping playhead */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col gap-2 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between font-mono text-[10px] text-white/70">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="size-3.5 text-[#D0FF35]" /> Mock, Practice &amp; Full-Length Exams
                </span>
                <span className="text-[#D0FF35]">IELTS · TOEFL · GRE · PTE</span>
              </div>

              {/* Dynamic Oscillating Waveform graphic */}
              <div className="relative flex items-end justify-between gap-1 h-6 px-1 overflow-hidden">
                {/* Audio playhead scanner line */}
                <div
                  className="animate-work-playhead pointer-events-none absolute inset-y-0 w-0.5 bg-[#D0FF35] shadow-[0_0_8px_#D0FF35] z-10"
                  aria-hidden="true"
                />

                {WAVE_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1 rounded-full transition-colors",
                      i < 15 ? "bg-[#D0FF35]" : "bg-white/20",
                      "animate-work-wave"
                    )}
                    style={{
                      height: `${h}%`,
                      animationDuration: `${0.65 + (i % 5) * 0.15}s`,
                      animationDelay: `${(i % 7) * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 font-mono text-[10.5px] text-[#D0FF35]">
              <div className="relative flex items-center justify-center">
                <span className="animate-work-radar absolute size-3.5 rounded-full bg-[#D0FF35]/40" />
                <CheckCircle2 className="relative size-3.5 text-[#D0FF35]" />
              </div>
              <span className="font-semibold uppercase tracking-wider">VERIFIED APPLICATION · REACT &amp; REDUX STATE MANAGEMENT</span>
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-mono text-white/40">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                {tech.toUpperCase()}
              </span>
            ))}
            {project.liveUrl && (
              <span className="rounded-md border border-[#D0FF35]/30 bg-[#D0FF35]/10 px-2 py-0.5 text-[#D0FF35]">
                LIVE: STUDYSTREAK.IN
              </span>
            )}
          </div>
        </div>
      );
    }

    case "04":
    default: {
      // Tube Master: Manufacturing ERP & CRM Pipeline
      const pipelineNodes = [
        { label: "FINANCE", icon: Box },
        { label: "INVENTORY", icon: Layers },
        { label: "PRODUCTION", icon: Cpu },
        { label: "REPORTS", icon: FileText },
      ];

      return (
        <div
          ref={containerRef}
          className={cn(
            "relative flex h-full w-full flex-col justify-between p-5 sm:p-7 md:p-8 select-none",
            isPaused && "work-preview-paused"
          )}
        >
          {/* Top Row: Stat Badge */}
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm select-none">
              <span className="block font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#0C0C0C] leading-none">
                {item.badgeValue}
              </span>
              <span className="mt-1 block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0C0C0C]/60 font-semibold">
                {item.badgeLabel}
              </span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/50 uppercase tracking-widest">
              {project.employer} {"//"} {project.category}
            </span>
          </div>

          {/* Center: Operational Modules Pipeline with traveling data packet */}
          <div className="my-auto w-full max-w-md mx-auto py-1 text-center space-y-3">
            <div className="relative py-2">
              {/* Horizontal Connecting Track behind nodes */}
              <div
                className="pointer-events-none absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 overflow-visible z-0"
                aria-hidden="true"
              >
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <line
                    x1="12%"
                    y1="50%"
                    x2="88%"
                    y2="50%"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>
                {/* Traveling glowing neon lime data packet */}
                <div
                  className="animate-work-packet absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-2.5 rounded-sm bg-[#D0FF35] shadow-[0_0_10px_#D0FF35]"
                />
              </div>

              {/* 4 Pipeline Nodes */}
              <div className="relative z-10 grid grid-cols-4 items-center gap-2">
                {pipelineNodes.map((node, idx) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.label}
                      className="animate-work-node flex flex-col items-center rounded-xl border border-white/10 bg-[#0C0C0C]/90 p-2 text-center backdrop-blur-sm transition-all"
                      style={{
                        animationDelay: `${idx * 1}s`,
                      }}
                    >
                      <Icon className="size-4 text-[#D0FF35] mb-0.5" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white font-medium">
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="font-mono text-[10.5px] text-white/60 tracking-wide">
              UNIFIED WEB INTERFACES ACROSS OPERATIONAL WORKFLOWS
            </div>

            <div className="flex items-center justify-center gap-1.5 font-mono text-[10.5px] text-[#D0FF35]">
              <div className="relative flex items-center justify-center">
                <span className="animate-work-radar absolute size-3.5 rounded-full bg-[#D0FF35]/40" />
                <CheckCircle2 className="relative size-3.5 text-[#D0FF35]" />
              </div>
              <span className="font-semibold uppercase tracking-wider">VERIFIED APPLICATION · REST API INTEGRATION</span>
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-mono text-white/40">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                {tech.toUpperCase()}
              </span>
            ))}
            {project.liveUrl && (
              <span className="rounded-md border border-[#D0FF35]/30 bg-[#D0FF35]/10 px-2 py-0.5 text-[#D0FF35]">
                LIVE: TUBEMASTERCRM.COM
              </span>
            )}
          </div>
        </div>
      );
    }
  }
}

export function SelectedWorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveRef = useRef(1);
  const [activeProject, setActiveProject] = useState(1);
  const { shouldReduceMotion } = useAnimationSettings();

  const totalProjects = SELECTED_WORK_ITEMS.length;
  const formattedCounter = `${String(activeProject).padStart(2, "0")} / ${String(totalProjects).padStart(2, "0")}`;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // Desktop: Pinned bidirectional horizontal scrolling
      mm.add(
        "(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)",
        () => {
          const getScrollDistance = () => {
            return Math.max(0, track.scrollWidth - window.innerWidth);
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              anticipatePin: 1,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              scrub: 0.5,
              invalidateOnRefresh: true,
              onUpdate: () => {
                // Determine active project based on panel alignment relative to viewport focal point
                const focalPoint = window.innerWidth * 0.52;
                let current = 1;
                cardRefs.current.forEach((el, idx) => {
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.left <= focalPoint) {
                      current = idx + 1;
                    }
                  }
                });
                current = Math.min(Math.max(1, current), totalProjects);
                if (current !== lastActiveRef.current) {
                  lastActiveRef.current = current;
                  setActiveProject(current);
                }
              },
            },
          });

          // Horizontal track translation
          tl.to(
            track,
            {
              x: () => -getScrollDistance(),
              ease: "none",
            },
            0
          );

          // Horizontal progress line translation / scaleX synchronized with scrub
          if (progressBarRef.current) {
            tl.fromTo(
              progressBarRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: "none" },
              0
            );
          }

          return () => {
            tl.kill();
          };
        }
      );

      // Tablet and mobile: Track vertical scroll progress and active project index
      mm.add("(max-width: 1023px)", () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top 25%",
          end: "bottom 75%",
          scrub: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
            let current = 1;
            const focalY = window.innerHeight * 0.45;
            cardRefs.current.forEach((el, idx) => {
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= focalY) {
                  current = idx + 1;
                }
              }
            });
            current = Math.min(Math.max(1, current), totalProjects);
            if (current !== lastActiveRef.current) {
              lastActiveRef.current = current;
              setActiveProject(current);
            }
          },
        });

        return () => {
          st.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      aria-label="Selected Work Showcase"
      onPointerLeave={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cursor:reset"));
        }
      }}
      className="relative w-full overflow-hidden border-y border-black/10 bg-[#F4F4F0] text-[#0C0C0C] px-4 py-20 sm:px-6 sm:py-28 lg:px-0 lg:h-screen lg:min-h-[640px] lg:flex lg:flex-col lg:justify-between lg:py-8 xl:py-10 selection:bg-[#0C0C0C] selection:text-[#D0FF35]"
    >
      {/* Top Header Bar: visible across responsive breakpoints */}
      <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-[2.5vw] shrink-0 mb-6 lg:mb-4 xl:mb-6 select-none">
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#0C0C0C]/50">
          CASE STUDIES {"//"} SELECTED WORK
        </span>
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs text-[#0C0C0C]/70">
          <span className="tabular-nums font-medium">{formattedCounter}</span>
          <div
            role="progressbar"
            aria-label="Selected work progress"
            aria-valuenow={Math.round((activeProject / totalProjects) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-[1.5px] w-24 sm:w-36 lg:w-44 bg-[#0C0C0C]/15 overflow-hidden"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-[#0C0C0C] origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      {/* Main Track Viewport: Contains Heading Block, all 4 Project Cards, and View All CTA in one continuous track */}
      <div className="w-full overflow-hidden my-auto">
        <div
          ref={trackRef}
          data-horizontal-track
          className="flex flex-col gap-12 sm:gap-14 lg:flex-row lg:flex-nowrap lg:items-stretch lg:gap-8 xl:gap-10 pl-4 sm:pl-6 lg:pl-[2.5vw] pr-4 sm:pr-6 lg:pr-[2.5vw] w-full lg:w-max will-change-transform"
        >
          {/* 00: Heading Block — Slides out naturally with the project panels */}
          <div className="w-full lg:w-[28vw] xl:w-[26vw] lg:shrink-0 flex flex-col justify-between py-2 sm:py-3 mb-8 lg:mb-0 select-none">
            <div>
              <h2 className="font-display text-[clamp(2.75rem,5.5vw,5.75rem)] font-bold tracking-[-0.04em] text-[#0C0C0C] leading-[0.94]">
                Selected
                <br />
                work
              </h2>
            </div>
            <p className="mt-6 lg:mt-auto font-body text-sm sm:text-base lg:text-lg text-[#0C0C0C]/70 leading-relaxed max-w-sm">
              Real-world applications. Scalable systems. Meaningful engineering.
            </p>
          </div>

          {/* Project Panels 01 — 04: Sourced directly from verified project data */}
          {SELECTED_WORK_ITEMS.map((item, index) => (
            <div
              key={item.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="w-full lg:w-[46vw] shrink-0 flex flex-col"
            >
              <Link
                href={`/projects/${item.project.slug}`}
                className="group flex flex-col gap-4 sm:gap-5 outline-none focus-visible:ring-2 focus-visible:ring-[#0C0C0C] rounded-2xl"
                aria-label={`View ${item.project.title} project case study`}
              >
                {/* 16:9 Aspect Ratio Dark Preview Box with circular VIEW cursor */}
                <div
                  data-cursor="view"
                  className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl bg-[#0C0C0C] text-white overflow-hidden border border-black/10 shadow-lg transition-transform duration-300 group-hover:scale-[1.01] cursor-pointer"
                >
                  {/* Subtle Radial Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(208,255,55,0.06),transparent_65%)]"
                  />

                  {/* Conceptual Interface Preview */}
                  <ProjectVisualPreview item={item} />
                </div>

                {/* Below Preview: Number, Large Title, Company/Category, and Arrow Icon */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#0C0C0C]/50">
                        {item.number}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#0C0C0C] transition-colors group-hover:text-black">
                        {item.project.title}
                      </h3>
                    </div>

                    {/* Circular Arrow Button */}
                    <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full border border-[#0C0C0C]/25 transition-all duration-300 group-hover:border-[#0C0C0C] group-hover:bg-[#0C0C0C] group-hover:text-[#D0FF35]">
                      <ArrowUpRight
                        className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-wider uppercase text-[#0C0C0C]/60">
                    <span>{item.project.employer}</span>
                    <span>{"//"}</span>
                    <span>{item.project.category}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* 05: View All Projects CTA (Feature 07.6) */}
          <div className="w-full lg:w-auto shrink-0 flex items-center justify-center pt-2 lg:pt-0 pb-6 lg:pb-0 pl-0 lg:pl-6 pr-4 sm:pr-6 lg:pr-[2.5vw]">
            <div className="w-full lg:w-auto flex items-center justify-center lg:aspect-[16/9]">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0C0C0C] px-7 py-4 sm:px-8 sm:py-4.5 text-xs sm:text-sm font-mono font-medium text-white transition-all duration-300 hover:bg-[#D0FF35] hover:text-[#0C0C0C] hover:shadow-[0_0_28px_rgba(208,255,55,0.3)] shadow-lg select-none whitespace-nowrap active:scale-95"
                aria-label="View All Projects"
              >
                <span className="tracking-wide">View All Projects</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Meta: visible on desktop inside the pinned section */}
      <div className="hidden lg:flex items-center justify-between w-full px-[2.5vw] shrink-0 mt-4 xl:mt-6 font-mono text-[11px] text-[#0C0C0C]/40 uppercase tracking-widest select-none">
        <span>HORIZONTAL EXPLORATION</span>
        <span>SCROLL TO ADVANCE →</span>
      </div>
    </section>
  );
}
