import type { CSSProperties, ReactNode } from "react";
import type { Capability } from "@/data/crownos";

const BARS = [
  { label: "Boot", crown: 0.34, typical: 0.9 },
  { label: "Idle memory", crown: 0.28, typical: 0.76 },
  { label: "Input latency", crown: 0.22, typical: 0.64 },
] as const;

const SWATCHES = ["#f4f4f2", "#b5b5b1", "#5d5d5a", "#1c1c1c"] as const;

const SNAPSHOTS = [
  ["now", "system healthy"],
  ["−2h", "pre-update · kernel"],
  ["−1d", "pre-update · mesa"],
  ["−7d", "weekly"],
] as const;

function Meter({ value, tone }: { value: number; tone: string }) {
  return (
    <span className="block h-1.5 overflow-clip rounded-full bg-foreground/10">
      <span
        style={{ "--value": value } as CSSProperties}
        className={`block h-full w-full origin-left scale-x-0 rounded-full transition-transform delay-300 duration-[1400ms] ease-out-expo group-data-shown:scale-x-(--value) ${tone}`}
      />
    </span>
  );
}

const VISUALS: Record<Capability["visual"], ReactNode> = {
  assist: (
    <div className="grid gap-2 font-mono text-micro">
      <p className="text-muted-strong">
        ❯ crown ask <span className="text-foreground">"free up space"</span>
      </p>
      <p className="text-muted">· cleared 4.2 GB of package cache</p>
      <p className="text-muted">· kept the last 3 snapshots</p>
      <p className="flex items-center gap-2 text-muted">
        · done, on-device
        <span className="inline-block h-3 w-1.5 animate-caret bg-foreground" />
      </p>
    </div>
  ),
  performance: (
    <div className="grid gap-4 font-mono text-micro">
      {BARS.map(({ label, crown, typical }) => (
        <div key={label} className="grid gap-1.5">
          <span className="text-muted">{label}</span>
          <Meter value={crown} tone="bg-foreground" />
          <Meter value={typical} tone="bg-foreground/30" />
        </div>
      ))}
      <p className="flex gap-4 text-faint">
        <span>■ CrownOS</span>
        <span className="opacity-50">■ typical desktop</span>
      </p>
    </div>
  ),
  theming: (
    <div className="grid gap-4 font-mono text-micro">
      <div className="flex gap-2">
        {SWATCHES.map((color) => (
          <span
            key={color}
            style={{ backgroundColor: color }}
            className="aspect-square flex-1 rounded-md border border-foreground/10"
          />
        ))}
      </div>
      {["radius · 12px", "font · Inter Tight", "gaps · 8px"].map((row) => (
        <p
          key={row}
          className="flex justify-between border-foreground/10 border-b pb-1.5 text-muted"
        >
          {row}
          <span className="text-foreground">edit</span>
        </p>
      ))}
    </div>
  ),
  snapshots: (
    <ol className="relative grid gap-3 pl-5 font-mono text-micro before:absolute before:inset-y-1 before:left-[3px] before:w-px before:bg-foreground/20">
      {SNAPSHOTS.map(([when, what], index) => (
        <li key={when} className="relative flex justify-between text-muted">
          <span
            className={`absolute top-1 -left-5 size-[7px] rounded-full ${index === 0 ? "bg-foreground" : "border border-foreground/50 bg-ink"}`}
          />
          <span className={index === 0 ? "text-foreground" : undefined}>
            {what}
          </span>
          <span className="text-faint">{when}</span>
        </li>
      ))}
    </ol>
  ),
};

export function CapabilityVisual({ visual }: Pick<Capability, "visual">) {
  return VISUALS[visual];
}
