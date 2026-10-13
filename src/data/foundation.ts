import type { Feature, SectionCopy } from "./feature";

export const foundation = {
  heading: {
    title: "Built on Arch. *Engineered* by us",
    lead: "We started with Arch Linux, lean and trusted, then rebuilt the graphics stack from the compositor up.",
  },
  pillars: [
    {
      label: "Crown Compositor",
      title: "Smooth on modest hardware",
      description:
        "A Wayland compositor written in Rust and tuned for low memory. Rendering is fully GPU accelerated with direct scanout, so an idle frame costs almost nothing.",
      visual: "compositor-layers",
    },
    {
      label: "CrownUI",
      title: "No stutter, even on first launch",
      description:
        "Our UI framework for Wayland, built on the Impeller renderer. Shaders are compiled ahead of time, so the first animation is as fluid as the hundredth.",
      visual: "crownui-blocks",
    },
    {
      label: "Arch Linux",
      title: "Always current, never unfamiliar",
      description:
        "Rolling releases, pacman and the AUR, left untouched. You get the newest kernel and packages on a base that is documented down to the last flag.",
      visual: "arch-prism",
    },
  ],
} as const satisfies { heading: SectionCopy; pillars: readonly Feature[] };
