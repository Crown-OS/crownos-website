import { RopeSystem } from "./rope-physics";

export type HangingCard = { strap: number[]; clip: number; body: number };

type WireLayoutInput = {
  width: number;
  wireTop: number;
  strapLengths: readonly number[];
  cardHeights: readonly number[];
};

const WIRE_OVERHANG = 0.04;
const WIRE_SEGMENT_LENGTH = 22;
const WIRE_SLACK = 1.004;
const STRAP_SEGMENTS = 6;
const CARD_INVERSE_MASS = 0.5;

export function columnCentre(index: number, count: number, width: number) {
  return ((index + 0.5) / count) * width;
}

export function buildWire({
  width,
  wireTop,
  strapLengths,
  cardHeights,
}: WireLayoutInput) {
  const system = new RopeSystem();
  const startX = -width * WIRE_OVERHANG;
  const span = width * (1 + 2 * WIRE_OVERHANG);
  const segments = Math.max(8, Math.round(span / WIRE_SEGMENT_LENGTH));
  const segmentLength = (span / segments) * WIRE_SLACK;

  const wire: number[] = [];
  for (let step = 0; step <= segments; step++) {
    const isEnd = step === 0 || step === segments;
    const index = system.addPoint(
      startX + (span * step) / segments,
      wireTop,
      isEnd ? 0 : 1,
    );
    if (wire.length)
      system.connect(wire[wire.length - 1], index, segmentLength);
    wire.push(index);
  }

  const cards: HangingCard[] = strapLengths.map((strapLength, cardIndex) => {
    const centre = columnCentre(cardIndex, strapLengths.length, width);
    const wireIndex = wire[Math.round(((centre - startX) / span) * segments)];
    const hookX = system.points[wireIndex].x;
    const strap = system.chain(
      wireIndex,
      hookX,
      wireTop + strapLength,
      STRAP_SEGMENTS,
    );
    const clip = strap[strap.length - 1];
    const drop = cardHeights[cardIndex] / 2;
    const body = system.addPoint(
      hookX,
      wireTop + strapLength + drop,
      CARD_INVERSE_MASS,
    );
    system.connect(clip, body, drop, true);
    return { strap, clip, body };
  });

  return { system, wire, cards };
}
