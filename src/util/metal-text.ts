import { SHIMMER } from "@/data/shimmer";
import { METAL_SHADER } from "@/shaders/metal";
import { runWhileVisible } from "./frame-loop";
import { createEasedPointer } from "./pointer";
import { onRevealed } from "./reveal";
import { measureTextMask, paintTextMask } from "./text-mask";
import { createFullscreenProgram, createTexture, uploadTexture } from "./webgl";

const MAX_PIXEL_RATIO = 2;
const IDLE_SWEEP = -1;

const sweepSeconds = (revealedAt: number | undefined, now: number) => {
  if (revealedAt === undefined) return IDLE_SWEEP;
  const sinceLead = now - revealedAt - SHIMMER.leadMs;
  return sinceLead < 0 ? IDLE_SWEEP : (sinceLead % SHIMMER.cycleMs) / 1000;
};

export function mountMetalText(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  onReady: () => void,
): () => void {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    powerPreference: "high-performance",
  });
  const uniform = gl && createFullscreenProgram(gl, METAL_SHADER);
  if (!gl || !uniform) return () => {};

  createTexture(gl);
  const mask = document.createElement("canvas");
  const pointer = createEasedPointer();
  const resolution = uniform("uResolution");
  const time = uniform("uTime");
  const pointerPosition = uniform("uPointer");
  const sweep = uniform("uSweep");
  const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);

  let revealedAt: number | undefined;

  const draw = (now: number) => {
    const { x, y } = pointer.step();
    gl.uniform1f(time, now / 1000);
    gl.uniform1f(sweep, sweepSeconds(revealedAt, now));
    gl.uniform2f(pointerPosition, x, y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const layout = () => {
    const frame = measureTextMask(host);
    Object.assign(canvas.style, {
      left: `${-frame.pad}px`,
      top: `${-frame.pad}px`,
      width: `${frame.width}px`,
      height: `${frame.height}px`,
    });
    paintTextMask(mask, host, frame, pixelRatio);
    canvas.width = mask.width;
    canvas.height = mask.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    uploadTexture(gl, mask);
    draw(performance.now());
    onReady();
  };

  let disposed = false;
  let stopLoop = () => {};
  const sizeObserver = new ResizeObserver(layout);
  const stopRevealWatch = onRevealed(host, (time) => {
    revealedAt = time;
  });

  document.fonts.ready.then(() => {
    if (disposed) return;
    sizeObserver.observe(host);
    stopLoop = runWhileVisible(canvas, draw);
  });

  return () => {
    disposed = true;
    stopLoop();
    stopRevealWatch();
    sizeObserver.disconnect();
    pointer.dispose();
  };
}
