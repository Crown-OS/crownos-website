import { systemAppsLineupShot } from "@/data/system-apps";
import { shotSrcSet, shotUrl } from "@/util/shot-url";

const { label, stage, widths, sizes } = systemAppsLineupShot;

export function SystemAppsLineup() {
  return (
    // biome-ignore lint/performance/noImgElement: static export; the lineup is pre-composed by scripts/capture-system-apps.ts
    <img
      src={shotUrl(systemAppsLineupShot, widths[2])}
      srcSet={shotSrcSet(systemAppsLineupShot)}
      sizes={sizes}
      alt={label}
      width={stage.width}
      height={stage.height}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="block h-auto w-full select-none"
    />
  );
}
