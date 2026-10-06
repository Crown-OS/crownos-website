"use client";

import { useLenis } from "lenis/react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CrownLogo } from "@/components/brand/CrownLogo";
import { INTRO_TIMING } from "@/data/intro";
import { prefersReducedMotion } from "@/util/frame-loop";
import { getIntroPhase, setIntroPhase, whenIntroReady } from "@/util/intro";

type OverlayState = "loading" | "drop" | "reveal" | "gone";

const TIMING_VARS = {
  "--intro-vibrate-ms": `${INTRO_TIMING.vibrateMs}ms`,
  "--intro-drop-ms": `${INTRO_TIMING.dropMs}ms`,
  "--intro-reveal-ms": `${INTRO_TIMING.revealMs}ms`,
} as CSSProperties;

const VIBRATE_ANIMATION = "crown-vibrate";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Resolves when the vibrate loop wraps, i.e. right as the next shake would begin. */
function nextVibration(overlay: HTMLElement) {
  if (prefersReducedMotion()) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const finish = () => {
      clearTimeout(fallback);
      overlay.removeEventListener("animationiteration", onIteration);
      resolve();
    };
    const onIteration = (event: AnimationEvent) => {
      if (event.animationName === VIBRATE_ANIMATION) finish();
    };
    const fallback = setTimeout(finish, INTRO_TIMING.vibrateMs + 100);
    overlay.addEventListener("animationiteration", onIteration);
  });
}

const initialState = (): OverlayState =>
  typeof document === "undefined" || getIntroPhase() === "loading"
    ? "loading"
    : "gone";

export function IntroOverlay() {
  const [state, setState] = useState(initialState);
  const overlayRef = useRef<HTMLOutputElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (state !== "gone") lenis?.stop();
    else lenis?.start();
  }, [lenis, state]);

  useEffect(() => {
    if (getIntroPhase() !== "loading") return;
    let cancelled = false;
    const step = (next: OverlayState) => !cancelled && setState(next);

    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    (async () => {
      await whenIntroReady(
        INTRO_TIMING.minLoadingMs,
        INTRO_TIMING.maxLoadingMs,
      );
      const overlay = overlayRef.current;
      if (overlay) await nextVibration(overlay);
      if (cancelled) return;
      flushSync(() => step("drop"));
      await wait(INTRO_TIMING.dropMs - INTRO_TIMING.revealOverlapMs);
      if (cancelled) return;
      step("reveal");
      setIntroPhase("revealing");
      await wait(INTRO_TIMING.revealMs);
      if (cancelled) return;
      step("gone");
      setIntroPhase("done");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "gone") return null;

  return (
    <output
      ref={overlayRef}
      className="intro-overlay"
      data-state={state}
      style={TIMING_VARS}
      aria-label="Loading CrownOS"
    >
      <CrownLogo className="intro-crown" />
    </output>
  );
}
