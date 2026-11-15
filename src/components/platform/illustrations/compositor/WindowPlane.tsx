import type { CSSProperties } from "react";
import { HAIRLINE, ISO_MATRIX } from "./isometric";
import { BASE } from "./layout";

type WindowPlaneProps = {
  viewBox: string;
  tintStroke: string;
  style: CSSProperties;
};

const BEVEL_INSET = 3;

function WindowOutline({ stroke }: { stroke: string }) {
  const half = BASE.side / 2;
  return (
    <g transform={ISO_MATRIX} stroke={stroke} fill="none" {...HAIRLINE}>
      <rect
        x={-half}
        y={-half}
        width={BASE.side}
        height={BASE.side}
        rx={BASE.radius}
      />
      <rect
        x={-half + BEVEL_INSET}
        y={-half + BEVEL_INSET}
        width={BASE.side - 2 * BEVEL_INSET}
        height={BASE.side - 2 * BEVEL_INSET}
        rx={BASE.radius - BEVEL_INSET / 2}
        strokeOpacity={0.35}
      />
    </g>
  );
}

export function WindowPlane({ viewBox, tintStroke, style }: WindowPlaneProps) {
  return (
    <div
      className="absolute animate-[compositor-window-fall_var(--fall-cycle)_linear_var(--fall-delay)_infinite] will-change-[translate,scale,opacity] motion-reduce:[animation-play-state:paused]"
      style={style}
    >
      <svg
        aria-hidden="true"
        viewBox={viewBox}
        className="absolute inset-0 size-full overflow-visible"
      >
        <WindowOutline stroke="rgb(255 255 255 / 0.32)" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox={viewBox}
        className="absolute inset-0 size-full animate-[compositor-window-tint_var(--fall-cycle)_linear_var(--fall-delay)_infinite] overflow-visible opacity-0 motion-reduce:[animation-play-state:paused]"
      >
        <WindowOutline stroke={tintStroke} />
      </svg>
    </div>
  );
}
