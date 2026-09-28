import type { CSSProperties } from "react";

export function RollText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="roll">
        {[...text].map((char, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: characters are static and positional
            key={index}
            className="roll-char"
            style={{ "--i": index } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
}
