"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { SpotlightCard } from "@/components/effects/spotlight-card";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MOTION_EASES, MOTION_VARIANTS } from "@/config/motion";
import {
  skillProficiencyLabels,
  skillsData,
  type SkillProficiency,
} from "@/data/skills";
import { cn } from "@/lib/utils";

const PROFICIENCY_FILTERS: Array<{ value: "all" | SkillProficiency; label: string }> = [
  { value: "all", label: "All Capabilities" },
  { value: "hands-on", label: skillProficiencyLabels["hands-on"] },
  { value: "working-knowledge", label: skillProficiencyLabels["working-knowledge"] },
  { value: "learning", label: skillProficiencyLabels.learning },
];

const PROFICIENCY_BADGE_CLASS: Record<SkillProficiency, string> = {
  "hands-on": "border-primary/35 bg-primary/10 text-primary",
  "working-knowledge": "border-border bg-secondary text-secondary-foreground",
  learning: "border-dashed border-border bg-background text-muted-foreground",
};

export function SkillsMatrix() {
  const [query, setQuery] = useState("");
  const [proficiencyFilter, setProficiencyFilter] = useState<"all" | SkillProficiency>("all");
  const { shouldReduceMotion } = useAnimationSettings();

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return skillsData
      .map((category) => {
        const matchingItems = category.items.filter((item) => {
          const matchesProficiency =
            proficiencyFilter === "all" || item.proficiency === proficiencyFilter;
          const matchesQuery =
            normalizedQuery.length === 0 ||
            item.name.toLowerCase().includes(normalizedQuery) ||
            category.title.toLowerCase().includes(normalizedQuery);
          return matchesProficiency && matchesQuery;
        });

        return {
          ...category,
          items: matchingItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [query, proficiencyFilter]);

  const totalVisibleSkills = filteredCategories.reduce(
    (sum, category) => sum + category.items.length,
    0
  );

  return (
    <div className="space-y-8">
      {/* Legend & Controls */}
      <Card className="border-border/80 bg-card/60">
        <CardContent className="space-y-4 pt-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter skills or categories..."
                aria-label="Filter skills or categories"
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by experience level">
              {PROFICIENCY_FILTERS.map((filter) => {
                const active = proficiencyFilter === filter.value;
                return (
                  <Button
                    key={filter.value}
                    type="button"
                    size="sm"
                    variant={active ? "default" : "outline"}
                    aria-pressed={active}
                    onClick={() => setProficiencyFilter(filter.value)}
                  >
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono uppercase">Experience Legend:</span>
              <Badge variant="outline" className={PROFICIENCY_BADGE_CLASS["hands-on"]}>
                {skillProficiencyLabels["hands-on"]}
              </Badge>
              <Badge variant="outline" className={PROFICIENCY_BADGE_CLASS["working-knowledge"]}>
                {skillProficiencyLabels["working-knowledge"]}
              </Badge>
              <Badge variant="outline" className={PROFICIENCY_BADGE_CLASS.learning}>
                {skillProficiencyLabels.learning}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono" aria-live="polite">
                Showing {totalVisibleSkills} skills across {filteredCategories.length} categories
              </span>
              {query.length > 0 || proficiencyFilter !== "all" ? (
                <Button
                  type="button"
                  size="xs"
                  variant="ghost"
                  onClick={() => {
                    setQuery("");
                    setProficiencyFilter("all");
                  }}
                >
                  <X className="size-3" aria-hidden="true" />
                  Reset
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Categories Grid */}
      <AnimatePresence mode="wait">
        {filteredCategories.length === 0 ? (
          <motion.div
            key="empty-skills"
            initial={shouldReduceMotion ? false : MOTION_VARIANTS.filterItem.initial}
            animate={MOTION_VARIANTS.filterItem.animate}
            exit={shouldReduceMotion ? undefined : MOTION_VARIANTS.filterItem.exit}
          >
            <Card className="border-border/80 bg-card/60 py-12 text-center">
              <CardContent className="space-y-3">
                <p className="font-heading text-lg font-medium text-foreground">
                  No matching skills found
                </p>
                <p className="text-sm text-muted-foreground">
                  Adjust your search keyword or proficiency filter to view all skill categories.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setProficiencyFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="skills-grid"
            layout={!shouldReduceMotion}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? false : MOTION_VARIANTS.filterItem.initial}
                animate={MOTION_VARIANTS.filterItem.animate}
                transition={{ duration: 0.24, ease: MOTION_EASES.framer.out }}
                className="h-full"
              >
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col gap-4 py-5">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <Badge variant="secondary" className="font-mono text-[11px]">
                          {category.items.length}
                        </Badge>
                      </div>
                      <CardDescription className="leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <Badge
                          key={item.name}
                          variant="outline"
                          title={skillProficiencyLabels[item.proficiency]}
                          className={cn(
                            "px-2.5 py-1 text-xs transition-transform hover:-translate-y-0.5",
                            PROFICIENCY_BADGE_CLASS[item.proficiency]
                          )}
                        >
                          <span>{item.name}</span>
                          {item.proficiency !== "hands-on" ? (
                            <span className="ml-1 font-mono text-[10px] opacity-80">
                              · {item.proficiency === "working-knowledge" ? "Working" : "Learning"}
                            </span>
                          ) : null}
                        </Badge>
                      ))}
                    </CardContent>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
