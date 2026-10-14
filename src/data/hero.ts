import type { FrameSequence } from "@/util/frame-sequence";

export const hero = {
  eyebrow: "Introducing",
  headline: ["CrownOS"],
  slogan: {
    lead: "An",
    emphasis: "agent native",
    trail: "desktop OS built on Linux kernel",
  },
  laptop: {
    label: "A CrownOS laptop opening to the desktop",
    sequence: {
      path: "/sequences/crownbook/v1",
      frames: 145,
      timeline: 240,
      digits: 4,
      size: { width: 1240, height: 880 },
      tiers: [
        { width: 828, media: "(max-width: 480px)" },
        { width: 1240, media: "(min-width: 481px)" },
      ],
      restingTop: 0.602,
    } satisfies FrameSequence,
  },
} as const;
