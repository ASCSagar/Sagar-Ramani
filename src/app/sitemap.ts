import type { MetadataRoute } from "next";

import { getPublishedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/skills",
  "/education",
  "/resume",
  "/contact",
];

// Verified release date reflecting completed phase updates
const VERIFIED_RELEASE_DATE = new Date("2026-11-25T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: VERIFIED_RELEASE_DATE,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = getPublishedProjects().map((project) => ({
    url: `${siteConfig.siteUrl}/projects/${project.slug}`,
    lastModified: VERIFIED_RELEASE_DATE,
    changeFrequency: "monthly",
    priority: project.featured ? 0.85 : 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
