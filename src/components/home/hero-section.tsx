"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Mail, MapPin } from "lucide-react";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { SplitTextReveal } from "@/components/animations/split-text-reveal";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { HeroSphereWrapper } from "@/components/three/hero-sphere-wrapper";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MOTION_DISTANCES, MOTION_DURATIONS, MOTION_EASES, MOTION_STAGGER } from "@/config/motion";
import { profileData } from "@/data/profile";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

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

        tl.from("[data-hero-badge]", {
          y: MOTION_DISTANCES.sm,
          opacity: 0,
          stagger: MOTION_STAGGER.tight,
          clearProps: "transform,opacity",
        })
          .from(
            "[data-hero-copy]",
            {
              y: MOTION_DISTANCES.md,
              opacity: 0,
              stagger: MOTION_STAGGER.base,
              clearProps: "transform,opacity",
            },
            "-=0.35"
          )
          .from(
            "[data-hero-chip]",
            {
              y: 10,
              opacity: 0,
              duration: 0.4,
              stagger: 0.035,
              clearProps: "transform,opacity",
            },
            "-=0.4"
          )
          .from(
            "[data-hero-cta]",
            {
              y: MOTION_DISTANCES.sm,
              opacity: 0,
              duration: 0.45,
              stagger: 0.06,
              clearProps: "transform,opacity",
            },
            "-=0.3"
          )
          .from(
            "[data-hero-visual]",
            {
              scale: 0.96,
              opacity: 0,
              duration: MOTION_DURATIONS.cinematic,
              ease: MOTION_EASES.gsap.expoOut,
              clearProps: "transform,opacity",
            },
            0.12
          );
      });

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        gsap.to("[data-hero-visual]", {
          y: 28,
          ease: MOTION_EASES.gsap.none,
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
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
      className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-10 lg:pt-20 xl:px-12"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              data-hero-badge
              className="font-mono text-xs font-semibold tracking-wider text-accent-highlight uppercase"
            >
              {profileData.designation}
            </span>
            <span data-hero-badge className="text-muted-foreground/60">•</span>
            <Badge data-hero-badge variant="secondary" className="font-mono text-xs rounded-full">
              {profileData.experience} experience
            </Badge>
            <span
              data-hero-badge
              className="inline-flex items-center gap-1 text-xs text-muted-foreground"
            >
              <MapPin className="size-3.5 text-accent-highlight" aria-hidden="true" />
              {profileData.location}
            </span>
          </div>

          <div className="space-y-4">
            <div data-hero-copy>
              <SplitTextReveal
                as="h1"
                id="hero-heading"
                text={profileData.name}
                splitBy="words"
                immediate
                duration={MOTION_DURATIONS.cinematic}
                className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[4rem] lg:leading-[1.05]"
              />
            </div>
            <p
              data-hero-copy
              className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-tight font-semibold text-foreground tracking-tight"
            >
              Engineering digital experiences{" "}
              <span className="text-accent-highlight font-semibold">with purpose.</span>
            </p>
            <p
              data-hero-copy
              className="font-body text-base sm:text-lg leading-relaxed text-foreground-secondary font-normal"
            >
              Bold typography. Minimal interfaces. Meaningful interactions.
            </p>
            <p
              data-hero-copy
              className="max-w-2xl font-body text-sm sm:text-base leading-relaxed text-muted-foreground"
            >
              {profileData.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Core expertise">
            {profileData.expertise.slice(0, 6).map((item) => (
              <Badge
                key={item}
                data-hero-chip
                variant="outline"
                className="bg-card/60 px-3 py-1 text-xs"
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton data-hero-cta>
              <Link
                href="/projects"
                data-cursor="interactive"
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                Explore my work
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
            <div data-hero-cta>
              <Link
                href="/resume"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                View résumé
              </Link>
            </div>
            <div data-hero-cta>
              <Link
                href="/experience"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <Briefcase className="size-4" aria-hidden="true" />
                View Experience
              </Link>
            </div>
            <MagneticButton data-hero-cta>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                <Mail className="size-4" aria-hidden="true" />
                Contact Me
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div data-hero-visual className="lg:col-span-5">
          <HeroSphereWrapper />
        </div>
      </div>
    </section>
  );
}
