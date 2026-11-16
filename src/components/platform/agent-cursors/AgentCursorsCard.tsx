import { agentCursorsCopy } from "@/data/agent-cursors";
import { PlatformCardShell } from "../PlatformCardShell";
import { AgentCursorHighlights } from "./AgentCursorHighlights";
import { AgentDesktop } from "./AgentDesktop";
import { RibbonWaves } from "./RibbonWaves";

export function AgentCursorsCard() {
  const { title, subline } = agentCursorsCopy;
  return (
    <PlatformCardShell className="platform-card relative overflow-hidden rounded-[2rem] border border-white/8 bg-surface md:col-span-3">
      <div className="relative">
        <RibbonWaves />
        <h3 className="relative max-w-[46rem] px-8 pt-10 text-[1.75rem] leading-[1.15] font-medium tracking-[-0.025em] text-white md:pt-12 md:text-[2rem]">
          <span className="relative block before:absolute before:top-[0.18em] before:-left-8 before:h-[0.9em] before:w-0.5 before:bg-sweep-sky">
            {title}
          </span>
          <span className="block text-muted">{subline}</span>
        </h3>
        <div className="relative px-4 py-6 md:px-0">
          <AgentDesktop />
        </div>
      </div>
      <AgentCursorHighlights />
    </PlatformCardShell>
  );
}
