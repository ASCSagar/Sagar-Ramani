"use client";

import { useRef } from "react";
import { Bot, Code2, Layers } from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Token {
  id: string;
  type: "word" | "pill";
  text?: string;
  highlight?: boolean;
  icon?: "code" | "layers" | "bot";
}

const STATEMENT_TOKENS: Token[] = [
  { id: "t1", type: "word", text: "I'm" },
  { id: "t2", type: "word", text: "a" },
  { id: "t3", type: "word", text: "Full", highlight: true },
  { id: "t4", type: "word", text: "Stack", highlight: true },
  { id: "t5", type: "word", text: "Software", highlight: true },
  { id: "t6", type: "word", text: "Developer", highlight: true },
  { id: "t7", type: "pill", icon: "code" },
  { id: "t8", type: "word", text: "with" },
  { id: "t9", type: "word", text: "4+" },
  { id: "t10", type: "word", text: "years" },
  { id: "t11", type: "word", text: "of" },
  { id: "t12", type: "word", text: "experience" },
  { id: "t13", type: "word", text: "building" },
  { id: "t14", type: "word", text: "scalable" },
  { id: "t15", type: "word", text: "web" },
  { id: "t16", type: "word", text: "applications," },
  { id: "t17", type: "word", text: "enterprise", highlight: true },
  { id: "t18", type: "word", text: "SaaS", highlight: true },
  { id: "t19", type: "word", text: "platforms", highlight: true },
  { id: "t20", type: "pill", icon: "layers" },
  { id: "t21", type: "word", text: "and" },
  { id: "t22", type: "word", text: "intelligent" },
  { id: "t23", type: "word", text: "AI-powered", highlight: true },
  { id: "t24", type: "word", text: "solutions.", highlight: true },
  { id: "t25", type: "pill", icon: "bot" },
];

export function TextRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      // Large viewports with adequate height: Pin + Scrub bidirectional reveal
      mm.add(
        "(min-width: 768px) and (min-height: 520px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (shouldReduceMotion) return;

          const words = section.querySelectorAll<HTMLElement>("[data-reveal-word]");
          if (!words.length) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              pinSpacing: true,
              start: "top top",
              end: "+=120%",
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            words,
            {
              opacity: 0.18,
            },
            {
              opacity: 1,
              stagger: 0.05,
              ease: "none",
            }
          );
        }
      );

      // Mobile or short viewports (fallback: unpinned scroll scrub to avoid clipping)
      mm.add(
        "(max-width: 767px), (max-height: 519px)",
        () => {
          if (shouldReduceMotion) return;

          const words = section.querySelectorAll<HTMLElement>("[data-reveal-word]");
          if (!words.length) return;

          gsap.fromTo(
            words,
            {
              opacity: 0.18,
            },
            {
              opacity: 1,
              stagger: 0.04,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "bottom 35%",
                scrub: 0.5,
              },
            }
          );
        }
      );

      // Reduced motion: reveal all words immediately without animation
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const words = section.querySelectorAll<HTMLElement>("[data-reveal-word]");
        if (words.length) {
          gsap.set(words, { opacity: 1 });
        }
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
      id="statement"
      aria-label="Professional Statement"
      className="relative flex min-h-screen w-full flex-col justify-center bg-background px-4 sm:px-6 md:px-[2.5vw] py-16 sm:py-20 lg:py-24"
    >
      {/* Restrict paragraph width to 81% on large desktop, leaving intentional negative space on the right */}
      <div className="w-full lg:w-[81%] text-left">
        <p className="font-display text-[clamp(32px,4.4vw,88px)] font-medium tracking-[-0.038em] leading-[1.15] text-left">
          {STATEMENT_TOKENS.map((token) => {
            if (token.type === "pill") {
              return (
                <span
                  key={token.id}
                  className="inline-flex items-center justify-center rounded-full bg-[#D0FF35] text-[#0C0C0C] shrink-0 select-none align-[-0.08em] mx-[0.22em] transition-transform duration-200"
                  style={{ width: "1.65em", height: "0.85em" }}
                  aria-hidden="true"
                >
                  {token.icon === "code" && (
                    <Code2
                      className="stroke-[2.4] text-[#0C0C0C]"
                      style={{ width: "0.54em", height: "0.54em" }}
                    />
                  )}
                  {token.icon === "layers" && (
                    <Layers
                      className="stroke-[2.4] text-[#0C0C0C]"
                      style={{ width: "0.54em", height: "0.54em" }}
                    />
                  )}
                  {token.icon === "bot" && (
                    <Bot
                      className="stroke-[2.4] text-[#0C0C0C]"
                      style={{ width: "0.54em", height: "0.54em" }}
                    />
                  )}
                </span>
              );
            }

            return (
              <span
                key={token.id}
                data-reveal-word
                className={cn(
                  "inline-block mr-[0.24em] will-change-[opacity] transition-colors duration-150",
                  token.highlight
                    ? "text-[#D0FF35] dark:text-[#D0FF35] text-accent-highlight"
                    : "text-foreground"
                )}
                style={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.18 }}
              >
                {token.text}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
