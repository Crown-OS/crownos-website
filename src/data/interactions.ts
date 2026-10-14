import type { Feature } from "./feature";

export const interactions = [
  {
    icon: "layout",
    title: "Tile or float in one click",
    description:
      "Switch any workspace between a tiling grid and free floating windows with one click or one shortcut. Layouts are remembered per workspace, so nothing jumps when you switch back.",
    visual: "tiling-toggle",
  },
] as const satisfies readonly Feature[];
