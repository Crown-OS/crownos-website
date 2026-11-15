"use client";

import { useEffect, useRef } from "react";
import { createFullscreenProgram } from "@/util/webgl";

const MAX_PIXEL_RATIO = 2;

type ShaderCanvasProps = {
  fragment: string;
  resolutionScale?: number;
  progressProperty?: string;
};

export function ShaderCanvas({
  fragment,
  resolutionScale = 1,
  progressProperty,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!canvas || !gl) return;
    const uniform = createFullscreenProgram(gl, fragment);
    if (!uniform) return;

    const resolution = uniform("uResolution");
    const progress = uniform("uProgress");
    const pixelRatio =
      Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO) * resolutionScale;

    let progressValue = 1;
    let frameRequest = 0;

    const readProgress = () =>
      progressProperty
        ? Number.parseFloat(
            getComputedStyle(canvas).getPropertyValue(progressProperty),
          )
        : 1;

    const drawAtCanvasSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(progress, progressValue);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const sizeObserver = new ResizeObserver(drawAtCanvasSize);
    sizeObserver.observe(canvas);

    const followProgress = () => {
      const next = readProgress();
      if (next !== progressValue) {
        progressValue = next;
        drawAtCanvasSize();
      }
      if (next < 1) frameRequest = requestAnimationFrame(followProgress);
    };
    if (progressProperty) followProgress();

    return () => {
      cancelAnimationFrame(frameRequest);
      sizeObserver.disconnect();
    };
  }, [fragment, resolutionScale, progressProperty]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full [image-rendering:pixelated]"
    />
  );
}
