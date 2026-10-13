import { type CSSProperties, Fragment, type JSX } from "react";

type SplitWordsProps = {
  lines: readonly string[];
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p" | "span">;
  className?: string;
  lineClassName?: string;
  delay?: number;
};

function splitIntoIndexedWords(lines: readonly string[]) {
  let index = 0;
  return lines.map((line) =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, index: index++ })),
  );
}

export function SplitWords({
  lines,
  as: Tag = "span",
  className,
  lineClassName = "block",
  delay = 0,
}: SplitWordsProps) {
  return (
    <Tag
      data-reveal="split"
      className={className}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {splitIntoIndexedWords(lines).map((words, lineIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: lines are static and positional
        <span key={lineIndex} className={lineClassName}>
          {words.map(({ word, index }) => (
            <Fragment key={index}>
              <span className="split-word">
                <span style={{ "--i": index } as CSSProperties}>{word}</span>
              </span>{" "}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
