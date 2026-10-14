"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { CrownIcon } from "@/components/icons";
import { intro } from "@/data/intro";
import { easeOutCubic, releaseReveals, setIntroPhase } from "@/util/intro";
import { prefersReducedMotion } from "@/util/reduced-motion";

const PENDING_FONT_CAP = 0.99;
const CROWN_TIMING = {
  "--intro-vibrate-ms": `${intro.vibrateMs}ms`,
  "--intro-drop-ms": `${intro.dropMs}ms`,
} as CSSProperties;

export function IntroLoader() {
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const frontCurtainRef = useRef<HTMLDivElement>(null);
  const backCurtainRef = useRef<HTMLDivElement>(null);
  const crownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prefersReducedMotion()) {
      setIntroPhase("done");
      releaseReveals();
      return;
    }

    let fontsReady = false;
    document.fonts.ready.then(() => {
      fontsReady = true;
    });

    const listeners = new AbortController();
    const { signal } = listeners;
    const timers: number[] = [];
    const later = (callback: () => void, delayMs: number) => {
      timers.push(window.setTimeout(callback, delayMs));
    };
    const startedAt = performance.now();
    let frame = 0;

    const leave = () => {
      frontCurtainRef.current?.addEventListener(
        "transitionstart",
        () => later(releaseReveals, intro.revealAfterMs),
        { once: true, signal },
      );
      backCurtainRef.current?.addEventListener(
        "transitionend",
        () => setIntroPhase("done"),
        { once: true, signal },
      );
      setIntroPhase("leaving");
    };

    let dropped = false;
    const drop = () => {
      if (dropped) return;
      dropped = true;
      setIntroPhase("dropping");
      later(leave, intro.dropMs - intro.revealOverlapMs);
    };

    const dropAfterVibration = () => {
      crownRef.current?.addEventListener("animationiteration", drop, {
        once: true,
        signal,
      });
      later(drop, intro.vibrateMs + 100);
    };

    const tick = (now: number) => {
      const eased = easeOutCubic(
        Math.min((now - startedAt) / intro.countMs, 1),
      );
      const progress = fontsReady ? eased : Math.min(eased, PENDING_FONT_CAP);
      if (counterRef.current) {
        counterRef.current.textContent = String(
          Math.round(progress * 100),
        ).padStart(3, "0");
      }
      progressBarRef.current?.style.setProperty(
        "transform",
        `scaleX(${progress})`,
      );
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      dropAfterVibration();
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      for (const timer of timers) window.clearTimeout(timer);
      listeners.abort();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="intro"
      style={CROWN_TIMING}
      data-phase="pending"
      data-lenis-prevent
    >
      <div ref={backCurtainRef} className="intro-curtain bg-paper" />
      <div
        ref={frontCurtainRef}
        className="intro-curtain intro-curtain-front flex flex-col justify-end bg-ink px-gutter pb-[clamp(1.25rem,3svh,2rem)]"
      >
        <div className="intro-content flex items-end justify-between">
          <span className="font-mono text-micro text-muted uppercase">
            {intro.label}
          </span>
          <span ref={counterRef} className="text-headline tabular-nums">
            000
          </span>
        </div>
        <span
          ref={progressBarRef}
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-foreground"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div ref={crownRef} className="intro-crown">
          <CrownIcon className="block h-auto w-full text-foreground" />
        </div>
      </div>
    </div>
  );
}
