"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { asTransition, SPRING_MORPH, SPRING_TIGHT } from "@/data/springs";
import { useMediaQuery } from "@/util/use-media-query";

const INTERACTIVE = "a, button, [data-cursor]";
const MORPH = asTransition(SPRING_MORPH);

export function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const followX = useSpring(x, SPRING_TIGHT);
  const followY = useSpring(y, SPRING_TIGHT);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer) return;
    const root = document.documentElement;
    root.classList.add("cursor-none");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(
        INTERACTIVE,
      );
      setActive(Boolean(target));
      setLabel(target?.dataset.cursor ?? "");
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("cursor-none");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
      style={{ x: followX, y: followY }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 grid size-[4.5rem] place-items-center rounded-full bg-white"
        initial={false}
        animate={{ scale: active ? 1 : 0.14, opacity: visible ? 1 : 0 }}
        transition={MORPH}
      >
        <motion.span
          className="font-mono text-[0.7rem] text-black uppercase"
          animate={{ opacity: label && active ? 1 : 0 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
