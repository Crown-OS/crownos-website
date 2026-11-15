import { flatToScreen, isoExtent } from "./isometric";

type Point = readonly [x: number, y: number];

export const STAGE = { width: 320, height: 300 } as const;

export const BASE = {
  center: [160, 186] as Point,
  side: 96,
  radius: 12,
  thickness: 12,
} as const;

export const FLOOR_CENTER: Point = [
  BASE.center[0],
  BASE.center[1] + BASE.thickness,
];

export const WINDOW_RISE = 138;

export const SATELLITE = { side: 34, radius: 7, thickness: 5 } as const;

export const SATELLITE_FLOOR_POSITIONS: readonly Point[] = [
  [-20, -110],
  [-125, 20],
  [0, 125],
];

export function satelliteTopCenter(floorPosition: Point): Point {
  const [x, y] = flatToScreen(floorPosition);
  return [FLOOR_CENTER[0] + x, FLOOR_CENTER[1] + y - SATELLITE.thickness];
}

export const WINDOW_COUNT = 6;

export const LANDING_INTERVAL_SECONDS = 1.6;

const WINDOW_PADDING = 1.5;

export function windowBox() {
  const { halfWidth, halfHeight } = isoExtent(BASE.side);
  const width = 2 * (halfWidth + WINDOW_PADDING);
  const height = 2 * (halfHeight + WINDOW_PADDING);
  const [centerX, centerY] = BASE.center;
  return {
    viewBox: `${-width / 2} ${-height / 2} ${width} ${height}`,
    left: `${((centerX - width / 2) / STAGE.width) * 100}%`,
    top: `${((centerY - height / 2) / STAGE.height) * 100}%`,
    width: `${(width / STAGE.width) * 100}%`,
    height: `${(height / STAGE.height) * 100}%`,
    rise: `${(-WINDOW_RISE / height) * 100}%`,
  };
}
