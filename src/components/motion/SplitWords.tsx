import type { CSSProperties, JSX } from "react";
import { type Token, tokenizeLines } from "@/util/emphasis";
import { MetalText } from "./MetalText";

type SplitWordsProps = {
  lines: readonly string[];
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p" | "span">;
  className?: string;
  lineClassName?: string;
  delay?: number;
  highlight?: string;
};

export const EMPHASIS_CLASS =
  "font-serif text-[1.06em] font-normal italic tracking-[-0.02em] pr-[0.04em]";

type WordProps = Token & { highlight?: string };

function Word({ word, emphasis, index, highlight }: WordProps) {
  const highlighted = highlight && word.startsWith(highlight);
  return (
    <>
      <span className="split-word">
        <span
          style={{ "--i": index } as CSSProperties}
          className={emphasis ? EMPHASIS_CLASS : undefined}
        >
          {highlighted ? (
            <>
              <MetalText text={highlight} />
              {word.slice(highlight.length)}
            </>
          ) : (
            word
          )}
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
  highlight,
}: SplitWordsProps) {
  return (
    <Tag
      data-reveal="split"
      className={className}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {tokenizeLines(lines).map((tokens, lineIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: lines are static and positional
        <span key={lineIndex} className={lineClassName}>
          {tokens.map((token) => (
            <Word key={token.index} {...token} highlight={highlight} />
          ))}
        </span>
      ))}
    </Tag>
  );
}
