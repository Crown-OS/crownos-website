import type { PocketFeature } from "./pocket";

export const showcase = {
  spotlight: {
    icon: "plug",
    title: "Rich System Apps",
    description:
      "All Systems Softwares are rebuilt from scratch for seamless user experience and consistent performance with CrownUI, our custom UI framework",
    visual: "system-apps",
    readout: { label: "Rebuilt from scratch on", value: "CrownUI" },
    action: { label: "Explore Apps", href: "/docs/crownui" },
  },
  pair: [
    {
      icon: "link",
      title: "CrownLink",
      description:
        "Custom multi device connectivity engine powered by LLTS protocol pairs your phone, tablet and remote machines. Clipboard, notifications, files, calls and running agents move between them through preconfigured Tailscale network.",
      visual: "crownlink",
      readout: { label: "Powered by the", value: "LLTS", suffix: "protocol" },
      action: {
        label: "Explore the ecosystem",
        href: "/docs/crownos/ecosystem",
      },
    },
    {
      icon: "rewind",
      title: "Migration Assistant",
      description:
        "The assistant copies your files, dotfiles and app data, maps your package list to Arch equivalents and verifies every byte with checksums before anything lands on the new install.",
      visual: "migration-assistant",
      readout: { label: "Every byte verified with", value: "Checksums" },
      action: {
        label: "Read the install guide",
        href: "/docs/crownos/installation",
      },
    },
  ],
} as const satisfies {
  spotlight: PocketFeature;
  pair: readonly PocketFeature[];
};
