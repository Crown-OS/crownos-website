import { DashedRows, Marks, STROKE, Verticals } from "./guides";

const TILE = 96;
const TOP = 112;
const BOTTOM = TOP + TILE;
const LEFTS = [160, 280, 400] as const;
const RAY_COUNT = 16;
const RAY_LENGTH = 140;
const SUN_HOLE = { dx: 30, dy: 60, radius: 7 } as const;
const QUARTER = { size: 45, gap: 6, radius: 14 } as const;
const GRID_SPANS = [
  [0, 15],
  [21, 75],
  [81, 96],
] as const;

function Segment(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
}) {
  return (
    <rect
      {...props}
      className={STROKE.shape}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function Sunburst({ left }: { left: number }) {
  const cx = left + SUN_HOLE.dx;
  const cy = TOP + SUN_HOLE.dy;
  const rays = Array.from({ length: RAY_COUNT }, (_, index) => {
    const angle = (index / RAY_COUNT) * Math.PI * 2;
    const reach = (distance: number) =>
      `${(cx + Math.cos(angle) * distance).toFixed(2)} ${(cy + Math.sin(angle) * distance).toFixed(2)}`;
    return `M${reach(SUN_HOLE.radius)}L${reach(RAY_LENGTH)}`;
  }).join("");
  return (
    <>
      <clipPath id="sunburst-clip">
        <rect x={left} y={TOP} width={TILE} height={TILE} rx={8} />
      </clipPath>
      <Segment x={left} y={TOP} width={TILE} height={TILE} rx={8} />
      <g clipPath="url(#sunburst-clip)">
        <path
          d={rays}
          className={STROKE.shape}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={cx}
          cy={cy}
          r={SUN_HOLE.radius}
          className={STROKE.shape}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </>
  );
}

function Quarters({ left }: { left: number }) {
  const offsets = [0, QUARTER.size + QUARTER.gap];
  return offsets.flatMap((dy) =>
    offsets.map((dx) => (
      <Segment
        key={`${dx}-${dy}`}
        x={left + dx}
        y={TOP + dy}
        width={QUARTER.size}
        height={QUARTER.size}
        rx={QUARTER.radius}
      />
    )),
  );
}

function FramedGrid({ left }: { left: number }) {
  return GRID_SPANS.flatMap(([y0, y1]) =>
    GRID_SPANS.map(([x0, x1]) => (
      <Segment
        key={`${x0}-${y0}`}
        x={left + x0}
        y={TOP + y0}
        width={x1 - x0}
        height={y1 - y0}
        rx={4}
      />
    )),
  );
}

export function TilePattern() {
  const [sun, quarters, grid] = LEFTS;
  return (
    <>
      <Verticals xs={[sun, grid + TILE]} />
      <DashedRows ys={[TOP, BOTTOM]} />
      <Sunburst left={sun} />
      <Quarters left={quarters} />
      <FramedGrid left={grid} />
      <Marks
        at={[
          [sun, TOP],
          [grid + TILE, BOTTOM],
        ]}
      />
    </>
  );
}
