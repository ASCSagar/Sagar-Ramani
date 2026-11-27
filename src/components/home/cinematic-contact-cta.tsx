"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/data/site-config";
import { gsap, useGSAP } from "@/lib/gsap";

// Dynamically import 3D blob to ensure client-only canvas execution
const ContactBlob3D = dynamic(
  () => import("@/components/three/contact-blob-3d").then((mod) => mod.ContactBlob3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-[#D0FF35]/15 blur-3xl pointer-events-none" />
    ),
  }
);

// Full verified headline
const CONTACT_HEADLINE = "Let’s Discuss Engineering & Product Architecture";

// Natural 3-line editorial desktop composition matching Raglic proportions
const HEADLINE_LINES = [
  "Let’s Discuss",
  "Engineering & Product",
  "Architecture",
];

// Deterministic pseudo-random scatter coordinates based on character index
function getDeterministicScatter(index: number) {
  const seedX = Math.sin(index * 12.9898) * 43758.5453;
  const normX = seedX - Math.floor(seedX);
  const seedY = Math.sin(index * 78.233) * 43758.5453;
  const normY = seedY - Math.floor(seedY);
  const seedRot = Math.sin(index * 45.164) * 43758.5453;
  const normRot = seedRot - Math.floor(seedRot);

  return {
    x: (normX - 0.5) * 160,
    y: (normY - 0.5) * 200,
    rotation: (normRot - 0.5) * 70,
    opacity: 0.18 + normX * 0.15,
  };
}

export function CinematicContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const lettersContainerRef = useRef<HTMLHeadingElement>(null);
  const blobWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { shouldReduceMotion } = useAnimationSettings();

  // Structured lines, words, and characters for semantic markup and GSAP targeting
  const structuredLines = useMemo(() => {
    return HEADLINE_LINES.map((line) => {
      const words = line.split(" ");
      return words.map((word) => word.split(""));
    });
  }, []);

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const section = sectionRef.current;
      const lettersContainer = lettersContainerRef.current;
      const blobWrapper = blobWrapperRef.current;
      const content = contentRef.current;
      if (!section || !lettersContainer || !blobWrapper) return;

      const letterElements = lettersContainer.querySelectorAll<HTMLSpanElement>(".scatter-char");
      if (letterElements.length === 0) return;

      // Master scrubbed ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center 48%",
          scrub: 1.1,
        },
      });

      // Synchronized organic blob entrance
      tl.fromTo(
        blobWrapper,
        { scale: 0.55, opacity: 0.2 },
        { scale: 1, opacity: 1, ease: "power1.out", duration: 1 },
        0
      );

      // Reversible scattered letters progressive assembly
      letterElements.forEach((letter, i) => {
        const scatter = getDeterministicScatter(i);
        tl.fromTo(
          letter,
          {
            x: scatter.x,
            y: scatter.y,
            rotation: scatter.rotation,
            opacity: scatter.opacity,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
          },
          0
        );
      });

      // Supporting narrative & CTA entrance
      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 0.6 },
          0.4
        );
      }
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  let globalCharIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden bg-[#0C0C0C] text-[#FAF8F5] min-h-[95vh] pt-36 sm:pt-44 lg:pt-52 pb-24 sm:pb-32 lg:pb-40 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-[2.5vw] border-t border-white/10 select-none"
    >
      {/* 3D Liquid Morphing Blob (Background Layer — Centered Behind Heading) */}
      <div
        ref={blobWrapperRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform z-0"
      >
        <div className="w-full max-w-4xl h-[520px] sm:h-[620px] lg:h-[700px] flex items-center justify-center">
          <ContactBlob3D />
        </div>
      </div>

      {/* Eyebrow Label */}
      <div className="relative z-10 flex items-center gap-2 mb-6 sm:mb-8 pointer-events-none select-none">
        <span className="size-2 rounded-full bg-[#D0FF35] animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/50 font-semibold">
          10 {"//"} CONTACT & COLLABORATION
        </span>
      </div>

      {/* Cinematic Assembled Heading with Inversion Blending directly over the Blob */}
      <div className="relative z-10 w-full max-w-[92vw] xl:max-w-6xl mx-auto mix-blend-difference pointer-events-none select-none">
        <h2
          ref={lettersContainerRef}
          id="contact-heading"
          aria-label={CONTACT_HEADLINE}
          className="font-display text-[clamp(2.75rem,6.8vw,6.5rem)] font-bold tracking-[-0.04em] text-white leading-[1.0] text-center"
        >
          {structuredLines.map((lineWords, lineIndex) => (
            <span key={lineIndex} className="block">
              {lineWords.map((wordChars, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block whitespace-nowrap mr-[0.26em] last:mr-0"
                >
                  {wordChars.map((char) => {
                    const currentIndex = globalCharIndex++;
                    return (
                      <span
                        key={currentIndex}
                        aria-hidden="true"
                        className="scatter-char inline-block will-change-transform"
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>

      {/* Supporting Copy, CTA Buttons & Direct Email Layer (Interactive & High Contrast) */}
      <div
        ref={contentRef}
        className="relative z-20 mt-10 sm:mt-14 flex flex-col items-center w-full max-w-2xl text-center"
      >
        {/* Verified Supporting Description */}
        <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
          Reach out via the validated contact form or connect directly through email, LinkedIn, or GitHub.
        </p>

        {/* Primary & Secondary Pill CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Primary Lime-Green Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#D0FF35] text-[#0C0C0C] hover:bg-white hover:text-[#0C0C0C] px-8 py-4 font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(208,255,53,0.22)] active:scale-95"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="size-4" />
          </Link>

          {/* Secondary Solid Dark Pill Button with High Contrast */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#121212] border border-white/25 text-[#FAF8F5] hover:bg-[#1E1E1E] hover:border-[#D0FF35] hover:text-[#D0FF35] px-8 py-4 font-mono text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-lg active:scale-95"
          >
            <span>Explore My Work</span>
          </Link>
        </div>

        {/* Eyebrow Separator for Direct Writing */}
        <div className="mt-14 sm:mt-16 lg:mt-20 flex items-center gap-3 select-none">
          <span className="w-8 h-px bg-white/15" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
            OR WRITE DIRECTLY
          </span>
          <span className="w-8 h-px bg-white/15" />
        </div>

        {/* Oversized Verified Professional Email Link */}
        <div className="mt-4 sm:mt-6">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-block font-display text-[clamp(1.75rem,5.2vw,4.5rem)] font-bold tracking-tight text-white hover:text-[#D0FF35] transition-colors duration-300 leading-tight break-all sm:break-normal"
            aria-label={`Send email to ${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Social Profiles */}
        <div className="mt-8 flex items-center gap-6">
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/60 hover:text-[#D0FF35] transition-colors"
          >
            <LinkedInIcon className="size-4 text-[#D0FF35]" />
            <span>LinkedIn ↗</span>
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/60 hover:text-[#D0FF35] transition-colors"
          >
            <GitHubIcon className="size-4 text-[#D0FF35]" />
            <span>GitHub ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
