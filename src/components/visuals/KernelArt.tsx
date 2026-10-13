import { VisualSvg } from "./primitives";

const LINE = "fill-none stroke-white/80";
const HIDDEN_LINE = "fill-none stroke-white/30";
const DASH = "3 4";

const TRACK = { start: 24, end: 216 };
const TICK_STEP = 12;
const LANE = { top: 72, step: 40, height: 22 };
const FOREGROUND_SLICE = { width: 18, step: 32 };
const BACKGROUND_SLICES = [
  [
    [44, 92],
    [124, 172],
  ],
  [
    [92, 140],
    [172, 216],
  ],
  [
    [24, 60],
    [140, 188],
  ],
];

export function SchedulerLanes() {
  const ticks = Array.from(
    { length: (TRACK.end - TRACK.start) / TICK_STEP + 1 },
    (_, index) => TRACK.start + index * TICK_STEP,
  );
  const foreground = Array.from(
    { length: 6 },
    (_, index) => TRACK.start + index * FOREGROUND_SLICE.step,
  );

  return (
    <VisualSvg
      viewBox="0 0 240 240"
      label="CPU time slices with the foreground task scheduled first"
    >
      <path
        d={ticks.map((x) => `M${x} 36v${x % 48 === 24 ? 10 : 5}`).join("")}
        className={HIDDEN_LINE}
      />
      {[0, 1, 2, 3].map((lane) => (
        <path
          key={lane}
          d={`M${TRACK.start} ${LANE.top + lane * LANE.step + LANE.height}H${TRACK.end}`}
          className="stroke-white/12"
        />
      ))}
      <g className="layer-drift">
        {foreground.map((x) => (
          <rect
            key={x}
            x={x}
            y={LANE.top}
            width={FOREGROUND_SLICE.width}
            height={LANE.height}
            rx={3}
            className={LINE}
          />
        ))}
      </g>
      {BACKGROUND_SLICES.map((slices, lane) =>
        slices.map(([from, to]) => (
          <rect
            key={`${lane}-${from}`}
            x={from}
            y={LANE.top + (lane + 1) * LANE.step}
            width={to - from}
            height={LANE.height}
            rx={3}
            className={HIDDEN_LINE}
            strokeDasharray={DASH}
          />
        )),
      )}
    </VisualSvg>
  );
}

const DIE = { origin: 60, size: 120 };
const PIN = { count: 6, step: 18, offset: 75, length: 14 };
const CORE = { origin: 90, cell: 16, gap: 6, count: 3 };

function pinPath() {
  const { origin, size } = DIE;
  const far = origin + size;
  return Array.from({ length: PIN.count }, (_, index) => {
    const along = PIN.offset + index * PIN.step;
    return [
      `M${along} ${origin}v${-PIN.length}`,
      `M${along} ${far}v${PIN.length}`,
      `M${origin} ${along}h${-PIN.length}`,
      `M${far} ${along}h${PIN.length}`,
    ].join("");
  }).join("");
}

export function CompilerDie() {
  const cells = Array.from({ length: CORE.count ** 2 }, (_, index) => ({
    x: CORE.origin + (index % CORE.count) * (CORE.cell + CORE.gap),
    y: CORE.origin + Math.floor(index / CORE.count) * (CORE.cell + CORE.gap),
    hot: index === Math.floor(CORE.count ** 2 / 2),
  }));

  return (
    <VisualSvg
      viewBox="0 0 240 240"
      label="A processor die with an optimised hot path at its core"
    >
      <path d={pinPath()} className={HIDDEN_LINE} />
      <rect
        x={DIE.origin}
        y={DIE.origin}
        width={DIE.size}
        height={DIE.size}
        rx={10}
        className={LINE}
      />
      <rect
        x={84}
        y={84}
        width={72}
        height={72}
        rx={4}
        className={HIDDEN_LINE}
        strokeDasharray={DASH}
      />
      {cells.map(({ x, y, hot }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={CORE.cell}
          height={CORE.cell}
          rx={2}
          className={hot ? "fill-white/80 stroke-white/80" : LINE}
        />
      ))}
    </VisualSvg>
  );
}

const PAGE = { origin: 34, cell: 22, gap: 8, count: 6 };
const WORKING_SET = { from: 1, to: 4 };

const isWorkingSet = (column: number, row: number) => {
  const inside = (value: number) =>
    value >= WORKING_SET.from && value <= WORKING_SET.to;
  const corner =
    (column === WORKING_SET.from || column === WORKING_SET.to) &&
    (row === WORKING_SET.from || row === WORKING_SET.to);
  return inside(column) && inside(row) && !corner;
};

export function MemoryPages() {
  const pitch = PAGE.cell + PAGE.gap;
  const guard = PAGE.origin + WORKING_SET.from * pitch - PAGE.gap / 2;
  const guardSize = (WORKING_SET.to - WORKING_SET.from + 1) * pitch;

  return (
    <VisualSvg
      viewBox="0 0 240 240"
      label="Memory pages with the active working set protected"
    >
      <rect
        x={guard}
        y={guard}
        width={guardSize}
        height={guardSize}
        rx={14}
        className={`${HIDDEN_LINE} layer-drift`}
        strokeDasharray={DASH}
      />
      {Array.from({ length: PAGE.count ** 2 }, (_, index) => {
        const column = index % PAGE.count;
        const row = Math.floor(index / PAGE.count);
        const active = isWorkingSet(column, row);
        return (
          <rect
            key={`${column}-${row}`}
            x={PAGE.origin + column * pitch}
            y={PAGE.origin + row * pitch}
            width={PAGE.cell}
            height={PAGE.cell}
            rx={3}
            className={active ? LINE : "fill-none stroke-white/12"}
          />
        );
      })}
    </VisualSvg>
  );
}
