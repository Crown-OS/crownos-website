export type Size = { width: number; height: number };
export type Rect = Size & { x: number; y: number };
export type FrameTier = { width: number; media: string };

export type FrameSequence = {
  path: string;
  frames: number;
  timeline: number;
  digits: number;
  size: Size;
  tiers: readonly FrameTier[];
  restingTop: number;
};

export const frameUrl = (
  { path, digits }: FrameSequence,
  { width }: FrameTier,
  index: number,
) => `${path}/${width}/${String(index + 1).padStart(digits, "0")}.avif`;

export const frameAt = (
  { frames, timeline }: FrameSequence,
  progress: number,
) => Math.min(Math.round(progress * (timeline - 1)), frames - 1);

export const tierFor = ({ tiers }: FrameSequence) =>
  tiers.find(({ media }) => window.matchMedia(media).matches) ?? tiers[0];

export function coarseToFineOrder(count: number) {
  const order: number[] = [];
  const queued = new Uint8Array(count);
  for (
    let stride = 2 ** Math.ceil(Math.log2(count));
    stride >= 1;
    stride >>= 1
  ) {
    for (let index = 0; index < count; index += stride) {
      if (queued[index]) continue;
      queued[index] = 1;
      order.push(index);
    }
  }
  return order;
}

export function nearestLoaded<T>(
  frames: readonly (T | undefined)[],
  target: number,
) {
  for (let distance = 0; distance < frames.length; distance++) {
    if (frames[target - distance]) return target - distance;
    if (frames[target + distance]) return target + distance;
  }
  return -1;
}

export function containRect(source: Size, target: Size): Rect {
  const scale = Math.min(
    target.width / source.width,
    target.height / source.height,
  );
  const width = source.width * scale;
  const height = source.height * scale;
  return {
    x: (target.width - width) / 2,
    y: (target.height - height) / 2,
    width,
    height,
  };
}

export function restingOffset(
  { size, restingTop }: FrameSequence,
  box: Size,
  targetTop: number,
) {
  const frame = containRect(size, box);
  return targetTop - (frame.y + restingTop * frame.height);
}
