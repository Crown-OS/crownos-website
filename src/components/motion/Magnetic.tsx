"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { FINE_POINTER } from "@/util/pointer";
import { prefersReducedMotion } from "@/util/reduced-motion";

const MAGNET_SPRING = { stiffness: 260, damping: 18, mass: 0.6 };
const DEFAULT_PULL = 0.32;

type MagneticProps = {
  pull?: number;
  className?: string;
  children: ReactNode;
};

const canAttract = () =>
  window.matchMedia(FINE_POINTER).matches && !prefersReducedMotion();

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
    if (!canAttract()) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    offsetX.set((event.clientX - bounds.left - bounds.width / 2) * pull);
    offsetY.set((event.clientY - bounds.top - bounds.height / 2) * pull);
  };
  const release = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.span
      className={className}
      style={{ x, y }}
      onPointerMove={attract}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  );
}
