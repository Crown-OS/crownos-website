"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { type CSSProperties, useRef } from "react";
import { ScrollSequence, SplitLetters } from "@/components/motion";
import { hero } from "@/data/hero";
import { useRestingOffset } from "@/util/use-resting-offset";

const SEQUENCE_END = 0.85;
const COPY_EXIT_END = 0.5;
const SLOGAN_TIMING = {
  "--delay": "550ms",
  "--sweep-at": "1600ms",
  "--sweep-cycle": "6s",
} as CSSProperties;

function HeroSlogan() {
  const { lead, emphasis, trail } = hero.slogan;
  return (
    <p
      data-reveal
      className="mt-6 text-balance text-trim font-inter md:mt-12 font-normal text-muted-strong text-tagline tracking-[-0.045em]"
      style={SLOGAN_TIMING}
    >
      {lead}{" "}
      <span
        data-text={emphasis}
        className="-mr-[0.06em] pr-[0.1em] font-normal font-serif text-[1.06em] text-sweep italic tracking-[-0.035em]"
      >
        {emphasis}
      </span>{" "}
      {trail}
    </p>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const restingY = useRestingOffset(stageRef, copyRef, hero.laptop.sequence);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const frameProgress = useTransform(
    scrollYProgress,
    [0, SEQUENCE_END],
    [0, 1],
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0, SEQUENCE_END],
    ["0svh", "-45svh"],
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.04, COPY_EXIT_END],
    [1, 0],
  );
  const copyScale = useTransform(
    scrollYProgress,
    [0, COPY_EXIT_END],
    [1, 0.92],
  );
  const copyBlur = useTransform(
    scrollYProgress,
    [0.04, COPY_EXIT_END],
    ["blur(0px)", "blur(10px)"],
  );
  const swooshX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const swooshY = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);
  const swooshScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const laptopY = useTransform(
    () => restingY.get() * (1 - frameProgress.get()),
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative h-[280svh]"
    >
      <div
        ref={stageRef}
        data-intro-stage
        data-tone="mono"
        className="sticky top-0 h-svh overflow-clip px-gutter pt-20 text-center md:pt-32"
      >
        <div aria-hidden className="fade-y absolute inset-0 -z-10 isolate">
          <m.div
            style={{ x: swooshX, y: swooshY, scale: swooshScale }}
            className="hero-swoosh absolute -inset-[15%]"
          />
          <div className="hero-grain absolute inset-0" />
        </div>
        <m.div
          ref={copyRef}
          style={{
            y: headlineY,
            opacity: copyOpacity,
            scale: copyScale,
            filter: copyBlur,
          }}
          className="text-lift flex flex-col items-center pb-12 md:pb-24"
        >
          <hgroup className="flex flex-col items-center gap-3 md:gap-6">
            <p
              data-reveal
              className="text-headline text-muted-strong text-trim"
            >
              {hero.eyebrow}
            </p>
            <SplitLetters
              id="hero-title"
              lines={hero.headline}
              delay={120}
              className="text-hero text-trim"
            />
          </hgroup>
          <HeroSlogan />
        </m.div>
        <m.div style={{ y: laptopY }} className="absolute inset-0 z-10">
          <ScrollSequence
            sequence={hero.laptop.sequence}
            progress={frameProgress}
            label={hero.laptop.label}
            className="size-full"
          />
        </m.div>
      </div>
    </section>
  );
}
