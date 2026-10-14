import type { GlyphName } from "@/components/visuals/window/Glyph";
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
      path: "/sequences/crownbook/v2",
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
  ecosystem: {
    title: "Superpowered Together",
    lead: "Crown Link pairs your phone and tablet with the desktop, peer to peer and end-to-end encrypted.",
    features: [
      { icon: "clipboard", name: "Clipboard Sync" },
      { icon: "camera", name: "Camera Share" },
      { icon: "remote", name: "Remote Phone Access" },
      { icon: "folder", name: "Quick File Sharing" },
      { icon: "bell", name: "Notification Sync" },
      { icon: "second-screen", name: "Second Screen" },
      { icon: "hotspot", name: "Instant Hotspot" },
      { icon: "call", name: "Call Bridge" },
    ] satisfies readonly { icon: GlyphName; name: string }[],
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
