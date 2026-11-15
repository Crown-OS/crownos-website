import type { CSSProperties } from "react";

export function RollText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className="inline-flex h-[1.15em] overflow-clip leading-[1.15]"
      >
        {[...text].map((character, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: characters are static and positional
            key={index}
            className="roll-char"
            style={{ "--i": index } as CSSProperties}
          >
            {character}
          </span>
        ))}
      </span>
    </>
  );
}
