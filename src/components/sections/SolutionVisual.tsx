import type { CSSProperties, ReactNode } from "react";
import { LockIcon } from "@/components/icons";
import { Caret } from "@/components/ui";
import type { Solution } from "@/data/crownos";

const AGENT_STEPS = [
  ["context", "read 14 files · repo map"],
  ["plan", "patch src/auth/session.ts"],
  ["test", "212 passed · 0 failed"],
  ["commit", "awaiting your review"],
] as const;

const MODELS = [
  ["llama-4-scout", 0.92, "142 tok/s"],
  ["qwen3-coder", 0.74, "96 tok/s"],
  ["whisper-v4", 0.58, "live"],
] as const;

const WAVE_PEAKS = Array.from(
  { length: 40 },
  (_, index) => 0.3 + 0.7 * Math.abs(Math.sin(index * 0.62)),
);

const FRAME_TRACE = Array.from(
  { length: 21 },
  (_, index) => `${index * 10},${24 + (((index * 7) % 5) - 2) * 2}`,
).join(" ");

const FLEET_COLUMNS = 16;
const FLEET_SIZE = FLEET_COLUMNS * 4;
const FLEET = Array.from({ length: FLEET_SIZE }, (_, index) => ({
  index,
  wave: (index % FLEET_COLUMNS) + Math.floor(index / FLEET_COLUMNS),
}));

const VAULT_RINGS = [0, 1, 2] as const;
const TRACE_COPIES = [0, 1] as const;

const withIndex = (index: number, extra?: CSSProperties) =>
  ({ "--i": index, ...extra }) as CSSProperties;

const VISUALS: Record<Solution["visual"], ReactNode> = {
  agent: (
    <div className="grid gap-2 font-mono text-micro">
      <p className="mb-1 text-muted-strong">
        ❯ crown agent{" "}
        <span className="text-foreground">"fix the flaky auth test"</span>
      </p>
      {AGENT_STEPS.map(([step, detail], index) => (
        <p
          key={step}
          style={withIndex(index)}
          className="agent-step grid grid-cols-[4.5rem_1fr] text-muted"
        >
          <span className="text-faint">{step}</span>
          {detail}
        </p>
      ))}
      <Caret />
    </div>
  ),
  models: (
    <div className="grid gap-5 text-micro">
      <p className="flex justify-between text-muted">
        <span>crown models</span>
        <span className="font-mono text-faint">CUDA · ROCm · NPU</span>
      </p>
      <ul className="grid gap-4">
        {MODELS.map(([name, level, rate], index) => (
          <li key={name} className="grid gap-2">
            <span className="flex justify-between text-muted-strong">
              {name}
              <span className="font-mono text-faint">{rate}</span>
            </span>
            <span className="h-1 overflow-clip rounded-full bg-foreground/10">
              <span
                style={withIndex(index, { "--level": level } as CSSProperties)}
                className="meter-fill block h-full rounded-full bg-foreground"
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  ),
  waveform: (
    <div className="grid gap-4 text-micro">
      <div className="flex h-24 items-center gap-[3px]">
        {WAVE_PEAKS.map((peak, index) => (
          <span
            key={peak}
            style={withIndex(index, { height: `${peak * 100}%` })}
            className="wave-bar w-full rounded-full bg-foreground/80"
          />
        ))}
      </div>
      <p className="flex justify-between font-mono text-faint">
        <span>pipewire · 48 kHz</span>
        <span>2.6 ms</span>
      </p>
    </div>
  ),
  frames: (
    <div className="grid grid-cols-1 gap-4 text-micro">
      <p className="flex items-baseline justify-between">
        <span className="text-title tabular-nums">
          144<span className="text-ui text-muted"> fps</span>
        </span>
        <span className="font-mono text-faint">VRR · 6.9 ms</span>
      </p>
      <div className="min-w-0 overflow-clip border-foreground/10 border-y py-3">
        <div
          style={{ "--marquee-duration": "5s" } as CSSProperties}
          className="marquee-track"
        >
          {TRACE_COPIES.map((copy) => (
            <svg
              key={copy}
              aria-hidden
              viewBox="0 0 200 48"
              className="h-12 w-[200px] shrink-0 text-foreground"
            >
              <title>Frame time</title>
              <polyline
                points={FRAME_TRACE}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  ),
  vault: (
    <div className="grid justify-items-center gap-6 text-micro">
      <div className="relative grid size-28 place-items-center">
        {VAULT_RINGS.map((ring) => (
          <span
            key={ring}
            style={withIndex(ring)}
            className="vault-ring absolute inset-0 rounded-full border border-foreground/40"
          />
        ))}
        <span className="grid size-11 place-items-center rounded-full bg-foreground text-background">
          <LockIcon className="size-4" />
        </span>
      </div>
      <p className="font-mono text-faint">0 bytes leave this machine</p>
    </div>
  ),
  fleet: (
    <div className="grid gap-4 font-mono text-micro">
      <p className="text-muted-strong">
        ❯ crown fleet apply <span className="text-foreground">crown.toml</span>
      </p>
      <div className="grid grid-cols-16 gap-1.5 sm:gap-2">
        {FLEET.map(({ index, wave }) => (
          <span
            key={index}
            style={withIndex(wave)}
            className="fleet-dot aspect-square rounded-[3px] bg-foreground"
          />
        ))}
      </div>
      <p className="flex justify-between text-faint">
        <span>{FLEET_SIZE} machines</span>
        <span>
          {FLEET_SIZE} / {FLEET_SIZE} in sync
        </span>
      </p>
    </div>
  ),
};

export function SolutionVisual({ visual }: Pick<Solution, "visual">) {
  return VISUALS[visual];
}
