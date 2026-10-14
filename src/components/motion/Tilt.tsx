"use client";

import { useSpring } from "motion/react";
import * as m from "motion/react-m";
import type { PointerEvent, ReactNode } from "react";
import { canFollowPointer } from "@/util/pointer";

const TILT_SPRING = { stiffness: 170, damping: 18, mass: 0.7 };
const DEFAULT_ANGLE = 5;

type TiltProps = {
  angle?: number;
  className?: string;
  children: ReactNode;
};

export function Tilt({
  angle = DEFAULT_ANGLE,
  className,
  children,
}: TiltProps) {
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);

  const lean = (event: PointerEvent<HTMLDivElement>) => {
    if (!canFollowPointer()) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const across = (event.clientX - bounds.left) / bounds.width - 0.5;
    const down = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(across * angle * 2);
    rotateX.set(-down * angle * 2);
  };
  const settle = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
      onPointerMove={lean}
      onPointerLeave={settle}
    >
      {children}
    </m.div>
  );
}
