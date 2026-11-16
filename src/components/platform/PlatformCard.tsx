import type { PlatformFeature } from "@/data/platform";
import { PLATFORM_ILLUSTRATIONS } from "./illustrations";
import { PlatformCardShell } from "./PlatformCardShell";

const SPAN_CLASSES = {
  wide: "md:col-span-2",
  narrow: "",
} as const;

const TEXT_ALIGN_CLASSES = {
  start: "",
  center: "mx-auto justify-items-center text-center",
} as const;

export function PlatformCard({ feature }: { feature: PlatformFeature }) {
  const Illustration = PLATFORM_ILLUSTRATIONS[feature.illustration];
  return (
    <PlatformCardShell
      className={`platform-card group/card relative h-[29rem] overflow-hidden rounded-[2rem] border border-white/8 bg-surface will-change-transform data-offscreen:**:[animation-play-state:paused]! ${SPAN_CLASSES[feature.span]}`}
    >
      <Illustration />
      <div
        className={`absolute inset-x-0 bottom-0 grid max-w-[30rem] gap-2 px-8 pb-8 ${TEXT_ALIGN_CLASSES[feature.textAlign ?? "start"]}`}
      >
        <h3 className="text-lg font-medium tracking-[-0.014em] text-white">
          {feature.title}
        </h3>
        <p className="text-[0.9375rem] leading-[1.5] tracking-[-0.011em] text-white/55">
          {feature.description}
        </p>
      </div>
    </PlatformCardShell>
  );
}
