"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

const BRACKET = "font-light text-[1.4em] leading-none text-foreground";

export function Brackets({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "center center"],
  });
  const left = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-45%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div
      ref={target}
      className="grid grid-cols-[auto_1fr_auto] items-center gap-[clamp(0.5rem,3vw,3rem)]"
    >
      <motion.span aria-hidden style={{ x: left, opacity }} className={BRACKET}>
        (
      </motion.span>
      {children}
      <motion.span
        aria-hidden
        style={{ x: right, opacity }}
        className={BRACKET}
      >
        )
      </motion.span>
    </div>
  );
}
