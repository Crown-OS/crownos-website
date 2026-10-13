import { useId } from "react";
import { settingsWindow, type Wallpaper } from "@/data/settings-window";
import { ROW, SETTINGS_COLOR } from "./theme";

const COLUMNS = 4;
const CELL_HEIGHT = 33;
const CELL_GAP = 4;
const RING = { width: 2, radius: 12, gap: 3 };
const RING_INSET = RING.gap + RING.width;
const IMAGE_RADIUS = RING.radius - RING.gap;
const GRID_WIDTH = ROW.controlRight - ROW.textX;
const COLUMN_WIDTH = (GRID_WIDTH - (COLUMNS - 1) * CELL_GAP) / COLUMNS;

type Cell = { column: number; row: number; columns: number; rows: number };

const BENTO_CELLS: Cell[] = [
  { column: 0, row: 0, columns: 2, rows: 5 },
  { column: 2, row: 0, columns: 1, rows: 3 },
  { column: 3, row: 0, columns: 1, rows: 6 },
  { column: 0, row: 5, columns: 2, rows: 4 },
  { column: 2, row: 3, columns: 1, rows: 6 },
  { column: 3, row: 6, columns: 1, rows: 3 },
  { column: 0, row: 9, columns: 1, rows: 3 },
  { column: 1, row: 9, columns: 1, rows: 3 },
  { column: 2, row: 9, columns: 2, rows: 3 },
  { column: 1, row: 12, columns: 1, rows: 3 },
];

const AURORA_BLOBS = [
  { stop: "var(--tone-start)", cx: 0.12, cy: 1, rx: 0.6, ry: 0.75 },
  { stop: "var(--tone-mid)", cx: 0.52, cy: 0.62, rx: 0.55, ry: 0.7 },
  { stop: "var(--tone-end)", cx: 1, cy: 0.35, rx: 0.7, ry: 0.9 },
];

const span = (cells: number, unit: number) =>
  cells * (unit + CELL_GAP) - CELL_GAP;

function cellBox({ column, row, columns, rows }: Cell, top: number) {
  return {
    x: ROW.textX + column * (COLUMN_WIDTH + CELL_GAP),
    y: top + row * (CELL_HEIGHT + CELL_GAP),
    width: span(columns, COLUMN_WIDTH),
    height: span(rows, CELL_HEIGHT),
  };
}

function AuroraThumbnail({
  wallpaper,
  x,
  y,
  width,
  height,
}: {
  wallpaper: Wallpaper;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const id = useId();
  const mirror = wallpaper.mirrored
    ? `translate(${2 * x + width} 0) scale(-1 1)`
    : undefined;
  return (
    <g data-tone={wallpaper.tone}>
      <defs>
        {AURORA_BLOBS.map(({ stop, cx, cy, rx, ry }, index) => (
          <radialGradient
            key={stop}
            id={`${id}-${index}`}
            cx={0}
            cy={0}
            r={1}
            gradientTransform={`translate(${cx} ${cy}) scale(${rx} ${ry})`}
          >
            <stop offset={0} style={{ stopColor: stop }} />
            <stop offset={0.72} style={{ stopColor: stop }} stopOpacity={0} />
          </radialGradient>
        ))}
        <linearGradient
          id={`${id}-shade`}
          x1={0.29}
          y1={0.05}
          x2={0.71}
          y2={0.95}
        >
          <stop offset={0.12} stopColor="#16151c" />
          <stop offset={0.52} stopColor="#16151c" stopOpacity={0} />
        </linearGradient>
      </defs>
      <g transform={mirror}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={IMAGE_RADIUS}
          style={{
            fill: "color-mix(in oklab, var(--tone-mid) 55%, #16151c)",
          }}
        />
        {AURORA_BLOBS.map(({ stop }, index) => (
          <rect
            key={stop}
            x={x}
            y={y}
            width={width}
            height={height}
            rx={IMAGE_RADIUS}
            fill={`url(#${id}-${index})`}
          />
        ))}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={IMAGE_RADIUS}
          fill={`url(#${id}-shade)`}
        />
      </g>
    </g>
  );
}

export function Gallery({ top }: { top: number }) {
  return (
    <g>
      {BENTO_CELLS.map((cell, index) => {
        const wallpaper = settingsWindow.wallpapers[index];
        const box = cellBox(cell, top);
        const selected = index === settingsWindow.selectedWallpaper;
        return (
          <g key={wallpaper.name}>
            <AuroraThumbnail
              wallpaper={wallpaper}
              x={box.x + RING_INSET}
              y={box.y + RING_INSET}
              width={box.width - RING_INSET * 2}
              height={box.height - RING_INSET * 2}
            />
            {selected && (
              <rect
                x={box.x + RING.width / 2}
                y={box.y + RING.width / 2}
                width={box.width - RING.width}
                height={box.height - RING.width}
                rx={RING.radius - RING.width / 2}
                fill="none"
                stroke={SETTINGS_COLOR.accentEnd}
                strokeWidth={RING.width}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}
