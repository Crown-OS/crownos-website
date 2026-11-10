"use client";

import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import {
  type FrameSequence,
  frameUrl,
  type Size,
  tierFor,
} from "@/util/frame-sequence";
import type { LoadProgressListener } from "./FramePlayer";
import { openPlayer } from "./player-channel";

const MAX_PIXEL_RATIO = 2;
const KEEP_DECODED_MARGIN = "50% 0px";
const POSTER_FRAME = 0;

type ScrollSequenceProps = {
  sequence: FrameSequence;
  progress: MotionValue<number>;
  label: string;
  onLoadProgress?: LoadProgressListener;
  className?: string;
};

const ignoreLoadProgress: LoadProgressListener = () => undefined;

function devicePixels({ width, height }: Size): Size {
  const ratio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

export function ScrollSequence({
  sequence,
  progress,
  label,
  onLoadProgress = ignoreLoadProgress,
  className,
}: ScrollSequenceProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const canvas = stage.appendChild(document.createElement("canvas"));
    canvas.className = "block size-full";
    const tier = tierFor(sequence);
    const player = openPlayer(
      canvas,
      {
        sequence,
        tier,
        size: devicePixels(stage.getBoundingClientRect()),
        progress: progress.get(),
        preloaded: POSTER_FRAME,
      },
      onLoadProgress,
    );
    const posterRequest = new AbortController();
    fetch(frameUrl(sequence, tier, POSTER_FRAME), {
      signal: posterRequest.signal,
    })
      .then((response) => response.blob())
      .then((frame) =>
        player.send({ type: "frame", index: POSTER_FRAME, frame }),
      )
      .catch(() => {
        if (!posterRequest.signal.aborted) player.send({ type: "skip" });
      });

    const resize = new ResizeObserver(([entry]) =>
      player.send({ type: "resize", size: devicePixels(entry.contentRect) }),
    );
    const visibility = new IntersectionObserver(
      ([entry]) =>
        player.send(
          entry.isIntersecting
            ? { type: "seek", progress: progress.get() }
            : { type: "release" },
        ),
      { rootMargin: KEEP_DECODED_MARGIN },
    );
    const unsubscribe = progress.on("change", (value) =>
      player.send({ type: "seek", progress: value }),
    );
    resize.observe(stage);
    visibility.observe(stage);

    return () => {
      posterRequest.abort();
      unsubscribe();
      resize.disconnect();
      visibility.disconnect();
      player.close();
      canvas.remove();
    };
  }, [sequence, progress, onLoadProgress]);

  return (
    <>
      {sequence.tiers.map((tier) => (
        <link
          key={tier.width}
          rel="preload"
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="high"
          href={frameUrl(sequence, tier, POSTER_FRAME)}
          media={tier.media}
        />
      ))}
      <div ref={stageRef} role="img" aria-label={label} className={className} />
    </>
  );
}
