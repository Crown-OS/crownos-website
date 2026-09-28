export type NavLink = { label: string; href: string; mark?: string };
export type EcosystemFeature = { name: string; description: string };
export type Capability = {
  title: string;
  kicker: string;
  description: string;
  visual: "compositor" | "bases" | "config" | "plugins" | "uikit";
};
export type Solution = {
  audience: string;
  title: string;
  visual: "agent" | "models" | "waveform" | "frames" | "vault" | "fleet";
  span: "lead" | "side" | "third" | "full";
};

export const navLinks: readonly NavLink[] = [
  { label: "Our Vision", href: "/#our-vision", mark: "*" },
  { label: "Ecosystem", href: "/#ecosystem", mark: "//" },
  { label: "System", href: "/#system", mark: "©" },
  { label: "Docs", href: "/docs" },
];

export const downloadLink: NavLink = { label: "Download", href: "/download" };

export const hero = {
  brand: "CrownOS",
  lines: [
    "Meet CrownOS,",
    "an *agent native* desktop",
    "built on Linux kernel.",
  ],
  year: "/ 2026 /",
  cta: "Get the ISO",
} as const;

export const marqueeWords = [
  "Install the complete desktop in 60 seconds",
] as const;

export const our_vision = {
  label: "Our Vision",
  text: "An operating system should be the *invisible* layer between intent and action — fast enough to disappear, open enough to trust, and calm enough that your work is the only thing left on *screen.*",
  signature: "— The CrownOS vision, 2026",
} as const;

export const solutions = {
  label: "Solutions",
  lines: ["Flexible setups for", "every *way* you work."],
  body: "Shape your desktop from a complete set of agent, creative and system tools — designed to work individually or together.",
  href: "/features",
  items: [
    {
      audience: "Developers",
      title: "Ship with agents that understand your whole system",
      visual: "agent",
      span: "lead",
    },
    {
      audience: "AI builders",
      title: "Run local models on your own silicon",
      visual: "models",
      span: "side",
    },
    {
      audience: "Creators",
      title: "Real-time audio and colour-managed displays",
      visual: "waveform",
      span: "third",
    },
    {
      audience: "Gamers",
      title: "Proton, VRR and a frame-paced compositor",
      visual: "frames",
      span: "third",
    },
    {
      audience: "Privacy",
      title: "Everything stays on your device",
      visual: "vault",
      span: "third",
    },
    {
      audience: "Teams",
      title: "Roll one config out to every machine you manage",
      visual: "fleet",
      span: "full",
    },
  ] satisfies Solution[],
} as const;

export const pillars = [
  { word: "Agentic", mark: "*" },
  { word: "Smoothest", mark: "#" },
  { word: "Fully Customizable", mark: "™" },
] as const;

export const ecosystem = {
  lines: ["All devices in", "*symphony*"],
  label: "Phone ⇄  Desktop ⇄  Tablet ⇄  Laptop",
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
      description: "Peer-to-peer multi medium file transfers.",
    },
    {
      name: "Notification Sync",
      description: "Every alert will be in sync.",
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
  wordmark: "",
  cardTitle: "Under the hood",
  capabilities: [
    {
      title: "Custom agentic compositor",
      kicker: "01 / Compositor",
      description:
        "Built for personalized agentic workflows. One click toggles between auto-tiling like Hyprland and floating windows like macOS.",
      visual: "compositor",
    },
    {
      title: "Pick any Linux base",
      kicker: "02 / Base",
      description:
        "Run CrownOS on the distro you already trust — Debian, Nix, Arch, Ubuntu or Fedora.",
      visual: "bases",
    },
    {
      title: "CrownConfig",
      kicker: "03 / Config",
      description:
        "One centralized config that changes how your entire system behaves, from theme to behaviour.",
      visual: "config",
    },
    {
      title: "Rich plugin system",
      kicker: "04 / Plugins",
      description:
        "Agents with custom skills steer AI toward a reliable, consistent system — and build plugins that customize anything.",
      visual: "plugins",
    },
    {
      title: "Opinionated design system",
      kicker: "05 / CrownUIKit",
      description:
        "Beautiful, consistent components you can restyle globally with agents — and no AI slop UI.",
      visual: "uikit",
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
