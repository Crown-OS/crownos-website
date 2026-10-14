"use client";

import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import type { PointerEvent, ReactNode } from "react";
import { canFollowPointer } from "@/util/pointer";

const MAGNET_SPRING = { stiffness: 260, damping: 18, mass: 0.6 };
const DEFAULT_PULL = 0.32;

type MagneticProps = {
  pull?: number;
  className?: string;
  children: ReactNode;
};

export function Magnetic({
  pull = DEFAULT_PULL,
  className = "inline-flex",
  children,
}: MagneticProps) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, MAGNET_SPRING);
  const y = useSpring(offsetY, MAGNET_SPRING);

  const attract = (event: PointerEvent<HTMLSpanElement>) => {
    if (!canFollowPointer()) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    offsetX.set((event.clientX - bounds.left - bounds.width / 2) * pull);
    offsetY.set((event.clientY - bounds.top - bounds.height / 2) * pull);
  };
  const release = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <m.span
      className={className}
      style={{ x, y }}
      onPointerMove={attract}
      onPointerLeave={release}
    >
      {children}
    </m.span>
  );
}
