const COS_30 = Math.cos(Math.PI / 6);
const ROUNDED_CORNER_PULL = 2 - Math.SQRT2;

type Point = readonly [x: number, y: number];

export const ISO_MATRIX = `matrix(${COS_30.toFixed(4)} -0.5 ${COS_30.toFixed(4)} 0.5 0 0)`;

export const FLAT_TO_UPRIGHT = "rotate(45)";

export function isoExtent(side: number) {
  return { halfWidth: side * COS_30, halfHeight: side / 2 };
}

export function isoSilhouetteHalfWidth(side: number, radius: number) {
  return COS_30 * (side - ROUNDED_CORNER_PULL * radius);
}

export function flatToScreen([x, y]: Point): Point {
  return [COS_30 * (x + y), (y - x) / 2];
}

export const HAIRLINE = {
  vectorEffect: "non-scaling-stroke",
  strokeWidth: 1,
} as const;
