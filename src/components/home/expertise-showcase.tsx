"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Layers,
  Network,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { profileData } from "@/data/profile";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface ExpertiseItem {
  number: string;
  title: string;
  description: string;
  href: string;
  category: string;
  tags: string[];
}

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    number: "01",
    title: "Full Stack Development",
    description: profileData.strengths[0].description,
    href: "/projects",
    category: "Architecture & Systems",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    number: "02",
    title: "Frontend Engineering",
    description:
      "Translating complex workflows, multi-section assessments, and dashboards into maintainable React and Next.js component trees.",
    href: "/skills",
    category: "Interfaces & Performance",
    tags: ["React", "Next.js", "Tailwind CSS", "GSAP"],
  },
  {
    number: "03",
    title: "Backend Engineering",
    description:
      "RESTful and GraphQL APIs using Node.js, Express.js, Python, and Django REST Framework with relational and document databases.",
    href: "/skills",
    category: "Services & Databases",
    tags: ["Node.js", "Express", "Django REST", "PostgreSQL"],
  },
  {
    number: "04",
    title: "Enterprise SaaS Solutions",
    description: profileData.strengths[1].description,
    href: "/experience",
    category: "Cloud & Multi-Tenancy",
    tags: ["TrueValue Suite", "Multi-Tenant", "RBAC", "Modular ERP"],
  },
  {
    number: "05",
    title: "API & System Integrations",
    description: profileData.strengths[2].description,
    href: "/skills",
    category: "Protocols & Gateways",
    tags: ["REST & GraphQL", "Stripe Gateway", "Webhooks", "WhatsApp & PBX"],
  },
  {
    number: "06",
    title: "AI & Workflow Automation",
    description: profileData.strengths[3].description,
    href: "/projects",
    category: "Autonomous Systems",
    tags: ["OpenAI API", "Agent Workflows", "Playwright", "Web Automation"],
  },
];

function ExpertisePreviewVisual({ item }: { item: ExpertiseItem }) {
  switch (item.number) {
    case "01":
      return (
        <div className="flex h-full flex-col justify-between p-5 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#D0FF35]">
              <Layers className="size-3.5" />
              FULL STACK RUNTIME
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
              HEALTHY
            </span>
          </div>

          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="flex items-center gap-2 font-mono text-[11px] text-white">
                <Globe className="size-3 text-[#D0FF35]" /> Next.js App Router (SSR/ISR)
              </span>
              <span className="font-mono text-[10px] text-white/50">Edge Runtime</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="flex items-center gap-2 font-mono text-[11px] text-white">
                <Server className="size-3 text-[#D0FF35]" /> Node.js & Server Actions
              </span>
              <span className="font-mono text-[10px] text-emerald-400">18ms p95</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="flex items-center gap-2 font-mono text-[11px] text-white">
                <Database className="size-3 text-[#D0FF35]" /> PostgreSQL & Redis Cache
              </span>
              <span className="font-mono text-[10px] text-white/50">Pool: 24 active</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-[10.5px] text-white/50">
            <span>End-to-end type safety</span>
            <span className="font-mono text-[#D0FF35]">TypeScript 5.x</span>
          </div>
        </div>
      );

    case "02":
      return (
        <div className="flex h-full flex-col justify-between p-5 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#D0FF35]">
              <Code2 className="size-3.5" />
              FRONTEND BENCHMARKS
            </span>
            <span className="rounded-full bg-[#D0FF35]/20 px-2 py-0.5 font-mono text-[10px] text-[#D0FF35]">
              120 FPS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 text-center">
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <span className="block font-mono text-[18px] font-bold text-white">0.6s</span>
              <span className="text-[10px] text-white/50">LCP Fast</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <span className="block font-mono text-[18px] font-bold text-[#D0FF35]">12ms</span>
              <span className="text-[10px] text-white/50">INP Latency</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <span className="block font-mono text-[18px] font-bold text-white">0.00</span>
              <span className="text-[10px] text-white/50">CLS Zero</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-1.5 font-mono text-[10.5px] text-white/70">
            <span>CSS Variables · Fluid clamp() · GPU</span>
            <span className="text-emerald-400">100/100</span>
          </div>
        </div>
      );

    case "03":
      return (
        <div className="flex h-full flex-col justify-between p-5 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#D0FF35]">
              <Server className="size-3.5" />
              BACKEND API ARCHITECTURE
            </span>
            <span className="font-mono text-[10px] text-white/50">99.99% SLA</span>
          </div>

          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
              <span className="font-mono text-[11px] text-emerald-300">POST /api/v1/auth/session</span>
              <span className="font-mono text-[10px] text-emerald-400">200 OK · 14ms</span>
            </div>
            <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="font-mono text-[11px] text-white/80">Redis Cache &amp; Queues</span>
              <span className="font-mono text-[10px] text-[#D0FF35]">98.4% Hit</span>
            </div>
            <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="font-mono text-[11px] text-white/80">Django ORM &amp; PostgreSQL Pool</span>
              <span className="font-mono text-[10px] text-white/50">Zero N+1</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-white/50">
            <span>High-Concurrency Services</span>
            <span className="font-mono text-[#D0FF35]">Node.js &amp; Django REST</span>
          </div>
        </div>
      );

    case "04":
      return (
        <div className="flex h-full flex-col justify-between p-5 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#D0FF35]">
              <ShieldCheck className="size-3.5" />
              MULTI-TENANT FABRIC
            </span>
            <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] text-cyan-400">
              ISOLATED
            </span>
          </div>

          <div className="space-y-2.5 py-2">
            <div className="rounded-md border border-white/10 bg-white/5 p-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-white">TrueValue Platform</span>
                <span className="font-mono text-[10px] text-[#D0FF35]">ETD Production</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-[#D0FF35]">CRM &amp; PBX</span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/70">Appointments</span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/70">RBAC Enforced</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-1.5 text-[11px]">
              <span className="text-white/70">Row-Level Security &amp; Tenant Isolation</span>
              <CheckCircle2 className="size-3.5 text-emerald-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-white/50">
            <span>Enterprise Compliance</span>
            <span className="font-mono text-emerald-400">Production Active</span>
          </div>
        </div>
      );

    case "05":
      return (
        <div className="flex h-full flex-col justify-between p-5 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#D0FF35]">
              <Network className="size-3.5" />
              INTEGRATION GATEWAY
            </span>
            <span className="font-mono text-[10px] text-emerald-400">LIVE SYNC</span>
          </div>

          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="font-mono text-[11px] text-white">Stripe Checkout &amp; Webhooks</span>
              <span className="font-mono text-[10px] text-emerald-400">event.signed</span>
            </div>
            <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="font-mono text-[11px] text-white">WhatsApp Business API Gateway</span>
              <span className="font-mono text-[10px] text-[#D0FF35]">Two-Way Sync</span>
            </div>
            <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="font-mono text-[11px] text-white">PBX Telephony &amp; Hasura GraphQL</span>
              <span className="font-mono text-[10px] text-white/50">Realtime Stream</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-white/50">
            <span>Webhook Reliability</span>
            <span className="font-mono text-[#D0FF35]">Zero Drop / Queue Buffer</span>
          </div>
        </div>
      );

    case "06":
    default:
      return (
        <div className="flex h-full flex-col justify-between p-5 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#D0FF35]">
              <Workflow className="size-3.5" />
              AI &amp; AUTOMATION PIPELINE
            </span>
            <span className="rounded-full bg-[#D0FF35]/20 px-2 py-0.5 font-mono text-[10px] text-[#D0FF35]">
              AUTONOMOUS
            </span>
          </div>

          {/* Node graph schematic matching Raglic */}
          <div className="relative my-2 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between text-[10px]">
              <span className="rounded bg-white/10 px-2 py-1 font-mono text-white/70">Event / Lead</span>
              <span className="text-white/30">──→</span>
              <span className="rounded border border-[#D0FF35] bg-[#D0FF35]/10 px-2 py-1 font-mono font-bold text-[#D0FF35]">
                OpenAI Bot
              </span>
              <span className="text-white/30">──→</span>
              <span className="rounded bg-white/10 px-2 py-1 font-mono text-white/70">Action / Ingest</span>
            </div>
            <div className="mt-2 text-center">
              <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-0.5 font-mono text-[10px] text-emerald-400">
                FlyOverseas AI &amp; Job Aggregator Pipeline
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-white/50">
            <span>Operational Automation</span>
            <span className="font-mono text-[#D0FF35]">Zero Manual Effort</span>
          </div>
        </div>
      );
  }
}

export function ExpertiseShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<ExpertiseItem | null>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const preview = previewRef.current;
      if (!section || !preview || shouldReduceMotion) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.3, ease: "power3.out" });

      const handlePointerMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        xTo(x);
        yTo(y);
      };

      section.addEventListener("pointermove", handlePointerMove);
      return () => {
        section.removeEventListener("pointermove", handlePointerMove);
      };
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-label="Technical Expertise Showcase"
      className="relative w-full bg-background px-4 py-20 sm:px-6 sm:py-24 md:px-[2.5vw] lg:py-32"
    >
      {/* Header Area */}
      <div className="mb-14 grid grid-cols-1 gap-6 sm:mb-18 lg:mb-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="font-display text-[clamp(2.5rem,4.8vw,5.5rem)] font-medium tracking-[-0.038em] text-foreground leading-[1.06]">
            What I build.
            <br />
            How I engineer.
          </h2>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <p className="font-body text-sm text-muted-foreground leading-relaxed sm:text-base lg:text-lg lg:max-w-md lg:ml-auto">
            {profileData.headline}
          </p>
        </div>
      </div>

      {/* Floating Cursor-Following Visual Preview */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-40 hidden w-[360px] h-[240px] sm:w-[400px] sm:h-[260px] -translate-x-1/2 -translate-y-1/2 lg:block",
          "rounded-2xl border border-white/15 bg-[#0C0C0C]/95 text-white shadow-2xl backdrop-blur-md overflow-hidden",
          "transition-[opacity,transform] duration-200 ease-out",
          activeItem ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        {activeItem && <ExpertisePreviewVisual item={activeItem} />}
      </div>

      {/* Full-Width Expertise Rows */}
      <div className="border-t border-border/50">
        {EXPERTISE_ITEMS.map((item) => (
          <Link
            key={item.number}
            href={item.href}
            onMouseEnter={() => setActiveItem(item)}
            onMouseLeave={() => setActiveItem(null)}
            onFocus={() => setActiveItem(item)}
            onBlur={() => setActiveItem(null)}
            className={cn(
              "group relative flex w-full flex-col justify-between border-b border-border/50 py-8 transition-colors duration-300 md:flex-row md:items-center sm:py-10 lg:py-12 px-2 sm:px-4",
              "hover:bg-[#D0FF35] focus-visible:bg-[#D0FF35] outline-none"
            )}
          >
            {/* Left: Number + Title */}
            <div className="flex items-baseline gap-6 sm:gap-10 lg:gap-14">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-[#0C0C0C]/75 group-focus-visible:text-[#0C0C0C]/75 w-8 shrink-0">
                {item.number}
              </span>
              <h3 className="font-display text-[clamp(1.75rem,3.4vw,3.75rem)] font-medium tracking-tight text-foreground transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#0C0C0C] group-focus-visible:translate-x-3 group-focus-visible:text-[#0C0C0C]">
                {item.title}
              </h3>
            </div>

            {/* Right: Short Description + Circular Arrow Icon */}
            <div className="mt-4 flex items-center justify-between gap-4 md:mt-0 md:justify-end md:gap-8 lg:gap-12">
              <p className="font-body text-xs text-muted-foreground transition-colors duration-300 group-hover:text-[#0C0C0C]/80 group-focus-visible:text-[#0C0C0C]/80 sm:text-sm md:text-base max-w-sm text-left">
                {item.description}
              </p>

              {/* Circular Arrow Button with rotating diagonal-to-right arrow */}
              <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-full border border-border/80 transition-all duration-300 group-hover:border-[#0C0C0C] group-hover:bg-[#0C0C0C] text-foreground group-hover:text-[#D0FF35] group-focus-visible:border-[#0C0C0C] group-focus-visible:bg-[#0C0C0C] group-focus-visible:text-[#D0FF35]">
                <ArrowUpRight
                  className="size-5 transition-transform duration-300 ease-out group-hover:rotate-45 group-focus-visible:rotate-45"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
