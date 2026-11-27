"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  GraduationCap,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface CareerMilestone {
  number: string;
  roleTitle: string;
  company: string;
  period: string;
  duration: string;
  location?: string;
  description: string;
  technologies: string[];
  icon: typeof Briefcase;
}

const CAREER_MILESTONES: CareerMilestone[] = [
  {
    number: "01",
    roleTitle: "Software Developer Trainee",
    company: "La Net Team",
    period: "03 January 2022 – 09 July 2022",
    duration: "6 mos",
    location: "Surat, Gujarat, India",
    description:
      "Completed software development training and transitioned into full-time web application engineering.",
    technologies: ["React", "Next.js", "Tailwind CSS", "GraphQL"],
    icon: GraduationCap,
  },
  {
    number: "02",
    roleTitle: "Software Developer",
    company: "La Net Team",
    period: "10 July 2022 – 15 September 2023",
    duration: "1 yr 2 mos",
    location: "Surat, Gujarat, India",
    description:
      "Developed UI components, integrated third-party APIs, and worked with GraphQL caching on Pabau medical practice management software. Built Next.js pages, Tailwind CSS user interfaces, GraphQL caching integration, and product image highlight/brighten features for JO~FO Salami Slicing.",
    technologies: ["React", "Next.js", "Tailwind CSS", "GraphQL", "Third-Party APIs"],
    icon: Code2,
  },
  {
    number: "03",
    roleTitle: "React Developer",
    company: "Anant Soft Computing",
    period: "18 September 2023 – 28 July 2025",
    duration: "1 yr 10 mos",
    location: "Vadodara, Gujarat, India",
    description:
      "Built frontend user interfaces and exam workflow state management for Study Streak across Reading, Writing, Listening, and Speaking test modules. Developed ERP and CRM frontend modules for Tube Master covering financial management, inventory control, production planning, and reporting views.",
    technologies: ["React", "Redux", "Bootstrap", "Frontend Engineering", "State Management"],
    icon: Layers,
  },
  {
    number: "04",
    roleTitle: "Full Stack Developer Grade 1",
    company: "ETD",
    period: "01 August 2025 – 31 August 2026",
    duration: "1 yr 1 mo",
    description:
      "Contributed across the TrueValue Platform modules (CRM, Appointments, Marketing, WhatsApp Automation, PBX, SiteFlow), FlyOverseas.ai, FlyOverseas Intelligent Chatbot, and Automated Job Aggregation.",
    technologies: ["Full Stack", "Enterprise SaaS", "Python", "AI Integration", "API Integration"],
    icon: Zap,
  },
  {
    number: "05",
    roleTitle: "Full Stack Developer Grade 2",
    company: "ETD",
    period: "01 September 2026 – 31 October 2026",
    duration: "2 mos",
    description:
      "Progressed to Full Stack Developer Grade 2; contributed across multi-module enterprise SaaS architectures, conversational AI platforms, and operational workflow automation.",
    technologies: ["Full Stack", "Enterprise SaaS", "Python", "AI Integration", "Web Automation"],
    icon: Sparkles,
  },
];

interface Point {
  x: number;
  y: number;
}

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const unrevealedPathRef = useRef<SVGPathElement>(null);
  const revealedPathRef = useRef<SVGPathElement>(null);
  const movingDotRef = useRef<SVGCircleElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalLengthRef = useRef(0);
  const calculatedNodeLengthsRef = useRef<number[]>([]);
  const { shouldReduceMotion } = useAnimationSettings();

  // Recalculate path coordinates on layout or resize
  const updatePathGeometry = () => {
    const track = trackContainerRef.current;
    const unrevealedPath = unrevealedPathRef.current;
    const revealedPath = revealedPathRef.current;
    const movingDot = movingDotRef.current;
    if (!track || !unrevealedPath || !revealedPath || !movingDot) return null;

    const width = track.clientWidth;
    const isDesktop = width >= 1024;
    const isTablet = width >= 640 && width < 1024;

    const points: Point[] = [];
    const calculatedNodes: Point[] = [];

    // Start point at horizontal center of timeline (top origin = 0)
    const startY = 0;
    const startX = isDesktop ? width * 0.5 : isTablet ? 36 : 28;
    points.push({ x: startX, y: startY });

    // Anchor points through each milestone (Milestone 01 has ~160-180px vertical separation from start)
    milestoneRefs.current.forEach((el, idx) => {
      if (!el) return;
      // Vertically align node with milestone designation/title area (~32px from card top)
      const elY = el.offsetTop + 32;

      let elX: number;
      if (isDesktop) {
        // Wide continuous S-curve: Left milestones (01, 03, 05) at 36.5%, Right (02, 04) at 63.5%
        elX = idx % 2 === 0 ? width * 0.365 : width * 0.635;
      } else {
        // Mobile single-sided timeline along left gutter
        elX = isTablet ? 36 : 28;
      }

      points.push({ x: elX, y: elY });
      calculatedNodes.push({ x: elX, y: elY });
    });

    // End point near horizontal center, cleanly above the CTA button
    const cta = ctaRef.current;
    const endY = cta ? cta.offsetTop - 32 : points[points.length - 1].y + 80;
    const endX = isDesktop ? width * 0.5 : isTablet ? 36 : 28;
    points.push({ x: endX, y: endY });

    // Construct smooth continuous cubic Bezier curve with vertical tangents at all nodes
    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const pA = points[i];
      const pB = points[i + 1];
      const dy = pB.y - pA.y;
      const cp1x = pA.x;
      const cp1y = pA.y + dy * 0.5;
      const cp2x = pB.x;
      const cp2y = pB.y - dy * 0.5;
      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${pB.x.toFixed(2)} ${pB.y.toFixed(2)}`;
    }

    unrevealedPath.setAttribute("d", d);
    revealedPath.setAttribute("d", d);

    // Update milestone node circle elements directly in SVG coordinates
    calculatedNodes.forEach((pt, idx) => {
      const circle = track.querySelector<SVGCircleElement>(`[data-node-idx="${idx}"]`);
      if (circle) {
        circle.setAttribute("cx", pt.x.toFixed(2));
        circle.setAttribute("cy", pt.y.toFixed(2));
      }
    });

    // Initialize moving dot at curve starting point
    movingDot.setAttribute("cx", points[0].x.toFixed(2));
    movingDot.setAttribute("cy", points[0].y.toFixed(2));

    const totalLength = revealedPath.getTotalLength();
    totalLengthRef.current = totalLength;

    // Calculate exact path length corresponding to each milestone node Y via binary search
    const calculatedNodeLengths: number[] = [];
    for (const node of calculatedNodes) {
      let low = 0;
      let high = totalLength;
      let bestLen = 0;
      for (let iter = 0; iter < 16; iter++) {
        const mid = (low + high) / 2;
        const pt = revealedPath.getPointAtLength(mid);
        if (pt.y < node.y) {
          bestLen = mid;
          low = mid;
        } else {
          high = mid;
        }
      }
      calculatedNodeLengths.push(bestLen);
    }
    calculatedNodeLengthsRef.current = calculatedNodeLengths;

    // Set initial dasharray and offset
    revealedPath.style.strokeDasharray = `${totalLength} ${totalLength}`;
    revealedPath.style.strokeDashoffset = `${totalLength}`;

    return { totalLength, points, calculatedNodes, calculatedNodeLengths };
  };

  useGSAP(
    () => {
      const track = trackContainerRef.current;
      const revealedPath = revealedPathRef.current;
      const movingDot = movingDotRef.current;
      if (!track || !revealedPath || !movingDot) return;

      const geometry = updatePathGeometry();
      if (!geometry) return;

      if (shouldReduceMotion) {
        revealedPath.style.strokeDashoffset = "0";
        movingDot.style.opacity = "0";
        milestoneRefs.current.forEach((el) => el?.classList.add("is-active"));
        track.querySelectorAll(".timeline-node").forEach((n) => n.classList.add("is-active"));
        return;
      }

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top 68%",
        end: "bottom 80%",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const totalLength = totalLengthRef.current;
          if (totalLength <= 0) return;

          const progress = self.progress;
          const currentLength = progress * totalLength;
          revealedPath.style.strokeDashoffset = `${Math.max(0, totalLength - currentLength)}`;

          if (currentLength > 2) {
            const pt = revealedPath.getPointAtLength(Math.min(currentLength, totalLength));
            movingDot.setAttribute("cx", pt.x.toFixed(2));
            movingDot.setAttribute("cy", pt.y.toFixed(2));
            movingDot.style.opacity = "1";

            // Bidirectional milestone activation based on exact path distance
            const nodeLengths = calculatedNodeLengthsRef.current;
            milestoneRefs.current.forEach((el, idx) => {
              if (!el) return;
              const targetLen = nodeLengths[idx];
              if (targetLen === undefined) return;

              const isReached = currentLength >= targetLen - 4;
              el.classList.toggle("is-active", isReached);

              const nodeEl = track.querySelector(`[data-node-idx="${idx}"]`);
              if (nodeEl) {
                nodeEl.classList.toggle("is-active", isReached);
              }
            });
          } else {
            movingDot.style.opacity = "0";
            milestoneRefs.current.forEach((el) => el?.classList.remove("is-active"));
            track.querySelectorAll(".timeline-node").forEach((n) => n.classList.remove("is-active"));
          }
        },
      });

      // Handle window resize dynamically
      let resizeTimer: ReturnType<typeof setTimeout>;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          updatePathGeometry();
          ScrollTrigger.refresh();
        }, 100);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        st.kill();
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      aria-label="Professional Experience Journey"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-[2.5vw] overflow-hidden bg-background text-foreground selection:bg-[#0C0C0C] selection:text-[#D0FF35]"
    >
      {/* Editorial Section Header — Full Width matching Raglic reference */}
      <div className="w-full mb-12 sm:mb-16 lg:mb-20 text-left select-none">
        <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0C]/60 dark:text-[#D0FF35] font-semibold">
          05 {"//"} PROFESSIONAL EXPERIENCE
        </span>
        <h2 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold tracking-[-0.035em] text-foreground leading-[1.02] max-w-5xl">
          From trainee foundation to enterprise platforms.
        </h2>
        <p className="mt-5 font-body text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Four confirmed years of continuous engineering experience across frontend systems,
          multi-module enterprise SaaS suites, and AI workflow integrations.
        </p>
      </div>

      {/* Timeline Track with continuous S-shaped SVG curve */}
      <div ref={trackContainerRef} className="relative w-full">
        {/* Continuous SVG Canvas */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-10"
          aria-hidden="true"
        >
          {/* Subtle dashed unrevealed path */}
          <path
            ref={unrevealedPathRef}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 7"
            className="text-neutral-300 dark:text-neutral-800"
          />

          {/* Solid lime-green revealed path with immediate hardware-accelerated update */}
          <path
            ref={revealedPathRef}
            fill="none"
            stroke="#D0FF35"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "none" }}
          />

          {/* Milestone Node Dots along the curve (17px diameter clean solid circle) */}
          {CAREER_MILESTONES.map((_, idx) => (
            <circle
              key={idx}
              data-node-idx={idx}
              r="8.5"
              className="timeline-node transition-all duration-300"
            />
          ))}

          {/* 10px lime dot riding exactly at the leading edge */}
          <circle
            ref={movingDotRef}
            r="5"
            fill="#D0FF35"
            stroke="#0C0C0C"
            strokeWidth="1.5"
            className="opacity-0 pointer-events-none"
            style={{ transition: "opacity 150ms ease" }}
          />
        </svg>

        {/* Career Milestones — pt-[140px] gives 172px vertical drop from start to milestone 01 */}
        <div className="relative z-20 flex flex-col gap-24 sm:gap-32 lg:gap-36 pt-[130px] sm:pt-[140px] lg:pt-[140px]">
          {CAREER_MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={milestone.number}
                ref={(el) => {
                  milestoneRefs.current[index] = el;
                }}
                className={cn(
                  "milestone-card relative z-20 flex flex-col transition-all duration-500",
                  // Desktop positioning: left cards end 56px left of 36.5%; right cards start 56px right of 63.5%
                  isLeft
                    ? "lg:w-[26vw] lg:max-w-[420px] lg:ml-auto lg:mr-[calc(63.5%+56px)] lg:text-right lg:items-end"
                    : "lg:w-[26vw] lg:max-w-[420px] lg:ml-[calc(63.5%+56px)] lg:mr-auto lg:text-left lg:items-start",
                  // Mobile / tablet single-sided indentation
                  "w-full pl-14 sm:pl-20 lg:pl-0"
                )}
              >
                {/* Milestone Badge: Icon & Number with prominent styling */}
                <div
                  className={cn(
                    "milestone-badge flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold transition-all duration-300",
                    isLeft ? "justify-start lg:justify-end" : "justify-start"
                  )}
                >
                  <Icon className="size-4.5 transition-colors" />
                  <span className="tracking-wider">{milestone.number}</span>
                </div>

                {/* Designation (Role Title) */}
                <h3 className="milestone-title mt-2 font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-semibold tracking-tight leading-[1.1] transition-colors duration-300">
                  {milestone.roleTitle}
                </h3>

                {/* Company, Period & Duration */}
                <div
                  className={cn(
                    "milestone-meta mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs sm:text-sm transition-colors duration-300",
                    isLeft ? "justify-start lg:justify-end" : "justify-start"
                  )}
                >
                  <span className="font-medium text-foreground">{milestone.company}</span>
                  <span className="text-muted-foreground/40">{"//"}</span>
                  <span className="text-muted-foreground">{milestone.period}</span>
                  <span className="rounded-full border border-border/70 bg-card/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {milestone.duration}
                  </span>
                </div>

                {/* Verified Description */}
                <p
                  className={cn(
                    "milestone-desc mt-3 sm:mt-4 font-body text-sm sm:text-base leading-relaxed text-muted-foreground transition-colors duration-300",
                    isLeft ? "text-left lg:text-right" : "text-left"
                  )}
                >
                  {milestone.description}
                </p>

                {/* Verified Technology Tags */}
                <div
                  className={cn(
                    "milestone-techs mt-3.5 flex flex-wrap gap-1.5 font-mono text-[10px] sm:text-[11px] transition-colors duration-300",
                    isLeft ? "justify-start lg:justify-end" : "justify-start"
                  )}
                >
                  {milestone.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/60 bg-card/60 px-2 py-0.5 text-muted-foreground/80 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Experience CTA — Compact Premium Pill Button */}
        <div ref={ctaRef} className="relative z-20 mt-16 sm:mt-20 lg:mt-24 text-center select-none">
          <Link
            href="/experience"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#0C0C0C] text-white dark:bg-white dark:text-[#0C0C0C] px-6 py-3 text-xs sm:text-sm font-mono font-medium transition-all duration-300 hover:bg-[#D0FF35] hover:text-[#0C0C0C] dark:hover:bg-[#D0FF35] dark:hover:text-[#0C0C0C] hover:shadow-[0_0_24px_rgba(208,255,55,0.35)] shadow-lg active:scale-95"
            aria-label="View Full Experience"
          >
            <span className="tracking-wide">View Full Experience</span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
