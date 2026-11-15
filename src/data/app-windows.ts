export type AppWindowId =
  | "files"
  | "settings"
  | "store"
  | "monitor"
  | "disks"
  | "recorder";

export type AppWindowShot = { id: AppWindowId; name: string };

export const appWindowShots = {
  source: "assets-src/system-apps/apps.html",
  directory: "/apps/v1",
  window: { width: 1040, height: 800 },
  captureScale: 1.25,
  frameColor: "#0f0f10",
  left: <readonly AppWindowShot[]>[
    { id: "files", name: "Files" },
    { id: "store", name: "App Store" },
    { id: "recorder", name: "Voice Recorder" },
  ],
  right: <readonly AppWindowShot[]>[
    { id: "settings", name: "Settings" },
    { id: "monitor", name: "Process Monitor" },
    { id: "disks", name: "Disk Manager" },
  ],
} as const;

export const appWindowUrl = (id: AppWindowId) =>
  `${appWindowShots.directory}/${id}.png`;
