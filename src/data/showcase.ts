import type { Feature } from "./feature";
import { site } from "./site";

export const showcase = {
  spotlight: {
    label: "Rich System Apps",
    description:
      "All Systems Softwares are rebuilt from scratch for seamless user experience and consistent performance with CrownUI, our custom UI framework ",
    visual: "agent-window",
    icon: "plug",
    tone: "ember",
    actions: {
      primary: { label: "Explore Apps", href: "/docs" },
      secondary: { label: "App Store", href: site.repository },
    },
  },
  pair: [
    {
      label: "CrownLink",
      description:
        "Custom multi device connectivity engine powered by LLTS protocol pairs your phone, tablet and remote machines. Clipboard, notifications, files, calls and running agents move between them through preconfigured Tailscale network.",
      visual: "link-window",
      icon: "link",
      tone: "iris",
    },
    {
      label: "Migration Assistant",
      description:
        "The assistant copies your files, dotfiles and app data, maps your package list to Arch equivalents and verifies every byte with checksums before anything lands on the new install.",
      visual: "migration-terminal",
      icon: "rewind",
      tone: "lagoon",
    },
  ],
} as const satisfies { spotlight: Feature; pair: readonly Feature[] };
