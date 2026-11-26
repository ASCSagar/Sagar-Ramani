import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getDraftProjects, getPublishedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildPersonJsonLd,
  buildProjectJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";

describe("Technical SEO & Metadata Architecture", () => {
  it("builds consistent page metadata with canonical URL and Open Graph properties", () => {
    const meta = buildPageMetadata({
      title: "Experience",
      description: "Verified employment timeline and engineering career duration.",
      path: "/experience",
    });

    expect(meta.title).toBe("Experience");
    expect(meta.description).toContain("Verified employment timeline");
    expect(meta.alternates?.canonical).toBe(`${siteConfig.siteUrl}/experience`);
    expect(meta.openGraph?.title).toContain("Experience |");
    expect(meta.openGraph?.url).toBe(`${siteConfig.siteUrl}/experience`);
    expect((meta.twitter as { card?: string })?.card).toBe("summary_large_image");
  });

  it("constructs accurate Person and WebSite JSON-LD structured data", () => {
    const person = buildPersonJsonLd();
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Sagar Ramani");
    expect(person.jobTitle).toBe("Full Stack Software Developer");
    expect(person.address.addressLocality).toBe("Vadodara");
    expect(person.sameAs).toContain(siteConfig.social.linkedin);
    expect(person.sameAs).toContain(siteConfig.social.github);
    expect(Array.isArray(person.knowsAbout)).toBe(true);
    expect(person.knowsAbout.length).toBeGreaterThan(5);

    const website = buildWebSiteJsonLd();
    expect(website["@type"]).toBe("WebSite");
    expect(website.name).toContain("Sagar Ramani");
    expect(website.url).toBe(siteConfig.siteUrl);
  });

  it("builds valid SoftwareApplication JSON-LD for published project case studies", () => {
    const published = getPublishedProjects();
    expect(published.length).toBeGreaterThan(0);

    const platformProject = published.find((p) => p.kind === "platform") || published[0];
    const projectLd = buildProjectJsonLd(platformProject);

    expect(projectLd["@context"]).toBe("https://schema.org");
    expect(projectLd.name).toBe(platformProject.title);
    expect(projectLd.url).toBe(`${siteConfig.siteUrl}/projects/${platformProject.slug}`);
    expect(projectLd.operatingSystem).toBe("Web");
  });

  it("builds accurate BreadcrumbList JSON-LD sequential elements", () => {
    const breadcrumbLd = buildBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: "TrueValue Platform", url: "/projects/truevalue-platform" },
    ]);

    expect(breadcrumbLd["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbLd.itemListElement).toHaveLength(3);
    expect(breadcrumbLd.itemListElement[0].position).toBe(1);
    expect(breadcrumbLd.itemListElement[0].name).toBe("Home");
    expect(breadcrumbLd.itemListElement[2].name).toBe("TrueValue Platform");
  });

  it("sitemap contains all static routes and published projects, strictly excluding draft records", () => {
    const map = sitemap();
    const urls = map.map((entry) => entry.url);

    // Static routes
    expect(urls).toContain(`${siteConfig.siteUrl}/`);
    expect(urls).toContain(`${siteConfig.siteUrl}/about`);
    expect(urls).toContain(`${siteConfig.siteUrl}/experience`);
    expect(urls).toContain(`${siteConfig.siteUrl}/projects`);
    expect(urls).toContain(`${siteConfig.siteUrl}/skills`);
    expect(urls).toContain(`${siteConfig.siteUrl}/education`);
    expect(urls).toContain(`${siteConfig.siteUrl}/resume`);
    expect(urls).toContain(`${siteConfig.siteUrl}/contact`);

    // All published projects included
    const published = getPublishedProjects();
    for (const proj of published) {
      expect(urls).toContain(`${siteConfig.siteUrl}/projects/${proj.slug}`);
    }

    // All draft projects strictly excluded
    const drafts = getDraftProjects();
    expect(drafts.length).toBeGreaterThan(0);
    for (const draft of drafts) {
      expect(urls).not.toContain(`${siteConfig.siteUrl}/projects/${draft.slug}`);
    }
  });

  it("robots.txt configuration disallows API endpoints and points to sitemap", () => {
    const robotRules = robots();
    expect(robotRules.sitemap).toBe(`${siteConfig.siteUrl}/sitemap.xml`);

    const rules = Array.isArray(robotRules.rules) ? robotRules.rules[0] : robotRules.rules;
    expect(rules.disallow).toContain("/api/");
  });
});
