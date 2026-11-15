import type { CSSProperties } from "react";
import { ShaderCanvas } from "@/components/motion/ShaderCanvas";
import { entranceDelay } from "@/data/entrance";
import { hero } from "@/data/hero";
import { horizonGlowShader } from "@/shaders/horizon-glow";

const { laptop, glow } = hero;
const GLOW_SHADER = horizonGlowShader(glow);
const GLOW_HEIGHT = glow.above + glow.below;
const IMAGE_ASPECT = laptop.size.height / laptop.size.width;
const GLOW_CUT_INSET =
  (glow.below - (laptop.glowCut - laptop.horizon) * IMAGE_ASPECT) / GLOW_HEIGHT;
const DISPLAY_WIDTH = `${laptop.viewportShare * 100}vw`;
const FRAME_STYLE = {
  "--glow-horizon": `${laptop.horizon * 100}%`,
  "--glow-width": `${glow.span * 100}%`,
  "--glow-aspect": `${glow.span} / ${GLOW_HEIGHT}`,
  "--glow-lift": `${(-glow.above / GLOW_HEIGHT) * 100}%`,
  "--glow-cut-inset": `${GLOW_CUT_INSET * 100}%`,
  "--delay": `${entranceDelay.laptop}ms`,
  width: DISPLAY_WIDTH,
  aspectRatio: `${laptop.size.width} / ${laptop.size.height}`,
} as CSSProperties;
const SOURCE_SET = laptop.widths
  .map((width) => `${laptop.path}/${width}.avif ${width}w`)
  .join(", ");

export function HeroLaptop() {
  return (
    <div
      data-reveal="fade"
      className="relative -z-1 mt-10 max-w-none shrink-0 md:mt-14"
      style={FRAME_STYLE}
    >
      <div
        aria-hidden
        className="absolute top-(--glow-horizon) left-1/2 -z-1 aspect-(--glow-aspect) w-(--glow-width) translate-x-[-50%] translate-y-(--glow-lift) animate-[glow-rise_1.8s_linear_var(--delay)_both] mask-[linear-gradient(to_bottom,transparent,#000_30%)] [clip-path:inset(0_0_var(--glow-cut-inset)_0)] intro-waiting:[animation-play-state:paused] motion-reduce:animate-none"
      >
        <ShaderCanvas fragment={GLOW_SHADER} progressProperty="--glow-rise" />
      </div>
      {/* biome-ignore lint/performance/noImgElement: static export serves pre-encoded AVIF tiers */}
      <img
        src={`${laptop.path}/${laptop.widths[1]}.avif`}
        srcSet={SOURCE_SET}
        sizes={DISPLAY_WIDTH}
        width={laptop.size.width}
        height={laptop.size.height}
        alt={laptop.label}
        fetchPriority="high"
        className="relative size-full"
      />
    </div>
  );
}
