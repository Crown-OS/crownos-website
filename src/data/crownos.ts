export type NavLink = { label: string; href: string; mark?: string };
export type EcosystemFeature = { name: string; description: string };
export type Capability = {
  title: string;
  kicker: string;
  description: string;
  visual: "assist" | "performance" | "theming" | "snapshots";
};

export const navLinks: readonly NavLink[] = [
  { label: "Manifesto", href: "/#manifesto", mark: "*" },
  { label: "Ecosystem", href: "/#ecosystem", mark: "//" },
  { label: "System", href: "/#system", mark: "©" },
  { label: "Docs", href: "/docs" },
];

export const downloadLink: NavLink = { label: "Download", href: "/download" };

export const hero = {
  label: "Operating system",
  lines: ["Meet CrownOS,", "an *AI-ready* desktop", "built on Arch Linux."],
  year: "/ 2026 /",
  cta: "Get the ISO",
} as const;

export const bootLines: readonly (readonly [string, string])[] = [
  ["OS", "CrownOS 26 · Regalia"],
  ["Base", "Arch Linux · rolling"],
  ["Kernel", "linux-zen"],
  ["Shell", "crown-shell"],
  ["AI", "local · on-device"],
  ["Telemetry", "none"],
];

export const marqueeWords = [
  "CrownOS",
  "Arch-based",
  "AI-ready",
  "Open source",
] as const;

export const manifesto = {
  label: "Manifesto",
  text: "An operating system should be the *invisible* layer between intent and action — fast enough to disappear, open enough to trust, and calm enough that your work is the only thing left on *screen.*",
  signature: "— The CrownOS manifesto, 2026",
} as const;

export const pillars = [
  { word: "Be Fast", mark: "*" },
  { word: "Be Open", mark: "#" },
  { word: "Be Yours", mark: "™" },
] as const;

export const ecosystem = {
  lines: ["Your phone,", "*finally* native."],
  label: "Phone ⇄ Desktop",
  body: "Pair once over your local network. After that, every device you own behaves like one machine — end-to-end encrypted, no accounts, no cloud relay.",
  features: [
    {
      name: "Clipboard Sync",
      description: "Copy on your phone, paste on your desktop.",
    },
    {
      name: "Camera Share",
      description: "Your phone becomes a native webcam.",
    },
    {
      name: "Remote Phone Access",
      description: "Mirror and control your phone from the desk.",
    },
    {
      name: "Quick File Sharing",
      description: "Peer-to-peer transfers without cables.",
    },
    {
      name: "Notification Sync",
      description: "Every alert, one calm inbox.",
    },
    {
      name: "Second Screen",
      description: "A tablet turns into an extra display.",
    },
    {
      name: "Instant Hotspot",
      description: "One tap to share an encrypted connection.",
    },
    {
      name: "Call Bridge",
      description: "Answer calls without reaching for your phone.",
    },
  ] satisfies EcosystemFeature[],
} as const;

export const system = {
  intro:
    "Most systems ask you to adapt. CrownOS adapts to you — every default considered, every layer replaceable.",
  sideLeft: "Crown / OS",
  sideRight: "/2026/",
  wordmark: "System@26",
  cardTitle: "Under the hood",
  capabilities: [
    {
      title: "AI-ready core",
      kicker: "01 / Intelligence",
      description:
        "A local assistant wired into the shell, files and settings. Private by default.",
      visual: "assist",
    },
    {
      title: "Tuned for speed",
      kicker: "02 / Performance",
      description:
        "Zen kernel, lean services and a compositor built for high refresh rates.",
      visual: "performance",
    },
    {
      title: "Make it yours",
      kicker: "03 / Customisation",
      description:
        "Themes, layouts and keybinds as plain config. Change anything, break nothing.",
      visual: "theming",
    },
    {
      title: "Undo anything",
      kicker: "04 / Stability",
      description:
        "Atomic snapshots before every update. Roll back from the boot menu.",
      visual: "snapshots",
    },
  ] satisfies Capability[],
  statement:
    "We build systems that get out of your way — where the boot is instant, the shell is calm, and the machine finally feels like *yours.*",
  signature: "CrownOS (.26)",
} as const;

export const download = {
  lines: ["Crown your", "desktop."],
  meta: "x86_64 · UEFI · GPG-signed ISO",
  primary: { label: "Download CrownOS", href: "/download" },
  secondary: { label: "Read the docs", href: "/docs" },
} as const;

export const footer = {
  wordmark: "CrownOS",
  location: "Arch Linux · Rolling release",
  reach: ["Open source", "worldwide"],
  license: "GPL",
  copyright: "©2026 CrownOS, all rights reserved",
  columns: [
    [
      { label: "Features", href: "/features" },
      { label: "Download", href: "/download" },
    ],
    [
      { label: "Docs", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
    ],
    [
      { label: "Community", href: "/community" },
      { label: "GitHub", href: "https://github.com" },
    ],
  ] satisfies NavLink[][],
} as const;
