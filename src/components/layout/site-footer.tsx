"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#F1EFE9] text-[#0C0C0C] font-body print:hidden select-none border-t border-black/10 pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-[2.5vw]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top 4-Region Grid: Contact, Index, Social, Back to Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Region A: Contact Information (5 columns on desktop) */}
          <div className="md:col-span-6 lg:col-span-5 min-w-0 flex flex-col items-start">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-semibold mb-3 sm:mb-4">
              LET&apos;S CONNECT
            </span>

            {/* Oversized Editorial Email */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display text-[clamp(1.2rem,2.1vw,2.35rem)] font-bold tracking-tight text-[#0C0C0C] hover:text-[#556B1A] transition-colors leading-[1.1] block break-words [overflow-wrap:anywhere] max-w-full"
              aria-label={`Send email to ${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>

            {/* Designation & Contact CTA Link */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <span className="font-mono text-xs text-[#0C0C0C]/60 tracking-wider uppercase">
                {siteConfig.designation}
              </span>
              <span className="hidden sm:inline-block size-1 rounded-full bg-[#0C0C0C]/25" />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 rounded-full border border-[#0C0C0C]/20 bg-white/70 hover:bg-[#0C0C0C] hover:text-white hover:border-[#0C0C0C] px-4 py-1.5 font-mono text-xs font-semibold text-[#0C0C0C] transition-all duration-300 shadow-xs active:scale-95"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Region B: Navigation Index (3 columns on desktop) */}
          <div className="md:col-span-3 lg:col-span-3 min-w-0">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-semibold mb-3 sm:mb-4 block">
              INDEX
            </span>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-xs sm:text-sm">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-[#0C0C0C]/75 hover:text-[#0C0C0C] hover:translate-x-1 inline-block transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#0C0C0C]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Region C: Social Links (2 columns on desktop) */}
          <div className="md:col-span-3 lg:col-span-2 min-w-0">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-semibold mb-3 sm:mb-4 block">
              SOCIAL
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-body text-[#0C0C0C]/75 hover:text-[#0C0C0C] hover:translate-x-1 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#0C0C0C]"
                >
                  <span>LinkedIn</span>
                  <span className="text-[#0C0C0C]/50 group-hover:text-[#0C0C0C] text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-body text-[#0C0C0C]/75 hover:text-[#0C0C0C] hover:translate-x-1 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#0C0C0C]"
                >
                  <span>GitHub</span>
                  <span className="text-[#0C0C0C]/50 group-hover:text-[#0C0C0C] text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Region D: Back to Top Button (2 columns on desktop, right-aligned) */}
          <div className="md:col-span-12 lg:col-span-2 min-w-0 flex justify-start lg:justify-end items-start pt-1">
            <button
              type="button"
              onClick={handleScrollTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/25 bg-transparent hover:bg-[#0C0C0C] hover:text-[#FAF8F5] px-5 py-2 font-mono text-xs font-semibold tracking-wider text-[#0C0C0C] transition-all duration-300 shadow-xs active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#0C0C0C] cursor-pointer"
            >
              <span>BACK TO TOP ↑</span>
            </button>
          </div>
        </div>

        {/* Horizontal Hairline Divider */}
        <div className="w-full h-px bg-[#0C0C0C]/10 mt-8 sm:mt-10 lg:mt-12 mb-6 sm:mb-8" />

        {/* Metadata Row: Copyright, Location, Credits */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-[11px] sm:text-xs text-[#0C0C0C]/50 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}</p>
          <p>{siteConfig.location.toUpperCase()} — WORKING GLOBALLY</p>
          <p>DESIGNED &amp; DEVELOPED BY ME</p>
        </div>

        {/* Region E: Oversized Full-Width Bottom Wordmark (SAGAR RAMANI) */}
        <div
          aria-hidden="true"
          className="w-full overflow-hidden flex justify-center items-center pt-6 sm:pt-8 pb-2 select-none pointer-events-none"
        >
          <h1 className="font-display font-black tracking-[-0.035em] text-[#0C0C0C] text-center whitespace-nowrap leading-[0.8] uppercase text-[clamp(2.5rem,10.2vw,12.5rem)] w-full max-w-full overflow-hidden">
            SAGAR RAMANI
          </h1>
        </div>
      </div>
    </footer>
  );
}
