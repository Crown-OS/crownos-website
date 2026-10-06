"use client";

import { useEffect, useRef, useState } from "react";
import { INTRO_STAGGER } from "@/data/intro";
import { LAPTOP_SLOT_SELECTOR, LAPTOP_TUNE_PARAM } from "@/data/laptop";
import { prefersReducedMotion } from "@/util/frame-loop";
import { getIntroPhase, onIntroChange, registerIntroTask } from "@/util/intro";
import { LaptopTuner } from "./LaptopTuner";
import type { LaptopStage } from "./laptop-stage";

const loadScene = () =>
  Promise.all([import("./laptop-stage"), import("./laptop-timeline")]);

const wantsTuner = () =>
  new URLSearchParams(window.location.search).has(LAPTOP_TUNE_PARAM);

type Tuner = { stage: LaptopStage; replay: () => void };

export function HeroLaptop({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [tuner, setTuner] = useState<Tuner | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const slot =
      host?.parentElement?.querySelector<HTMLElement>(LAPTOP_SLOT_SELECTOR);
    if (!host || !slot) return;
    let disposed = false;
    let teardown = () => {};

    const ready = loadScene().then(async ([{ mountLaptopStage }, timeline]) => {
      if (disposed) return;
      const stage = await mountLaptopStage(host, slot);
      if (disposed) return stage.dispose();

      let stopEntrance = () => {};
      const enter = () => {
        if (getIntroPhase() === "loading") return;
        stopWatch();
        if (prefersReducedMotion()) stage.settle();
        else stopEntrance = timeline.playEntrance(stage, INTRO_STAGGER.laptop);
      };
      const stopWatch = onIntroChange(enter);
      enter();

      if (wantsTuner()) {
        const replay = () => {
          stopEntrance();
          stopEntrance = timeline.playEntrance(stage, 0);
        };
        setTuner({ stage, replay });
      }

      teardown = () => {
        stopWatch();
        stopEntrance();
        stage.dispose();
      };
    });
    registerIntroTask(ready);

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return (
    <>
      <div ref={hostRef} aria-hidden className={className} />
      {tuner && <LaptopTuner stage={tuner.stage} onReplay={tuner.replay} />}
    </>
  );
}
