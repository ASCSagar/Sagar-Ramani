"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { siteConfig } from "@/data/site-config";
import { testimonialsData, type TestimonialItem } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function InteractiveTestimonials() {
  // Strictly filter only verified testimonials if showTestimonials feature flag is active
  const visibleTestimonials: TestimonialItem[] = siteConfig.features.showTestimonials
    ? testimonialsData.filter((item) => item.verifiedForPublication)
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  // If no approved testimonials exist, keep section strictly hidden (no placeholder, no empty container)
  if (visibleTestimonials.length === 0) {
    return null;
  }

  const currentItem = visibleTestimonials[activeIndex] || visibleTestimonials[0];
  const totalCount = visibleTestimonials.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalCount - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Client Testimonials and Endorsements"
      className="relative w-full overflow-hidden bg-[#0C0C0C] text-[#F4F4F0] py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-[2.5vw] border-t border-white/10 select-none outline-none focus-visible:ring-1 focus-visible:ring-[#D0FF35]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">
        {/* Top Header: Section Eyebrow, Slide Counter & Circular Navigation Controls */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[#D0FF35] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 font-semibold">
              09 {"//"} VERIFIED TESTIMONIALS
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Dynamic Counter */}
            <span className="font-mono text-xs sm:text-sm tracking-widest text-white/60">
              {String(activeIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
            </span>

            {/* Circular Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="size-10 sm:size-11 rounded-full border border-white/20 bg-white/[0.03] text-white hover:border-[#D0FF35] hover:text-[#D0FF35] hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF35]"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="size-10 sm:size-11 rounded-full border border-white/20 bg-white/[0.03] text-white hover:border-[#D0FF35] hover:text-[#D0FF35] hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF35]"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Central Quote & Author Info */}
        <div className="my-12 sm:my-16 lg:my-20 flex flex-col justify-between">
          {/* Oversized Quote */}
          <blockquote className="min-h-[140px] sm:min-h-[180px] lg:min-h-[220px] flex items-center">
            <p
              className={cn(
                "font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-normal text-white leading-[1.18] tracking-tight transition-opacity duration-400",
                shouldReduceMotion ? "transition-none" : ""
              )}
            >
              “{currentItem.quote}”
            </p>
          </blockquote>

          {/* Author Details */}
          <div className="mt-8 sm:mt-12 flex items-center gap-4">
            <div className="size-12 sm:size-14 rounded-full bg-[#D0FF35] text-[#0C0C0C] font-mono font-bold text-sm sm:text-base flex items-center justify-center shadow-lg">
              {getInitials(currentItem.name)}
            </div>
            <div className="space-y-0.5">
              <p className="font-display font-semibold text-base sm:text-lg text-white">
                {currentItem.name}
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-white/50">
                VERIFIED CLIENT
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Selectable Testimonial Cards */}
        <div className="pt-8 border-t border-white/10">
          <div
            role="tablist"
            aria-label="Select testimonial"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2"
          >
            {visibleTestimonials.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex flex-col justify-between p-4 sm:p-5 rounded-[18px] border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF35]",
                    isActive
                      ? "border-[#D0FF35] bg-white/[0.05] shadow-[0_0_30px_rgba(208,255,53,0.06)]"
                      : "border-white/10 bg-transparent hover:border-white/25 hover:bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold tracking-wider",
                        isActive ? "text-[#D0FF35]" : "text-white/40"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={cn(
                        "size-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-colors",
                        isActive
                          ? "bg-[#D0FF35] text-[#0C0C0C]"
                          : "bg-white/10 text-white/70"
                      )}
                    >
                      {getInitials(item.name)}
                    </div>
                  </div>

                  <div>
                    <p
                      className={cn(
                        "font-display text-sm font-semibold truncate",
                        isActive ? "text-white" : "text-white/70"
                      )}
                    >
                      {item.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase text-white/40 tracking-wider mt-0.5 truncate">
                      VERIFIED CLIENT
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
