import type { SectionCopy } from "./feature";
import type { PocketFeature } from "./pocket";

export const personalize = {
  heading: {
    title: "Endless agentic customization",
    lead: "Change anything by editing a file, clicking a setting or asking an agent. Every route leads to the same plain config.",
  },
  cards: [
    {
      icon: "folder",
      title: "Config files",
      visual: "config-editor",
      readout: {
        label: "Everything in one folder",
        prefix: "~/",
        value: ".config",
      },
      action: {
        label: "Read the config docs",
        href: "/docs/crownos/configuration",
      },
    },
    {
      icon: "swatches",
      title: "Settings App",
      visual: "settings-window",
      readout: { label: "One theme restyles", value: "Every app" },
      action: { label: "Browse themes", href: "/themes" },
    },
    {
      icon: "plug",
      title: "Plugins",
      visual: "installed-plugins",
      readout: {
        label: "Installed from the App Store",
        count: "plugins",
        suffix: "plugins",
      },
      action: { label: "Browse plugins", href: "/plugins" },
    },
  ],
} as const satisfies {
  heading: SectionCopy;
  cards: readonly PocketFeature[];
};
