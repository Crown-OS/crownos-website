import type { IconName } from "@/components/visuals/system-apps/kit/icon-paths";

export type SystemAppId =
  | "files"
  | "settings"
  | "store"
  | "monitor"
  | "disks"
  | "recorder";

export type SystemApp = {
  id: SystemAppId;
  name: string;
  tint: string;
  glyph: IconName;
};

export const SYSTEM_APPS = [
  {
    id: "files",
    name: "Files",
    tint: "#8f6dfb",
    glyph: "folder",
  },
  { id: "settings", name: "Settings", tint: "#9a9aa6", glyph: "settings" },
  { id: "store", name: "App Store", tint: "#4a5cff", glyph: "shopping-bag" },
  {
    id: "monitor",
    name: "Process Monitor",
    tint: "#2fb3b8",
    glyph: "activity",
  },
  { id: "disks", name: "Disk Manager", tint: "#6d48e8", glyph: "hard-drive" },
  { id: "recorder", name: "Voice Recorder", tint: "#f87171", glyph: "mic" },
] as const satisfies readonly SystemApp[];

export const APP_LINEUP = {
  label:
    "CrownOS system apps lined up side by side: Voice Recorder, Disk Manager, Process Monitor, App Store, Settings and Files",
  window: { width: 1040, height: 800 },
  stage: { width: 1440, height: 600 },
  scale: 0.62,
  tilt: 18,
  perspective: 2400,
  top: 32,
  firstCenter: 365,
  lastCenter: 1075,
  brightness: { back: 0.74, front: 1 },
  order: ["recorder", "disks", "monitor", "store", "settings", "files"],
} as const satisfies {
  label: string;
  window: { width: number; height: number };
  stage: { width: number; height: number };
  scale: number;
  tilt: number;
  perspective: number;
  top: number;
  firstCenter: number;
  lastCenter: number;
  brightness: { back: number; front: number };
  order: readonly SystemAppId[];
};
