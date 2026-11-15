import { circlePath } from "../chip/geometry";
import { HAIRLINE, ISO_MATRIX } from "./isometric";
import { FLOOR_CENTER, SATELLITE, SATELLITE_FLOOR_POSITIONS } from "./layout";

type Point = readonly [x: number, y: number];

const DOT_PITCH = 8;
const FLOOR_RADIUS = 210;
const PAD = { radius: 1.8, drill: 0.7 };
const TRACE_LATERALS = [-36, -24, -12, 0, 12, 24, 36];
const FREE_TRACE_LENGTHS = [168, 104, 140, 92, 156, 118, 176];
const FLOW_EVERY = 3;
const SATELLITE_CLEARANCE = 2;
const SATELLITE_CAPTURE = SATELLITE.side / 2 - 4;

const DIRECTIONS: readonly Point[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const dot = (a: Point, b: Point) => a[0] * b[0] + a[1] * b[1];

function traceEnd(direction: Point, lateral: Point, offset: number) {
  const satellite = SATELLITE_FLOOR_POSITIONS.find(
    (position) =>
      dot(position, direction) > 0 &&
      Math.abs(dot(position, lateral) - offset) < SATELLITE_CAPTURE,
  );
  return satellite
    ? {
        reach:
          dot(satellite, direction) - SATELLITE.side / 2 - SATELLITE_CLEARANCE,
        toSatellite: true,
      }
    : { reach: 0, toSatellite: false };
}

const TRACES = DIRECTIONS.flatMap((direction) => {
  const lateral: Point = [direction[1], direction[0]];
  return TRACE_LATERALS.map((offset, index) => {
    const { reach, toSatellite } = traceEnd(direction, lateral, offset);
    const length = toSatellite ? reach : FREE_TRACE_LENGTHS[index];
    const at = (distance: number): Point => [
      direction[0] * distance + lateral[0] * offset,
      direction[1] * distance + lateral[1] * offset,
    ];
    const end = at(length);
    const start = at(0);
    return {
      key: `${direction.join()}:${offset}`,
      end,
      path: `M${end[0]} ${end[1]}L${start[0]} ${start[1]}`,
      flowing: toSatellite || index % FLOW_EVERY === 1,
    };
  });
});

const IDLE_TRACES = TRACES.map(({ path }) => path).join("");
const PAD_RINGS = TRACES.map(({ end }) => circlePath(end, PAD.radius)).join("");
const PAD_DRILLS = TRACES.map(({ end }) => circlePath(end, PAD.drill)).join("");

type FloorTracesProps = { idPrefix: string; sweep: string };

export function FloorTraces({ idPrefix, sweep }: FloorTracesProps) {
  const dotsId = `${idPrefix}-floor-dots`;
  const fadeId = `${idPrefix}-floor-fade`;
  const maskId = `${idPrefix}-floor-mask`;
  const floor = {
    x: -FLOOR_RADIUS,
    y: -FLOOR_RADIUS,
    width: 2 * FLOOR_RADIUS,
    height: 2 * FLOOR_RADIUS,
  };
  return (
    <g
      transform={`translate(${FLOOR_CENTER[0]} ${FLOOR_CENTER[1]}) ${ISO_MATRIX}`}
    >
      <defs>
        <pattern
          id={dotsId}
          width={DOT_PITCH}
          height={DOT_PITCH}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={DOT_PITCH / 2} cy={DOT_PITCH / 2} r={0.55} fill="white" />
        </pattern>
        <radialGradient
          id={fadeId}
          gradientUnits="userSpaceOnUse"
          cx={0}
          cy={0}
          r={FLOOR_RADIUS}
        >
          <stop offset={0.25} stopColor="white" />
          <stop offset={0.6} stopColor="white" stopOpacity={0.4} />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </radialGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" {...floor}>
          <rect {...floor} fill={`url(#${fadeId})`} />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <rect {...floor} fill={`url(#${dotsId})`} opacity={0.14} />
        <path
          d={IDLE_TRACES}
          className="fill-none stroke-white/30"
          {...HAIRLINE}
        />
        <g className="fill-none" stroke={sweep} strokeWidth={1.25}>
          {TRACES.filter(({ flowing }) => flowing).map(({ key, path }) => (
            <path
              key={key}
              d={path}
              vectorEffect="non-scaling-stroke"
              strokeDasharray="3 6"
              className="animate-[chip-trace-flow_1.6s_linear_infinite] motion-reduce:animate-none"
            />
          ))}
        </g>
        <path
          d={PAD_RINGS}
          className="fill-surface stroke-white/50"
          {...HAIRLINE}
        />
        <path d={PAD_DRILLS} className="fill-white/45" />
      </g>
    </g>
  );
}
