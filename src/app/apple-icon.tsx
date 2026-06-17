import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f2d4d 0%, #2c97d1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1 }}>K</div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.15em",
            marginTop: 6,
          }}
        >
          KOOLACUBE
        </div>
      </div>
    ),
    size,
  );
}
