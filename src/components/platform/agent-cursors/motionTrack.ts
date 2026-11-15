import type { CSSProperties } from "react";

export function motionTrack(keyframesName: string) {
  return { "--agent-track": keyframesName } as CSSProperties;
}
