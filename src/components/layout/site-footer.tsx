import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { BackToTopButton } from "@/components/layout/back-to-top-button";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/40 print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-heading text-xs font-semibold tracking-wider text-primary">
                {siteConfig.shortName}
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  {siteConfig.name}
                </p>
                <p className="text-xs text-muted-foreground">{siteConfig.designation}</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Full-stack web platforms, enterprise SaaS modules, and practical AI integrations.
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-primary" aria-hidden="true" />
              <span>{siteConfig.location}</span>
            </p>
          </div>

          <div className="md:col-span-3 lg:col-span-4">
            <h2 className="font-heading text-xs font-semibold tracking-wider text-foreground uppercase">
              Navigation
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 md:col-span-4 lg:col-span-3">
            <h2 className="font-heading text-xs font-semibold tracking-wider text-foreground uppercase">
              Connect
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="min-w-0">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex max-w-full min-w-0 items-center gap-2 rounded text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0 truncate">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <LinkedInIcon className="size-4 text-primary" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <GitHubIcon className="size-4 text-primary" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js App Router.</p>
          <div className="flex flex-wrap items-center gap-4">
            <p>{siteConfig.designation} · {siteConfig.location}</p>
            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
