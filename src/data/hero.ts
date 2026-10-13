import type { FrameSequence } from "@/util/frame-sequence";

export const hero = {
  eyebrow: "Meet",
  headline: ["CrownOS"],
  slogan: {
    lead: "An",
    emphasis: "agent native",
    trail: "desktop built on Linux kernel",
  },
  laptop: {
    label: "A CrownOS laptop opening to the desktop",
    sequence: {
      path: "/crownbook-mocks",
      count: 240,
      extension: "webp",
      digits: 4,
      width: 1600,
      height: 1196,
      restingTop: 0.61,
    } satisfies FrameSequence,
  },
} as const;
