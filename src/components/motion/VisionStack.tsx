"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { OS_LOGOS } from "@/components/os-logos";
import type { VisionPanel } from "@/data/crownos";
import { easeOutCubic } from "@/util/easing";
import { splitLetters } from "@/util/split-letters";
import { useMediaQuery } from "@/util/use-media-query";

const PANEL_SCROLL_VH = 140;
const ENTER_SPAN = 0.24;
const EXIT_START = 0.6;
const CONTACT_POINT = 0.5;
const LETTER_OVERLAP = 2.2;
const TILT_ANGLE = 26;
const THROW_DISTANCE = 140;
const LOGO_TRAVEL = 170;
const LOGO_SPIN = 18;

function useLocalProgress(
  source: MotionValue<number>,
  from: number,
  to: number,
) {
  return useTransform(source, [from, to], [0, 1]);
}

function VisionLetter({
  char,
  index,
  count,
  enter,
  side,
}: {
  char: string;
  index: number;
  count: number;
  enter: MotionValue<number>;
  side: number;
}) {
  const start = index / count;
  const end = Math.min(1, start + LETTER_OVERLAP / count);
  const reveal = useLocalProgress(enter, start, end);
  const x = useTransform(reveal, [0, 1], [`${side * 0.8}em`, "0em"]);
  const y = useTransform(reveal, [0, 1], ["0.5em", "0em"]);
  const rotate = useTransform(reveal, [0, 1], [side * TILT_ANGLE, 0]);

  return (
    <motion.span
      style={{ opacity: reveal, x, y, rotate }}
      className="inline-block will-change-transform"
    >
      {char}
    </motion.span>
  );
}

function VisionText({
  statement,
  enter,
  side,
}: {
  statement: string;
  enter: MotionValue<number>;
  side: number;
}) {
  const { words, count } = splitLetters(statement);

  return (
    <span className="flex flex-wrap items-baseline justify-center">
      {words.map((word) => (
        <span
          key={word.letters[0]?.index}
          className="mr-[0.28em] inline-flex last:mr-0"
        >
          {word.letters.map((letter) => (
            <VisionLetter
              key={letter.index}
              char={letter.char}
              index={letter.index}
              count={count}
              enter={enter}
              side={side}
            />
          ))}
        </span>
      ))}
    </span>
  );
}

function VisionLayer({
  panel,
  index,
  total,
  scrollYProgress,
}: {
  panel: VisionPanel;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const local = useLocalProgress(
    scrollYProgress,
    index * segment,
    (index + 1) * segment,
  );
  const enter = useLocalProgress(local, 0, ENTER_SPAN);
  const exit = useLocalProgress(local, EXIT_START, 1);
  // Text stays put until `impact` starts, which is pinned to the instant
  // logoX crosses the centre (t = 0.5, fixed by its symmetric travel range).
  const impact = useLocalProgress(exit, CONTACT_POINT, 1);
  const impactEased = useTransform(impact, easeOutCubic);

  const side = index % 2 === 0 ? -1 : 1;
  const throwSide = -side;

  const textX = useTransform(
    impactEased,
    [0, 1],
    ["0%", `${throwSide * THROW_DISTANCE}%`],
  );
  const textY = useTransform(impact, [0, 0.3, 1], ["0%", "-7%", "24%"]);
  const textRotate = useTransform(
    impactEased,
    [0, 1],
    [0, throwSide * TILT_ANGLE],
  );
  const textOpacity = useTransform(impact, [0.75, 1], [1, 0]);

  const logoOpacity = useTransform(exit, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const logoX = useTransform(
    exit,
    [0, 1],
    [`${side * LOGO_TRAVEL}%`, `${throwSide * LOGO_TRAVEL}%`],
  );
  const logoRotate = useTransform(
    exit,
    [0, 1],
    [side * -LOGO_SPIN, throwSide * -LOGO_SPIN],
  );
  const logoScale = useTransform(
    exit,
    [0, CONTACT_POINT - 0.08, CONTACT_POINT, CONTACT_POINT + 0.12, 1],
    [0.85, 1.05, 1.3, 1.05, 1],
  );

  const Logo = OS_LOGOS[panel.os];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        style={{ x: textX, y: textY, rotate: textRotate, opacity: textOpacity }}
        className="relative z-10 px-gutter text-mega"
      >
        <VisionText statement={panel.statement} enter={enter} side={side} />
      </motion.div>
      <motion.div
        aria-hidden
        style={{
          opacity: logoOpacity,
          x: logoX,
          rotate: logoRotate,
          scale: logoScale,
        }}
        className="pointer-events-none absolute z-20 h-[38%] w-[38%]"
      >
        <Logo className="h-full w-full" />
      </motion.div>
    </div>
  );
}

function VisionStackStatic({ panels }: { panels: readonly VisionPanel[] }) {
  return (
    <div className="flex flex-col gap-[clamp(2rem,6vw,4rem)]">
      {panels.map((panel) => (
        <p key={panel.os} className="text-center text-mega">
          {panel.statement}
        </p>
      ))}
    </div>
  );
}

export function VisionStack({ panels }: { panels: readonly VisionPanel[] }) {
  const section = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (reducedMotion) return <VisionStackStatic panels={panels} />;

  return (
    <div
      ref={section}
      style={{ height: `${panels.length * PANEL_SCROLL_VH}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-svh overflow-clip">
        {panels.map((panel, index) => (
          <VisionLayer
            key={panel.os}
            panel={panel}
            index={index}
            total={panels.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
