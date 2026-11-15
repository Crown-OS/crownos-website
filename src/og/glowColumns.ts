import { HORIZON_GLOW_RAMP, HORIZON_GLOW_SHAPE } from "@/shaders/horizon-glow";
import { roundCoordinate as round } from "@/util/round-coordinate";

export type GlowPlacement = {
  canvasWidth: number;
  canvasHeight: number;
  horizonY: number;
  frameWidth: number;
};

export type GlowColumn = { left: number; width: number; background: string };

const {
  rise,
  bellRadius,
  bellSharpness,
  shoulderDrop,
  shoulderStretch,
  columnWidth,
} = HORIZON_GLOW_SHAPE;

const shoulderOf = (columnIndex: number) =>
  1 -
  Math.exp(
    -((Math.abs(columnIndex * columnWidth) / bellRadius) ** bellSharpness),
  );

export function glowColumns({
  canvasWidth,
  canvasHeight,
  horizonY,
  frameWidth,
}: GlowPlacement): GlowColumn[] {
  const columnPixels = columnWidth * frameWidth;
  const reach = Math.ceil(canvasWidth / 2 / columnPixels) + 1;
  const liftAtTop = horizonY / frameWidth;
  const liftAtBottom = (horizonY - canvasHeight) / frameWidth;
  const toPercent = (lift: number) =>
    round(((lift - liftAtBottom) / (liftAtTop - liftAtBottom)) * 100);

  return Array.from({ length: reach * 2 + 1 }, (_, offset) => {
    const columnIndex = offset - reach;
    const shoulder = shoulderOf(columnIndex);
    const stops = HORIZON_GLOW_RAMP.map(([rampAt, color]) => {
      const lift =
        (rampAt - shoulderDrop * shoulder) /
        (rise + shoulderStretch * shoulder);
      return `${color} ${toPercent(lift)}%`;
    });
    return {
      left: round(canvasWidth / 2 + (columnIndex - 0.5) * columnPixels),
      width: round(columnPixels),
      background: `linear-gradient(to top, ${stops.join(", ")})`,
    };
  });
}
