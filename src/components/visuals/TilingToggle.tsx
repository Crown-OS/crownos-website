"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WindowChrome } from "./WindowChrome";

type Mode = "tiling" | "floating";
type Box = { left: string; top: string; width: string; height: string };

const WINDOW_TITLES = ["editor", "terminal", "files"];

const LAYOUTS: Record<Mode, readonly Box[]> = {
  tiling: [
    { left: "3%", top: "15%", width: "55%", height: "82%" },
    { left: "59.5%", top: "15%", width: "37.5%", height: "40.25%" },
    { left: "59.5%", top: "56.75%", width: "37.5%", height: "40.25%" },
  ],
  floating: [
    { left: "8%", top: "22%", width: "50%", height: "46%" },
    { left: "46%", top: "30%", width: "44%", height: "40%" },
    { left: "20%", top: "58%", width: "46%", height: "34%" },
  ],
};

const MODES: readonly { mode: Mode; label: string }[] = [
  { mode: "tiling", label: "Tiling" },
  { mode: "floating", label: "Floating" },
];

const SPRING = { type: "spring", stiffness: 240, damping: 24 } as const;
const AUTO_SWITCH_MS = 3200;

const nextMode = (mode: Mode): Mode =>
  mode === "tiling" ? "floating" : "tiling";

export function TilingToggle() {
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("tiling");
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!inView || !autoplay || reducedMotion) return;
    const timer = setInterval(() => setMode(nextMode), AUTO_SWITCH_MS);
    return () => clearInterval(timer);
  }, [inView, autoplay, reducedMotion]);

  const choose = (chosen: Mode) => {
    setAutoplay(false);
    setMode(chosen);
  };

  return (
    <div ref={frameRef} className="relative size-full">
      <fieldset className="absolute top-[3%] left-1/2 z-10 flex -translate-x-1/2 rounded-full border border-border bg-gray-800 p-1">
        <legend className="sr-only">Window layout</legend>
        {MODES.map(({ mode: option, label }) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => choose(option)}
            className={`relative h-9 rounded-full px-5 text-ui transition-colors duration-300 ${
              mode === option ? "text-ink" : "text-muted"
            }`}
          >
            {mode === option && (
              <motion.span
                layoutId="layout-mode-indicator"
                transition={SPRING}
                className="absolute inset-0 rounded-full bg-paper"
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </fieldset>
      {LAYOUTS[mode].map((box, index) => (
        <motion.div
          key={WINDOW_TITLES[index]}
          initial={false}
          animate={box}
          transition={{ ...SPRING, delay: index * 0.04 }}
          className="absolute flex flex-col overflow-hidden squircle rounded-window border border-white/12 bg-gray-850 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.8)]"
        >
          <WindowChrome title={WINDOW_TITLES[index]} />
        </motion.div>
      ))}
    </div>
  );
}
