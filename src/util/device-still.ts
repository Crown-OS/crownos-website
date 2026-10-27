import type { Size } from "./frame-sequence";

export type EntrySide = "left" | "right";

export type DeviceStill = {
  label: string;
  path: string;
  widths: readonly number[];
  size: Size;
  centerX: number;
  bottom: number;
  depth: number;
  enterFrom: EntrySide;
};

export type FrameBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export const deviceUrl = ({ path }: DeviceStill, width: number) =>
  `${path}-${width}.avif`;

export const deviceSrcSet = (device: DeviceStill) =>
  device.widths
    .map((width) => `${deviceUrl(device, width)} ${width}w`)
    .join(", ");

export function deviceBox(device: DeviceStill, frame: Size): FrameBox {
  const width = (device.size.width * device.depth) / frame.width;
  const height = (device.size.height * device.depth) / frame.height;
  return {
    left: device.centerX - width / 2,
    top: device.bottom - height,
    width,
    height,
  };
}

export type VerticalBounds = { top: number; bottom: number };
export type Lineup = VerticalBounds & { centeredWidth: number };

export function lineupSpan(
  devices: readonly DeviceStill[],
  frame: Size,
  anchor: VerticalBounds,
): Lineup {
  const boxes = devices.map((device) => deviceBox(device, frame));
  const left = Math.min(...boxes.map((box) => box.left));
  const right = Math.max(...boxes.map((box) => box.left + box.width));
  return {
    centeredWidth: 2 * Math.max(0.5 - left, right - 0.5),
    top: Math.min(anchor.top, ...boxes.map((box) => box.top)),
    bottom: Math.max(
      anchor.bottom,
      ...boxes.map((box) => box.top + box.height),
    ),
  };
}
