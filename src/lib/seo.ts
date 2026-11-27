import type { Metadata } from "next";

import { educationData } from "@/data/education";
import { experienceData } from "@/data/experience";
import { profileData } from "@/data/profile";
import type { ProjectEntry } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { skillsData } from "@/data/skills";

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article" | "profile";
  image?: string;
  noIndex?: boolean;
}

const DEFAULT_KEYWORDS = [
  "Sagar Ramani",
  "Full Stack Software Developer",
  "React Developer",
  "Next.js Developer",
  "TypeScript",
  "MERN Stack",
  "Python Django",
  "Enterprise SaaS Applications",
  "API Development",
  "AI Integration and Automation",
  "Vadodara Gujarat India",
];

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  ogType = "website",
  image,
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const canonicalUrl = `${siteConfig.siteUrl}${path}`;
  const ogImageUrl = image || `${siteConfig.siteUrl}/opengraph-image`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: profileData.name, url: siteConfig.siteUrl }],
    creator: profileData.name,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      siteName: `${siteConfig.name} | Portfolio`,
      locale: "en_US",
      type: ogType,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImageUrl],
    },
  };
}

export function buildPersonJsonLd() {
  const verifiedSkills = skillsData.flatMap((cat) => cat.items.map((item) => item.name));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    jobTitle: profileData.designation,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}${profileData.portraitImage}`,
    description: profileData.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vadodara",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    alumniOf: educationData.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    worksFor: experienceData.map((exp) => ({
      "@type": "Organization",
      name: exp.company,
    })),
    knowsAbout: verifiedSkills,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} | ${siteConfig.designation}`,
    url: siteConfig.siteUrl,
    description: profileData.summary,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: profileData.name,
    },
  };
}

export function buildProfilePageJsonLd(path = "/about") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteConfig.siteUrl}${path}`,
    name: `About ${profileData.name} | ${profileData.designation}`,
    description: profileData.summary,
    mainEntity: buildPersonJsonLd(),
  };
}

export function buildProjectJsonLd(project: ProjectEntry) {
  const projectUrl = `${siteConfig.siteUrl}/projects/${project.slug}`;
  const isApplication =
    project.kind === "platform" ||
    project.kind === "module" ||
    project.kind === "application";

  return {
    "@context": "https://schema.org",
    "@type": isApplication ? "SoftwareApplication" : "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.shortDescription,
    url: projectUrl,
    applicationCategory: project.category,
    operatingSystem: "Web",
    keywords: project.technologies.join(", "),
    author: {
      "@type": "Person",
      name: profileData.name,
      jobTitle: profileData.designation,
      url: siteConfig.siteUrl,
    },
    creator: {
      "@type": "Person",
      name: profileData.name,
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}
