export type FrameSequence = {
  path: string;
  count: number;
  extension: "webp" | "avif" | "jpg" | "png";
  digits: number;
  crop: Rect;
  restingTop: number;
};

export type Rect = { x: number; y: number; width: number; height: number };

export const frameUrl = (
  { path, extension, digits }: FrameSequence,
  index: number,
) => `${path}/${String(index + 1).padStart(digits, "0")}.${extension}`;

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

export function containRect(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
): Rect {
  const scale = Math.min(
    targetWidth / sourceWidth,
    targetHeight / sourceHeight,
  );
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;
  return {
    x: (targetWidth - width) / 2,
    y: (targetHeight - height) / 2,
    width,
    height,
  };
}

export function restingOffset(
  { crop, restingTop }: FrameSequence,
  box: { width: number; height: number },
  targetTop: number,
) {
  const frame = containRect(crop.width, crop.height, box.width, box.height);
  return targetTop - (frame.y + restingTop * frame.height);
}
