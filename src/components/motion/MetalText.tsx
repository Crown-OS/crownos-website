"use client";

import { motion, useSpring } from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { CrownLogo } from "@/components/brand/CrownLogo";
import { CROWN_BOUNDS, CROWN_LETTER } from "@/data/brand";
import { SPRING_BOUNCY } from "@/data/springs";
import { METAL_GLINT_EVENT, mountMetalText } from "@/util/metal-text";

const CROWN_ASPECT = `${CROWN_BOUNDS.width} / ${CROWN_BOUNDS.height}`;
const PRESSED_SCALE = 0.92;

function usePress(hostRef: RefObject<HTMLSpanElement | null>) {
  const scale = useSpring(1, SPRING_BOUNCY);
  const pressed = useRef(false);
  const press = () => {
    pressed.current = true;
    scale.set(PRESSED_SCALE);
  };
  const release = () => {
    if (!pressed.current) return;
    pressed.current = false;
    scale.set(1);
    hostRef.current?.dispatchEvent(new Event(METAL_GLINT_EVENT));
  };
  return {
    style: { scale },
    onPointerDown: press,
    onPointerUp: release,
    onPointerLeave: release,
    onPointerCancel: release,
  };
}

export function MetalText({
  text,
  className = "",
  pressable = false,
}: {
  text: string;
  className?: string;
  pressable?: boolean;
}) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const press = usePress(hostRef);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shaded, setShaded] = useState(false);
  const crownAt = text.indexOf(CROWN_LETTER);
  const lead = crownAt < 0 ? text : text.slice(0, crownAt);
  const trail = text.slice(crownAt + 1);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    return mountMetalText(host, canvas, () => setShaded(true));
  }, []);

  return (
    <motion.span
      ref={hostRef}
      className={`relative inline-block ${pressable ? "touch-manipulation select-none" : ""} ${className}`}
      data-cursor={pressable ? "" : undefined}
      {...(pressable ? press : {})}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className={shaded ? "text-transparent" : "text-metal"}>
        <span data-mask="text">{lead}</span>
        {crownAt >= 0 && (
          <>
            <span
              data-mask="crown"
              className="mx-[0.03em] inline-block h-[0.6em]"
              style={{ aspectRatio: CROWN_ASPECT }}
            >
              <CrownLogo
                className={`block size-full ${shaded ? "invisible" : ""}`}
              />
            </span>
            <span data-mask="text">{trail}</span>
          </>
        )}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
      />
    </motion.span>
  );
}
