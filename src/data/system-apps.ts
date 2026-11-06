import type { Size } from "@/util/frame-sequence";
import { APP_LINEUP } from "./system-apps/stack";

export const systemAppShots = {
  html: "assets-src/system-apps/apps.html",
  path: "/showcase/v4/system-app",
  window: APP_LINEUP.window,
  captureScale: 1.5,
  widths: [520, 1040, 1560],
  sizes: "(min-width: 1240px) 480px, 44vw",
} as const satisfies {
  html: string;
  path: string;
  window: Size;
  captureScale: number;
  widths: readonly number[];
  sizes: string;
};
