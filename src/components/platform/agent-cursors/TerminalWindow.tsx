import { terminalSession } from "@/data/agent-cursors";
import { AgentCursor } from "./AgentCursor";
import { CrownWindow } from "./CrownWindow";
import { CURSORS, WINDOW_PLACEMENTS } from "./layout";
import { motionTrack } from "./motionTrack";

export function TerminalWindow() {
  const { prompt, command, resolving, done } = terminalSession;
  return (
    <CrownWindow
      placement={WINDOW_PLACEMENTS.terminal}
      toolbar={
        <span className="flex items-center gap-2 px-1.5 text-sm">
          <span className="font-semibold text-(--cu-primary)">Terminal</span>
          <span className="text-(--cu-muted)">~/crownos</span>
        </span>
      }
      cursor={<AgentCursor identity={CURSORS.claude} rest={[320, 160]} />}
    >
      <div className="grid content-start gap-2 p-4 font-mono text-xs text-(--cu-muted)">
        <span>
          <span className="text-(--cu-accent-start)">{prompt}</span>{" "}
          <span
            className="agent-motion inline-block text-(--cu-primary)"
            style={motionTrack("agent-terminal-command")}
          >
            {command}
          </span>
        </span>
        <span
          className="agent-motion"
          style={motionTrack("agent-terminal-resolving")}
        >
          {resolving}
        </span>
        <span
          className="agent-motion flex items-center gap-3"
          style={motionTrack("agent-terminal-download")}
        >
          obs-studio
          <span className="h-2 w-36 overflow-hidden rounded-full bg-(--cu-track)">
            <span
              className="agent-motion block size-full origin-left rounded-full bg-(image:--cu-accent)"
              style={motionTrack("agent-terminal-progress")}
            />
          </span>
        </span>
        <span
          className="agent-motion text-(--cu-body)"
          style={motionTrack("agent-terminal-done")}
        >
          <span className="text-(--cu-success)">✓</span> {done}
        </span>
        <span
          className="agent-motion"
          style={motionTrack("agent-terminal-done")}
        >
          <span className="text-(--cu-accent-start)">{prompt}</span>{" "}
          <span className="inline-block h-[1.1em] w-[0.6em] animate-[caret-blink_1s_steps(1)_infinite] bg-(--cu-body) motion-reduce:animate-none align-[-0.2em]" />
        </span>
      </div>
    </CrownWindow>
  );
}
