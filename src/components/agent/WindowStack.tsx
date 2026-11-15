import type { CSSProperties, ReactNode } from "react";
import {
  type AppWindowShot,
  appWindowShots,
  appWindowUrl,
} from "@/data/app-windows";

type StackSide = "left" | "right";

const SIDE_CLASSES: Record<StackSide, { layer: string; image: string }> = {
  left: {
    layer: "left-[calc(var(--layer-depth)*var(--stack-peek)*-1)]",
    image: "object-left-top",
  },
  right: {
    layer: "right-[calc(var(--layer-depth)*var(--stack-peek)*-1)]",
    image: "object-right-top",
  },
};

function StackLayer({
  side,
  depth,
  shot,
}: {
  side: StackSide;
  depth: number;
  shot: AppWindowShot;
}) {
  const { width, height } = appWindowShots.window;
  const sideClasses = SIDE_CLASSES[side];
  return (
    <span
      className={`absolute inset-y-[calc(var(--layer-depth)*var(--stack-shrink))] w-[60%] overflow-hidden rounded-2xl border border-[rgb(255_255_255/0.1)] bg-[#0f0f10] [box-shadow:0_20px_50px_rgb(0_0_0/0.45)] after:absolute after:inset-0 after:bg-[rgb(0_0_0/calc(var(--layer-depth)*0.18))] after:content-[''] ${sideClasses.layer}`}
      style={{ "--layer-depth": depth, zIndex: -depth } as CSSProperties}
    >
      {/* biome-ignore lint/performance/noImgElement: static export serves the captured PNG as is */}
      <img
        src={appWindowUrl(shot.id)}
        alt={`${shot.name} window`}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`size-full select-none object-cover ${sideClasses.image}`}
      />
    </span>
  );
}

function StackSideLayers({
  side,
  shots,
}: {
  side: StackSide;
  shots: readonly AppWindowShot[];
}) {
  return shots.map((shot, index) => (
    <StackLayer key={shot.id} side={side} depth={index + 1} shot={shot} />
  ));
}

export function WindowStack({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate [--stack-peek:0.75rem] [--stack-shrink:1.25rem] md:[--stack-peek:max(2rem,calc((50vw-33.875rem)/3))] md:[--stack-shrink:2rem]">
      <StackSideLayers side="left" shots={appWindowShots.left} />
      <StackSideLayers side="right" shots={appWindowShots.right} />
      {children}
    </div>
  );
}
