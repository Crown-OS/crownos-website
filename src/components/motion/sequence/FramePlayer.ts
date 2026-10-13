import {
  coarseToFineOrder,
  containRect,
  type FrameSequence,
  type FrameTier,
  frameAt,
  frameUrl,
  nearestLoaded,
  type Size,
} from "@/util/frame-sequence";

const DECODED_BYTE_BUDGET = 96 * 1024 * 1024;
const BYTES_PER_PIXEL = 4;
const PARALLEL_FETCHES = 6;
const PARALLEL_DECODES = 2;

type Context2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export class FramePlayer {
  readonly #context: Context2D;
  readonly #sequence: FrameSequence;
  readonly #tier: FrameTier;
  readonly #encoded: (Blob | undefined)[];
  readonly #decoded: (ImageBitmap | undefined)[];
  readonly #decoding = new Set<number>();
  readonly #capacity: number;
  readonly #aborter = new AbortController();
  #decodedCount = 0;
  #target = 0;
  #drawn = -1;

  constructor(context: Context2D, sequence: FrameSequence, tier: FrameTier) {
    this.#context = context;
    this.#sequence = sequence;
    this.#tier = tier;
    this.#encoded = new Array(sequence.frames);
    this.#decoded = new Array(sequence.frames);
    const height = (tier.width * sequence.size.height) / sequence.size.width;
    const frameBytes = tier.width * height * BYTES_PER_PIXEL;
    this.#capacity = Math.max(3, Math.floor(DECODED_BYTE_BUDGET / frameBytes));
  }

  start(preloaded: number) {
    const queue = coarseToFineOrder(this.#sequence.frames).filter(
      (index) => index !== preloaded,
    );
    for (let lane = 0; lane < PARALLEL_FETCHES; lane++) this.#stream(queue);
  }

  receive(index: number, frame: Blob) {
    this.#encoded[index] = frame;
    this.#render();
  }

  seek(progress: number) {
    this.#target = frameAt(this.#sequence, progress);
    this.#render();
  }

  resize({ width, height }: Size) {
    const { canvas } = this.#context;
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    this.#drawn = -1;
    this.#render();
  }

  release() {
    for (const bitmap of this.#decoded) bitmap?.close();
    this.#decoded.fill(undefined);
    this.#decodedCount = 0;
  }

  dispose() {
    this.#aborter.abort();
    this.release();
  }

  async #stream(queue: number[]) {
    for (
      let index = queue.shift();
      index !== undefined && !this.#aborter.signal.aborted;
      index = queue.shift()
    ) {
      await this.#fetchFrame(index);
    }
  }

  async #fetchFrame(index: number) {
    const url = frameUrl(this.#sequence, this.#tier, index);
    try {
      const response = await fetch(url, {
        priority: "low",
        signal: this.#aborter.signal,
      });
      if (!response.ok) return;
      this.receive(index, await response.blob());
    } catch {
      return;
    }
  }

  *#decodeWindow() {
    const radius = Math.floor(this.#capacity / 2) - 1;
    yield this.#target;
    for (let distance = 1; distance <= radius; distance++) {
      yield this.#target + distance;
      yield this.#target - distance;
    }
  }

  #scheduleDecodes() {
    for (const index of this.#decodeWindow()) {
      if (this.#decoding.size >= PARALLEL_DECODES) return;
      this.#decode(index);
    }
  }

  #decode(index: number) {
    const blob = this.#encoded[index];
    if (!blob || this.#decoded[index] || this.#decoding.has(index)) return;
    this.#decoding.add(index);
    createImageBitmap(blob)
      .then((bitmap) => {
        if (this.#aborter.signal.aborted) return bitmap.close();
        this.#decoded[index] = bitmap;
        this.#decodedCount++;
        this.#evictBeyondCapacity();
      })
      .catch(() => undefined)
      .finally(() => {
        this.#decoding.delete(index);
        this.#render();
      });
  }

  #evictBeyondCapacity() {
    while (this.#decodedCount > this.#capacity) {
      let farthest = -1;
      this.#decoded.forEach((bitmap, index) => {
        if (
          bitmap &&
          (farthest < 0 ||
            Math.abs(index - this.#target) > Math.abs(farthest - this.#target))
        ) {
          farthest = index;
        }
      });
      this.#decoded[farthest]?.close();
      this.#decoded[farthest] = undefined;
      this.#decodedCount--;
    }
  }

  #render() {
    this.#scheduleDecodes();
    const index = nearestLoaded(this.#decoded, this.#target);
    const bitmap = this.#decoded[index];
    if (!bitmap || index === this.#drawn) return;
    this.#drawn = index;
    const { canvas } = this.#context;
    const { x, y, width, height } = containRect(this.#sequence.size, canvas);
    this.#context.clearRect(0, 0, canvas.width, canvas.height);
    this.#context.drawImage(bitmap, x, y, width, height);
  }
}
