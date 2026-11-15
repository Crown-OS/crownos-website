import type { ReactNode } from "react";
import { CIRCUIT_TILE_IMAGE } from "./circuitTile";

export function CircuitText({ children }: { children: ReactNode }) {
  return (
    <span
      style={{ backgroundImage: CIRCUIT_TILE_IMAGE }}
      className="-mx-[0.08em] bg-size-[1.6em] bg-clip-text px-[0.08em] py-[0.12em] text-transparent [text-shadow:none]"
    >
      {children}
    </span>
  );
}
