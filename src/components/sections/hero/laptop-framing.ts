import type { Vector3 } from "three";
import { LAPTOP_MOTION, type LaptopPose, type LaptopView } from "@/data/laptop";

/** On-screen extent of the settled laptop, in laptop widths at the focal plane. */
export type Footprint = {
  width: number;
  height: number;
  /** Center of the extent relative to the laptop's origin (front-center of the base). */
  centerX: number;
  centerY: number;
};

export type Framing = { from: LaptopPose; to: LaptopPose };

/**
 * Projects the laptop's outline through an on-axis camera `distance` laptop
 * widths away, with the laptop's origin on the axis.
 */
export function measureFootprint(
  outline: readonly Vector3[],
  distance: number,
): Footprint {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const { x, y, z } of outline) {
    const perspective = distance / (distance - z);
    const u = x * perspective;
    const v = y * perspective;
    minX = Math.min(minX, u);
    maxX = Math.max(maxX, u);
    minY = Math.min(minY, v);
    maxY = Math.max(maxY, v);
  }
  return {
    width: maxX - minX,
    height: maxY - minY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

/** Fits the settled laptop inside `slot`; the entrance starts off-screen left at the same height. */
export function frame(
  host: DOMRect,
  slot: DOMRect,
  footprint: Footprint,
  { scale, yawDeg, lidDeg }: Pick<LaptopView, "scale" | "yawDeg" | "lidDeg">,
): Framing {
  const size =
    scale *
    Math.min(slot.width / footprint.width, slot.height / footprint.height);
  const originX =
    slot.left - host.left + slot.width / 2 - footprint.centerX * size;
  const originY =
    slot.top - host.top + slot.height / 2 + footprint.centerY * size;
  const width = size / host.width;
  const ndcY = 1 - (originY / host.height) * 2;

  return {
    from: {
      ndcX: -1 - LAPTOP_MOTION.offscreen * width,
      ndcY,
      depth: LAPTOP_MOTION.startDepth,
      width,
      yawDeg: yawDeg - LAPTOP_MOTION.turnDeg,
      lidDeg: 0,
    },
    to: {
      ndcX: (originX / host.width) * 2 - 1,
      ndcY,
      depth: 0,
      width,
      yawDeg,
      lidDeg,
    },
  };
}
