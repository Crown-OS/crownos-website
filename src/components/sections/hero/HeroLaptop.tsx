"use client";

import { useEffect, useRef } from "react";
import { INTRO_STAGGER } from "@/data/intro";
import { LAPTOP_SLOT_SELECTOR } from "@/data/laptop";
import { prefersReducedMotion } from "@/util/frame-loop";
import { getIntroPhase, onIntroChange, registerIntroTask } from "@/util/intro";

const loadScene = () =>
  Promise.all([import("./laptop-stage"), import("./laptop-timeline")]);

export function HeroLaptop({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

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

  return <div ref={hostRef} aria-hidden className={className} />;
}
