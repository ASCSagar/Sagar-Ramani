import { ImageResponse } from "next/og";

import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = `${profileData.name} — ${profileData.designation}`;

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
          backgroundColor: "#09090B",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.22) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(139, 92, 246, 0.18) 0%, transparent 50%)",
          color: "#FAFAFA",
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
                borderRadius: "10px",
                border: "1.5px solid rgba(129, 140, 248, 0.4)",
                background: "rgba(129, 140, 248, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 700,
                color: "#818CF8",
                letterSpacing: "0.05em",
              }}
            >
              SR
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "16px", color: "#A1A1AA", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Portfolio
              </span>
              <span style={{ fontSize: "14px", color: "#71717A" }}>
                Vadodara, Gujarat, India
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
            4+ Years Production Experience
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
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            {profileData.name}
          </h1>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#818CF8",
              margin: 0,
            }}
          >
            {profileData.designation}
          </p>
          <p
            style={{
              fontSize: "18px",
              color: "#A1A1AA",
              margin: 0,
              maxWidth: "880px",
              lineHeight: 1.45,
            }}
          >
            Building scalable enterprise SaaS applications, high-performance web systems, and intelligent automation pipelines.
          </p>
        </div>

        {/* Bottom Tags */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "24px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["React & Next.js", "TypeScript", "Python & Django", "MERN Stack", "Enterprise SaaS", "AI Automation"].map(
              (tag) => (
                <div
                  key={tag}
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
                  {tag}
                </div>
              )
            )}
          </div>
          <span style={{ fontSize: "14px", color: "#71717A", fontWeight: 500 }}>
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
