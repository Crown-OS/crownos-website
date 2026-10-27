import type { Feature } from "./feature";
import { site } from "./site";

export const showcase = {
  spotlight: {
    label: "Rich Plugin System",
    description:
      "A plugin system reaches every surface of CrownOS: panels, windows, shortcuts and system apps. Describe a change and an AI agent writes the plugin, runs it in a sandbox and touches only what you grant it.",
    visual: "agent-window",
    icon: "plug",
    tone: "ember",
    actions: {
      primary: { label: "Browse plugins", href: "/plugins" },
      secondary: { label: "Build your own", href: site.repository },
    },
  },
  pair: [
    {
      label: "Crown Link",
      description:
        "Crown Link, our encrypted peer-to-peer protocol, pairs your phone, tablet and remote machines. Clipboard, notifications, files, calls and running agents move between them without a cloud in the middle.",
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
