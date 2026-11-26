import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090B",
          borderRadius: "36px",
          border: "4px solid #818CF8",
          color: "#818CF8",
          fontSize: "80px",
          fontWeight: 800,
          letterSpacing: "-0.05em",
        }}
      >
        SR
      </div>
    ),
    {
      ...size,
    }
  );
}
