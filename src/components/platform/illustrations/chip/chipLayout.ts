import { EDGES, leadPositions, SIZE, toPath, UNIT_SCALE } from "./geometry";

export const PACKAGE_OFFSET = 40;
export const PACKAGE_TRANSFORM = `translate(${PACKAGE_OFFSET} ${PACKAGE_OFFSET}) scale(${UNIT_SCALE})`;
export const CHIP_VIEWBOX = "0 0 240 240";

const TRACE = { via: 0.9, run: 3.2, end: 5.6, converge: 0.18, flowEvery: 3 };

export const CORES = {
  x: 14,
  y: 14,
  width: 12,
  height: 6.6,
  columns: 4,
  rows: 2,
  inset: 0.25,
};
export const HOT_CORE = 5;

export function coreBox(index: number) {
  const width = CORES.width / CORES.columns;
  const height = CORES.height / CORES.rows;
  const column = index % CORES.columns;
  const row = Math.floor(index / CORES.columns);
  return {
    x: CORES.x + column * width + CORES.inset,
    y: CORES.y + row * height + CORES.inset,
    width: width - CORES.inset * 2,
    height: height - CORES.inset * 2,
  };
}

const center = SIZE / 2;

export const chipTraces = EDGES.flatMap((edge) =>
  leadPositions.map((along, index) => ({
    key: edge(along, 0).join("-"),
    via: edge(along, -TRACE.via),
    path: toPath([
      edge(along, -TRACE.via),
      edge(along, -TRACE.run),
      edge(along + (center - along) * TRACE.converge, -TRACE.end),
    ]),
    flowing: index % TRACE.flowEvery === 1,
  })),
);
