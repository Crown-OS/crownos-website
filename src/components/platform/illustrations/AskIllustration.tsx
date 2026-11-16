import type { CSSProperties } from "react";
import { Typewriter } from "@/components/motion/Typewriter";
import { codingAgents } from "@/data/coding-agents";
import { askPrompts } from "@/data/platform";
import { LineBundle, type LineCurve } from "../LineBundle";

const VIEWBOX = { width: 1000, height: 400 };
const PROMPT_CENTRE = [500, 150] as const;
const BUNDLE_WAIST = 1.5;
const LINES_PER_AGENT = 2;
const AGENT_COLUMN_X = 905;
const AGENT_LINE_END_X = 880;
const AGENT_ROWS_Y = [70, 135, 200, 265] as const;

const incomingCurve: LineCurve = {
  from: [0, 40],
  to: PROMPT_CENTRE,
  controls: [
    [220, 50],
    [330, PROMPT_CENTRE[1]],
  ],
  spreadFrom: 12,
  spreadTo: BUNDLE_WAIST,
  lineCount: LINES_PER_AGENT * AGENT_ROWS_Y.length,
};

const agentCurves: LineCurve[] = AGENT_ROWS_Y.map((rowY, row) => {
  const waistOffset =
    (row * LINES_PER_AGENT -
      (AGENT_ROWS_Y.length * LINES_PER_AGENT - LINES_PER_AGENT) / 2) *
    BUNDLE_WAIST;
  const startY = PROMPT_CENTRE[1] + waistOffset;
  return {
    from: [PROMPT_CENTRE[0], startY],
    to: [AGENT_LINE_END_X, rowY],
    controls: [
      [690, startY],
      [740, rowY],
    ],
    spreadFrom: BUNDLE_WAIST,
    spreadTo: 2,
    lineCount: LINES_PER_AGENT,
  };
});

function toPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

export function AskIllustration() {
  return (
    <>
      <LineBundle curves={[incomingCurve, ...agentCurves]} />
      <div className="absolute top-[37.5%] left-1/2 flex h-14 w-[min(26rem,70%)] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-white/10 bg-[#101012]/55 pr-1.5 pl-7 shadow-[0_1px_0_rgb(255_255_255/0.06)_inset,0_16px_40px_rgb(0_0_0/0.45)] backdrop-blur-xl">
        <span aria-hidden="true" className="beam-rim" />
        <span className="relative z-2 flex min-w-0 grow items-center justify-center gap-3">
          <svg
            aria-hidden="true"
            viewBox="3 1 18 18"
            className="size-6 shrink-0 fill-sweep-sky"
          >
            <path d="M12 2c.6 4.6 2.9 7.4 8 8-5.1.6-7.4 3.4-8 8-.6-4.6-2.9-7.4-8-8 5.1-.6 7.4-3.4 8-8Z" />
          </svg>
          <Typewriter
            phrases={askPrompts}
            className="truncate text-[1.0625rem] tracking-[-0.015em] text-white/80"
          />
        </span>
        <span className="relative z-2 grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[18px]"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
      <ul aria-label="Supported coding agents">
        {codingAgents.map((agent, row) => (
          <li
            key={agent.id}
            className="absolute grid size-11 -translate-1/2 place-items-center rounded-xl bg-white shadow-[0_10px_24px_rgb(0_0_0/0.45)]"
            style={
              {
                left: toPercent(AGENT_COLUMN_X, VIEWBOX.width),
                top: toPercent(AGENT_ROWS_Y[row], VIEWBOX.height),
              } as CSSProperties
            }
          >
            <img
              src={agent.logo}
              alt={agent.name}
              width={24}
              height={24}
              className="size-6"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
