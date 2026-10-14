"use client";

import { type MotionValue, useTransform } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { Emphasized } from "@/components/ui/Emphasized";
import { Glyph } from "@/components/visuals/window/Glyph";
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
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: ScrollRange;
}) {
  const { title, lead, features } = hero.ecosystem;
  const [heading, body, list] = [0, 1, 2].map((index) =>
    staggered(range, index, 3, 0.4),
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-gutter pb-12 text-center md:pb-16">
      <Rise progress={progress} range={heading}>
        <h2
          id="ecosystem-title"
          className="text-balance text-headline text-trim"
        >
          <Emphasized text={title} />
        </h2>
      </Rise>
      <Rise progress={progress} range={body} className="mt-4 md:mt-6">
        <p className="max-w-xl text-balance font-inter font-light text-lead text-muted text-trim">
          {lead}
        </p>
      </Rise>
      <ul
        aria-label="Ecosystem features"
        className="mt-6 flex max-w-4xl flex-wrap justify-center gap-2 md:mt-8 md:gap-3"
      >
        {features.map(({ icon, name }, index) => (
          <li key={name}>
            <Rise
              progress={progress}
              range={staggered(list, index, features.length)}
              className="flex h-9 items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 font-inter text-muted-strong text-ui md:h-10"
            >
              <Glyph name={icon} className="size-4 text-muted" />
              {name}
            </Rise>
          </li>
        ))}
      </ul>
    </div>
  );
}
