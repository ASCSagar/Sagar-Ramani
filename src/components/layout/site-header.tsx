"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { siteConfig } from "@/data/site-config";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "About", href: "/about" },
  { number: "03", label: "Experience", href: "/experience" },
  { number: "04", label: "Projects", href: "/projects" },
  { number: "05", label: "Skills", href: "/skills" },
  { number: "06", label: "Education", href: "/education" },
  { number: "07", label: "Résumé", href: "/resume" },
  { number: "08", label: "Contact", href: "/contact" },
] as const;

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

// ---------------------------------------------------------------------------
// 100% Verified Dynamic Edge-Aligned Visual Panels for Each Route
// ---------------------------------------------------------------------------

function HomeVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          ENGINEERING_SNAPSHOT // V2.0
        </span>
      </div>

      {/* Main dashboard visualization mirroring the Raglic reference */}
      <div className="my-auto py-3 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-3.5 py-1 text-xs font-mono font-medium text-white shadow-sm">
            <span>FULL STACK DEVELOPER</span>
          </div>
          <span className="font-mono text-xs text-[#D0FF35]">4+ YEARS EXPERIENCE</span>
        </div>

        {/* Dynamic Vector Line Graph with Glowing Waveform */}
        <div className="relative w-full h-28 sm:h-32 flex items-center">
          <svg
            viewBox="0 0 400 130"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="homeWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 100 L 40 95 L 80 115 L 120 65 L 160 85 L 200 35 L 240 95 L 280 50 L 320 80 L 360 20 L 400 60 L 400 130 L 0 130 Z"
              fill="url(#homeWaveGrad)"
            />
            <path
              d="M 0 100 L 40 95 L 80 115 L 120 65 L 160 85 L 200 35 L 240 95 L 280 50 L 320 80 L 360 20 L 400 60"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="200" cy="35" r="4.5" fill="#D0FF35" />
            <circle cx="360" cy="20" r="4.5" fill="#38bdf8" />
          </svg>
        </div>

        {/* Telemetry metrics reflecting authentic profile capabilities */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white/70">Enterprise SaaS Architecture</span>
            <span className="text-[#D0FF35]">Full Lifecycle</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[#D0FF35] rounded-full" style={{ width: "95%" }} />
          </div>

          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-white/70">Python &amp; Django APIs + MERN</span>
            <span className="text-sky-400">REST &amp; GraphQL</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-sky-400 rounded-full" style={{ width: "90%" }} />
          </div>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>VADODARA, GUJARAT, INDIA</span>
        <span>MERN • PYTHON • NEXT.JS • SAAS</span>
      </div>
    </div>
  );
}

function AboutVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          CAREER_NARRATIVE // ARCHITECTURE
        </span>
      </div>

      <div className="my-auto py-3 flex flex-col gap-3.5">
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-3.5">
          <span className="font-mono text-[10px] text-[#D0FF35]">ENGINEERING PROGRESSION</span>
          <h4 className="font-heading font-semibold text-white text-sm mt-0.5">
            Software Developer Trainee → Full Stack Developer Grade 2
          </h4>
          <p className="font-body text-xs text-white/70 mt-1 leading-relaxed">
            Delivering production web applications across La Net Team (Surat), Anant Soft Computing (Vadodara), and ETD.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
            <span className="font-mono text-[10px] text-white/50">FRONTEND ARCHITECTURE</span>
            <p className="font-heading font-medium text-xs text-white mt-1">
              React, Next.js, Redux Toolkit, Tailwind CSS
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
            <span className="font-mono text-[10px] text-white/50">BACKEND SERVICES</span>
            <p className="font-heading font-medium text-xs text-white mt-1">
              Node.js, Express, Django REST, PostgreSQL
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
          <span className="font-mono text-[10px] text-white/50">DEV PHILOSOPHY</span>
          <p className="font-body text-xs text-white/70 mt-0.5">
            Modular architecture, strict type boundaries, predictable state flow, and clean engineering.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>EXPERIENCE: 4+ YEARS</span>
        <span>VERIFIED CAREER MILESTONES</span>
      </div>
    </div>
  );
}

function ExperienceVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          EMPLOYER_HISTORY // VERIFIED
        </span>
      </div>

      <div className="my-auto py-2.5 flex flex-col gap-3">
        {/* ETD */}
        <div className="border-l-2 border-[#D0FF35] pl-3 py-0.5">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[10px] text-[#D0FF35]">AUG 2025 – OCT 2026</span>
            <span className="font-mono text-[10px] text-white/50">ETD</span>
          </div>
          <h4 className="font-heading font-semibold text-white text-xs sm:text-sm">
            Full Stack Developer Grade 2
          </h4>
          <p className="font-body text-[11px] text-white/60 leading-tight mt-0.5">
            TrueValue Platform (CRM, Appointments, Marketing, PBX), FlyOverseas.ai &amp; Automation
          </p>
        </div>

        {/* Anant Soft Computing */}
        <div className="border-l-2 border-sky-400 pl-3 py-0.5">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[10px] text-sky-400">SEP 2023 – JUL 2025</span>
            <span className="font-mono text-[10px] text-white/50">Vadodara, India</span>
          </div>
          <h4 className="font-heading font-semibold text-white text-xs sm:text-sm">
            React Developer • Anant Soft Computing
          </h4>
          <p className="font-body text-[11px] text-white/60 leading-tight mt-0.5">
            Study Streak exam workflows; Tube Master business ERP/CRM (finance, inventory, production)
          </p>
        </div>

        {/* La Net Team */}
        <div className="border-l-2 border-white/30 pl-3 py-0.5">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[10px] text-white/40">JAN 2022 – SEP 2023</span>
            <span className="font-mono text-[10px] text-white/50">Surat, India</span>
          </div>
          <h4 className="font-heading font-semibold text-white text-xs sm:text-sm">
            Software Developer • La Net Team
          </h4>
          <p className="font-body text-[11px] text-white/60 leading-tight mt-0.5">
            Pabau clinic management (React, GraphQL caching, third-party APIs); JO~FO Salami Slicing storefront
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>3 EMPLOYERS • 4+ YEARS</span>
        <span>VIEW FULL TIMELINE →</span>
      </div>
    </div>
  );
}

function ProjectsVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          FEATURED_PROJECTS // CASE_STUDIES
        </span>
      </div>

      <div className="my-auto py-2.5 flex flex-col gap-2.5">
        {/* Project 1 */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 flex items-start justify-between">
          <div>
            <span className="font-mono text-[10px] text-[#D0FF35] block">ETD // SAAS PLATFORM</span>
            <h4 className="font-heading font-semibold text-white text-xs sm:text-sm mt-0.5">
              TrueValue Platform
            </h4>
            <p className="font-body text-[11px] text-white/60 leading-tight mt-0.5">
              CRM, Appointments, Marketing, WhatsApp Automation, PBX &amp; SiteFlow suite
            </p>
          </div>
        </div>

        {/* Project 2 */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 flex items-start justify-between">
          <div>
            <span className="font-mono text-[10px] text-sky-400 block">ANANT SOFT // EDTECH</span>
            <h4 className="font-heading font-semibold text-white text-xs sm:text-sm mt-0.5">
              Study Streak
            </h4>
            <p className="font-body text-[11px] text-white/60 leading-tight mt-0.5">
              Exam workflow state management across Reading, Writing, Listening &amp; Speaking
            </p>
          </div>
        </div>

        {/* Project 3 */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 flex items-start justify-between">
          <div>
            <span className="font-mono text-[10px] text-purple-400 block">ANANT SOFT // ERP &amp; CRM</span>
            <h4 className="font-heading font-semibold text-white text-xs sm:text-sm mt-0.5">
              Tube Master
            </h4>
            <p className="font-body text-[11px] text-white/60 leading-tight mt-0.5">
              Financial management, inventory tracking, production planning &amp; reporting analytics
            </p>
          </div>
        </div>

        {/* Project 4 */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 flex items-start justify-between">
          <div>
            <span className="font-mono text-[10px] text-emerald-400 block">LA NET TEAM // HEALTHCARE SAAS</span>
            <h4 className="font-heading font-semibold text-white text-xs sm:text-sm mt-0.5">
              Pabau Clinic Management
            </h4>
            <p className="font-body text-[11px] text-white/60 leading-tight mt-0.5">
              Medical practice management, digital patient records &amp; GraphQL caching
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>ENTERPRISE CASE STUDIES</span>
        <span>VIEW ALL 24+ PROJECTS →</span>
      </div>
    </div>
  );
}

function SkillsVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          SKILL_TAXONOMY // PROFICIENCIES
        </span>
      </div>

      <div className="my-auto py-2.5 space-y-3">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-white">Frontend: React, Next.js, Redux, React Hooks</span>
            <span className="text-[#D0FF35]">Hands-on</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[#D0FF35] rounded-full" style={{ width: "95%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-white">Backend: Node.js, Express, Django REST, Python</span>
            <span className="text-sky-400">Hands-on</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-sky-400 rounded-full" style={{ width: "92%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-white">Databases: PostgreSQL, MongoDB, MySQL</span>
            <span className="text-emerald-400">Hands-on</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: "90%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-white">APIs: REST, GraphQL, Hasura, Webhooks, OAuth, JWT</span>
            <span className="text-purple-400">Hands-on</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-purple-400 rounded-full" style={{ width: "94%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-white">AI &amp; Automation: OpenAI API, Playwright, Web Automation</span>
            <span className="text-amber-400">Hands-on</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: "88%" }} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>UI: TAILWIND CSS • MATERIAL UI • BOOTSTRAP</span>
        <span>VIEW ALL SKILLS →</span>
      </div>
    </div>
  );
}

function EducationVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          ACADEMIC_CREDENTIALS // SVIT
        </span>
      </div>

      <div className="my-auto py-3.5 flex flex-col gap-3.5">
        {/* Undergraduate Degree */}
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-[#D0FF35]">UNDERGRADUATE DEGREE</span>
            <span className="font-mono text-xs font-semibold text-[#D0FF35] border border-[#D0FF35]/30 bg-[#D0FF35]/10 px-2.5 py-0.5 rounded-full">
              CGPA: 8.4 / 10
            </span>
          </div>
          <h4 className="font-heading font-bold text-white text-base mt-1.5">
            Bachelor of Engineering (B.E.)
          </h4>
          <p className="font-body text-xs font-medium text-sky-300 mt-0.5">
            Computer Engineering
          </p>
          <p className="font-mono text-[11px] text-white/60 mt-1.5">
            Sardar Vallabhbhai Patel Institute of Technology (SVIT), Vasad
          </p>
          <p className="font-body text-[11px] text-white/50 mt-1">
            Focus: Computer science fundamentals, algorithms, database systems &amp; software engineering.
          </p>
        </div>

        {/* Prior Secondary Education */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
            <span className="font-mono text-[10px] text-white/50 block">HSC // SCIENCE STREAM</span>
            <span className="font-heading font-semibold text-xs text-white block mt-0.5">Nutan Vidyalaya</span>
            <span className="font-mono text-[10px] text-white/60">2016–2018 • 84%</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
            <span className="font-mono text-[10px] text-white/50 block">SSC // SECONDARY</span>
            <span className="font-heading font-semibold text-xs text-white block mt-0.5">Nutan Vidyalaya</span>
            <span className="font-mono text-[10px] text-white/60">2015–2016 • 83%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>VASAD, GUJARAT, INDIA</span>
        <span>VERIFIED ACADEMIC PROFILE</span>
      </div>
    </div>
  );
}

function ResumeVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          CURRICULUM_VITAE // 6_VERSIONS
        </span>
      </div>

      <div className="my-auto py-3 flex flex-col gap-3">
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-3.5 space-y-1.5">
          <div className="flex justify-between items-baseline">
            <h4 className="font-heading font-bold text-white text-sm">Sagar Ramani</h4>
            <span className="font-mono text-[10px] text-[#D0FF35]">4+ YEARS EXPERIENCE</span>
          </div>
          <p className="font-mono text-[11px] text-white/60">Full Stack Software Developer</p>
          <p className="font-body text-xs text-white/70 leading-relaxed pt-1">
            6 specialized résumé formats tailored for specific technical positions:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-white/80">
            • Full Stack Developer
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-white/80">
            • MERN Stack Developer
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-white/80">
            • Frontend Developer
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-white/80">
            • Backend Developer
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-white/80">
            • AI Integration Dev
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-white/80">
            • Software Developer
          </div>
        </div>

        <Link
          href="/resume"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D0FF35] py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#0C0C0C] hover:opacity-90 transition-opacity"
        >
          <span>EXPLORE RÉSUMÉ VERSIONS</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>TAILORED FOR RECRUITERS &amp; TECH LEADS</span>
        <span>VIEW PROFILES →</span>
      </div>
    </div>
  );
}

function ContactVisual() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
          COMMUNICATION // DIRECT_CHANNELS
        </span>
      </div>

      <div className="my-auto py-3 space-y-3">
        <div className="rounded-2xl border border-white/10 bg-black/50 p-4 font-mono text-xs space-y-1.5 text-white/80">
          <div className="text-emerald-400">$ connect --identity=&quot;sagar-ramani&quot;</div>
          <div className="text-white/60">&gt; Role: Full Stack Software Developer</div>
          <div className="text-white/60">&gt; Location: Vadodara, Gujarat, India</div>
          <div className="text-white/60">&gt; Direct Email: sagar.18beceg081@gmail.com</div>
          <div className="text-white/60">&gt; LinkedIn: in/sagar-ramani</div>
          <div className="text-white/60">&gt; GitHub: github.com/SagarIR</div>
          <div className="flex items-center gap-1 text-[#D0FF35] pt-1">
            <span>&gt; Open to technical discussions &amp; roles</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF35] py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#0C0C0C] hover:opacity-90 transition-opacity"
        >
          <span>OPEN CONTACT FORM</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-white/50">
        <span>VADODARA • WORKING GLOBALLY</span>
        <span>FAST RESPONSE VIA DIRECT PORTAL</span>
      </div>
    </div>
  );
}

function PreviewVisual({ route }: { route: string }) {
  switch (route) {
    case "/about":
      return <AboutVisual />;
    case "/experience":
      return <ExperienceVisual />;
    case "/projects":
      return <ProjectsVisual />;
    case "/skills":
      return <SkillsVisual />;
    case "/education":
      return <EducationVisual />;
    case "/resume":
      return <ResumeVisual />;
    case "/contact":
      return <ContactVisual />;
    case "/":
    default:
      return <HomeVisual />;
  }
}

// ---------------------------------------------------------------------------
// Main Site Header & Full-Screen Navigation Overlay Component
// ---------------------------------------------------------------------------

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setHoveredHref(null);
  }
  const [scrolled, setScrolled] = useState(false);
  const { shouldReduceMotion } = useAnimationSettings();
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Scroll listener for sticky header background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlay on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Lock background scrolling completely while menu is open
  useEffect(() => {
    if (menuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyOverscroll = document.body.style.overscrollBehavior;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.overscrollBehavior = originalBodyOverscroll;
      };
    }
  }, [menuOpen]);

  // GSAP ScrambleText animation on item hover
  const handleItemEnter = (index: number, originalText: string, href: string) => {
    setHoveredHref(href);
    if (shouldReduceMotion) return;

    const el = textRefs.current[index];
    if (el) {
      gsap.to(el, {
        duration: 0.36,
        scrambleText: {
          text: originalText,
          chars: "!<>-_\\/[]{}—=+*^?#01",
          speed: 0.45,
        },
        overwrite: "auto",
      });
    }
  };

  const activeNavItem =
    NAV_ITEMS.find((item) => isActiveRoute(pathname, item.href)) || NAV_ITEMS[0];
  const currentPreviewHref = hoveredHref || activeNavItem.href;

  return (
    <>
      {/* Sticky Header: Uses ~2.5vw horizontal padding, matching the Raglic reference */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-200 print:hidden",
          scrolled
            ? "border-b border-border/80 bg-background/90 shadow-xs backdrop-blur-lg"
            : "border-b border-border/40 bg-background/70 backdrop-blur-md"
        )}
      >
        <div className="flex h-20 w-full items-center justify-between px-[2.5vw]">
          {/* Left: SR Monogram and Sagar Ramani Branding */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Sagar Ramani Homepage"
          >
            <span className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/80 bg-surface/80 font-mono text-xs sm:text-sm font-bold tracking-wider text-accent-highlight transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-[#0C0C0C] group-hover:shadow-[0_0_15px_rgba(208,255,55,0.35)]">
              {siteConfig.shortName}
            </span>
            <span className="flex flex-col">
              <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-highlight">
                {siteConfig.name}
              </span>
              <span className="hidden font-mono text-[10px] tracking-wider text-muted-foreground uppercase lg:inline">
                {siteConfig.designation}
              </span>
            </span>
          </Link>

          {/* Right: Lime Contact Me pill, Theme Toggle, and MENU label with circular icon */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Lime-green "Contact Me" pill button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#D0FF35] px-4 sm:px-5 py-2 text-[clamp(0.875rem,0.2vw+0.825rem,1rem)] font-semibold text-[#0C0C0C] tracking-wide uppercase transition-all duration-200 shadow-xs hover:shadow-[0_0_20px_rgba(208,255,55,0.35)] hover:brightness-105 active:scale-95 cursor-pointer"
            >
              <span className="hidden xs:inline">Contact Me</span>
              <span className="xs:hidden">Contact</span>
            </Link>

            {/* Theme Switcher */}
            <ThemeToggle />

            {/* MENU Label and Circular Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-navigation-overlay"
              aria-label="Open navigation menu"
              className="group flex items-center gap-2.5 sm:gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              <span className="font-mono text-[clamp(0.6875rem,0.15vw+0.65rem,0.8125rem)] font-semibold tracking-widest text-foreground uppercase transition-colors group-hover:text-[#D0FF35]">
                MENU
              </span>
              <span className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/80 bg-surface/80 group-hover:border-primary group-hover:bg-surface-elevated transition-all duration-200 shadow-xs">
                <span className="flex flex-col gap-1 w-4 items-center justify-center" aria-hidden="true">
                  <span className="h-[1.5px] w-4 rounded-full bg-foreground transition-all duration-200 group-hover:bg-[#D0FF35]" />
                  <span className="h-[1.5px] w-4 rounded-full bg-foreground transition-all duration-200 group-hover:bg-[#D0FF35]" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Navigation Overlay matching Raglic Open-Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="fullscreen-navigation-overlay"
            key="fullscreen-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.05 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col justify-between bg-[#080808] text-white overflow-y-auto lg:overflow-y-hidden [@media(max-height:580px)]:overflow-y-auto"
          >
            {/* Top Bar of Overlay: Uses 2.5vw padding and has branding, Contact button, and CLOSE (X) */}
            <div className="shrink-0 h-20 w-full flex items-center justify-between px-[2.5vw]">
              {/* Branding inside overlay */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="group inline-flex items-center gap-3 rounded-full py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Sagar Ramani Homepage"
              >
                <span className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#D0FF35] transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-[#0C0C0C]">
                  {siteConfig.shortName}
                </span>
                <span className="flex flex-col">
                  <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-white transition-colors group-hover:text-[#D0FF35]">
                    {siteConfig.name}
                  </span>
                  <span className="hidden font-mono text-[10px] tracking-wider text-white/50 uppercase lg:inline">
                    {siteConfig.designation}
                  </span>
                </span>
              </Link>

              {/* Right controls: Contact Me, ThemeToggle, and CLOSE label with circular X icon */}
              <div className="flex items-center gap-2.5 sm:gap-4">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-[#D0FF35] px-4 sm:px-5 py-2 text-[clamp(0.875rem,0.2vw+0.825rem,1rem)] font-semibold text-[#0C0C0C] tracking-wide uppercase transition-all duration-200 shadow-xs hover:shadow-[0_0_20px_rgba(208,255,55,0.35)] hover:brightness-105 active:scale-95 cursor-pointer"
                >
                  <span className="hidden xs:inline">Contact Me</span>
                  <span className="xs:hidden">Contact</span>
                </Link>

                <ThemeToggle />

                {/* CLOSE button with circular X icon matching visual reference */}
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[clamp(0.8125rem,0.15vw+0.75rem,0.875rem)] font-mono font-semibold tracking-widest uppercase text-white hover:border-[#D0FF35] hover:text-[#D0FF35] transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <span>CLOSE</span>
                  <span className="flex size-5 items-center justify-center rounded-full border border-current transition-transform duration-200 group-hover:rotate-90">
                    <X className="size-3" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>

            {/* Middle Zone: Left 8 Navigation Rows & Right Large Edge-Aligned Visual Preview */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-14 w-full px-[2.5vw] py-2 sm:py-3">
              {/* Left Column: 8 Navigation Rows evenly dividing vertical space */}
              <nav
                aria-label="Full screen navigation"
                className="flex-1 min-h-0 flex flex-col justify-between w-full lg:w-[58%] xl:w-[60%]"
                onPointerLeave={() => setHoveredHref(null)}
              >
                {NAV_ITEMS.map((item, index) => {
                  const isCurrent =
                    hoveredHref !== null
                      ? hoveredHref === item.href
                      : isActiveRoute(pathname, item.href);

                  return (
                    <div
                      key={item.href}
                      className="flex-1 min-h-0 flex items-center border-t border-white/[0.08] last:border-b"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        onPointerEnter={() => handleItemEnter(index, item.label, item.href)}
                        onFocus={() => handleItemEnter(index, item.label, item.href)}
                        className="group flex items-center gap-4 sm:gap-7 w-full h-full py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary select-none cursor-pointer"
                      >
                        {/* Number */}
                        <span
                          className={cn(
                            "font-mono text-xs sm:text-sm tracking-wider transition-colors duration-150 w-7 sm:w-9 shrink-0",
                            isCurrent ? "text-[#D0FF35]" : "text-white/40 group-hover:text-[#D0FF35]"
                          )}
                        >
                          {item.number}
                        </span>

                        {/* Large, bold oversized typography (48–72px) */}
                        <span
                          ref={(el) => {
                            textRefs.current[index] = el;
                          }}
                          className={cn(
                            "font-heading font-bold text-[clamp(2.25rem,4.2vh,4.5rem)] xl:text-[clamp(2.5rem,4.6vh,4.5rem)] tracking-[-0.03em] leading-none transition-colors duration-150",
                            isCurrent ? "text-[#D0FF35]" : "text-white group-hover:text-[#D0FF35]"
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Right Column: Large edge-aligned visual preview panel */}
              <div className="hidden lg:flex flex-col justify-center w-[42%] xl:w-[40%] h-full shrink-0">
                <div className="relative w-full h-full max-h-[72vh] rounded-3xl overflow-hidden border border-white/[0.12] bg-gradient-to-b from-[#141f36] via-[#0c1424] to-[#070c16] shadow-2xl flex flex-col p-6 sm:p-7 justify-between">
                  {/* Atmospheric Glow Accents */}
                  <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#3b82f6]/15 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-[#D0FF35]/10 blur-3xl" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPreviewHref}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="relative z-10 w-full h-full flex flex-col justify-between"
                    >
                      <PreviewVisual route={currentPreviewHref} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Email & Location matching the Raglic reference (11–13px) */}
            <div className="shrink-0 h-12 sm:h-14 flex items-center justify-between font-mono text-[clamp(0.6875rem,0.15vw+0.65rem,0.8125rem)] uppercase tracking-widest text-white/50 border-t border-white/[0.08] w-full px-[2.5vw]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-[#D0FF35] transition-colors"
              >
                {siteConfig.email.toUpperCase()}
              </a>
              <span className="text-right">
                {siteConfig.location.toUpperCase()} — WORKING GLOBALLY
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
