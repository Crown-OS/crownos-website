import { Cursor02 } from "@untitledui/icons/Cursor02";
import { Hand } from "@untitledui/icons/Hand";
import { LayoutAlt04 } from "@untitledui/icons/LayoutAlt04";
import {
  type AgentCursorHighlightId,
  agentCursorHighlights,
} from "@/data/agent-cursors";

const HIGHLIGHT_ICONS = {
  cursor: Cursor02,
  windows: LayoutAlt04,
  control: Hand,
} satisfies Record<AgentCursorHighlightId, unknown>;

const HIGHLIGHT_TILE_GRADIENTS = {
  cursor: "bg-linear-to-br from-[#8f6dfb] to-[#6d48e8]",
  windows: "bg-linear-to-br from-[#5aa2ff] to-[#2563eb]",
  control: "bg-linear-to-br from-[#4ade80] to-[#16a34a]",
} satisfies Record<AgentCursorHighlightId, string>;

export function AgentCursorHighlights() {
  return (
    <ul className="grid border-white/8 border-t md:grid-cols-3">
      {agentCursorHighlights.map(({ id, title, description }) => {
        const Icon = HIGHLIGHT_ICONS[id];
        return (
          <li
            key={id}
            className="grid content-start gap-3 border-white/8 border-t px-8 py-8 first:border-t-0 md:border-t-0 md:border-l md:py-10 md:first:border-l-0"
          >
            <span
              className={`mb-5 grid size-10 place-items-center rounded-xl text-white ${HIGHLIGHT_TILE_GRADIENTS[id]}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span className="text-2xl leading-[1.15] font-normal tracking-[-0.025em] text-white">
              {title}
            </span>
            <span className="max-w-[22rem] text-[0.9375rem] leading-[1.5] tracking-[-0.011em] text-white/55">
              {description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
