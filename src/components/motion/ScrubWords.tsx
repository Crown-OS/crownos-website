"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { type Token, tokenize } from "@/util/emphasis";
import { EMPHASIS_CLASS } from "./SplitWords";

const DIMMED = 0.14;
const WAVE_AMPLITUDE = 0.28;
const WAVE_TILT = 7;

type ScrubWordProps = {
  token: Token;
  progress: MotionValue<number>;
  total: number;
};

function ScrubWord({ token, progress, total }: ScrubWordProps) {
  const start = token.index / total;
  const reveal = useTransform(progress, [start, start + 1 / total], [0, 1]);
  const opacity = useTransform(reveal, [0, 1], [DIMMED, 1]);

  const phase = (token.index / Math.max(total - 1, 1)) * Math.PI;
  const settle = useTransform(reveal, [0, 1], [1, 0]);
  const y = useTransform(
    settle,
    (value) => `${value * -Math.sin(phase) * WAVE_AMPLITUDE}em`,
  );
  const rotate = useTransform(
    settle,
    (value) => value * Math.cos(phase) * WAVE_TILT,
  );

  return (
    <>
      <motion.span
        style={{ opacity, y, rotate }}
        className={`inline-block will-change-transform ${token.emphasis ? EMPHASIS_CLASS : ""}`}
      >
        {token.word}
      </motion.span>{" "}
    </>
  );
}

export function ScrubWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const target = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.95", "end 0.3"],
  });
  const tokens = tokenize(text);

  return (
    <p ref={target} className={className}>
      {tokens.map((token) => (
        <ScrubWord
          key={token.index}
          token={token}
          progress={scrollYProgress}
          total={tokens.length}
        />
      ))}
    </p>
  );
}
