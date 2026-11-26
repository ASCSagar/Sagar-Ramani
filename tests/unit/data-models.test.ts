import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { experienceData } from "@/data/experience";
import { profileData } from "@/data/profile";
import {
  getDraftProjects,
  getPlatformModules,
  getProjectBySlug,
  getPublishedProjects,
  getTopLevelProjects,
  projectsData,
} from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { skillsData } from "@/data/skills";

describe("professional data models", () => {
  it("keeps ETD marked as past employer and phone/testimonials/PDFs gated", () => {
    for (const employer of experienceData) {
      expect(employer.isCurrentEmployer).toBe(false);
    }
    expect(siteConfig.features.showTestimonials).toBe(false);
    expect(siteConfig.features.showPhoneNumber).toBe(false);
    expect(profileData.resumePdfAvailable).toBe(false);
    expect(profileData.resumeVersions).toHaveLength(6);
    for (const version of profileData.resumeVersions) {
      expect(version.pdfAvailable).toBe(false);
    }
  });

  it("groups TrueValue Platform modules cleanly and excludes draft records from public helpers and sitemap", () => {
    const modules = getPlatformModules("truevalue-platform");
    expect(modules).toHaveLength(6);

    const topLevel = getTopLevelProjects();
    expect(topLevel.some((project) => project.slug === "truevalue-platform")).toBe(true);
    expect(topLevel.some((project) => project.slug === "truevalue-crm")).toBe(false);

    const published = getPublishedProjects();
    const drafts = getDraftProjects();
    expect(projectsData).toHaveLength(25);
    expect(published).toHaveLength(14);
    expect(drafts).toHaveLength(11);
    expect(getProjectBySlug("study-streak")?.liveUrl).toBe("https://studystreak.in");
    expect(getProjectBySlug("real-e-state")).toBeUndefined();
    expect(getProjectBySlug("pawppy")).toBeUndefined();

    const sitemapEntries = sitemap();
    const urls = sitemapEntries.map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/projects/study-streak"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/projects/real-e-state"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/projects/pawppy"))).toBe(false);
  });

  it("organizes skills into 9 verified categories without claiming GSAP or Three.js production experience", () => {
    expect(skillsData).toHaveLength(9);
    const allSkillNames = skillsData.flatMap((category) => category.skills);
    expect(allSkillNames).not.toContain("GSAP");
    expect(allSkillNames).not.toContain("Three.js");
  });
});
