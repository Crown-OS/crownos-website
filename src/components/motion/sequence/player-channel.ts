import type { PlayerCommand, PlayerSetup } from "./player-host";
import { createPlayerHost } from "./player-host";

export type PlayerChannel = {
  send: (command: PlayerCommand) => void;
  close: () => void;
};

function openInWorker(canvas: HTMLCanvasElement, setup: PlayerSetup) {
  const worker = new Worker(new URL("./frame.worker.ts", import.meta.url), {
    type: "module",
    name: "frame-sequence",
  });
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ type: "init", canvas: offscreen, ...setup }, [
    offscreen,
  ]);
  return {
    send: (command: PlayerCommand) => worker.postMessage(command),
    close: () => worker.terminate(),
  };
}

function openOnMainThread(canvas: HTMLCanvasElement, setup: PlayerSetup) {
  const host = createPlayerHost();
  host({ type: "init", canvas, ...setup });
  return { send: host, close: () => host({ type: "dispose" }) };
}

export const openPlayer = (
  canvas: HTMLCanvasElement,
  setup: PlayerSetup,
): PlayerChannel =>
  "transferControlToOffscreen" in canvas
    ? openInWorker(canvas, setup)
    : openOnMainThread(canvas, setup);
