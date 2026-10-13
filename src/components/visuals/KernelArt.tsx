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
