export type ScrollRange = [start: number, end: number];

export function staggered(
  [start, end]: ScrollRange,
  index: number,
  count: number,
  spread = 0.5,
): ScrollRange {
  const length = end - start;
  const step = (length * spread) / Math.max(count - 1, 1);
  const from = start + step * index;
  return [from, from + length * (1 - spread)];
}
