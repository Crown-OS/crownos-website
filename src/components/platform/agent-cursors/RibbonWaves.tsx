"use client";

import { useEffect, useRef } from "react";
import { drawRibbonWaves, type RibbonWavesPalette } from "@/util/ribbon-waves";

const MAX_PIXEL_RATIO = 2;
const PALETTE_PROPERTIES = [
  "--color-sweep-sky",
  "--color-sweep-blue",
  "--color-sweep-pink",
  "--color-sweep-orange",
] as const;

function readPalette(element: Element): RibbonWavesPalette {
  const styles = getComputedStyle(element);
  return {
    stops: PALETTE_PROPERTIES.map((property) =>
      styles.getPropertyValue(property).trim(),
    ),
  };
}

export function RibbonWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const isStill = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const palette = readPalette(canvas);
    const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
    let frameRequest = 0;
    let startTime = performance.now();
    let pausedSeconds = 0;

    const draw = (seconds: number) =>
      drawRibbonWaves(context, seconds, palette, pixelRatio);

    const animate = (now: number) => {
      draw((now - startTime) / 1000);
      frameRequest = requestAnimationFrame(animate);
    };

    const resize = new ResizeObserver(() => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      draw(pausedSeconds);
    });
    resize.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frameRequest);
      if (isStill) return;
      if (entry.isIntersecting) {
        startTime = performance.now() - pausedSeconds * 1000;
        frameRequest = requestAnimationFrame(animate);
      } else {
        pausedSeconds = (performance.now() - startTime) / 1000;
      }
    });
    visibility.observe(canvas);

    return () => {
      cancelAnimationFrame(frameRequest);
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full mask-[linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent)] max-lg:mask-[linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent),linear-gradient(to_bottom,transparent_30%,#000_45%)] max-lg:[mask-composite:intersect]"
    />
  );
}
