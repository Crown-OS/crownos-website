"use client";

import { useEffect, useRef } from "react";
import { runWhileVisible } from "@/util/frame-loop";
import { createEasedPointer } from "@/util/pointer";
import { createFullscreenProgram, uploadGlyphAtlas } from "@/util/webgl";

const MAX_PIXEL_RATIO = 1.5;

type ShaderCanvasProps = {
  fragment: string;
  glyphs?: string;
  cellSize?: number;
  resolutionScale?: number;
  className?: string;
};

export function ShaderCanvas({
  fragment,
  glyphs,
  cellSize = 14,
  resolutionScale = 1,
  className,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!canvas || !gl) return;
    const uniform = createFullscreenProgram(gl, fragment);
    if (!uniform) return;

    const resolution = uniform("uResolution");
    const time = uniform("uTime");
    const pointerPosition = uniform("uPointer");
    const pointer = createEasedPointer(() => canvas.getBoundingClientRect());
    const pixelRatio =
      Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO) * resolutionScale;

    const draw = (now: number) => {
      const { x, y } = pointer.step();
      gl.uniform1f(time, now / 1000);
      gl.uniform2f(pointerPosition, x, y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(uniform("uCell"), cellSize * pixelRatio);
      draw(performance.now());
    };

    if (glyphs) {
      document.fonts.ready.then(() => {
        uploadGlyphAtlas(gl, glyphs, getComputedStyle(canvas).fontFamily);
        gl.uniform1f(uniform("uGlyphCount"), glyphs.length);
        draw(performance.now());
      });
    }

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const stop = runWhileVisible(canvas, draw);

    return () => {
      stop();
      sizeObserver.disconnect();
      pointer.dispose();
    };
  }, [fragment, glyphs, cellSize, resolutionScale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 size-full font-mono ${className ?? ""}`}
    />
  );
}
