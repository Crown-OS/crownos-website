import { EDITOR_COLOR } from "./theme";

const ICON_PATHS = {
  panelLeft: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M9 3v18",
  ],
  panelBottom: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M3 15h18",
  ],
  panelRight: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M15 3v18",
  ],
  chevronDown: ["m6 9 6 6 6-6"],
  branch: [
    "M6 3v12",
    "M18 9a9 9 0 0 1-9 9",
    "M21 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    "M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  ],
  broadcastOff: [
    "M4.9 19.1C1 15.2 1 8.8 4.9 4.9",
    "M7.8 16.2a6 6 0 0 1 0-8.4",
    "M16.2 7.8a6 6 0 0 1 0 8.4",
    "M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2",
    "M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
    "M3 21 21 3",
  ],
  play: ["M6 3l14 9-14 9V3Z"],
  search: ["M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z", "m21 21-4.3-4.3"],
  bell: [
    "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
    "M10.3 21a1.94 1.94 0 0 0 3.4 0",
  ],
  folder: [
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  ],
  history: [
    "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
    "M3 3v5h5",
    "M12 7v5l4 2",
  ],
  chevronRight: ["m9 6 6 6-6 6"],
  close: ["M18 6 6 18", "m6 6 12 12"],
} as const;

const GRID_DOTS = [5, 12, 19].flatMap((x) =>
  [5, 12, 19].map((y) => ({ x, y })),
);

export type IconName = keyof typeof ICON_PATHS | "grid";

const ICON_BOX = 24;

export function EditorIcon({
  name,
  x,
  y,
  size = 16,
  color = EDITOR_COLOR.text,
}: {
  name: IconName;
  x: number;
  y: number;
  size?: number;
  color?: string;
}) {
  const scale = size / ICON_BOX;
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${scale})`}
      fill="none"
      stroke={color}
      strokeWidth={1.3 / scale}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "grid"
        ? GRID_DOTS.map((dot) => (
            <circle
              key={`${dot.x}-${dot.y}`}
              cx={dot.x}
              cy={dot.y}
              r={1.1}
              fill={color}
              stroke="none"
            />
          ))
        : ICON_PATHS[name].map((path) => <path key={path} d={path} />)}
    </g>
  );
}

export function RonGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g
      fill="none"
      stroke={EDITOR_COLOR.fileGlyph}
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d={`M${x - 1.5} ${y - 5.5}q-3.5 5.5 0 11`} />
      <path d={`M${x + 1.5} ${y - 5.5}q3.5 5.5 0 11`} />
    </g>
  );
}

export function MousePointer({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y}v15.5l3.9-3.6 2.6 5.8 2.3-1-2.6-5.7h5.3Z`}
      fill={EDITOR_COLOR.surface}
      stroke={EDITOR_COLOR.text}
      strokeWidth={1}
      strokeLinejoin="round"
    />
  );
}
