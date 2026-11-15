import {
  CENTER,
  EDGES,
  LEAD,
  leadPositions,
  type Point,
  toPath,
} from "./geometry";

const FAN = { breakout: 2, stagger: 6, spread: 14, minimumRun: 4 };
const DOGLEG = { shift: 3, run: 4, chance: 0.4 };
const EDGE_REACH = [34, 120, 30, 120];
const FLOW_EVERY = 5;
const MAX_OFFSET = Math.max(
  ...leadPositions.map((along) => Math.abs(along - CENTER)),
);

export type BoardTrace = {
  key: string;
  path: string;
  end: Point;
  pad: "via" | "land";
  flowing: boolean;
};

const pseudoRandom = (seed: number) =>
  (Math.imul(seed + 1, 2654435761) >>> 0) / 2 ** 32;

function fanOutTrace(edgeIndex: number, leadIndex: number): BoardTrace {
  const edge = EDGES[edgeIndex];
  const along = leadPositions[leadIndex];
  const offset = along - CENTER;
  const side = Math.sign(offset);
  const rank = Math.abs(offset) / MAX_OFFSET;
  const seed = edgeIndex * 31 + leadIndex;

  const bendAt = LEAD.length + FAN.breakout + (1 - rank) * FAN.stagger;
  const fannedAlong = along + side * rank * FAN.spread;
  const fannedAt = bendAt + rank * FAN.spread;
  const runEnd =
    fannedAt + FAN.minimumRun + pseudoRandom(seed) * EDGE_REACH[edgeIndex];

  const points: Point[] = [
    edge(along, LEAD.length),
    edge(along, bendAt),
    edge(fannedAlong, fannedAt),
    edge(fannedAlong, runEnd),
  ];
  if (pseudoRandom(seed + 97) < DOGLEG.chance) {
    const joggedAlong = fannedAlong + side * DOGLEG.shift;
    const joggedAt = runEnd + DOGLEG.shift;
    points.push(
      edge(joggedAlong, joggedAt),
      edge(joggedAlong, joggedAt + DOGLEG.run),
    );
  }

  return {
    key: `${edgeIndex}-${leadIndex}`,
    path: toPath(points),
    end: points[points.length - 1],
    pad: pseudoRandom(seed + 53) < 0.5 ? "via" : "land",
    flowing: (leadIndex + edgeIndex * 2) % FLOW_EVERY === 2,
  };
}

export const boardTraces: readonly BoardTrace[] = EDGES.flatMap(
  (_, edgeIndex) =>
    leadPositions.map((_, leadIndex) => fanOutTrace(edgeIndex, leadIndex)),
);

export const boardTracePath = boardTraces.map(({ path }) => path).join("");
