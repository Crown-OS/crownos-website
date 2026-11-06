import type { HorizonGlowGeometry } from "@/shaders/horizon-glow";
import type { DeviceStill } from "@/util/device-still";
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
      path: "/sequences/crownbook/v7",
      frames: 145,
      timeline: 240,
      digits: 4,
      size: { width: 1240, height: 880 },
      tiers: [
        { width: 828, media: "(width <= 480px)" },
        {
          width: 1240,
          media:
            "(width > 480px) and (resolution <= 1dppx) and (height <= 880px)",
        },
        {
          width: 1860,
          media:
            "(width > 480px) and (resolution <= 1dppx) and (height > 880px), (width > 480px) and (1dppx < resolution <= 1.5dppx)",
        },
        { width: 2480, media: "(width > 480px) and (resolution > 1.5dppx)" },
      ],
      restingTop: 0.602,
    } satisfies FrameSequence,
    finalBounds: { top: 0.078, bottom: 0.84 },
    deskEdge: 0.52,
    glow: { span: 3, above: 0.8, below: 0.3 } satisfies HorizonGlowGeometry,
  },
  ecosystem: {
    title: "Superpowered together",
    lead: "Crown Link pairs your phone, tablet and desktop, end-to-end encrypted. Share clipboard, files, notifications, calls and camera without cloud accounts.",
    devices: {
      tablet: {
        label: "A CrownOS tablet beside the laptop",
        path: "/devices/v1/tablet",
        widths: [480, 960],
        size: { width: 468, height: 650 },
        centerX: 0.943,
        bottom: 0.607,
        depth: 0.73,
        enterFrom: "right",
      },
      phone: {
        label: "A CrownOS phone beside the laptop",
        path: "/devices/v1/phone",
        widths: [320, 640],
        size: { width: 182, height: 375 },
        centerX: 0.141,
        bottom: 0.607,
        depth: 0.73,
        enterFrom: "left",
      },
    } satisfies Record<string, DeviceStill>,
  },
} as const;
