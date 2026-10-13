"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/util/reduced-motion";

type ParallaxProps = {
  distance?: number;
  className?: string;
  children: ReactNode;
};

const DEFAULT_DISTANCE = 48;

export function Parallax({
  distance = DEFAULT_DISTANCE,
  className,
  children,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  useEffect(() => setEnabled(!prefersReducedMotion()), []);

  return (
    <m.div ref={ref} style={{ y: enabled ? y : 0 }} className={className}>
      {children}
    </m.div>
  );
}
