import { ImageResponse } from "next/og";
import { OgFrame } from "./OgFrame";
import { loadOgFonts, loadOgImages } from "./ogAssets";
import { OG_SIZE, OG_TEXT_LIFT } from "./ogTheme";

export type PageOgCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

const PAGE_GLOW = {
  canvasWidth: OG_SIZE.width,
  canvasHeight: OG_SIZE.height,
  horizonY: OG_SIZE.height + 40,
  frameWidth: 1050,
};
const TITLE_SIZES = [
  { maxLength: 12, fontSize: 196 },
  { maxLength: 32, fontSize: 96 },
  { maxLength: 56, fontSize: 76 },
  { maxLength: Number.POSITIVE_INFINITY, fontSize: 62 },
] as const;

const titleSizeFor = (title: string) =>
  TITLE_SIZES.find(({ maxLength }) => title.length <= maxLength)?.fontSize ??
  TITLE_SIZES[TITLE_SIZES.length - 1].fontSize;

export async function pageOgImage({ eyebrow, title, subtitle }: PageOgCopy) {
  const [fonts, { grain }] = await Promise.all([loadOgFonts(), loadOgImages()]);
  return new ImageResponse(
    <OgFrame glow={PAGE_GLOW} grain={grain}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          padding: "0 96px 96px",
          textAlign: "center",
          textShadow: OG_TEXT_LIFT,
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 40,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            opacity: 0.95,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontFamily: "Clash Display",
            fontWeight: 500,
            fontSize: titleSizeFor(title),
            letterSpacing: "-0.035em",
            lineHeight: 0.98,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 30,
            letterSpacing: "-0.025em",
            lineHeight: 1.3,
            maxWidth: 900,
            opacity: 0.85,
          }}
        >
          {subtitle}
        </div>
      </div>
    </OgFrame>,
    { ...OG_SIZE, fonts: [...fonts] },
  );
}
