import type { Feature, SectionCopy } from "./feature";

type FlipFeature = Feature & { detail: string };

export const personalize = {
  heading: {
    title: "Endless agentic customization",
    lead: "Change anything by editing a file, clicking a setting or asking an agent. Every route leads to the same plain config.",
  },
  cards: [
    {
      icon: "folder",
      title: "Customizing your system with configs",
      description:
        "Use our advanced config manager to customize everything from one folder",
      detail:
        "Keybindings, displays, power, network, animations and plugins are plain TOML files in a single folder. The Settings app writes the same files, so you can click, edit by hand, version with git or carry them to a new machine.",
      visual: "config-editor",
      tone: "violet",
    },
    {
      icon: "swatches",
      title: "Customizing through the Settings App",
      description:
        "Customize your system with the user friendly parameters that we expose",
      detail:
        "Files, Terminal, Settings and the other system apps are built on CrownUI, so one theme.toml changes typography, corner radius, density and contrast across all of them at once.",
      visual: "settings-window",
      tone: "crimson",
    },
    {
      icon: "plug",
      title: "Customizing by plugins",
      description:
        "Install a plugin from our App store that can customize everything",
      detail:
        "Drivers, firmware and tuned profiles ship ready for printers, drawing tablets, controllers, audio interfaces, webcams and docks, applied the moment you connect them.",
      visual: "accessory-hub",
      tone: "indigo",
    },
  ],
} as const satisfies { heading: SectionCopy; cards: readonly FlipFeature[] };
