"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { HeroSphereWrapper } from "@/components/three/hero-sphere-wrapper";
import { MOTION_DURATIONS, MOTION_EASES } from "@/config/motion";
import { profileData } from "@/data/profile";
import { gsap, useGSAP } from "@/lib/gsap";

const EYEBROW_TEXT = `${profileData.name} · ${profileData.designation} · ${profileData.experience} Experience`;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const impactRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  // Interactive character scramble on eyebrow
  const handleEyebrowHover = useCallback(() => {
    if (shouldReduceMotion || !eyebrowRef.current) return;
    gsap.to(eyebrowRef.current, {
      duration: 0.85,
      scrambleText: {
        text: EYEBROW_TEXT,
        chars: "upperCase",
        speed: 0.45,
      },
      ease: "power2.out",
    });
  }, [shouldReduceMotion]);

  // Interactive character scramble on "impact." word
  const handleImpactHover = useCallback(() => {
    if (shouldReduceMotion || !impactRef.current) return;
    gsap.to(impactRef.current, {
      duration: 0.65,
      scrambleText: {
        text: "impact.",
        chars: "01!@#$%&*",
        speed: 0.4,
      },
      ease: "power2.out",
    });
  }, [shouldReduceMotion]);

  useGSAP(
    () => {
      const scope = sectionRef.current;
      if (!scope || shouldReduceMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: {
            ease: MOTION_EASES.gsap.out,
            duration: MOTION_DURATIONS.reveal,
          },
        });

        // 1. Eyebrow scramble entrance
        if (eyebrowRef.current) {
          tl.fromTo(
            eyebrowRef.current,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              scrambleText: {
                text: EYEBROW_TEXT,
                chars: "upperCase",
                revealDelay: 0.15,
                speed: 0.35,
              },
              ease: "power2.out",
            }
          );
        }

        // 2. Main headline reveal
        tl.from(
          "[data-hero-heading]",
          {
            y: 36,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.6"
        )
          // 3. Intro copy reveal
          .from(
            "[data-hero-copy]",
            {
              y: 24,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            "-=0.45"
          )
          // 4. CTA buttons reveal
          .from(
            "[data-hero-cta]",
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            "-=0.35"
          )
          // 5. Scroll indicator reveal
          .from(
            "[data-hero-scroll]",
            {
              y: 16,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            "-=0.2"
          )
          // 6. Background sphere subtle zoom-in
          .from(
            "[data-hero-sphere]",
            {
              scale: 0.88,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            0
          );
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
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-between overflow-hidden px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-center"
    >
      {/* Subtle Integrated 3D Sphere Background Visual */}
      <div
        data-hero-sphere
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-25 dark:opacity-30 select-none"
      >
        <div className="relative h-[480px] w-[480px] sm:h-[620px] sm:w-[620px] lg:h-[760px] lg:w-[760px] max-w-full">
          <HeroSphereWrapper variant="background" />
        </div>
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklch,var(--accent)_12%,transparent),transparent_65%)]"
      />

      {/* Top spacing counterbalance for true vertical centering */}
      <div aria-hidden="true" className="h-2 sm:h-4 w-full shrink-0" />

      {/* Centered Hero Content */}
      <div className="relative z-10 my-auto flex w-full max-w-5xl flex-col items-center space-y-6 sm:space-y-8">
        {/* Eyebrow */}
        <div data-hero-eyebrow className="inline-flex items-center justify-center">
          <span
            ref={eyebrowRef}
            onMouseEnter={handleEyebrowHover}
            className="cursor-default font-mono text-xs sm:text-sm tracking-[0.18em] text-muted-foreground uppercase font-medium"
          >
            {EYEBROW_TEXT}
          </span>
        </div>

        {/* Oversized Modern Headline */}
        <h1
          ref={headingRef}
          data-hero-heading
          id="hero-heading"
          className="font-display text-[clamp(2.75rem,5.5vw+1rem,6.5rem)] font-bold tracking-[-0.038em] text-foreground leading-[1.02] max-w-5xl"
        >
          Building digital experiences that make an{" "}
          <span
            ref={impactRef}
            onMouseEnter={handleImpactHover}
            className="cursor-default text-[#D0FF35] dark:text-[#D0FF35] text-accent-highlight inline-block transition-colors"
          >
            impact.
          </span>
        </h1>

        {/* Concise Professional Introduction — Sourced directly from verified profile data */}
        <p
          ref={copyRef}
          data-hero-copy
          className="max-w-2xl font-body text-[clamp(1rem,0.25vw+0.9375rem,1.125rem)] text-muted-foreground leading-relaxed font-normal mx-auto"
        >
          {profileData.summary}
        </p>

        {/* Action Buttons with Magnetic Hover */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 sm:pt-4">
          <MagneticButton data-hero-cta>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D0FF35] px-7 py-3.5 font-body text-sm sm:text-base font-semibold text-[#0C0C0C] shadow-sm transition-all duration-300 hover:bg-[#c2f327] hover:scale-[1.02] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <span>Explore My Work</span>
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </MagneticButton>

          <MagneticButton data-hero-cta>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-7 py-3.5 font-body text-sm sm:text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-foreground/30 hover:bg-surface-elevated hover:scale-[1.02] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <span>View Résumé</span>
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Animated Circular Scroll-Down Indicator */}
      <div data-hero-scroll className="flex flex-col items-center gap-2.5 pt-4 pb-2 sm:pb-4">
        <span className="font-mono text-[10.5px] tracking-[0.24em] text-muted-foreground/80 uppercase font-medium">
          SCROLL
        </span>
        <a
          href="#statement"
          aria-label="Scroll to professional statement section"
          className="group flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/80 bg-surface/50 text-muted-foreground transition-all duration-300 hover:border-[#D0FF35] hover:text-[#D0FF35] hover:bg-[#D0FF35]/10 outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <ArrowDown
            className="size-4 transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
