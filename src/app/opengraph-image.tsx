import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CROWN_PATH =
  "M16 18L125.98 115.041L152 18L178.02 115.041L288 18C288 18 282.702 36.957 271.848 61.6117L209.114 231L190.96 163.296C179.106 169.399 166.126 173 152 173C137.874 173 124.894 169.399 113.04 163.296L94.8863 231L32.152 61.6117C21.2977 36.957 16 18 16 18Z";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        background: `radial-gradient(circle at 50% 120%, #2b2b2b, ${site.background} 60%)`,
        color: site.foreground,
      }}
    >
      <svg width="200" height="158" viewBox="10 12 284 225">
        <title>{site.name}</title>
        <path d={CROWN_PATH} fill="#c7c7c7" />
      </svg>
      <div style={{ fontSize: 120, letterSpacing: "-0.05em", lineHeight: 1 }}>
        {site.name}
      </div>
      <div style={{ fontSize: 36, color: "#8a8a8a", letterSpacing: "-0.02em" }}>
        {site.tagline}
      </div>
    </div>,
    size,
  );
}
