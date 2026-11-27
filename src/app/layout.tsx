import type { ReactNode } from "react";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CustomCursor } from "@/components/animations/custom-cursor";
import { PageTransition } from "@/components/animations/page-transition";
import { Preloader } from "@/components/animations/preloader";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AnimationProvider } from "@/components/providers/animation-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { JsonLd } from "@/components/shared/json-ld";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site-config";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.designation}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: profileData.summary,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.designation}`,
    description: profileData.summary,
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} | Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.designation}`,
    description: profileData.summary,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased font-sans"
    >
      <head>
        <JsonLd data={buildPersonJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd()} />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-background text-foreground"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            <AmbientBackground />
            <ScrollProgress />
            <Preloader />
            <CustomCursor />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
            >
              Skip to main content
            </a>
            <SiteHeader />
            <main id="main-content" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
            {process.env.NODE_ENV === "production" && process.env.VERCEL ? (
              <>
                <Analytics />
                <SpeedInsights />
              </>
            ) : null}
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
