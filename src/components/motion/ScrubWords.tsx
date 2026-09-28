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

type ScrubWordProps = {
  token: Token;
  progress: MotionValue<number>;
  total: number;
};

function ScrubWord({ token, progress, total }: ScrubWordProps) {
  const start = token.index / total;
  const opacity = useTransform(
    progress,
    [start, start + 1 / total],
    [DIMMED, 1],
  );
  return (
    <>
      <motion.span
        style={{ opacity }}
        className={token.emphasis ? EMPHASIS_CLASS : undefined}
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
    offset: ["start 0.85", "end 0.5"],
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
