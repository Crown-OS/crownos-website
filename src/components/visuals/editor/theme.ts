import type { RonTokenKind } from "@/util/ron-highlight";

export const EDITOR_COLOR = {
  frame: "#000000",
  chrome: "#262626",
  surface: "#0b0b0b",
  selection: "#333333",
  activeLine: "#262626",
  divider: "#404040",
  text: "#f2f2f2",
  icon: "#c7c7c7",
  dim: "#686868",
  muted: "#7f7f7f",
  fileGlyph: "#7f52ff",
  alert: "#ce364c",
} as const;

export const SYNTAX_COLOR: Record<RonTokenKind, string> = {
  plain: EDITOR_COLOR.text,
  string: "#da89d4",
  number: "#efd18e",
  keyword: "#91d2c4",
  variant: "#e2b38f",
};

export const EDITOR_SIZE = { width: 900, height: 666, radius: 11 } as const;

export const LAYOUT = {
  titlebarHeight: 32,
  tabsBottom: 64,
  sidebarWidth: 247,
  uiFontSize: 12.5,
  codeFontSize: 12,
  codeCharWidth: 7.2,
} as const;
