"use client";

import { useLenis } from "lenis/react";
import { type CSSProperties, useEffect, useState } from "react";
import { CrownLogo } from "@/components/brand/CrownLogo";
import { INTRO_TIMING } from "@/data/intro";
import { getIntroPhase, setIntroPhase, whenIntroReady } from "@/util/intro";

type OverlayState = "loading" | "drop" | "reveal" | "gone";

const TIMING_VARS = {
  "--intro-drop-ms": `${INTRO_TIMING.dropMs}ms`,
  "--intro-reveal-ms": `${INTRO_TIMING.revealMs}ms`,
} as CSSProperties;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initialState = (): OverlayState =>
  typeof document === "undefined" || getIntroPhase() === "loading"
    ? "loading"
    : "gone";

export function IntroOverlay() {
  const [state, setState] = useState(initialState);
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
      step("drop");
      await wait(INTRO_TIMING.dropMs);
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
      className="intro-overlay"
      data-state={state}
      style={TIMING_VARS}
      aria-label="Loading CrownOS"
    >
      <CrownLogo className="intro-crown" />
    </output>
  );
}
