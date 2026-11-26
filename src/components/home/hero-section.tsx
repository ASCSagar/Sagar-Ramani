"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Mail, MapPin } from "lucide-react";

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
      className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge
              data-hero-badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary"
            >
              {profileData.designation}
            </Badge>
            <Badge data-hero-badge variant="secondary" className="font-mono text-xs">
              {profileData.experience} experience
            </Badge>
            <span
              data-hero-badge
              className="inline-flex items-center gap-1 text-xs text-muted-foreground"
            >
              <MapPin className="size-3.5 text-primary" aria-hidden="true" />
              {profileData.location}
            </span>
          </div>

          <div className="space-y-4">
            <SplitTextReveal
              as="h1"
              id="hero-heading"
              text={profileData.name}
              splitBy="words"
              immediate
              duration={MOTION_DURATIONS.cinematic}
              className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
            />
            <p
              data-hero-copy
              className="font-heading text-xl leading-snug font-medium text-foreground/90 sm:text-2xl"
            >
              {profileData.headline}
            </p>
            <p
              data-hero-copy
              className="max-w-2xl text-base leading-relaxed text-muted-foreground"
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
                className="bg-card/60 px-2.5 py-1 text-xs"
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <MagneticButton data-hero-cta>
              <Link
                href="/projects"
                data-cursor="interactive"
                className={cn(buttonVariants({ variant: "default", size: "lg" }))}
              >
                Explore My Work
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
            <div data-hero-cta>
              <Link
                href="/experience"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Briefcase className="size-4" aria-hidden="true" />
                View Experience
              </Link>
            </div>
            <div data-hero-cta>
              <Link
                href="/resume"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                <FileText className="size-4" aria-hidden="true" />
                Download Résumé
              </Link>
            </div>
            <MagneticButton data-hero-cta>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
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
