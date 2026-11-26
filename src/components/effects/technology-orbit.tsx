"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { motion } from "motion/react";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { skillProficiencyLabels, skillsData } from "@/data/skills";
import { cn } from "@/lib/utils";

const ORBIT_CATEGORY_IDS = [
  "frontend-development",
  "backend-development",
  "databases",
  "apis-integrations",
  "ai-automation",
  "development-tools",
] as const;

export function TechnologyOrbit({ className }: { className?: string }) {
  const orbitCategories = skillsData.filter((cat) =>
    ORBIT_CATEGORY_IDS.includes(cat.id as (typeof ORBIT_CATEGORY_IDS)[number])
  );
  const [activeId, setActiveId] = useState<string>(orbitCategories[0]?.id ?? "");
  const [orbitPaused, setOrbitPaused] = useState(false);
  const { shouldReduceMotion } = useAnimationSettings();

  const activeCategory =
    orbitCategories.find((cat) => cat.id === activeId) ?? orbitCategories[0];

  const isStatic = shouldReduceMotion || orbitPaused;

  return (
    <Card className={cn("overflow-hidden border-border/80 bg-card/60", className)}>
      <CardHeader className="flex flex-col justify-between gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs tracking-wider text-primary uppercase">
            Interactive Capability Constellation
          </p>
          <CardTitle className="mt-1 text-lg">Technology Orbit</CardTitle>
          <CardDescription>
            Select any orbital domain to inspect verified stack layers and proficiency levels.
          </CardDescription>
        </div>

        {!shouldReduceMotion ? (
          <Button
            type="button"
            size="xs"
            variant="outline"
            aria-pressed={orbitPaused}
            onClick={() => setOrbitPaused((prev) => !prev)}
            className="w-fit shrink-0 gap-1.5"
          >
            {orbitPaused ? (
              <>
                <Play className="size-3" aria-hidden="true" />
                Resume Orbit
              </>
            ) : (
              <>
                <Pause className="size-3" aria-hidden="true" />
                Pause Orbit
              </>
            )}
          </Button>
        ) : null}
      </CardHeader>

      <CardContent className="grid grid-cols-1 items-center gap-8 pt-6 lg:grid-cols-12">
        {/* SVG Orbital Constellation */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center lg:col-span-6">
          <svg
            viewBox="0 0 360 360"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label="Interactive technology orbit displaying six verified engineering domains"
          >
            <defs>
              <radialGradient id="orbit-core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="180" cy="180" r="145" fill="url(#orbit-core-glow)" />
            <circle
              cx="180"
              cy="180"
              r="68"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              cx="180"
              cy="180"
              r="128"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.2"
            />

            {/* Connection spokes */}
            {orbitCategories.map((cat, idx) => {
              const angle = (idx / orbitCategories.length) * Math.PI * 2 - Math.PI / 2;
              const x = 180 + Math.cos(angle) * 128;
              const y = 180 + Math.sin(angle) * 128;
              const isActive = cat.id === activeCategory?.id;
              return (
                <line
                  key={`spoke-${cat.id}`}
                  x1="180"
                  y1="180"
                  x2={x}
                  y2={y}
                  stroke={isActive ? "var(--primary)" : "var(--border)"}
                  strokeWidth={isActive ? 1.6 : 1}
                  strokeOpacity={isActive ? 0.85 : 0.6}
                />
              );
            })}

            {/* Center hub */}
            <circle
              cx="180"
              cy="180"
              r="36"
              fill="var(--card)"
              stroke="var(--primary)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <text
              x="180"
              y="176"
              textAnchor="middle"
              className="fill-foreground font-heading text-[11px] font-semibold"
            >
              Full Stack
            </text>
            <text
              x="180"
              y="191"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px]"
            >
              6 Domains
            </text>
          </svg>

          {/* Accessible Interactive Orbital Nodes */}
          <motion.div
            animate={isStatic ? { rotate: 0 } : { rotate: 360 }}
            transition={
              isStatic
                ? { duration: 0 }
                : { repeat: Infinity, duration: 54, ease: "linear" }
            }
            className="pointer-events-none absolute inset-0"
          >
            {orbitCategories.map((cat, idx) => {
              const angle = (idx / orbitCategories.length) * Math.PI * 2 - Math.PI / 2;
              const leftPct = 50 + Math.cos(angle) * 32;
              const topPct = 50 + Math.sin(angle) * 32;
              const isActive = cat.id === activeCategory?.id;
              const shortLabel = cat.title
                .replace(" Development", "")
                .replace(" and Integrations", "")
                .replace(" and Automation", "");

              return (
                <motion.div
                  key={cat.id}
                  animate={isStatic ? { rotate: 0 } : { rotate: -360 }}
                  transition={
                    isStatic
                      ? { duration: 0 }
                      : { repeat: Infinity, duration: 54, ease: "linear" }
                  }
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(cat.id)}
                    onMouseEnter={() => setActiveId(cat.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium whitespace-nowrap shadow-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-2.5 sm:py-1 sm:text-[10px]",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background/95 text-foreground hover:border-primary/50 hover:text-primary"
                    )}
                  >
                    {shortLabel}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Active Category Details */}
        <div className="space-y-4 lg:col-span-6">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Technology orbit domains">
            {orbitCategories.map((cat) => {
              const isActive = cat.id === activeCategory?.id;
              return (
                <button
                  key={`tab-${cat.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-primary/50 bg-primary/12 text-primary"
                      : "border-border/70 bg-background/60 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {activeCategory ? (
            <motion.div
              key={activeCategory.id}
              initial={shouldReduceMotion ? false : { opacity: 0.5, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 rounded-xl border border-border/80 bg-background/70 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {activeCategory.title}
                </h3>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  {activeCategory.items.length} skills
                </Badge>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {activeCategory.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeCategory.items.map((item) => (
                  <Badge
                    key={item.name}
                    variant="outline"
                    className={cn(
                      "px-2.5 py-1 text-xs",
                      item.proficiency === "hands-on"
                        ? "border-primary/35 bg-primary/10 text-primary"
                        : item.proficiency === "working-knowledge"
                          ? "bg-secondary text-secondary-foreground"
                          : "border-dashed text-muted-foreground"
                    )}
                    title={skillProficiencyLabels[item.proficiency]}
                  >
                    {item.name}
                    {item.proficiency !== "hands-on" ? (
                      <span className="ml-1 font-mono text-[10px] opacity-75">
                        · {item.proficiency === "working-knowledge" ? "Working" : "Learning"}
                      </span>
                    ) : null}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
