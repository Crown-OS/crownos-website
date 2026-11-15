export type CodingAgent = {
  id: string;
  name: string;
  logo: string;
};

export const codingAgents: readonly CodingAgent[] = [
  { id: "claude-code", name: "Claude Code", logo: "/agents/claude-code.svg" },
  { id: "codex", name: "Codex", logo: "/agents/codex.svg" },
  { id: "antigravity", name: "Antigravity", logo: "/agents/antigravity.svg" },
  { id: "opencode", name: "OpenCode", logo: "/agents/opencode.svg" },
];
