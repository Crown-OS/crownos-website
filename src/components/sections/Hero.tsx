"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { type CSSProperties, useMemo, useRef } from "react";
import {
  ScrollSequence,
  ShaderCanvas,
  SplitLetters,
} from "@/components/motion";
import { hero } from "@/data/hero";
import { horizonGlowShader } from "@/shaders/horizon-glow";
import { SYNTHESIS_SHADER } from "@/shaders/synthesis";
import { reportBootProgress } from "@/util/boot-progress";
import { lineupSpan } from "@/util/device-still";
import type { ScrollRange } from "@/util/scroll-range";
import { useFlagWhile } from "@/util/use-flag-while";
import { useLineupFit } from "@/util/use-lineup-fit";
import { useRestingOffset } from "@/util/use-resting-offset";
import { HeroDevice } from "./HeroDevice";
import { HeroEcosystem } from "./HeroEcosystem";

const TIMELINE = {
  sequence: [0, 0.425],
  copyExit: [0.02, 0.25],
  zoomOut: [0.47, 0.72],
  ecosystemIn: [0.66, 0.88],
  devicesIn: [0.5, 0.76],
} satisfies Record<string, ScrollRange>;
const ZOOMED_HEIGHT_SHARE = 0.64;
const SHADER_RESOLUTION = 0.5;
const FRAME = hero.laptop.sequence.size;
const LINEUP = lineupSpan(
  Object.values(hero.ecosystem.devices),
  FRAME,
  hero.laptop.finalBounds,
);
const FRAME_BOX = {
  aspectRatio: `${FRAME.width} / ${FRAME.height}`,
  width: `min(100cqw, 100cqh * ${FRAME.width / FRAME.height})`,
} satisfies CSSProperties;
const DESK_EDGE = {
  "--desk-edge": `${hero.laptop.deskEdge * 100}%`,
} as CSSProperties;
const GLOW = hero.laptop.glow;
const GLOW_HEIGHT = GLOW.above + GLOW.below;
const GLOW_SHADER = horizonGlowShader(GLOW);
const GLOW_RESOLUTION = 0.25;
const GLOW_BOX = {
  ...DESK_EDGE,
  "--glow-width": `${GLOW.span * 100}%`,
  "--glow-aspect": `${GLOW.span} / ${GLOW_HEIGHT}`,
  "--glow-lift": `${(-GLOW.above / GLOW_HEIGHT) * 100}%`,
} as CSSProperties;
const SLOGAN_TIMING = {
  "--delay": "550ms",
  "--sweep-at": "1600ms",
  "--sweep-cycle": "6s",
} as CSSProperties;
const COPY_FADED = "data-faded";
const isFadedOut = (opacity: number) => opacity <= 0;

function HeroSlogan() {
  const { lead, emphasis, trail } = hero.slogan;
  return (
    <p
      data-reveal
      className="mt-6 text-balance text-trim font-inter md:mt-12 font-normal text-white [text-shadow:0_1px_6px_rgb(0_0_0/0.25)] text-tagline tracking-[-0.03em] [font-kerning:normal] [text-rendering:optimizeLegibility]"
      style={SLOGAN_TIMING}
    >
      {lead}{" "}
      <span
        data-text={emphasis}
        className="pr-[0.03em] font-normal font-serif text-[1.16em] leading-none text-sweep italic [text-shadow:none] tracking-[-0.005em] [word-spacing:0.06em]"
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
  const captionRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const frameProgress = useTransform(
    scrollYProgress,
    TIMELINE.sequence,
    [0, 1],
  );
  const headlineY = useTransform(scrollYProgress, TIMELINE.sequence, [
    "0svh",
    "-45svh",
  ]);
  const copyOpacity = useTransform(scrollYProgress, TIMELINE.copyExit, [1, 0]);
  useFlagWhile(copyRef, copyOpacity, COPY_FADED, isFadedOut);
  const copyScale = useTransform(
    scrollYProgress,
    [0, TIMELINE.copyExit[1]],
    [1, 0.92],
  );
  const copyBlur = useTransform(scrollYProgress, TIMELINE.copyExit, [
    "blur(0px)",
    "blur(10px)",
  ]);
  const zoomed = useLineupFit(
    stageRef,
    captionRef,
    FRAME,
    LINEUP,
    ZOOMED_HEIGHT_SHARE,
  );
  const zoomProgress = useTransform(scrollYProgress, TIMELINE.zoomOut, [0, 1]);
  const stageScale = useTransform(
    () => 1 + (zoomed.scale.get() - 1) * zoomProgress.get(),
  );
  const stageLift = useTransform(() => zoomed.lift.get() * zoomProgress.get());
  const swooshX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const swooshY = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);
  const swooshScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const liftedRefs = useMemo(() => [laptopRef, glowRef], []);
  useRestingOffset(
    stageRef,
    copyRef,
    liftedRefs,
    hero.laptop.sequence,
    frameProgress,
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative h-[460svh]"
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
            className="absolute -inset-[15%]"
          >
            <ShaderCanvas
              fragment={SYNTHESIS_SHADER}
              resolutionScale={SHADER_RESOLUTION}
              animated={false}
            />
          </m.div>
          <div className="hero-grain absolute inset-0" />
        </div>
        <m.div
          aria-hidden
          style={{ scale: stageScale, y: stageLift }}
          className="-z-5 absolute inset-0 [container-type:size]"
        >
          <div ref={glowRef} className="grid size-full place-items-center">
            <div className="relative" style={FRAME_BOX}>
              <div className="hero-glow" style={GLOW_BOX}>
                <ShaderCanvas
                  fragment={GLOW_SHADER}
                  resolutionScale={GLOW_RESOLUTION}
                  animated={false}
                />
              </div>
            </div>
          </div>
        </m.div>
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
              className="text-headline font-inter text-muted-strong text-trim"
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
        <m.div
          style={{ scale: stageScale, y: stageLift }}
          className="absolute inset-0 z-10 [container-type:size]"
        >
          <div ref={laptopRef} className="grid size-full place-items-center">
            <m.div className="relative" style={FRAME_BOX}>
              <div aria-hidden className="hero-desk" style={DESK_EDGE} />
              <HeroDevice
                device={hero.ecosystem.devices.tablet}
                frame={FRAME}
                progress={scrollYProgress}
                range={TIMELINE.devicesIn}
              />
              <ScrollSequence
                sequence={hero.laptop.sequence}
                progress={frameProgress}
                label={hero.laptop.label}
                onLoadProgress={reportBootProgress}
                className="absolute inset-0"
              />
              <HeroDevice
                device={hero.ecosystem.devices.phone}
                frame={FRAME}
                progress={scrollYProgress}
                range={TIMELINE.devicesIn}
              />
            </m.div>
          </div>
        </m.div>
        <HeroEcosystem
          ref={captionRef}
          progress={scrollYProgress}
          range={TIMELINE.ecosystemIn}
        />
      </div>
    </section>
  );
}
