export type WindowBox = { x: number; y: number; width: number; height: number };

export type WindowPlacement = { mobile: WindowBox; desktop: WindowBox };

export const WINDOW_PLACEMENTS = {
  browser: {
    mobile: { x: 16, y: 16, width: 488, height: 280 },
    desktop: { x: 24, y: 40, width: 540, height: 356 },
  },
  terminal: {
    mobile: { x: 16, y: 520, width: 400, height: 220 },
    desktop: { x: 484, y: 200, width: 400, height: 220 },
  },
  settings: {
    mobile: { x: 110, y: 240, width: 480, height: 362 },
    desktop: { x: 786, y: 20, width: 480, height: 362 },
  },
} satisfies Record<string, WindowPlacement>;

export type CursorIdentity = {
  name: string;
  fillClass: string;
  pillClass: string;
  track: string;
};

export const CURSORS = {
  you: {
    name: "You",
    fillClass: "fill-white",
    pillClass: "bg-white text-ink",
    track: "agent-cursor-you",
  },
  claude: {
    name: "Claude Code",
    fillClass: "fill-sweep-orange",
    pillClass: "bg-sweep-orange text-ink",
    track: "agent-cursor-claude",
  },
  codex: {
    name: "Codex",
    fillClass: "fill-sweep-sky",
    pillClass: "bg-sweep-sky text-ink",
    track: "agent-cursor-codex",
  },
} satisfies Record<string, CursorIdentity>;
