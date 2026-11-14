import type { PocketFeature } from "./pocket";

export const showcase = {
  spotlight: {
    icon: "plug",
    title: "Rich System Apps",
    description:
      "Every system app is rebuilt from scratch on CrownUI, our own UI framework. They share one design and run with the same steady performance.",
    visual: "system-apps",
    readout: { label: "Rebuilt from scratch on", value: "CrownUI" },
    action: { label: "Explore Apps", href: "/docs/crownui" },
  },
  pair: [
    {
      icon: "link",
      title: "CrownLink",
      description:
        "Our own connection engine runs on the LLTS protocol and pairs your phone, tablet and remote machines. Clipboard, notifications, files, calls and running agents move between them over a preconfigured Tailscale network.",
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
