export const SETTINGS_COLOR = {
  frame: "#000000",
  backdrop: "#0f0f10",
  raised: "#171718",
  sunken: "#121212",
  border: "#27272a",
  primary: "#fafafa",
  body: "#d4d4d8",
  muted: "#9f9f9f",
  sidebarText: "#a1a1aa",
  sidebarIcon: "#8a8a93",
  sidebarSelected: "#232326",
  sidebarSelectedBorder: "rgb(255 255 255 / 0.11)",
  track: "#3a3a3d",
  knob: "#fafafa",
  knobShadow: "rgb(0 0 0 / 0.45)",
  knobRim: "rgb(245 222 179 / 0.08)",
  selectFill: "#1c1c1c",
  selectBorder: "#282828",
  accentStart: "#8f6dfb",
  accentEnd: "#6d48e8",
} as const;

export const BACKDROP_OPACITY = 0.8;

export const WINDOW_SIZE = { width: 1040, height: 800, radius: 12 } as const;

export const PANE = {
  x: 272,
  y: 12,
  width: 756,
  height: WINDOW_SIZE.height - 24,
  radius: 16,
} as const;

export const CARD = { x: 304, width: 692, radius: 14 } as const;

export const ROW = {
  textX: CARD.x + 19,
  controlRight: CARD.x + CARD.width - 19,
} as const;

export const FONT_SIZE = {
  title: 22,
  value: 16,
  body: 14,
  caption: 12,
} as const;
