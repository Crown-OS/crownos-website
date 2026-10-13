import type { Feature } from "./feature";

export const showcase = {
  spotlight: {
    label: "Agent plugins",
    title: "Reshape your desktop by asking",
    description:
      "A plugin system reaches every surface of CrownOS: panels, windows, shortcuts and system apps. Describe a change and an AI agent writes the plugin, runs it in a sandbox and touches only what you grant it.",
    visual: "plugin-sandbox",
    tone: "ember",
  },
  pair: [
    {
      label: "Crown Link",
      title: "All your devices, one desktop",
      description:
        "Crown Link, our encrypted peer-to-peer protocol, pairs your phone, tablet and remote machines. Clipboard, notifications, files, calls and running agents move between them without a cloud in the middle.",
      visual: "device-mesh",
      tone: "iris",
    },
    {
      label: "Migration Assistant",
      title: "Your old desktop, moved in five minutes",
      description:
        "The assistant copies your files, dotfiles and app data, maps your package list to Arch equivalents and verifies every byte with checksums before anything lands on the new install.",
      visual: "migration",
      tone: "lagoon",
    },
  ],
} as const satisfies { spotlight: Feature; pair: readonly Feature[] };
