"use client";

import { useEffect, useRef, useState } from "react";
import { CrownIcon } from "@/components/icons/CrownIcon";
import { createCrownParticles, drawCrownParticles } from "./crown-particles";

type IntroStage = "waiting" | "gathering" | "done";

const GATHER_DURATION = 1600;
const SOLIDIFY_DURATION = 400;
const MAX_PIXEL_RATIO = 2;
const TARGET_SELECTOR = "[data-intro-target]";
const FAILSAFE_DELAY = GATHER_DURATION + SOLIDIFY_DURATION + 2500;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sizeCanvas(canvas: HTMLCanvasElement) {
  const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
  canvas.width = Math.round(canvas.clientWidth * pixelRatio);
  canvas.height = Math.round(canvas.clientHeight * pixelRatio);
  return canvas.getContext("2d");
}

function placeOver(crown: SVGSVGElement, box: DOMRect) {
  crown.style.left = `${box.left}px`;
  crown.style.top = `${box.top}px`;
  crown.style.width = `${box.width}px`;
}

export function IntroLoader() {
  const [stage, setStage] = useState<IntroStage>("waiting");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crownRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const crown = crownRef.current;
    const target = document.querySelector(TARGET_SELECTOR);
    const context = canvas && sizeCanvas(canvas);
    if (!canvas || !crown || !target || !context || prefersReducedMotion()) {
      setStage("done");
      return;
    }
    setStage("waiting");

    let frame = 0;
    let isCancelled = false;
    const failsafeTimer = window.setTimeout(
      () => setStage("done"),
      FAILSAFE_DELAY,
    );

    const play = () => {
      const crownBox = target.getBoundingClientRect();
      placeOver(crown, crownBox);
      const particles = createCrownParticles(crownBox, {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const startedAt = performance.now();
      setStage("gathering");

      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const gathered = Math.min(1, elapsed / GATHER_DURATION);
        const solidified = Math.min(
          1,
          Math.max(0, (elapsed - GATHER_DURATION) / SOLIDIFY_DURATION),
        );
        drawCrownParticles(context, particles, gathered, 1 - solidified);
        crown.style.opacity = String(solidified);
        if (solidified < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }
        setStage("done");
      };
      frame = requestAnimationFrame(tick);
    };

    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.fonts.ready.then(() => {
      if (!isCancelled) play();
    });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(failsafeTimer);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div
      aria-hidden="true"
      className="intro group/intro pointer-events-none fixed inset-0 z-100"
      data-intro={stage}
    >
      <div className="absolute inset-0 bg-black [transition:opacity_1.4s_var(--ease-in-out-sine)] group-data-[intro=gathering]/intro:opacity-0" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <CrownIcon
        ref={crownRef}
        className="absolute text-foreground opacity-0"
      />
    </div>
  );
}
