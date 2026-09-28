"use client";

import { useEffect, useRef } from "react";
import { runWhileVisible } from "@/util/frame-loop";
import { createFullscreenProgram, uploadGlyphAtlas } from "@/util/webgl";

const MAX_PIXEL_RATIO = 1.5;
const POINTER_EASING = 0.05;

type ShaderCanvasProps = {
  fragment: string;
  glyphs?: string;
  cellSize?: number;
  className?: string;
};

export function ShaderCanvas({
  fragment,
  glyphs,
  cellSize = 14,
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
    const pointer = uniform("uPointer");
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);

    const draw = (now: number) => {
      eased.x += (target.x - eased.x) * POINTER_EASING;
      eased.y += (target.y - eased.y) * POINTER_EASING;
      gl.uniform1f(time, now / 1000);
      gl.uniform2f(pointer, eased.x, eased.y);
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

    const track = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      target.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      target.y = 1 - ((event.clientY - bounds.top) / bounds.height) * 2;
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
    window.addEventListener("pointermove", track, { passive: true });
    const stop = runWhileVisible(canvas, draw);

    return () => {
      stop();
      sizeObserver.disconnect();
      window.removeEventListener("pointermove", track);
    };
  }, [fragment, glyphs, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 size-full font-mono ${className ?? ""}`}
    />
  );
}
