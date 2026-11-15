import { HAIRLINE, type Point, roundedRectPath, toPath } from "./geometry";

const LIFT = "translate(0.4 0.6)";
const CONTROLLER = { x: -24, y: -22, size: 8, pins: 4, pinLength: 1 };
const CRYSTAL = { x: 55, y: -24, width: 9, height: 4.4 };
const CAPACITOR = { width: 1.6, depth: 0.9, terminal: 0.35 };
const CAPACITOR_SPOTS: readonly Point[] = [
  [55, -17.4],
  [57.6, -17.4],
  [55, -15.6],
  [57.6, -15.6],
  [-14.2, -26],
  [-14.2, -24.2],
];
const PART_TRACES: readonly (readonly Point[])[] = [
  [
    [-25, -19.3],
    [-30, -19.3],
    [-33, -22.3],
    [-46, -22.3],
  ],
  [
    [-25, -17.3],
    [-34, -17.3],
    [-37, -14.3],
    [-52, -14.3],
  ],
  [
    [-21.3, -23],
    [-21.3, -27],
    [-24.3, -30],
    [-24.3, -40],
  ],
  [
    [-18.7, -23],
    [-18.7, -34],
  ],
  [
    [64, -21.8],
    [70, -21.8],
    [73, -24.8],
    [90, -24.8],
  ],
  [
    [59.5, -24],
    [59.5, -29],
    [62.5, -32],
  ],
];

function pinOffsets() {
  const pitch = CONTROLLER.size / (CONTROLLER.pins + 1);
  return Array.from(
    { length: CONTROLLER.pins },
    (_, index) => pitch * (index + 1),
  );
}

function Controller() {
  const { x, y, size, pinLength } = CONTROLLER;
  const offsets = pinOffsets();
  const pins = offsets.flatMap(
    (offset) =>
      [
        [
          [x + offset, y - pinLength],
          [x + offset, y],
        ],
        [
          [x + offset, y + size],
          [x + offset, y + size + pinLength],
        ],
        [
          [x - pinLength, y + offset],
          [x, y + offset],
        ],
        [
          [x + size, y + offset],
          [x + size + pinLength, y + offset],
        ],
      ] as const,
  );

  return (
    <g strokeWidth={HAIRLINE}>
      <path
        d={pins.map((pin) => toPath(pin)).join("")}
        className="fill-none stroke-white/45"
      />
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        rx={0.4}
        transform={LIFT}
        className="fill-surface stroke-white/25"
      />
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        rx={0.4}
        className="fill-surface stroke-white/55"
      />
      <circle cx={x + 1.2} cy={y + 1.2} r={0.4} className="fill-white/45" />
      <text
        x={x + size / 2}
        y={y + size / 2 + 0.3}
        fontSize={0.9}
        textAnchor="middle"
        letterSpacing={0.1}
        className="fill-white/45 font-mono"
      >
        CRWN
      </text>
    </g>
  );
}

function Crystal() {
  const { x, y, width, height } = CRYSTAL;
  return (
    <g strokeWidth={HAIRLINE}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={height / 2}
        transform={LIFT}
        className="fill-surface stroke-white/25"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={height / 2}
        className="fill-surface stroke-white/55"
      />
      <text
        x={x + width / 2}
        y={y + height / 2 + 0.3}
        fontSize={0.9}
        textAnchor="middle"
        letterSpacing={0.1}
        className="fill-white/45 font-mono"
      >
        25.000
      </text>
    </g>
  );
}

const CAPACITORS = CAPACITOR_SPOTS.map(([x, y]) => {
  const { width, depth, terminal } = CAPACITOR;
  return `${roundedRectPath({ x, y, width, height: depth }, 0.1)}M${x + terminal} ${y}v${depth}M${x + width - terminal} ${y}v${depth}`;
}).join("");

export function BoardParts() {
  return (
    <g>
      <path
        d={PART_TRACES.map((trace) => toPath(trace)).join("")}
        className="fill-none stroke-white/18"
        strokeWidth={HAIRLINE}
      />
      <Controller />
      <Crystal />
      <path
        d={CAPACITORS}
        className="fill-surface stroke-white/45"
        strokeWidth={HAIRLINE * 0.6}
      />
    </g>
  );
}
