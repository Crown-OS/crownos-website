import { VisualSvg } from "./primitives";

const UNIT_SCALE = 4;
const PACKAGE_OFFSET = 40;
const HAIRLINE = 1 / UNIT_SCALE;

const SIZE = 40;
const LEAD = {
  first: 7,
  count: 10,
  step: 2.9,
  width: 1,
  length: 3.4,
  bend: 1.6,
  tuck: 0.3,
};
const TRACE = { via: 0.9, run: 3.2, end: 5.6, converge: 0.18, flowEvery: 3 };
const SPREADER = {
  from: 8,
  to: 32,
  chamfer: 2.2,
  bevel: 0.9,
  lift: { x: 0.6, y: 0.9 },
};
const DIE = { from: 13, to: 27 };
const CORES = {
  x: 14,
  y: 14,
  width: 12,
  height: 6.6,
  columns: 4,
  rows: 2,
  inset: 0.25,
};
const CACHE = { x: 14, y: 21.4, width: 12, height: 4.6, hatch: 0.8 };
const CAP = { width: 1.6, depth: 0.9, gap: 0.6, terminal: 0.35 };
const CAP_CLUSTERS = [
  [1.6, 1.6],
  [34.6, 1.6],
  [1.6, 35.4],
  [34.6, 35.4],
] as const;
const HOT_CORE = 5;
const SOCKET_MARGIN = 4.6;

type Point = readonly [number, number];
type Edge = (along: number, outward: number) => Point;

const EDGES: readonly Edge[] = [
  (along, outward) => [along, -outward],
  (along, outward) => [-outward, along],
  (along, outward) => [along, SIZE + outward],
  (along, outward) => [SIZE + outward, along],
];

const leadPositions = Array.from(
  { length: LEAD.count },
  (_, index) => LEAD.first + index * LEAD.step,
);

const toPath = (points: readonly Point[]) =>
  `M${points.map(([x, y]) => `${x} ${y}`).join("L")}`;

function spanRect(from: Point, to: Point) {
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

function Leads() {
  const half = LEAD.width / 2;
  return (
    <g className="fill-background stroke-white/55" strokeWidth={HAIRLINE}>
      {EDGES.flatMap((edge) =>
        leadPositions.map((along) => {
          const bendFrom = edge(along - half, LEAD.bend);
          const bendTo = edge(along + half, LEAD.bend);
          return (
            <g key={edge(along, 0).join("-")}>
              <rect
                {...spanRect(
                  edge(along - half, -LEAD.tuck),
                  edge(along + half, LEAD.length),
                )}
                rx={0.15}
              />
              <path
                d={toPath([bendFrom, bendTo])}
                className="stroke-white/30"
              />
            </g>
          );
        }),
      )}
    </g>
  );
}

function Traces() {
  const { via, run, end, converge, flowEvery } = TRACE;
  const center = SIZE / 2;
  const traces = EDGES.flatMap((edge) =>
    leadPositions.map((along, index) => ({
      key: edge(along, 0).join("-"),
      via: edge(along, -via),
      path: toPath([
        edge(along, -via),
        edge(along, -run),
        edge(along + (center - along) * converge, -end),
      ]),
      flowing: index % flowEvery === 1,
    })),
  );

  return (
    <g className="fill-none">
      {traces.map(({ key, path, flowing }) => (
        <path
          key={key}
          d={path}
          className={flowing ? "link-flow stroke-white/50" : "stroke-white/20"}
          strokeDasharray={flowing ? "0.75 1.5" : undefined}
          strokeWidth={0.18}
        />
      ))}
      {traces.map(({ key, via: [cx, cy] }) => (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={0.3}
          className="stroke-white/35"
          strokeWidth={0.15}
        />
      ))}
    </g>
  );
}

function Capacitors() {
  const capacitors = CAP_CLUSTERS.flatMap(([x, y]) =>
    [0, 1].flatMap((column) =>
      [0, 1].map((row) => ({
        x: x + column * (CAP.width + CAP.gap),
        y: y + row * (CAP.depth + CAP.gap),
      })),
    ),
  );

  return (
    <g className="fill-none stroke-white/45" strokeWidth={0.15}>
      {capacitors.map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={CAP.width} height={CAP.depth} rx={0.1} />
          <path
            d={`M${x + CAP.terminal} ${y}v${CAP.depth}M${x + CAP.width - CAP.terminal} ${y}v${CAP.depth}`}
          />
        </g>
      ))}
    </g>
  );
}

function HeatSpreader() {
  const { from, to, chamfer, bevel, lift } = SPREADER;
  const outline = octagon(from, to, chamfer);
  return (
    <g strokeWidth={0.3}>
      <path
        d={outline}
        transform={`translate(${lift.x} ${lift.y})`}
        className="fill-background stroke-white/30"
      />
      <path d={outline} className="fill-background stroke-white/80" />
      <path
        d={octagon(from + bevel, to - bevel, chamfer - bevel / 2)}
        className="fill-none stroke-white/20"
        strokeWidth={HAIRLINE}
      />
    </g>
  );
}

function Die() {
  const coreWidth = CORES.width / CORES.columns;
  const coreHeight = CORES.height / CORES.rows;
  const { inset } = CORES;
  const hatches = Array.from(
    { length: Math.floor(CACHE.width / CACHE.hatch) - 1 },
    (_, index) => CACHE.x + (index + 1) * CACHE.hatch,
  );

  return (
    <g strokeWidth={0.18}>
      <rect
        x={DIE.from}
        y={DIE.from}
        width={DIE.to - DIE.from}
        height={DIE.to - DIE.from}
        className="fill-none stroke-white/35"
        strokeDasharray="0.5 0.6"
      />
      {Array.from({ length: CORES.columns * CORES.rows }, (_, index) => {
        const column = index % CORES.columns;
        const row = Math.floor(index / CORES.columns);
        return (
          <rect
            key={`${column}-${row}`}
            x={CORES.x + column * coreWidth + inset}
            y={CORES.y + row * coreHeight + inset}
            width={coreWidth - inset * 2}
            height={coreHeight - inset * 2}
            rx={0.2}
            className={
              index === HOT_CORE
                ? "pulse-dot fill-white/80 stroke-white/80"
                : "fill-none stroke-white/50"
            }
          />
        );
      })}
      <rect
        x={CACHE.x}
        y={CACHE.y}
        width={CACHE.width}
        height={CACHE.height}
        className="fill-none stroke-white/50"
      />
      <path
        d={hatches
          .map(
            (x) => `M${x} ${CACHE.y + inset}V${CACHE.y + CACHE.height - inset}`,
          )
          .join("")}
        className="fill-none stroke-white/18"
        strokeWidth={0.12}
      />
      <path d="M9.6 9.6H12.2L9.6 12.2Z" className="fill-white/60" />
    </g>
  );
}

const MARKINGS = [
  { text: "CACHYOS", x: 13, y: 29.6, size: 1.9 },
  { text: "LINUX-CACHYOS · 1000 HZ", x: 13, y: 31, size: 0.8 },
  { text: "THINLTO · AUTOFDO · PROPELLER", x: 13, y: 12.2, size: 0.8 },
  { text: "X86-64-V3 · ZEN 4", x: 11.6, y: 27, size: 0.8, rotate: -90 },
] as const;

function Markings() {
  return (
    <g className="fill-white/55 font-mono">
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

export function ProcessorChip() {
  return (
    <VisualSvg
      viewBox="0 0 240 240"
      label="A CachyOS-tuned processor seen face on, with cores, cache and traces"
    >
      <g
        transform={`translate(${PACKAGE_OFFSET} ${PACKAGE_OFFSET}) scale(${UNIT_SCALE})`}
      >
        <rect
          x={-SOCKET_MARGIN}
          y={-SOCKET_MARGIN}
          width={SIZE + SOCKET_MARGIN * 2}
          height={SIZE + SOCKET_MARGIN * 2}
          rx={1.5}
          className="fill-none stroke-white/12"
          strokeWidth={HAIRLINE}
          strokeDasharray="0.75 1"
        />
        <Leads />
        <rect
          width={SIZE}
          height={SIZE}
          rx={1.2}
          className="fill-background stroke-white/80"
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
        <Traces />
        <Capacitors />
        <HeatSpreader />
        <Die />
        <Markings />
      </g>
    </VisualSvg>
  );
}
