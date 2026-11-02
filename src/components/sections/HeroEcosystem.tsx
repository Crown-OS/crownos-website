"use client";

import { type MotionValue, useTransform } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode, Ref } from "react";
import { Emphasized } from "@/components/ui/Emphasized";
import { EcosystemIcon } from "@/components/visuals/ecosystem";
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
  const { title, lead, features } = hero.ecosystem;
  const [heading, body, dock] = [0, 1, 2].map((index) =>
    staggered(range, index, 3, 0.4),
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
        <p className="max-w-xl text-balance font-inter font-light text-lead text-muted text-trim">
          {lead}
        </p>
      </Rise>
      <ul
        aria-label="Ecosystem features"
        className="mt-7 grid w-full max-w-5xl grid-cols-2 gap-2 text-left sm:grid-cols-4 md:mt-8 md:gap-3"
      >
        {features.map(({ icon, name }, index) => (
          <li key={name} className="min-w-0">
            <Rise
              progress={progress}
              range={staggered(dock, index, features.length)}
              className="h-full"
            >
              <div className="group relative flex min-h-[5.25rem] h-full items-center gap-3 overflow-hidden rounded-card border border-white/[0.09] bg-white/[0.025] px-3 py-3 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.055] md:min-h-[5.5rem] md:gap-3.5 md:px-4">
                <span className="icon-tile squircle grid size-10 shrink-0 place-items-center rounded-tile md:size-11">
                  <EcosystemIcon name={icon} className="size-7 md:size-8" />
                </span>
                <span className="text-balance font-inter text-micro text-muted-strong leading-snug md:text-ui md:leading-snug">
                  {name}
                </span>
              </div>
            </Rise>
          </li>
        ))}
      </ul>
    </div>
  );
}
