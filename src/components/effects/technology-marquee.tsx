"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { skillsData } from "@/data/skills";
import { cn } from "@/lib/utils";

export function TechnologyMarquee({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { shouldReduceMotion } = useAnimationSettings();

  const verifiedTechs = Array.from(
    new Set(
      skillsData
        .flatMap((cat) => cat.items)
        .filter((item) => item.proficiency === "hands-on")
        .map((item) => item.name)
    )
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isPaused = shouldReduceMotion || userPaused || !isVisible;
  const midpoint = Math.ceil(verifiedTechs.length / 2);
  const rowOne = verifiedTechs.slice(0, midpoint);
  const rowTwo = verifiedTechs.slice(midpoint);

  return (
    <div
      ref={containerRef}
      aria-label="Verified core technologies"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-card/50 py-5",
        className
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Production Stack Stream · {verifiedTechs.length} Hands-On Technologies
        </p>
        {!shouldReduceMotion ? (
          <Button
            type="button"
            size="xs"
            variant="outline"
            aria-pressed={userPaused}
            onClick={() => setUserPaused((prev) => !prev)}
            className="gap-1.5"
          >
            {userPaused ? (
              <>
                <Play className="size-3" aria-hidden="true" />
                Resume Stream
              </>
            ) : (
              <>
                <Pause className="size-3" aria-hidden="true" />
                Pause Stream
              </>
            )}
          </Button>
        ) : null}
      </div>

      {shouldReduceMotion ? (
        <div className="flex flex-wrap gap-2 px-4 sm:px-6">
          {verifiedTechs.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-background/80 px-3 py-1 text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            className="group/marquee flex w-max gap-2.5"
            style={{
              animation: "marquee-scroll 34s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            <div className="flex shrink-0 items-center gap-2.5">
              {rowOne.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-background/80 px-3 py-1.5 text-xs whitespace-nowrap transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center gap-2.5">
              {rowOne.map((tech) => (
                <Badge
                  key={`dup-1-${tech}`}
                  variant="outline"
                  className="bg-background/80 px-3 py-1.5 text-xs whitespace-nowrap"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div
            className="group/marquee flex w-max gap-2.5"
            style={{
              animation: "marquee-scroll 38s linear infinite reverse",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            <div className="flex shrink-0 items-center gap-2.5">
              {rowTwo.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-background/80 px-3 py-1.5 text-xs whitespace-nowrap transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center gap-2.5">
              {rowTwo.map((tech) => (
                <Badge
                  key={`dup-2-${tech}`}
                  variant="outline"
                  className="bg-background/80 px-3 py-1.5 text-xs whitespace-nowrap"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
