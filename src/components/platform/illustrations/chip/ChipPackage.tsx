import { useId } from "react";
import {
  CHIP_VIEWBOX,
  CORES,
  chipTraces,
  coreBox,
  HOT_CORE,
  PACKAGE_TRANSFORM,
} from "./chipLayout";
import {
  type Box,
  circlePath,
  EDGES,
  HAIRLINE,
  LEAD,
  leadPositions,
  type Point,
  roundedRectPath,
  SIZE,
  toPath,
} from "./geometry";
import { SweepGradient } from "./SweepGradient";

const SPREADER = {
  from: 8,
  to: 32,
  chamfer: 2.2,
  bevel: 0.9,
  lift: { x: 0.6, y: 0.9 },
};
const DIE = { from: 13, to: 27 };
const CACHE = { x: 14, y: 21.4, width: 12, height: 4.6, hatch: 0.8 };
const CAP = { width: 1.6, depth: 0.9, gap: 0.6, terminal: 0.35 };
const CAP_CLUSTERS = [
  [1.6, 1.6],
  [34.6, 1.6],
  [1.6, 35.4],
  [34.6, 35.4],
] as const;
const VIA_RADIUS = 0.3;

function spanBox(from: Point, to: Point): Box {
  return {
    x: Math.min(from[0], to[0]),
    y: Math.min(from[1], to[1]),
    width: Math.abs(to[0] - from[0]),
    height: Math.abs(to[1] - from[1]),
  };
}

function octagon(from: number, to: number, chamfer: number) {
  return `${toPath([
    [from + chamfer, from],
    [to - chamfer, from],
    [to, from + chamfer],
    [to, to - chamfer],
    [to - chamfer, to],
    [from + chamfer, to],
    [from, to - chamfer],
    [from, from + chamfer],
  ])}Z`;
}

const half = LEAD.width / 2;
const leadEdges = EDGES.flatMap((edge) =>
  leadPositions.map((along) => ({ edge, along })),
);
const LEAD_BODIES = leadEdges
  .map(({ edge, along }) =>
    roundedRectPath(
      spanBox(edge(along - half, -LEAD.tuck), edge(along + half, LEAD.length)),
      0.15,
    ),
  )
  .join("");
const LEAD_BENDS = leadEdges
  .map(({ edge, along }) =>
    toPath([edge(along - half, LEAD.bend), edge(along + half, LEAD.bend)]),
  )
  .join("");

const IDLE_TRACES = chipTraces
  .filter(({ flowing }) => !flowing)
  .map(({ path }) => path)
  .join("");
const TRACE_VIAS = chipTraces
  .map(({ via }) => circlePath(via, VIA_RADIUS))
  .join("");

const CAPACITORS = CAP_CLUSTERS.flatMap(([x, y]) =>
  [0, 1].flatMap((column) =>
    [0, 1].map((row) => {
      const left = x + column * (CAP.width + CAP.gap);
      const top = y + row * (CAP.depth + CAP.gap);
      return `${roundedRectPath({ x: left, y: top, width: CAP.width, height: CAP.depth }, 0.1)}M${left + CAP.terminal} ${top}v${CAP.depth}M${left + CAP.width - CAP.terminal} ${top}v${CAP.depth}`;
    }),
  ),
).join("");

const IDLE_CORES = Array.from(
  { length: CORES.columns * CORES.rows },
  (_, index) => index,
)
  .filter((index) => index !== HOT_CORE)
  .map((index) => roundedRectPath(coreBox(index), 0.2))
  .join("");

const CACHE_HATCHES = Array.from(
  { length: Math.floor(CACHE.width / CACHE.hatch) - 1 },
  (_, index) => CACHE.x + (index + 1) * CACHE.hatch,
)
  .map(
    (x) =>
      `M${x} ${CACHE.y + CORES.inset}V${CACHE.y + CACHE.height - CORES.inset}`,
  )
  .join("");

const MARKINGS = [
  { text: "CACHYOS", x: SIZE / 2, y: 29.6, size: 1.9 },
  { text: "LINUX-CACHYOS · 1000 HZ", x: SIZE / 2, y: 31, size: 0.8 },
  { text: "THINLTO · AUTOFDO · PROPELLER", x: SIZE / 2, y: 12.2, size: 0.8 },
  { text: "X86-64-V3 · ZEN 4", x: 11.6, y: SIZE / 2, size: 0.8, rotate: -90 },
] as const;

function HeatSpreader({ sweep }: { sweep: string }) {
  const { from, to, chamfer, bevel, lift } = SPREADER;
  const outline = octagon(from, to, chamfer);
  return (
    <g strokeWidth={0.3}>
      <path
        d={outline}
        transform={`translate(${lift.x} ${lift.y})`}
        className="fill-surface stroke-white/30"
      />
      <path d={outline} className="fill-surface" stroke={sweep} />
      <path
        d={octagon(from + bevel, to - bevel, chamfer - bevel / 2)}
        className="fill-none stroke-white/20"
        strokeWidth={HAIRLINE}
      />
    </g>
  );
}

function Die({ sweep }: { sweep: string }) {
  return (
    <g className="fill-none" strokeWidth={0.18}>
      <rect
        x={DIE.from}
        y={DIE.from}
        width={DIE.to - DIE.from}
        height={DIE.to - DIE.from}
        className="stroke-white/35"
        strokeDasharray="0.5 0.6"
      />
      <path d={IDLE_CORES} className="stroke-white/50" />
      <rect
        x={CACHE.x}
        y={CACHE.y}
        width={CACHE.width}
        height={CACHE.height}
        className="stroke-white/50"
      />
      <path d={CACHE_HATCHES} className="stroke-white/18" strokeWidth={0.12} />
      <path d="M9.6 9.6H12.2L9.6 12.2Z" fill={sweep} stroke="none" />
    </g>
  );
}

function Markings() {
  return (
    <g className="fill-white/55 font-mono" textAnchor="middle">
      {MARKINGS.map(({ text, x, y, size, ...rest }) => (
        <text
          key={text}
          x={x}
          y={y}
          fontSize={size}
          letterSpacing={size * 0.12}
          transform={
            "rotate" in rest ? `rotate(${rest.rotate} ${x} ${y})` : undefined
          }
        >
          {text}
        </text>
      ))}
    </g>
  );
}

export function ChipPackage() {
  const gradientId = useId();
  const sweep = `url(#${gradientId})`;
  return (
    <svg
      viewBox={CHIP_VIEWBOX}
      role="img"
      aria-label="A CachyOS-tuned processor seen face on, with cores, cache and traces"
      className="block size-full select-none"
    >
      <g transform={PACKAGE_TRANSFORM}>
        <defs>
          <SweepGradient id={gradientId} from={[0, 0]} to={[SIZE, SIZE]} />
        </defs>
        <g strokeWidth={HAIRLINE}>
          <path d={LEAD_BODIES} className="fill-surface stroke-white/55" />
          <path d={LEAD_BENDS} className="fill-none stroke-white/30" />
        </g>
        <rect
          width={SIZE}
          height={SIZE}
          rx={1.2}
          className="fill-surface"
          stroke={sweep}
          strokeWidth={0.3}
        />
        <rect
          x={0.7}
          y={0.7}
          width={SIZE - 1.4}
          height={SIZE - 1.4}
          rx={0.8}
          className="fill-none stroke-white/12"
          strokeWidth={0.2}
        />
        <g className="fill-none">
          <path
            d={IDLE_TRACES}
            className="stroke-white/20"
            strokeWidth={0.18}
          />
          <path d={TRACE_VIAS} className="stroke-white/35" strokeWidth={0.15} />
          <path d={CAPACITORS} className="stroke-white/45" strokeWidth={0.15} />
        </g>
        <HeatSpreader sweep={sweep} />
        <Die sweep={sweep} />
        <Markings />
      </g>
    </svg>
  );
}
