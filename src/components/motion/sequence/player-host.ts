import type { FrameSequence, FrameTier, Size } from "@/util/frame-sequence";
import { FramePlayer } from "./FramePlayer";

export type PlayerSetup = {
  sequence: FrameSequence;
  tier: FrameTier;
  size: Size;
  progress: number;
  preloaded: number;
};

export type PlayerCommand =
  | (PlayerSetup & {
      type: "init";
      canvas: HTMLCanvasElement | OffscreenCanvas;
    })
  | { type: "frame"; index: number; frame: Blob }
  | { type: "seek"; progress: number }
  | { type: "resize"; size: Size }
  | { type: "release" }
  | { type: "dispose" };

export function createPlayerHost() {
  let player: FramePlayer | undefined;
  return (command: PlayerCommand) => {
    switch (command.type) {
      case "init": {
        const context = command.canvas.getContext("2d") as
          | CanvasRenderingContext2D
          | OffscreenCanvasRenderingContext2D
          | null;
        if (!context) return;
        player = new FramePlayer(context, command.sequence, command.tier);
        player.resize(command.size);
        player.seek(command.progress);
        player.start(command.preloaded);
        return;
      }
      case "frame":
        return player?.receive(command.index, command.frame);
      case "seek":
        return player?.seek(command.progress);
      case "resize":
        return player?.resize(command.size);
      case "release":
        return player?.release();
      case "dispose":
        player?.dispose();
        player = undefined;
    }
  };
}
