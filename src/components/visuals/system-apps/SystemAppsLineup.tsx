import type { CSSProperties } from "react";
import { systemAppShots } from "@/data/system-apps";
import { APP_LINEUP, type SystemAppId } from "@/data/system-apps/stack";
import { shotSrcSet, shotUrl } from "@/util/shot-url";

const {
  label,
  window: WINDOW,
  stage,
  scale,
  tilt,
  perspective,
  top,
  firstCenter,
  lastCenter,
  brightness,
  order,
} = APP_LINEUP;
const STEP = (lastCenter - firstCenter) / (order.length - 1);
const OFFSET_TOP = top - (WINDOW.height * (1 - scale)) / 2;

function AppShot({ id }: { id: SystemAppId }) {
  const { widths, sizes } = systemAppShots;
  return (
    // biome-ignore lint/performance/noImgElement: static export; AVIF tiers are pre-encoded by scripts/capture-system-apps.ts
    <img
      src={shotUrl(systemAppShots, id, widths[1])}
      srcSet={shotSrcSet(systemAppShots, id)}
      sizes={sizes}
      alt=""
      width={WINDOW.width}
      height={WINDOW.height}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="block size-full"
    />
  );
}

function placement(index: number): CSSProperties {
  const depth = index / (order.length - 1);
  return {
    left: firstCenter + index * STEP - WINDOW.width / 2,
    top: OFFSET_TOP,
    width: WINDOW.width,
    height: WINDOW.height,
    zIndex: index,
    transform: `perspective(${perspective}px) rotateY(${tilt}deg) scale(${scale})`,
    filter: `brightness(${brightness.back + (brightness.front - brightness.back) * depth})`,
  };
}

export function SystemAppsLineup() {
  return (
    <div
      role="img"
      aria-label={label}
      className="app-lineup select-none"
      style={{ aspectRatio: `${stage.width} / ${stage.height}` }}
    >
      <div
        aria-hidden="true"
        className="app-lineup-stage"
        style={
          {
            width: stage.width,
            height: stage.height,
            "--stage-width": `${stage.width}px`,
          } as CSSProperties
        }
      >
        {order.map((id, index) => (
          <div key={id} className="lineup-shade" style={placement(index)}>
            <div className="lineup-window size-full">
              <AppShot id={id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
