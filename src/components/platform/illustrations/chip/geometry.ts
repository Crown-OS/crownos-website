import { roundCoordinate as round } from "@/util/round-coordinate";

export const UNIT_SCALE = 4;
export const HAIRLINE = 1 / UNIT_SCALE;
export const SIZE = 40;
export const CENTER = SIZE / 2;

export const LEAD = {
  count: 14,
  step: 1.9,
  width: 0.75,
  length: 3.4,
  bend: 1.6,
  tuck: 0.3,
};

export type Point = readonly [number, number];
export type Edge = (along: number, outward: number) => Point;

export const EDGES: readonly Edge[] = [
  (along, outward) => [along, -outward],
  (along, outward) => [-outward, along],
  (along, outward) => [along, SIZE + outward],
  (along, outward) => [SIZE + outward, along],
];

const firstLead = CENTER - ((LEAD.count - 1) * LEAD.step) / 2;

export const leadPositions = Array.from(
  { length: LEAD.count },
  (_, index) => firstLead + index * LEAD.step,
);

export const toPath = (points: readonly Point[]) =>
  `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}`;

export const circlePath = ([x, y]: Point, radius: number) =>
  `M${round(x - radius)} ${round(y)}a${radius} ${radius} 0 1 0 ${round(2 * radius)} 0a${radius} ${radius} 0 1 0 ${round(-2 * radius)} 0Z`;

export type Box = { x: number; y: number; width: number; height: number };

export function roundedRectPath({ x, y, width, height }: Box, radius = 0) {
  const cornerRadius = Math.min(radius, width / 2, height / 2);
  const corner = (towardsX: number, towardsY: number) =>
    cornerRadius
      ? `a${cornerRadius} ${cornerRadius} 0 0 1 ${round(towardsX * cornerRadius)} ${round(towardsY * cornerRadius)}`
      : "";
  return `M${round(x + cornerRadius)} ${round(y)}h${round(width - 2 * cornerRadius)}${corner(1, 1)}v${round(height - 2 * cornerRadius)}${corner(-1, 1)}h${round(2 * cornerRadius - width)}${corner(-1, -1)}v${round(2 * cornerRadius - height)}${corner(1, -1)}Z`;
}
