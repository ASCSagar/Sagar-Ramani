import { ImageResponse } from "next/og";

import {
  getProjectBySlug,
  getPublishedProjects,
  projectKindLabels,
} from "@/data/projects";
import { siteConfig } from "@/data/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function generateStaticParams() {
  return getPublishedProjects().map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title || "Case Study";
  const kind = project ? projectKindLabels[project.kind] : "Project";
  const employer = project?.employer || "Portfolio";
  const description =
    project?.shortDescription ||
    "Production engineering case study by Sagar Ramani.";
  const technologies = project?.technologies.slice(0, 5) || [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#09090B",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.22) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(139, 92, 246, 0.18) 0%, transparent 50%)",
          color: "#FAFAFA",
          fontFamily: "system-ui, sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                border: "1.5px solid rgba(129, 140, 248, 0.4)",
                background: "rgba(129, 140, 248, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 700,
                color: "#818CF8",
              }}
            >
              SR
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "16px", color: "#FAFAFA", fontWeight: 600 }}>
                {siteConfig.name}
              </span>
              <span style={{ fontSize: "14px", color: "#A1A1AA" }}>
                {siteConfig.designation}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(129, 140, 248, 0.3)",
              background: "rgba(129, 140, 248, 0.08)",
              fontSize: "14px",
              color: "#A78BFA",
              fontWeight: 500,
            }}
          >
            {employer} · {kind}
          </div>
        </div>

        {/* Center Case Study Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "24px 0" }}>
          <span style={{ fontSize: "14px", color: "#818CF8", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
            Engineering Case Study
          </span>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#FFFFFF",
              lineHeight: 1.15,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#A1A1AA",
              margin: 0,
              maxWidth: "880px",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>

        {/* Tech Stack Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "24px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {technologies.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "13px",
                  color: "#D4D4D8",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "14px", color: "#71717A", fontWeight: 500 }}>
            projects/{slug}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
