import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0f2d4d 0%, #16467a 55%, #2c97d1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#9fd4f0",
          }}
        >
          Commercial Cold Storage · SE Queensland
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            KOOLACUBE
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 46,
              fontWeight: 600,
              color: "#e8f4fb",
              maxWidth: 900,
            }}
          >
            Long-Term Cold Room &amp; Freezer Room Hire
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 34,
            fontWeight: 600,
          }}
        >
          <span>Brisbane · Gold Coast · Sunshine Coast</span>
          <span style={{ color: "#9fd4f0" }}>1300 561 030</span>
        </div>
      </div>
    ),
    size,
  );
}
