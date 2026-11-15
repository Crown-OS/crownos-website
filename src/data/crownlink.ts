export type CrownLinkFeatureId =
  | "clipboard"
  | "camera"
  | "remote-phone"
  | "file-sharing"
  | "notifications"
  | "second-screen"
  | "hotspot"
  | "call-bridge";

export type CrownLinkFeature = {
  id: CrownLinkFeatureId;
  title: string;
  description: string;
};

export const CROWNLINK_REEL_DIRECTORY = "/crownlink/v1";

export const crownLinkReelSources = (id: CrownLinkFeatureId) => ({
  webm: `${CROWNLINK_REEL_DIRECTORY}/${id}.webm`,
  mp4: `${CROWNLINK_REEL_DIRECTORY}/${id}.mp4`,
  poster: `${CROWNLINK_REEL_DIRECTORY}/${id}.webp`,
});

export const crownLinkCopy = {
  headline: "All your devices in symphony",
  summary:
    "CrownLink pairs your devices over Wi‑Fi and Bluetooth. Pair once and every feature below is ready.",
} as const;

export const crownLinkFeatures: readonly CrownLinkFeature[] = [
  {
    id: "clipboard",
    title: "Clipboard Sync",
    description:
      "Copy on your phone and paste on your desktop, or the other way around.",
  },
  {
    id: "camera",
    title: "Camera Share",
    description:
      "Your phone camera becomes a webcam that any app on your desktop can open.",
  },
  {
    id: "remote-phone",
    title: "Remote Phone Access",
    description:
      "Open your phone in a desktop window and control it with your mouse.",
  },
  {
    id: "file-sharing",
    title: "Quick File Sharing",
    description:
      "Send files to any paired device over Wi‑Fi. No cables and no cloud.",
  },
  {
    id: "notifications",
    title: "Notification Sync",
    description: "Phone notifications show up on your desktop as they arrive.",
  },
  {
    id: "second-screen",
    title: "Second Screen",
    description:
      "Turn a tablet into an extra monitor that responds to touch and pointer input.",
  },
  {
    id: "hotspot",
    title: "Instant Hotspot",
    description: "Connect to your phone hotspot straight from the desktop.",
  },
  {
    id: "call-bridge",
    title: "Call Bridge",
    description:
      "Answer and make phone calls with your desktop microphone and speakers.",
  },
];
