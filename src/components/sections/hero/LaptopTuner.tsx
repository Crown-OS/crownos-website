"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { LaptopView } from "@/data/laptop";
import type { LaptopStage } from "./laptop-stage";

type Control = {
  key: keyof LaptopView;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
};

const CONTROLS: readonly Control[] = [
  { key: "scale", label: "Scale", min: 0.5, max: 1.6, step: 0.01, unit: "×" },
  { key: "pitchDeg", label: "Pitch", min: -15, max: 60, step: 0.5, unit: "°" },
  { key: "yawDeg", label: "Yaw", min: -90, max: 90, step: 0.5, unit: "°" },
  { key: "lidDeg", label: "Lid", min: 0, max: 130, step: 1, unit: "°" },
  {
    key: "distance",
    label: "Camera distance",
    min: 1.5,
    max: 15,
    step: 0.1,
    unit: "× width",
  },
];

const BUTTON_CLASS =
  "rounded-sm border border-border-strong py-1.5 transition-colors hover:bg-foreground hover:text-accent-fg";

const snippet = ({ scale, pitchDeg, yawDeg, lidDeg, distance }: LaptopView) =>
  [
    `LAPTOP_SCALE = ${scale}`,
    `LAPTOP_CAMERA = { distance: ${distance}, pitchDeg: ${pitchDeg} }`,
    `LAPTOP_MOTION.yawDeg = ${yawDeg}`,
    `LAPTOP_MOTION.openDeg = ${lidDeg}`,
  ].join("\n");

type LaptopTunerProps = { stage: LaptopStage; onReplay: () => void };

export function LaptopTuner({ stage, onReplay }: LaptopTunerProps) {
  const [view, setView] = useState(stage.view);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof LaptopView, value: number) => {
    const next = { ...view, [key]: value };
    setView(next);
    stage.tune(next);
  };

  const reset = () => {
    stage.tune({});
    setView(stage.view());
  };

  const copy = async () => {
    await navigator.clipboard.writeText(snippet(view));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return createPortal(
    <section
      aria-label="Laptop tuning"
      data-lenis-prevent
      className="fixed right-4 bottom-4 z-[65] w-72 rounded-lg border border-border bg-background-elev/90 p-4 font-mono text-micro text-muted-strong shadow-2xl backdrop-blur-md"
    >
      <p className="mb-2 flex justify-between text-foreground">
        <span>Laptop tuning</span>
        <span className="text-faint">?tune-laptop</span>
      </p>

      {CONTROLS.map(({ key, label, min, max, step, unit }) => (
        <label key={key} className="grid gap-1.5 py-1.5">
          <span className="flex justify-between">
            <span>{label}</span>
            <span className="text-foreground tabular-nums">
              {view[key]}
              {unit}
            </span>
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={view[key]}
            onChange={(event) => update(key, event.target.valueAsNumber)}
            className="w-full accent-white"
          />
        </label>
      ))}

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <button type="button" onClick={onReplay} className={BUTTON_CLASS}>
          Replay
        </button>
        <button type="button" onClick={reset} className={BUTTON_CLASS}>
          Reset
        </button>
        <button type="button" onClick={copy} className={BUTTON_CLASS}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </section>,
    document.body,
  );
}
