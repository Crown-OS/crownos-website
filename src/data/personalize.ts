import type { Feature, SectionCopy } from "./feature";

type FlipFeature = Feature & { detail: string };

export const personalize = {
  heading: { title: "Make it *yours* from one place" },
  cards: [
    {
      icon: "folder",
      title: "One folder runs the whole system",
      description: "Every behaviour of CrownOS lives in ~/.config/crown",
      detail:
        "Keybindings, displays, power, network, animations and plugins are plain TOML files in a single folder. The Settings app writes the same files, so you can click, edit by hand, version with git or carry them to a new machine.",
      visual: "config-tree",
      tone: "violet",
    },
    {
      icon: "swatches",
      title: "System apps that match your taste",
      description: "Every built-in app restyles from a single file",
      detail:
        "Files, Terminal, Settings and the other system apps are built on CrownUI, so one theme.toml changes typography, corner radius, density and contrast across all of them at once.",
      visual: "themed-apps",
      tone: "crimson",
    },
    {
      icon: "plug",
      title: "Accessories that just work",
      description: "Plug it in and it is already configured",
      detail:
        "Drivers, firmware and tuned profiles ship ready for printers, drawing tablets, controllers, audio interfaces, webcams and docks, applied the moment you connect them.",
      visual: "accessory-hub",
      tone: "indigo",
    },
  ],
} as const satisfies { heading: SectionCopy; cards: readonly FlipFeature[] };
