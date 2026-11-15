export type PlatformIllustration =
  | "ask"
  | "updates"
  | "compositor"
  | "compatibility"
  | "kernel";

export type PlatformFeature = {
  title: string;
  description: string;
  illustration: PlatformIllustration;
  span: "wide" | "narrow";
  textAlign?: "start" | "center";
};

export const platformCopy = {
  headline: "One OS for your entire workflow.",
  subline: "Agents that keep your desktop moving.",
  action: "Download ISO",
} as const;

export const platformFeatures: readonly PlatformFeature[] = [
  {
    title: "Agent native desktop",
    description:
      "Customize everything on your system with your favorite coding agents.",
    illustration: "ask",
    span: "wide",
  },
  {
    title: "Always up to date",
    description:
      "A rolling release with on-device package builds for acceleration on CPU instructions.",
    illustration: "updates",
    span: "narrow",
  },
  {
    title: "Crownpositor",
    description:
      "A Wayland compositor in Rust, tuned for low memory. Fully GPU accelerated, so an idle frame costs almost nothing.",
    illustration: "compositor",
    span: "narrow",
  },
  {
    title: "Windows and Android apps",
    description:
      "Install .exe and .apk files out of the box. They open in their own windows and sit in your dock like any other app.",
    illustration: "compatibility",
    span: "narrow",
  },
  {
    title: "CachyOS kernel",
    description:
      "linux-cachyos with a tuned EEVDF scheduler and ThinLTO builds keeps the desktop responsive under load.",
    illustration: "kernel",
    span: "narrow",
    textAlign: "center",
  },
];

export const askPrompts = [
  "Make my dock translucent",
  "Tile Firefox next to my terminal",
  "Switch to a warm theme after sunset",
  "Bind Super+E to the file manager",
  "Sync my clipboard with my phone",
] as const;
