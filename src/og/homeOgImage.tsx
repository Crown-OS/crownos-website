import { ImageResponse } from "next/og";
import { hero } from "@/data/hero";
import { CrownWordmark } from "./CrownWordmark";
import { OgFrame } from "./OgFrame";
import { loadOgFonts, loadOgImages } from "./ogAssets";
import { OG_SIZE, OG_TEXT_LIFT } from "./ogTheme";
import { SweepSloganLine } from "./SweepSloganLine";

const LAPTOP = { width: 900, height: 616, top: 392 };
const LAPTOP_GLOW = {
  canvasWidth: OG_SIZE.width,
  canvasHeight: OG_SIZE.height,
  horizonY: LAPTOP.top + LAPTOP.height * hero.laptop.horizon,
  frameWidth: LAPTOP.width,
};

export async function homeOgImage() {
  const [fonts, { laptop, grain }] = await Promise.all([
    loadOgFonts(),
    loadOgImages(),
  ]);
  return new ImageResponse(
    <OgFrame glow={LAPTOP_GLOW} grain={grain}>
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
          paddingTop: 34,
          textShadow: OG_TEXT_LIFT,
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 54,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            opacity: 0.95,
          }}
        >
          {hero.eyebrow}
        </div>
        <CrownWordmark fontSize={196} />
        <SweepSloganLine copy={hero.slogan} fontSize={33} />
      </div>
      {/* biome-ignore lint/performance/noImgElement: Satori renders plain img elements */}
      <img
        src={laptop}
        alt=""
        width={LAPTOP.width}
        height={LAPTOP.height}
        style={{
          position: "absolute",
          top: LAPTOP.top,
          left: (OG_SIZE.width - LAPTOP.width) / 2,
        }}
      />
    </OgFrame>,
    { ...OG_SIZE, fonts: [...fonts] },
  );
}
