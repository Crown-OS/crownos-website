export type SeriesShape = { seed: number; mean: number; spread: number };

const PULL_TO_MEAN = 0.18;

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededSeries(
  { seed, mean, spread }: SeriesShape,
  count: number,
) {
  const random = seededRandom(seed);
  const values = new Array<number>(count);
  let value = mean;
  for (let index = 0; index < count; index += 1) {
    value += (random() - 0.5) * spread + (mean - value) * PULL_TO_MEAN;
    value = Math.min(1, Math.max(0, value));
    values[index] = value;
  }
  return values;
}

const round = (value: number) => Number(value.toFixed(2));

export function smoothAreaPath(
  values: readonly number[],
  width: number,
  height: number,
) {
  const peak = Math.max(...values, 0.01) * 1.15;
  const step = width / (values.length - 1);
  const points = values.map(
    (value, index) =>
      [round(index * step), round(height - (value / peak) * height)] as const,
  );
  let line = `M${points[0][0]} ${points[0][1]}`;
  for (let index = 1; index < points.length; index += 1) {
    const [previousX, previousY] = points[index - 1];
    const [x, y] = points[index];
    const middle = round((previousX + x) / 2);
    line += `C${middle} ${previousY} ${middle} ${y} ${x} ${y}`;
  }
  return { line, area: `${line}L${width} ${height}L0 ${height}Z` };
}
