"use client";

import { motion, useSpring } from "motion/react";
import { type PointerEvent, type ReactNode, useRef } from "react";

const SPRING = { stiffness: 200, damping: 15, mass: 0.6 };

type MagneticProps = { children: ReactNode; strength?: number };

export function Magnetic({ children, strength = 0.32 }: MagneticProps) {
  const bounds = useRef<DOMRect | null>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const attract = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== "mouse") return;
    bounds.current ??= event.currentTarget.getBoundingClientRect();
    const { left, top, width, height } = bounds.current;
    x.set((event.clientX - (left + width / 2)) * strength);
    y.set((event.clientY - (top + height / 2)) * strength);
  };

  const release = () => {
    bounds.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={attract}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  );
}
