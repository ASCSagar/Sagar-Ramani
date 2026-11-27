"use client";

import { useRef } from "react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { educationData } from "@/data/education";
import {
  experienceData,
  getTotalCareerDurationFormatted,
} from "@/data/experience";
import { getPublishedProjects } from "@/data/projects";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface HighlightStatItem {
  id: string;
  targetNumber: number;
  decimals: number;
  suffix: string;
  label: string;
  detail: string;
  meta: string;
}

export function CareerHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { shouldReduceMotion } = useAnimationSettings();

  const totalCareerDuration = getTotalCareerDurationFormatted();
  const publishedProjects = getPublishedProjects();
  const primaryEducation = educationData[0];

  // 4 verified statistics from portfolio data
  const STATS_ITEMS: HighlightStatItem[] = [
    {
      id: "experience",
      targetNumber: 4,
      decimals: 0,
      suffix: "+",
      label: "Confirmed Experience",
      detail: `${totalCareerDuration} cumulative across 3 engineering employers`,
      meta: "ETD · ANANT SOFT COMPUTING · LA NET TEAM",
    },
    {
      id: "tenures",
      targetNumber: experienceData.length, // 3
      decimals: 0,
      suffix: "",
      label: "Engineering Tenures",
      detail: "Progressive full-stack software development roles",
      meta: "TRAINEE TO GRADE 2 FULL STACK DEVELOPER",
    },
    {
      id: "systems",
      targetNumber: publishedProjects.length, // 10
      decimals: 0,
      suffix: "+",
      label: "Published Systems & Modules",
      detail: "Including TrueValue Platform & 6 grouped modules",
      meta: "ENTERPRISE SAAS · AI INTEGRATIONS · WORKFLOW PLATFORMS",
    },
    {
      id: "academics",
      targetNumber: 8.4,
      decimals: 1,
      suffix: "/10",
      label: "Academic Standing (CGPA)",
      detail: `${primaryEducation.degree} · ${primaryEducation.shortInstitution}`,
      meta: `${primaryEducation.specialization?.toUpperCase()} · FIRST CLASS DISTINCTION`,
    },
  ];

  useGSAP(
    () => {
      if (shouldReduceMotion) {
        STATS_ITEMS.forEach((stat, idx) => {
          const numEl = numberRefs.current[idx];
          if (numEl) {
            numEl.textContent =
              stat.decimals > 0
                ? stat.targetNumber.toFixed(stat.decimals)
                : String(stat.targetNumber);
          }
          const contentEl = contentRefs.current[idx];
          if (contentEl) {
            contentEl.style.opacity = "1";
            contentEl.style.transform = "none";
          }
        });
        return;
      }

      const triggers: ScrollTrigger[] = [];

      STATS_ITEMS.forEach((stat, idx) => {
        const cardEl = statCardRefs.current[idx];
        const numEl = numberRefs.current[idx];
        const contentEl = contentRefs.current[idx];
        if (!cardEl || !numEl) return;

        const targetNum = stat.targetNumber;
        const decimals = stat.decimals;

        // Number Counter Scrubbed Animation (Bidirectional)
        const stNum = ScrollTrigger.create({
          trigger: cardEl,
          start: "top 88%",
          end: "top 48%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentVal = progress * targetNum;
            numEl.textContent =
              decimals > 0
                ? currentVal.toFixed(decimals)
                : String(Math.round(currentVal));
          },
        });
        triggers.push(stNum);

        // Supporting Content Subtle Scrubbed Reveal
        if (contentEl) {
          const tweenContent = gsap.fromTo(
            contentEl,
            { opacity: 0.25, y: 18 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: cardEl,
                start: "top 88%",
                end: "top 52%",
                scrub: 0.5,
              },
            }
          );
          if (tweenContent.scrollTrigger) {
            triggers.push(tweenContent.scrollTrigger);
          }
        }
      });

      return () => {
        triggers.forEach((st) => st.kill());
      };
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  const leftColumnStats = [STATS_ITEMS[0], STATS_ITEMS[1]];
  const rightColumnStats = [STATS_ITEMS[2], STATS_ITEMS[3]];

  return (
    <section
      ref={sectionRef}
      id="highlights"
      aria-labelledby="highlights-heading"
      className="relative w-full overflow-hidden bg-[#0C0C0C] text-white py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-[2.5vw] selection:bg-[#D0FF35] selection:text-[#0C0C0C]"
    >
      {/* Editorial Header Bar: Large Heading Top-Left, Supporting Description Top-Right */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 w-full select-none border-b border-neutral-800/80 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D0FF35] font-semibold">
            07 {"//"} CAREER HIGHLIGHTS
          </span>
          <h2
            id="highlights-heading"
            className="mt-4 font-display text-[clamp(2.75rem,5.5vw,5.75rem)] font-bold tracking-[-0.04em] text-white leading-[0.96]"
          >
            Professional Statistics
          </h2>
        </div>

        <p className="font-body text-base sm:text-lg lg:text-xl text-neutral-400 leading-relaxed max-w-md lg:text-right">
          Confirmed metrics across engineering tenures, production SaaS platforms,
          system architectures, and academic standing.
        </p>
      </div>

      {/* Staggered Two-Column Editorial Statistics Grid matching Raglic reference */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 xl:gap-x-28 mt-16 sm:mt-20 lg:mt-24">
        {/* Left Column: Starts at natural top level */}
        <div className="flex flex-col space-y-20 sm:space-y-28 lg:space-y-36">
          {leftColumnStats.map((stat, colIdx) => {
            const actualIdx = colIdx === 0 ? 0 : 1;
            return (
              <div
                key={stat.id}
                ref={(el) => {
                  statCardRefs.current[actualIdx] = el;
                }}
                className="relative flex flex-col pt-8 sm:pt-10 border-t border-neutral-800"
                aria-label={`${stat.label}: ${stat.targetNumber}${stat.suffix}. ${stat.detail}`}
              >
                {/* Oversized Number Typography */}
                <div className="flex items-baseline font-display text-[clamp(4.5rem,10vw,10.5rem)] font-bold tracking-[-0.045em] leading-[0.92] select-none">
                  <span
                    ref={(el) => {
                      numberRefs.current[actualIdx] = el;
                    }}
                    className="tabular-nums text-white"
                  >
                    {stat.decimals > 0
                      ? stat.targetNumber.toFixed(stat.decimals)
                      : stat.targetNumber}
                  </span>
                  {stat.suffix && (
                    <span className="text-[#D0FF35] ml-1 sm:ml-2">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Supporting Description & Category Meta */}
                <div
                  ref={(el) => {
                    contentRefs.current[actualIdx] = el;
                  }}
                  className="mt-4 sm:mt-6 flex flex-col space-y-2 max-w-lg"
                >
                  <p className="font-display text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-neutral-200 leading-snug">
                    {stat.label}
                  </p>
                  <p className="font-body text-sm sm:text-base text-neutral-400 leading-relaxed">
                    {stat.detail}
                  </p>
                  <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-neutral-500 pt-1">
                    {stat.meta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Staggered downward by 88px on desktop */}
        <div className="flex flex-col space-y-20 sm:space-y-28 lg:space-y-36 mt-20 lg:mt-0 lg:pt-24">
          {rightColumnStats.map((stat, colIdx) => {
            const actualIdx = colIdx === 0 ? 2 : 3;
            return (
              <div
                key={stat.id}
                ref={(el) => {
                  statCardRefs.current[actualIdx] = el;
                }}
                className="relative flex flex-col pt-8 sm:pt-10 border-t border-neutral-800"
                aria-label={`${stat.label}: ${stat.targetNumber}${stat.suffix}. ${stat.detail}`}
              >
                {/* Oversized Number Typography */}
                <div className="flex items-baseline font-display text-[clamp(4.5rem,10vw,10.5rem)] font-bold tracking-[-0.045em] leading-[0.92] select-none">
                  <span
                    ref={(el) => {
                      numberRefs.current[actualIdx] = el;
                    }}
                    className="tabular-nums text-white"
                  >
                    {stat.decimals > 0
                      ? stat.targetNumber.toFixed(stat.decimals)
                      : stat.targetNumber}
                  </span>
                  {stat.suffix && (
                    <span className="text-[#D0FF35] ml-1 sm:ml-2">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Supporting Description & Category Meta */}
                <div
                  ref={(el) => {
                    contentRefs.current[actualIdx] = el;
                  }}
                  className="mt-4 sm:mt-6 flex flex-col space-y-2 max-w-lg"
                >
                  <p className="font-display text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-neutral-200 leading-snug">
                    {stat.label}
                  </p>
                  <p className="font-body text-sm sm:text-base text-neutral-400 leading-relaxed">
                    {stat.detail}
                  </p>
                  <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-neutral-500 pt-1">
                    {stat.meta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
