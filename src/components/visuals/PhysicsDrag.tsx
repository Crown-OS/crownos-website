"use client";

import {
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { WindowChrome } from "./WindowChrome";

const TILT_VELOCITY = [-2400, 2400];
const TILT_DEGREES = [-9, 9];
const TILT_SPRING = { stiffness: 320, damping: 28 };
const RETURN_SPRING = { bounceStiffness: 380, bounceDamping: 18 };
const SPRING_CURVE =
  "M0 40C14 2 24 2 34 40S54 70 64 40 82 22 90 40 104 52 110 40 122 34 126 40 136 43 140 40";

function SpringReadout() {
  return (
    <div className="absolute bottom-[6%] left-[6%] grid gap-2 font-mono text-[10px] text-white/45">
      <svg viewBox="0 0 140 80" aria-hidden="true" className="w-32">
        <path
          d={SPRING_CURVE}
          fill="none"
          strokeWidth={1.2}
          className="stroke-white/70"
        />
        <path d="M0 40h140" className="stroke-white/12" strokeDasharray="2 4" />
      </svg>
      <span>stiffness 380 · damping 18 · 120 Hz</span>
    </div>
  );
}

export function PhysicsDrag() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tilt = useTransform(useVelocity(x), TILT_VELOCITY, TILT_DEGREES);
  const rotate = useSpring(tilt, TILT_SPRING);

  return (
    <div
      ref={boundsRef}
      className="relative size-full overflow-hidden bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] bg-size-[20px_20px]"
    >
      <m.div
        drag
        dragConstraints={boundsRef}
        dragElastic={0.2}
        dragSnapToOrigin
        dragTransition={RETURN_SPRING}
        whileDrag={{ scale: 1.04 }}
        style={{ x, y, rotate }}
        data-cursor="Drag"
        className="absolute top-[18%] left-[16%] flex h-[46%] w-[68%] cursor-grab touch-none flex-col overflow-hidden squircle rounded-window border border-white/14 bg-gray-850 shadow-[0_32px_64px_-24px_rgb(0_0_0/0.9)] active:cursor-grabbing"
      >
        <WindowChrome title="fling me" />
      </m.div>
      <SpringReadout />
      <p className="absolute right-[6%] bottom-[6%] font-mono text-[10px] text-white/45 uppercase">
        Drag the window
      </p>
    </div>
  );
}
