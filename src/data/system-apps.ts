import type { Size } from "@/util/frame-sequence";
import { APP_LINEUP } from "./system-apps/stack";

export const systemAppsLineupShot = {
  html: "assets-src/system-apps/apps.html",
  path: "/showcase/v5/system-apps-lineup",
  label: APP_LINEUP.label,
  window: APP_LINEUP.window,
  stage: APP_LINEUP.stage,
  captureScale: 1.5,
  widths: [640, 960, 1440, 1920],
  sizes:
    "(min-width: 1240px) 950px, (min-width: 768px) 75vw, calc(100vw - 144px)",
} as const satisfies {
  html: string;
  path: string;
  label: string;
  window: Size;
  stage: Size;
  captureScale: number;
  widths: readonly number[];
  sizes: string;
};
