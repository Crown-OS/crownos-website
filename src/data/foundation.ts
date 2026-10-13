import type { Feature, SectionCopy } from "./feature";

export const foundation = {
  heading: {
    title: "Arch at the core. *CachyOS* in the kernel",
    lead: "CrownOS keeps Arch Linux as its base and ships linux-cachyos, a kernel tuned for responsiveness and throughput, so the hardware you already own feels faster.",
  },
  pillars: [
    {
      label: "Scheduler",
      title: "What you touch runs first",
      description:
        "A tuned EEVDF scheduler and a 1000 Hz tick give the window you are using the next slice of CPU, so typing, dragging and audio stay smooth while a build runs behind them.",
      visual: "scheduler-lanes",
    },
    {
      label: "Compiler",
      title: "Compiled for the chip you own",
      description:
        "Built with Clang ThinLTO and profiled with AutoFDO and Propeller, with builds for x86-64-v3, x86-64-v4 and Zen 4, so hot paths use the instructions your processor actually has.",
      visual: "compiler-die",
    },
    {
      label: "Memory & I/O",
      title: "Quick even under pressure",
      description:
        "MGLRU tuning protects the apps you are working in from being evicted, while ADIOS disk scheduling and BBRv3 networking keep storage and downloads responsive on a busy system.",
      visual: "memory-pages",
    },
  ],
} as const satisfies { heading: SectionCopy; pillars: readonly Feature[] };
