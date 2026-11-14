import type { ComponentType } from "react";
import { CrossPattern } from "./CrossPattern";
import { FIELD } from "./guides";
import { LensPattern } from "./LensPattern";
import { PosterPattern } from "./PosterPattern";
import { TilePattern } from "./TilePattern";

const PATTERNS = {
  cross: CrossPattern,
  lens: LensPattern,
  tiles: TilePattern,
  poster: PosterPattern,
} satisfies Record<string, ComponentType>;

export type PatternKey = keyof typeof PATTERNS;

export function ConstructionPattern({ name }: { name: PatternKey }) {
  const Pattern = PATTERNS[name];
  return (
    <div
      aria-hidden
      data-reveal
      className="construction-field pointer-events-none absolute top-0 right-0 -bottom-stack hidden w-[40%] overflow-clip lg:block xl:w-[44%]"
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${FIELD.width} ${FIELD.height}`}
        preserveAspectRatio="xMaxYMin slice"
        className="block size-full"
      >
        <Pattern />
      </svg>
    </div>
  );
}
