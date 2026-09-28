import { METAL_SHADER } from "@/shaders/metal";
import { runWhileVisible } from "./frame-loop";
import { createEasedPointer } from "./pointer";
import { measureTextMask, paintTextMask } from "./text-mask";
import { createFullscreenProgram, createTexture, uploadTexture } from "./webgl";

const MAX_PIXEL_RATIO = 2;

export function mountMetalText(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  text: string,
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
  const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);

  const draw = (now: number) => {
    const { x, y } = pointer.step();
    gl.uniform1f(time, now / 1000);
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
    paintTextMask(mask, host, text, frame, pixelRatio);
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

  document.fonts.ready.then(() => {
    if (disposed) return;
    sizeObserver.observe(host);
    stopLoop = runWhileVisible(canvas, draw);
  });

  return () => {
    disposed = true;
    stopLoop();
    sizeObserver.disconnect();
    pointer.dispose();
  };
}
