export type AppChipTone = "orange" | "blue" | "neutral";

export type PromptPart = string | { app: string; tone: AppChipTone };

export type AgentStep = {
  label: string;
  state: "done" | "running";
  count?: number;
};

export const agentCopy = {
  headline: "Apps that feel as fast as they look",
  summary:
    "Every CrownOS app is built on CrownUI, our own GPU accelerated UI framework. Shaders compile ahead of time, so the first animation is as smooth as the next.",
  windowTitle: "Set up dev environment",
  windowSubtitle: "Crown Agent · Runs locally",
  caption: "Agent chat",
  captionDetail:
    "The built in agent works with your apps, files and settings, so routine work happens right on your desktop.",
} as const;

export const agentChatGroups = ["CrownOS", "Daily", "Recent"] as const;

export const agentChats = [
  "Set up dev environment",
  "Sync clipboard to my phone",
  "Tile windows for coding",
  "Clean up Downloads",
  "Update system packages",
  "Triage GitHub issues",
] as const;

export const agentPrompt: readonly PromptPart[] = [
  "Install ",
  { app: "Rust", tone: "orange" },
  " and ",
  { app: "VS Code", tone: "blue" },
  ", then tile ",
  { app: "Terminal", tone: "neutral" },
  " next to the editor.",
];

export const agentSteps: readonly AgentStep[] = [
  { label: "Installing rustup", state: "done" },
  { label: "Installing visual-studio-code-bin", state: "done", count: 3 },
  { label: "Tiling windows", state: "running", count: 2 },
];

export const agentReply =
  "Rust 1.93 and VS Code are ready. Terminal now sits to the right of your editor in a 60/40 split.";
