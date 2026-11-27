"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { getProjectBySlug } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";

const truevalueProject = getProjectBySlug("truevalue-platform")!;

// 4 verified platform modules for the minimal feature grid
const FEATURED_MODULES = [
  {
    title: "TrueValue CRM",
    description:
      "Customer relationship management module uniting client pipelines, contact records, and interaction histories.",
  },
  {
    title: "TrueValue Appointments",
    description:
      "Scheduling and booking management module connected across operational calendars and enterprise workflows.",
  },
  {
    title: "TrueValue Marketing",
    description:
      "Outbound campaigns and communication workflow module driving coordinated engagement channels.",
  },
  {
    title: "WhatsApp Automation",
    description:
      "Automated messaging integration module and event-driven webhook communication within the suite.",
  },
];

export function FeaturedProjectSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGGElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);

  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const section = sectionRef.current;
      const leftContent = leftContentRef.current;
      const frame = frameRef.current;
      const linesGroup = svgLinesRef.current;
      if (!section || !leftContent || !frame) return;

      const paths = linesGroup ? linesGroup.querySelectorAll<SVGPathElement>("path") : [];

      // Initialize path stroke dashoffsets
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      // Create a scrubbed bidirectional ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 85%",
          scrub: 0.5,
        },
      });

      // Left content subtle reveal
      tl.fromTo(
        leftContent,
        { opacity: 0.4, y: 24 },
        { opacity: 1, y: 0, ease: "none", duration: 0.4 }
      );

      // Browser frame entry
      tl.fromTo(
        frame,
        { opacity: 0.5, y: 32 },
        { opacity: 1, y: 0, ease: "none", duration: 0.4 },
        "<0.1"
      );

      // Progressive drawing of connecting workflow lines
      paths.forEach((path) => {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: 0.5,
          },
          "<0.1"
        );
      });

      // Staggered node illumination
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        tl.fromTo(
          node,
          { opacity: 0.35, scale: 0.94, transformOrigin: "center center" },
          { opacity: 1, scale: 1, ease: "none", duration: 0.3 },
          "<0.08"
        );
      });
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="spotlight"
      aria-labelledby="spotlight-heading"
      className="relative w-full overflow-hidden bg-[#F4F4F0] text-[#0C0C0C] py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-[2.5vw] selection:bg-[#0C0C0C] selection:text-[#D0FF35] border-t border-black/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center w-full">
        {/* Left Column: Heading, Description, Minimal Feature Grid & CTA (55% on desktop) */}
        <div ref={leftContentRef} className="lg:col-span-7 flex flex-col justify-between select-none">
          {/* Eyebrow Label with Node Icon */}
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#D0FF35] border border-[#0C0C0C]/60" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0C]/55 font-semibold">
              08 {"//"} FEATURED PLATFORM SPOTLIGHT · ETD
            </span>
          </div>

          {/* Oversized Editorial Heading */}
          <h2
            id="spotlight-heading"
            className="mt-5 font-display text-[clamp(2.5rem,5.2vw,5.5rem)] font-bold tracking-[-0.04em] text-[#0C0C0C] leading-[0.98]"
          >
            {truevalueProject.title}.
            <br />
            <span className="text-[#0C0C0C]/80 font-medium">
              Multi-module enterprise SaaS suite.
            </span>
          </h2>

          {/* Verified Project Description */}
          <p className="mt-6 sm:mt-8 font-body text-base sm:text-lg lg:text-xl text-[#0C0C0C]/75 leading-relaxed max-w-2xl">
            {truevalueProject.detailedOverview}
          </p>

          {/* Minimal Feature Grid (Two Columns matching Raglic reference) */}
          <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 border-t border-[#0C0C0C]/15 pt-8">
            {FEATURED_MODULES.map((module) => (
              <div key={module.title} className="flex flex-col space-y-1.5">
                <h3 className="font-display text-base sm:text-lg font-semibold tracking-tight text-[#0C0C0C]">
                  {module.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#0C0C0C]/70 leading-relaxed">
                  {module.description}
                </p>
              </div>
            ))}
          </div>

          {/* Supporting modules footnote */}
          <p className="mt-6 font-mono text-[11px] text-[#0C0C0C]/45 uppercase tracking-wide">
            Also uniting TrueValue PBX Telephony and TrueValue SiteFlow web workflow modules.
          </p>

          {/* Black Pill Project CTA Button */}
          <div className="mt-10 sm:mt-12">
            <Link
              href={`/projects/${truevalueProject.slug}`}
              className="group inline-flex items-center gap-3 rounded-full bg-[#0C0C0C] text-white hover:bg-[#D0FF35] hover:text-[#0C0C0C] px-8 py-4 font-mono text-xs sm:text-sm font-medium transition-all duration-300 shadow-xl active:scale-95"
              aria-label={`Explore ${truevalueProject.title}`}
            >
              <span className="tracking-wide">Explore {truevalueProject.title}</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Browser-Style Conceptual Workflow Visualization (45% on desktop) */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div
            ref={frameRef}
            className="relative w-full max-w-lg lg:max-w-none bg-white rounded-[24px] sm:rounded-[28px] border border-[#0C0C0C]/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden p-5 sm:p-7 flex flex-col justify-between aspect-[4/3] sm:aspect-[16/11]"
          >
            {/* Top Browser Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#0C0C0C]/10 select-none">
              {/* Browser Dots */}
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#0C0C0C]/20" />
                <span className="size-2.5 rounded-full bg-[#0C0C0C]/20" />
                <span className="size-2.5 rounded-full bg-[#0C0C0C]/20" />
              </div>

              {/* Verified Domain / Module Identifier */}
              <span className="font-mono text-[10px] sm:text-[11px] text-[#0C0C0C]/50 uppercase tracking-widest font-medium">
                TRUEVALUE.PLATFORM // ETD.SYS
              </span>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 font-semibold">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Conceptual SVG Architecture Flow matching Raglic Nodely composition */}
            <div className="relative w-full flex-1 flex items-center justify-center py-4 sm:py-6">
              <svg
                viewBox="0 0 460 260"
                className="w-full h-full max-h-[260px] overflow-visible"
                aria-label="Conceptual system workflow diagram of TrueValue Platform modules"
              >
                {/* Arrowhead marker definitions */}
                <defs>
                  <marker
                    id="arrowhead-spotlight"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#0C0C0C" />
                  </marker>
                </defs>

                {/* Connecting SVG paths */}
                <g ref={svgLinesRef}>
                  {/* CRM to Unified Engine */}
                  <path
                    d="M 110 49 L 190 49"
                    fill="none"
                    stroke="#0C0C0C"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-spotlight)"
                  />

                  {/* Platform Core down to API Router */}
                  <path
                    d="M 250 73 L 250 125"
                    fill="none"
                    stroke="#0C0C0C"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-spotlight)"
                  />

                  {/* Platform Core to Appointments */}
                  <path
                    d="M 310 49 L 397.5 49 L 397.5 130"
                    fill="none"
                    stroke="#0C0C0C"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-spotlight)"
                  />

                  {/* Appointments to API Router */}
                  <path
                    d="M 350 150 L 285 150"
                    fill="none"
                    stroke="#0C0C0C"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-spotlight)"
                  />

                  {/* API Router to WhatsApp Automation */}
                  <path
                    d="M 215 150 L 102.5 150 L 102.5 180"
                    fill="none"
                    stroke="#0C0C0C"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-spotlight)"
                  />
                </g>

                {/* Node 1: CRM Core (Top Left) */}
                <g
                  ref={(el) => {
                    nodeRefs.current[0] = el;
                  }}
                >
                  <rect
                    x="20"
                    y="29"
                    width="90"
                    height="40"
                    rx="10"
                    fill="#F7F7F7"
                    stroke="#0C0C0C"
                    strokeWidth="1.5"
                  />
                  <text
                    x="65"
                    y="54"
                    textAnchor="middle"
                    fontFamily="var(--font-display, sans-serif)"
                    fontSize="12"
                    fontWeight="600"
                    fill="#0C0C0C"
                  >
                    CRM Core
                  </text>
                </g>

                {/* Node 2: Unified Platform Engine (Top Center — Neon Lime Accent) */}
                <g
                  ref={(el) => {
                    nodeRefs.current[1] = el;
                  }}
                >
                  <rect
                    x="190"
                    y="25"
                    width="120"
                    height="48"
                    rx="14"
                    fill="#D0FF35"
                    stroke="#0C0C0C"
                    strokeWidth="2"
                  />
                  <text
                    x="250"
                    y="48"
                    textAnchor="middle"
                    fontFamily="var(--font-display, sans-serif)"
                    fontSize="13"
                    fontWeight="700"
                    fill="#0C0C0C"
                  >
                    Platform Core
                  </text>
                  <text
                    x="250"
                    y="63"
                    textAnchor="middle"
                    fontFamily="var(--font-mono, monospace)"
                    fontSize="8.5"
                    fontWeight="500"
                    fill="#0C0C0C"
                    opacity="0.8"
                  >
                    UNIFIED ENGINE
                  </text>
                </g>

                {/* Node 3: Appointments Module (Right Side) */}
                <g
                  ref={(el) => {
                    nodeRefs.current[2] = el;
                  }}
                >
                  <rect
                    x="350"
                    y="130"
                    width="95"
                    height="40"
                    rx="10"
                    fill="#F7F7F7"
                    stroke="#0C0C0C"
                    strokeWidth="1.5"
                  />
                  <text
                    x="397.5"
                    y="154"
                    textAnchor="middle"
                    fontFamily="var(--font-display, sans-serif)"
                    fontSize="11.5"
                    fontWeight="600"
                    fill="#0C0C0C"
                  >
                    Appointments
                  </text>
                </g>

                {/* Node 4: API Router / Webhook Gateway (Diamond Shape) */}
                <g
                  ref={(el) => {
                    nodeRefs.current[3] = el;
                  }}
                >
                  <polygon
                    points="250,125 285,150 250,175 215,150"
                    fill="#FFFFFF"
                    stroke="#0C0C0C"
                    strokeWidth="1.5"
                  />
                  <text
                    x="250"
                    y="154"
                    textAnchor="middle"
                    fontFamily="var(--font-mono, monospace)"
                    fontSize="9.5"
                    fontWeight="600"
                    fill="#0C0C0C"
                  >
                    API Router
                  </text>
                </g>

                {/* Node 5: WhatsApp Automation & PBX (Bottom Left — Solid Black Pill) */}
                <g
                  ref={(el) => {
                    nodeRefs.current[4] = el;
                  }}
                >
                  <rect
                    x="30"
                    y="180"
                    width="145"
                    height="44"
                    rx="22"
                    fill="#0C0C0C"
                    stroke="#0C0C0C"
                    strokeWidth="1.5"
                  />
                  <text
                    x="102.5"
                    y="207"
                    textAnchor="middle"
                    fontFamily="var(--font-display, sans-serif)"
                    fontSize="12"
                    fontWeight="600"
                    fill="#FAF8F5"
                  >
                    WhatsApp & PBX
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Caption within the Browser Frame */}
            <div className="flex items-center justify-between pt-3 border-t border-[#0C0C0C]/10 select-none">
              <span className="font-mono text-[9.5px] sm:text-[10px] text-[#0C0C0C]/50 uppercase tracking-wider">
                CONCEPTUAL SYSTEM WORKFLOW · 6 VERIFIED MODULES
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10px] text-[#0C0C0C]/70 font-medium">
                ETD TENURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
