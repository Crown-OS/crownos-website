export const agentCursorsCopy = {
  title: "Agents work alongside you.",
  subline:
    "Each agent gets its own cursor and windows, so you keep working while they do.",
} as const;

export type AgentCursorHighlightId = "cursor" | "windows" | "control";

export type AgentCursorHighlight = {
  id: AgentCursorHighlightId;
  title: string;
  description: string;
};

export const agentCursorHighlights: readonly AgentCursorHighlight[] = [
  {
    id: "cursor",
    title: "A cursor per agent",
    description:
      "Each agent moves a labelled pointer, so you see what it does at a glance.",
  },
  {
    id: "windows",
    title: "Separate windows",
    description:
      "Agents open and drive their own windows. Yours stay where you left them.",
  },
  {
    id: "control",
    title: "You stay in control",
    description:
      "Keep working with your own pointer, or take over from an agent at any time.",
  },
];

export const browserSession = {
  url: "wiki.archlinux.org/title/PipeWire",
  heading: "PipeWire",
  contents: ["Installation", "Configuration", "Troubleshooting"],
  activeContent: 1,
} as const;

export const terminalSession = {
  prompt: "~ ❯",
  command: "paru -S obs-studio",
  resolving: ":: Resolving dependencies...",
  done: "obs-studio installed",
} as const;

export const settingsSession = {
  pages: ["Wi-Fi", "Appearance", "Display", "Sound"],
  activePage: 1,
  accents: [
    { name: "Purple", from: "#8f6dfb", to: "#6d48e8" },
    { name: "Blue", from: "#5aa2ff", to: "#2563eb" },
    { name: "Green", from: "#4ade80", to: "#16a34a" },
    { name: "Orange", from: "#fb923c", to: "#ea580c" },
    { name: "Pink", from: "#f472b6", to: "#db2777" },
  ],
  activeAccent: 1,
} as const;
