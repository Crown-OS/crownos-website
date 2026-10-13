"use client";

import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import {
  coarseToFineOrder,
  containRect,
  type FrameSequence,
  frameUrl,
  nearestLoaded,
} from "@/util/frame-sequence";

const MAX_PIXEL_RATIO = 2;
const PARALLEL_REQUESTS = 6;

type ScrollSequenceProps = {
  sequence: FrameSequence;
  progress: MotionValue<number>;
  label: string;
  className?: string;
};

async function decodeFrame(url: string, priority: "high" | "low") {
  const image = new Image();
  image.fetchPriority = priority;
  image.src = url;
  try {
    await image.decode();
    return image;
  } catch {
    return undefined;
  }
}

export function ScrollSequence({
  sequence,
  progress,
  label,
  className,
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const frames: (HTMLImageElement | undefined)[] = new Array(sequence.count);
    let drawnIndex = -1;
    let active = true;

    const draw = (force = false) => {
      const target = Math.round(progress.get() * (sequence.count - 1));
      const index = nearestLoaded(frames, target);
      const frame = frames[index];
      if (!frame || (index === drawnIndex && !force)) return;
      drawnIndex = index;
      const { x, y, width, height } = containRect(
        frame.naturalWidth,
        frame.naturalHeight,
        canvas.width,
        canvas.height,
      );
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(frame, x, y, width, height);
    };

    const resize = new ResizeObserver(([entry]) => {
      const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
      canvas.width = Math.round(entry.contentRect.width * pixelRatio);
      canvas.height = Math.round(entry.contentRect.height * pixelRatio);
      draw(true);
    });
    resize.observe(canvas);

    const store = (index: number, frame?: HTMLImageElement) => {
      if (!active || !frame) return;
      frames[index] = frame;
      draw();
    };

    const [firstIndex, ...remaining] = coarseToFineOrder(sequence.count);
    const streamRemaining = async () => {
      for (
        let index = remaining.shift();
        active && index !== undefined;
        index = remaining.shift()
      ) {
        store(index, await decodeFrame(frameUrl(sequence, index), "low"));
      }
    };

    decodeFrame(frameUrl(sequence, firstIndex), "high").then((frame) => {
      if (!frame) return;
      store(firstIndex, frame);
      for (let worker = 0; worker < PARALLEL_REQUESTS; worker++) {
        streamRemaining();
      }
    });

    const unsubscribe = progress.on("change", () => draw());

    return () => {
      active = false;
      unsubscribe();
      resize.disconnect();
    };
  }, [sequence, progress]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={className}
    />
  );
}
