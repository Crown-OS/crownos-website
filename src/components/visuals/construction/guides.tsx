import { CROWN_PATH, CROWN_VIEWBOX } from "@/data/brand";

export const FIELD = { width: 520, height: 320 } as const;

const MARK_ARM = 7.5;
const DASH = "6 4";

type Point = readonly [x: number, y: number];

export const STROKE = {
  guide: "fill-none stroke-white/20",
  shape: "fill-none stroke-white/30",
  mark: "fill-none stroke-white/60",
} as const;

export function Verticals({ xs }: { xs: readonly number[] }) {
  return xs.map((x) => (
    <line
      key={x}
      x1={x}
      x2={x}
      y1={0}
      y2={FIELD.height}
      className={STROKE.guide}
      vectorEffect="non-scaling-stroke"
    />
  ));
}

export function DashedRows({ ys }: { ys: readonly number[] }) {
  return ys.map((y) => (
    <line
      key={y}
      x1={0}
      x2={FIELD.width}
      y1={y}
      y2={y}
      strokeDasharray={DASH}
      className={STROKE.guide}
      vectorEffect="non-scaling-stroke"
    />
  ));
}

export function Marks({ at }: { at: readonly Point[] }) {
  return (
    <path
      d={at
        .map(
          ([x, y]) =>
            `M${x - MARK_ARM} ${y}h${MARK_ARM * 2}M${x} ${y - MARK_ARM}v${MARK_ARM * 2}`,
        )
        .join("")}
      className={STROKE.mark}
      vectorEffect="non-scaling-stroke"
    />
  );
}

export function Crown({ center, width }: { center: Point; width: number }) {
  const height = width * (213 / 272);
  return (
    <svg
      aria-hidden="true"
      x={center[0] - width / 2}
      y={center[1] - height / 2}
      width={width}
      height={height}
      viewBox={CROWN_VIEWBOX}
    >
      <path d={CROWN_PATH} className="fill-white/50" />
    </svg>
  );
}
