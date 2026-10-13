import type { Feature } from "./feature";

export const interactions = [
  {
    icon: "layout",
    title: "Tile or float in one click",
    description:
      "Switch any workspace between a tiling grid and free floating windows with one click or one shortcut. Layouts are remembered per workspace, so nothing jumps when you switch back.",
    visual: "tiling-toggle",
  },
  {
    icon: "spring",
    title: "Interactions you can feel",
    description:
      "Windows, gestures and scrolling run on a spring physics engine that keeps your velocity. Fling a window and it glides, pull a panel and it resists, at your display's full refresh rate.",
    visual: "physics-drag",
  },
  {
    icon: "tablet",
    title: "Your tablet becomes a second screen",
    description:
      "Extend or mirror the desktop to any paired tablet over Crown Link. Hardware video encoding keeps latency low while touch and stylus input pass straight through.",
    visual: "second-screen",
  },
  {
    icon: "server",
    title: "Run agents on any machine you own",
    description:
      "Send AI agents to a home server or cloud box through Crown Link's agent protocol. They run remotely, stream progress to your desktop and hand back results while your laptop stays cool.",
    visual: "remote-agents",
  },
] as const satisfies readonly Feature[];
