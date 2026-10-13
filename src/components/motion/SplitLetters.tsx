import { type CSSProperties, Fragment, type JSX } from "react";

type SplitLettersProps = {
  lines: readonly string[];
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "p">;
  id?: string;
  className?: string;
  delay?: number;
};

function splitIntoIndexedLetters(lines: readonly string[]) {
  let index = 0;
  return lines.map((line) =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => [...word].map((letter) => ({ letter, index: index++ }))),
  );
}

export function SplitLetters({
  lines,
  as: Tag = "h1",
  id,
  className,
  delay = 0,
}: SplitLettersProps) {
  return (
    <Tag
      id={id}
      data-reveal="letters"
      aria-label={lines.join(" ")}
      className={className}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {splitIntoIndexedLetters(lines).map((words, lineIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: lines are static and positional
        <span key={lineIndex} aria-hidden className="block">
          {words.map((letters, wordIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: words are static and positional
            <Fragment key={wordIndex}>
              {wordIndex > 0 && " "}
              <span className="split-letters">
                {letters.map(({ letter, index }) => (
                  <span key={index} className="split-letter">
                    <span style={{ "--i": index } as CSSProperties}>
                      {letter}
                    </span>
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
