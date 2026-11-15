import type { ReactNode } from "react";
import { HAIRLINE, ISO_MATRIX, isoSilhouetteHalfWidth } from "./isometric";

type SlabProps = {
  center: readonly [x: number, y: number];
  side: number;
  radius: number;
  thickness: number;
  rimStroke: string;
  children?: ReactNode;
};

const BEVEL_INSET = 3;

export function Slab({
  center: [x, y],
  side,
  radius,
  thickness,
  rimStroke,
  children,
}: SlabProps) {
  const face = {
    x: -side / 2,
    y: -side / 2,
    width: side,
    height: side,
    rx: radius,
  };
  const bevel = {
    x: face.x + BEVEL_INSET,
    y: face.y + BEVEL_INSET,
    width: side - 2 * BEVEL_INSET,
    height: side - 2 * BEVEL_INSET,
    rx: radius - BEVEL_INSET / 2,
  };
  const edge = isoSilhouetteHalfWidth(side, radius);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        {...face}
        transform={`translate(0 ${thickness}) ${ISO_MATRIX}`}
        className="fill-surface stroke-white/30"
        {...HAIRLINE}
      />
      <rect
        x={-edge}
        y={0}
        width={2 * edge}
        height={thickness}
        className="fill-surface"
      />
      <path
        d={`M${-edge} 0V${thickness}M${edge} 0V${thickness}`}
        className="stroke-white/30"
        {...HAIRLINE}
      />
      <g transform={ISO_MATRIX}>
        <rect
          {...face}
          className="fill-surface"
          stroke={rimStroke}
          vectorEffect="non-scaling-stroke"
          strokeWidth={1.25}
        />
        <rect {...bevel} className="fill-none stroke-white/15" {...HAIRLINE} />
        {children}
      </g>
    </g>
  );
}
