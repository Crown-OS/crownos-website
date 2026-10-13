import type { Feature, SectionCopy } from "./feature";

export const foundation = {
  heading: {
    title: "Redesigned the entire graphics stack",
    lead: "We started with Arch Linux, lean and trusted, then rebuilt the graphics stack from the compositor up.",
  },
  pillars: [
    {
      label: "Crownpositor",
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
      label: "CachyOS Kernel",
      title: "Faster on the hardware you own",
      description:
        "We ship linux-cachyos: a tuned EEVDF scheduler with a 1000 Hz tick, compiled with Clang ThinLTO and AutoFDO profiling, so the desktop stays responsive under load and hot code runs tighter.",
      visual: "processor-chip",
    },
  ],
} as const satisfies { heading: SectionCopy; pillars: readonly Feature[] };
