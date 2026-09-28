import type { ReactNode } from "react";
import { Caret } from "@/components/ui";
import type { Capability } from "@/data/crownos";

const WINDOWS = [
  {
    frame: { left: "0%", top: "0%", width: "58%", height: "100%" },
    float: "translate(8%, 12%) scale(0.74) rotate(-2deg)",
  },
  {
    frame: { left: "61%", top: "0%", width: "39%", height: "47%" },
    float: "translate(-46%, 34%) scale(0.9) rotate(2deg)",
  },
  {
    frame: { left: "61%", top: "53%", width: "39%", height: "47%" },
    float: "translate(-14%, -30%) scale(0.82) rotate(-1deg)",
  },
] as const;

const BASES = [
  ["Debian", "stable"],
  ["Nix", "declarative"],
  ["Arch", "rolling"],
  ["Ubuntu", "lts"],
  ["Fedora", "fresh"],
] as const;

const CONFIG: readonly (string | readonly [string, string])[] = [
  "[theme]",
  ["accent", '"mono"'],
  ["radius", "12"],
  "[behaviour]",
  ["windows", '"auto-tile"'],
  ["agent", '"on-device"'],
];

const PLUGIN_STEPS = [
  ["skill", "crown-ui · keeps it consistent"],
  ["plugin", "dock-autohide · generated"],
  ["status", "installed, no reboot"],
] as const;

const VISUALS: Record<Capability["visual"], ReactNode> = {
  compositor: (
    <div className="grid h-[calc(clamp(11rem,30vh,16rem)-2.5rem)] grid-rows-[auto_1fr] gap-3 text-micro">
      <div className="flex items-center justify-between text-muted">
        <span>crownpositor</span>
        <span className="relative grid h-5 w-[5.5rem] place-items-center rounded-full border border-foreground/25">
          <span className="compositor-tiling col-start-1 row-start-1 text-foreground">
            tiling
          </span>
          <span className="compositor-floating col-start-1 row-start-1 text-foreground">
            floating
          </span>
        </span>
      </div>
      <div className="relative">
        {WINDOWS.map(({ frame, float }) => (
          <span
            key={frame.left + frame.top}
            style={{ ...frame, "--float": float }}
            className="compositor-window absolute overflow-clip rounded-[5px] border border-foreground/25 bg-[#1b1b1c]"
          >
            <span className="flex h-2.5 items-center gap-1 border-foreground/15 border-b px-1.5">
              <span className="size-1 rounded-full bg-foreground/40" />
              <span className="size-1 rounded-full bg-foreground/25" />
            </span>
          </span>
        ))}
      </div>
    </div>
  ),
  bases: (
    <div className="grid gap-3 text-micro">
      <ul className="relative grid">
        <span
          aria-hidden
          className="base-cursor absolute inset-x-0 top-0 h-7 rounded-md bg-foreground/10"
        />
        {BASES.map(([name, flavour]) => (
          <li
            key={name}
            className="relative flex h-7 items-center justify-between px-2.5 text-muted-strong"
          >
            <span>{name}</span>
            <span className="font-normal text-faint">{flavour}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
  config: (
    <div className="grid gap-1.5 font-mono text-micro">
      <p className="mb-1 text-faint">~/.config/crown/crown.toml</p>
      {CONFIG.map((line) =>
        typeof line === "string" ? (
          <p key={line} className="mt-1 text-foreground">
            {line}
          </p>
        ) : (
          <p key={line[0]} className="text-muted">
            {line[0]} = <span className="text-foreground">{line[1]}</span>
          </p>
        ),
      )}
      <Caret />
    </div>
  ),
  plugins: (
    <div className="grid gap-2 font-mono text-micro">
      <p className="text-muted-strong">
        ❯ crown agent{" "}
        <span className="text-foreground">"auto-hide my dock"</span>
      </p>
      {PLUGIN_STEPS.map(([step, detail]) => (
        <p key={step} className="grid grid-cols-[4rem_1fr] text-muted">
          <span className="text-faint">{step}</span>
          {detail}
        </p>
      ))}
      <Caret />
    </div>
  ),
  uikit: (
    <div className="grid gap-4 text-[0.75rem]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="uikit-morph bg-foreground px-3 py-1.5 text-background">
          Primary
        </span>
        <span className="uikit-morph border border-foreground/30 px-3 py-1.5">
          Ghost
        </span>
        <span className="uikit-morph relative h-5 w-9 bg-foreground/80">
          <span className="uikit-morph absolute top-0.5 right-0.5 size-4 bg-ink" />
        </span>
      </div>
      <span className="uikit-morph flex h-8 items-center border border-foreground/20 px-3 text-muted">
        Search components…
      </span>
      <p className="font-mono text-micro text-faint">
        crownuikit · one token, every component
      </p>
    </div>
  ),
};

export function CapabilityVisual({ visual }: Pick<Capability, "visual">) {
  return VISUALS[visual];
}
