"use client";

import { easeOut, type MotionValue, useTransform } from "motion/react";
import * as m from "motion/react-m";
import {
  type DeviceStill,
  deviceBox,
  deviceSrcSet,
  deviceUrl,
  type EntrySide,
} from "@/util/device-still";
import type { Size } from "@/util/frame-sequence";
import type { ScrollRange } from "@/util/scroll-range";

const ENTRY_OFFSET: Record<EntrySide, string> = {
  left: "-80vw",
  right: "80vw",
};

type HeroDeviceProps = {
  device: DeviceStill;
  frame: Size;
  progress: MotionValue<number>;
  range: ScrollRange;
};

export function HeroDevice({
  device,
  frame,
  progress,
  range,
}: HeroDeviceProps) {
  const [start, end] = range;
  const x = useTransform(
    progress,
    range,
    [ENTRY_OFFSET[device.enterFrom], "0vw"],
    { ease: easeOut },
  );
  const opacity = useTransform(progress, [start, (start + end) / 2], [0, 1]);
  const box = deviceBox(device, frame);

  return (
    // biome-ignore lint/performance/noImgElement: static export; AVIF tiers are pre-encoded by scripts/encode-devices.ts
    <m.img
      src={deviceUrl(device, device.widths[0])}
      srcSet={deviceSrcSet(device)}
      sizes={`${Math.ceil(box.width * 100)}vw`}
      alt={device.label}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      draggable={false}
      className="absolute h-auto max-w-none select-none"
      style={{
        left: `${box.left * 100}%`,
        top: `${box.top * 100}%`,
        width: `${box.width * 100}%`,
        x,
        opacity,
      }}
    />
  );
}
