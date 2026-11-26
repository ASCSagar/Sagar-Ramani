"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Pause, Play } from "lucide-react";
import { motion } from "motion/react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAnimationSettings } from "@/components/providers/animation-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MOTION_EASES } from "@/config/motion";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ambientMotionPaused, prefersReducedMotion, shouldReduceMotion, toggleAmbientMotion } =
    useAnimationSettings();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-200 print:hidden",
        scrolled
          ? "border-border/90 bg-background/92 shadow-xs backdrop-blur-lg"
          : "border-border/60 bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-heading text-xs font-semibold tracking-wider text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {siteConfig.shortName}
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:inline">
              {siteConfig.designation}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {siteConfig.navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                {active ? (
                  shouldReduceMotion ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-lg bg-primary/12"
                    />
                  ) : (
                    <motion.span
                      layoutId="active-nav-pill"
                      transition={MOTION_EASES.framer.snappySpring}
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-lg bg-primary/12"
                    />
                  )
                ) : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!prefersReducedMotion ? (
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={toggleAmbientMotion}
              aria-pressed={ambientMotionPaused}
              aria-label={ambientMotionPaused ? "Resume decorative motion" : "Pause decorative motion"}
              title={ambientMotionPaused ? "Resume decorative motion" : "Pause decorative motion"}
              data-testid="ambient-motion-toggle"
              className="rounded-full"
            >
              {ambientMotionPaused ? (
                <Play className="size-3.5 text-primary" aria-hidden="true" />
              ) : (
                <Pause className="size-3.5 text-muted-foreground" aria-hidden="true" />
              )}
            </Button>
          ) : null}

          <ThemeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "lg:hidden cursor-pointer"
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="size-4" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:max-w-xs" data-lenis-prevent>
              <SheetHeader className="border-b border-border pb-4 text-left">
                <SheetTitle>{siteConfig.name}</SheetTitle>
                <SheetDescription>{siteConfig.designation}</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4 py-2">
                {siteConfig.navItems.map((item) => {
                  const active = isActiveRoute(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        window.requestAnimationFrame(() => setMobileOpen(false));
                      }}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-primary/12 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
