import { roundCoordinate as round } from "@/util/round-coordinate";

const GRID = 32;
const PITCH = 8;
const TILE = GRID * PITCH;
const ATTEMPTS = 1000;
const STEPS = { min: 2, max: 14 };
const TURN_CHANCE = 0.16;
const BUNDLE_MAX = 4;
const ORTHOGONAL_CHANCE = 0.65;
const ACCENT_CHANCE = 0.1;
const PALETTE = {
  fill: "#ececec",
  trace: "#a6a6aa",
  accents: ["#82bcff", "#2483ff", "#ff66f4", "#ff3029", "#fe7b02"],
};
const DIRECTIONS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
] as const;

type Node = readonly [number, number];

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 2 ** 32;
  };
}

const wrap = (value: number) => ((value % GRID) + GRID) % GRID;
const nodeKey = ([x, y]: Node) => `${wrap(x)},${wrap(y)}`;
const diagonalKey = ([x, y]: Node, [toX, toY]: Node) =>
  `d${wrap(Math.min(x, toX))},${wrap(Math.min(y, toY))}`;
const toUnits = ([x, y]: Node) =>
  `${round(x * PITCH + PITCH / 2)} ${round(y * PITCH + PITCH / 2)}`;
const toPath = (nodes: readonly Node[]) => `M${nodes.map(toUnits).join("L")}`;

function walkTrace(
  start: Node,
  turns: readonly number[],
  used: Set<string>,
): Node[] | undefined {
  const nodes: Node[] = [start];
  const claimed = [nodeKey(start)];
  if (used.has(claimed[0])) return undefined;
  for (const direction of turns) {
    const [stepX, stepY] = DIRECTIONS[direction];
    const from = nodes[nodes.length - 1];
    const to: Node = [from[0] + stepX, from[1] + stepY];
    const crossing = stepX && stepY ? diagonalKey(from, to) : undefined;
    if (used.has(nodeKey(to)) || (crossing && used.has(crossing))) break;
    nodes.push(to);
    claimed.push(nodeKey(to));
    if (crossing) claimed.push(crossing);
  }
  if (nodes.length <= STEPS.min) return undefined;
  for (const key of claimed) used.add(key);
  return nodes;
}

function walkTraces(next: () => number) {
  const used = new Set<string>();
  const traces: Node[][] = [];

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const start: Node = [Math.floor(next() * GRID), Math.floor(next() * GRID)];
    let direction =
      2 * Math.floor(next() * 4) + (next() < ORTHOGONAL_CHANCE ? 0 : 1);
    const length = STEPS.min + Math.floor(next() * (STEPS.max - STEPS.min));
    const turns = Array.from({ length }, () => {
      if (next() < TURN_CHANCE) {
        direction = (direction + (next() < 0.5 ? 1 : 7)) % DIRECTIONS.length;
      }
      return direction;
    });
    const [acrossX, acrossY] = DIRECTIONS[(turns[0] + 2) % DIRECTIONS.length];
    const bundleSize = 1 + Math.floor(next() * BUNDLE_MAX);

    for (let lane = 0; lane < bundleSize; lane++) {
      const laneStart: Node = [
        start[0] + acrossX * lane,
        start[1] + acrossY * lane,
      ];
      const trace = walkTrace(laneStart, turns, used);
      if (trace) traces.push(trace);
    }
  }
  return traces;
}

function circuitTileSvg() {
  const next = seededRandom(7);
  const traces = walkTraces(next);
  const viaRadius = PITCH * 0.22;
  const tracePaths = traces.map(toPath).join("");
  const vias = traces
    .map((nodes) => {
      const [x, y] = toUnits(nodes[nodes.length - 1]).split(" ");
      return `<circle cx="${x}" cy="${y}" r="${viaRadius}"/>`;
    })
    .join("");
  const accents = traces
    .filter(() => next() < ACCENT_CHANCE)
    .map((nodes, index) => {
      const color = PALETTE.accents[index % PALETTE.accents.length];
      return `<path stroke="${color}" d="${toPath(nodes.slice(0, 3))}"/>`;
    })
    .join("");

  const copies = [-1, 0, 1]
    .flatMap((x) => [-1, 0, 1].map((y) => [x * TILE, y * TILE]))
    .filter(([x, y]) => x || y)
    .map(([x, y]) => `<use href="#c" x="${x}" y="${y}"/>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${TILE}"><rect width="${TILE}" height="${TILE}" fill="${PALETTE.fill}"/><g id="c" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="${PALETTE.trace}" stroke-width="1.1" d="${tracePaths}"/><g stroke-width="1.8">${accents}</g><g fill="${PALETTE.fill}" stroke="${PALETTE.trace}" stroke-width="1">${vias}</g></g>${copies}</svg>`;
}

export const CIRCUIT_TILE_IMAGE = `url("data:image/svg+xml,${encodeURIComponent(circuitTileSvg())}")`;
