import { ImageResponse } from "next/og";

import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = `${profileData.name} | ${profileData.designation}`;

export default function OpenGraphImage() {
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
        {/* Top Header */}
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
                letterSpacing: "0.05em",
              }}
            >
              {siteConfig.shortName}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "16px", color: "#F2F0EB", fontWeight: 600 }}>
                {siteConfig.name}
              </span>
              <span style={{ fontSize: "14px", color: "#A3A3A3" }}>
                {siteConfig.location}
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
            {profileData.experience} Production Experience
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "24px 0" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#F2F0EB",
              lineHeight: 1.1,
            }}
          >
            {profileData.name}
          </h1>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#D0FF35",
              margin: 0,
            }}
          >
            {profileData.designation}
          </p>
          <p
            style={{
              fontSize: "18px",
              color: "#A3A3A3",
              margin: 0,
              maxWidth: "880px",
              lineHeight: 1.5,
            }}
          >
            {profileData.summary}
          </p>
        </div>

        {/* Bottom Tags */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #292929", paddingTop: "24px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {profileData.expertise.slice(0, 6).map((tag) => (
              <div
                key={tag}
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
                {tag}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "14px", color: "#A3A3A3", fontWeight: 500 }}>
            {siteConfig.siteUrl.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
