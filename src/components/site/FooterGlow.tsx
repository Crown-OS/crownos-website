import type { CSSProperties } from "react";
import { ShaderCanvas } from "@/components/motion/ShaderCanvas";
import { footer } from "@/data/footer";
import { horizonGlowShader } from "@/shaders/horizon-glow";

const { glow } = footer;
const GLOW_SHADER = horizonGlowShader(glow);
const GLOW_STYLE = {
  aspectRatio: `${glow.span} / ${glow.above + glow.below}`,
} satisfies CSSProperties;

export function FooterGlow() {
  return (
    <div
      aria-hidden="true"
      style={GLOW_STYLE}
      className="pointer-events-none absolute bottom-0 left-1/2 -z-1 h-full max-w-none -translate-x-1/2 mask-[linear-gradient(to_bottom,transparent,#000_45%)]"
    >
      <ShaderCanvas fragment={GLOW_SHADER} />
    </div>
  );
}
