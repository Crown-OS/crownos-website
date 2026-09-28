import type { CSSProperties, JSX } from "react";
import { type Token, tokenizeLines } from "@/util/emphasis";

type SplitWordsProps = {
  lines: readonly string[];
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p" | "span">;
  className?: string;
  lineClassName?: string;
  delay?: number;
};

export const EMPHASIS_CLASS =
  "font-serif text-[1.06em] font-normal italic tracking-[-0.02em] pr-[0.04em]";

function Word({ word, emphasis, index }: Token) {
  return (
    <>
      <span className="split-word">
        <span
          style={{ "--i": index } as CSSProperties}
          className={emphasis ? EMPHASIS_CLASS : undefined}
        >
          {word}
        </span>
      </span>{" "}
    </>
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
      {tokenizeLines(lines).map((tokens) => (
        <span key={tokens[0]?.index} className={lineClassName}>
          {tokens.map((token) => (
            <Word key={token.index} {...token} />
          ))}
        </span>
      ))}
    </Tag>
  );
}
