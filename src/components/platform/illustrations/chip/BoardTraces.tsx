import { useId } from "react";
import { BoardParts } from "./BoardParts";
import { BoardPulses } from "./BoardPulses";
import { boardTracePath, boardTraces } from "./boardLayout";
import {
  CENTER,
  circlePath,
  HAIRLINE,
  type Point,
  roundedRectPath,
} from "./geometry";

const BOARD = { width: 300, height: 225 };
const BOARD_ORIGIN = {
  x: CENTER - BOARD.width / 2,
  y: CENTER - BOARD.height / 2,
};
const BOARD_RECT = { ...BOARD_ORIGIN, ...BOARD };
const BOARD_VIEWBOX = `${BOARD_ORIGIN.x} ${BOARD_ORIGIN.y} ${BOARD.width} ${BOARD.height}`;
const SWEEP_FROM: Point = [BOARD_ORIGIN.x + BOARD.width * 0.3, 0];
const SWEEP_TO: Point = [BOARD_ORIGIN.x + BOARD.width * 0.7, 0];
const HEAT_RADIUS = 46;
const DOT_PITCH = 3;
const PAD = { via: 0.6, drill: 0.22, land: 1.3 };

const viaEnds = boardTraces.filter(({ pad }) => pad === "via");
const PAD_OUTLINES = [
  ...viaEnds.map(({ end }) => circlePath(end, PAD.via)),
  ...boardTraces
    .filter(({ pad }) => pad === "land")
    .map(({ end: [x, y] }) =>
      roundedRectPath(
        {
          x: x - PAD.land / 2,
          y: y - PAD.land / 2,
          width: PAD.land,
          height: PAD.land,
        },
        0.2,
      ),
    ),
].join("");
const PAD_DRILLS = viaEnds
  .map(({ end }) => circlePath(end, PAD.drill))
  .join("");

function BoardArt() {
  const id = useId();
  const dotsId = `${id}-dots`;
  const heatId = `${id}-heat`;
  const heatMaskId = `${id}-heat-mask`;
  return (
    <svg
      aria-hidden="true"
      viewBox={BOARD_VIEWBOX}
      className="absolute inset-0 size-full"
    >
      <defs>
        <pattern
          id={dotsId}
          width={DOT_PITCH}
          height={DOT_PITCH}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={DOT_PITCH / 2} cy={DOT_PITCH / 2} r={0.14} fill="white" />
        </pattern>
        <radialGradient
          id={heatId}
          gradientUnits="userSpaceOnUse"
          cx={CENTER}
          cy={CENTER}
          r={HEAT_RADIUS}
        >
          <stop offset={0.4} stopColor="white" />
          <stop offset={0.6} stopColor="white" stopOpacity={0.35} />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </radialGradient>
        <mask id={heatMaskId} maskUnits="userSpaceOnUse" {...BOARD_RECT}>
          <rect {...BOARD_RECT} fill={`url(#${heatId})`} />
        </mask>
      </defs>
      <rect {...BOARD_RECT} fill={`url(#${dotsId})`} opacity={0.1} />
      <BoardParts />
      <path
        d={boardTracePath}
        className="fill-none stroke-white/22"
        strokeWidth={HAIRLINE}
      />
      <g
        mask={`url(#${heatMaskId})`}
        className="fill-none"
        strokeLinejoin="round"
      >
        <path d={boardTracePath} className="stroke-white/8" strokeWidth={1.4} />
        <path
          d={boardTracePath}
          className="stroke-white/70"
          strokeWidth={0.3}
        />
      </g>
      <g strokeWidth={HAIRLINE}>
        <path d={PAD_OUTLINES} className="fill-surface stroke-white/50" />
        <path d={PAD_DRILLS} className="fill-white/45 stroke-white/50" />
      </g>
    </svg>
  );
}

export function BoardTraces() {
  return (
    <div
      aria-hidden="true"
      className="board-trace-mask pointer-events-none absolute top-[44%] left-1/2 h-[900px] w-[1200px] max-w-none -translate-1/2 select-none"
    >
      <BoardArt />
      <BoardPulses
        viewBox={BOARD_VIEWBOX}
        sweepFrom={SWEEP_FROM}
        sweepTo={SWEEP_TO}
      />
    </div>
  );
}
