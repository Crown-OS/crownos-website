import type { CSSProperties } from "react";

const COLUMN_COUNT = 14;
const MIN_COLUMN_HEIGHT = 18;
const COLUMN_HEIGHT_RANGE = 70;

function seedFrom(text: string) {
  let seed = 2166136261;
  for (const character of text) {
    seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  }
  return seed >>> 0;
}

function columnHeights(seedText: string) {
  let state = seedFrom(seedText);
  return Array.from({ length: COLUMN_COUNT }, (_, index) => {
    state = Math.imul(state ^ (state >>> 15), 2246822507) >>> 0;
    const wave = Math.sin((index / COLUMN_COUNT) * Math.PI) * 0.5;
    const noise = (state % 1000) / 1000;
    return MIN_COLUMN_HEIGHT + (wave * 0.6 + noise * 0.4) * COLUMN_HEIGHT_RANGE;
  });
}

export function PostCover({
  seed,
  className = "",
}: {
  seed: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative [--cover-blur:0.75rem] isolate overflow-hidden bg-ink ${className}`}
    >
      <div className="post-cover-art">
        {columnHeights(seed).map((height, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: columns are static and positional
            key={index}
            className="flex-1 self-stretch border-r border-r-[rgb(4_4_4/0.35)] bg-[linear-gradient(to_bottom,var(--color-ink)_calc(100%-var(--column-height)),transparent_calc(100%-var(--column-height)))]"
            style={{ "--column-height": `${height}%` } as CSSProperties}
          />
        ))}
      </div>
      <span className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay [background:var(--grain-tile)_0%_0%/160px]" />
    </div>
  );
}
