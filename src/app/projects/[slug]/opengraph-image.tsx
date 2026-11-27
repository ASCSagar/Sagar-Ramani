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
          backgroundColor: "#0C0C0C",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(208, 255, 55, 0.12) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(208, 255, 55, 0.06) 0%, transparent 50%)",
          color: "#F2F0EB",
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
                borderRadius: "12px",
                border: "1.5px solid rgba(208, 255, 55, 0.4)",
                background: "rgba(208, 255, 55, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 700,
                color: "#D0FF35",
              }}
            >
              {siteConfig.shortName}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "16px", color: "#F2F0EB", fontWeight: 600 }}>
                {siteConfig.name}
              </span>
              <span style={{ fontSize: "14px", color: "#A3A3A3" }}>
                {siteConfig.designation}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(208, 255, 55, 0.3)",
              background: "rgba(208, 255, 55, 0.08)",
              fontSize: "14px",
              color: "#D0FF35",
              fontWeight: 600,
            }}
          >
            {employer} · {kind}
          </div>
        </div>

        {/* Center Case Study Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "24px 0" }}>
          <span style={{ fontSize: "14px", color: "#D0FF35", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
            Engineering Case Study
          </span>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#F2F0EB",
              lineHeight: 1.15,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#A3A3A3",
              margin: 0,
              maxWidth: "880px",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>

        {/* Tech Stack Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #292929", paddingTop: "24px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {technologies.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid #292929",
                  fontSize: "13px",
                  color: "#D4D4D8",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "14px", color: "#A3A3A3", fontWeight: 500 }}>
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
