import type { ReactNode } from "react";
import { type GlowPlacement, glowColumns } from "./glowColumns";
import { OG_COLORS } from "./ogTheme";

type OgFrameProps = {
  glow: GlowPlacement;
  grain: string;
  children: ReactNode;
};

export function OgFrame({ glow, grain, children }: OgFrameProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: OG_COLORS.ink,
        color: OG_COLORS.paper,
        overflow: "hidden",
      }}
    >
      {glowColumns(glow).map(({ left, width, background }) => (
        <div
          key={left}
          style={{
            position: "absolute",
            top: 0,
            left,
            width,
            height: "100%",
            backgroundImage: background,
            borderLeft: `1px solid ${OG_COLORS.seam}`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${grain})`,
          backgroundRepeat: "repeat",
          backgroundSize: "192px 192px",
        }}
      />
      {children}
    </div>
  );
}
