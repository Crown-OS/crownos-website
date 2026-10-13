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
      crop: { x: 180, y: 200, width: 1240, height: 880 },
      restingTop: 0.602,
    } satisfies FrameSequence,
  },
} as const;
