"use client";

import { type MotionValue, useTransform } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode, Ref } from "react";
import { Emphasized } from "@/components/ui/Emphasized";
import { hero } from "@/data/hero";
import { type ScrollRange, staggered } from "@/util/scroll-range";

const RISE = ["24px", "0px"];
const BLUR = ["blur(8px)", "blur(0px)"];

function Rise({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: ScrollRange;
  className?: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, RISE);
  const filter = useTransform(progress, range, BLUR);
  return (
    <m.div style={{ opacity, y, filter }} className={className}>
      {children}
    </m.div>
  );
}

export function HeroEcosystem({
  ref,
  progress,
  range,
}: {
  ref: Ref<HTMLDivElement>;
  progress: MotionValue<number>;
  range: ScrollRange;
}) {
  const { title, lead } = hero.ecosystem;
  const [heading, body] = [0, 1].map((index) =>
    staggered(range, index, 2, 0.4),
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-gutter py-12 text-center md:py-16"
    >
      <Rise progress={progress} range={heading}>
        <h2
          id="ecosystem-title"
          className="text-balance font-inter text-headline text-trim"
        >
          <Emphasized text={title} />
        </h2>
      </Rise>
      <Rise progress={progress} range={body} className="mt-4 md:mt-6">
        <p className="max-w-2xl text-pretty font-inter font-normal text-lead text-white/70 leading-normal">
          {lead}
        </p>
      </Rise>
    </div>
  );
}
