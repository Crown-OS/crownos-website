import type { CSSProperties, JSX } from "react";
import { PHRASE_SWEEP_VARS } from "@/data/shimmer";
import { mergeEmphasisRuns, type Token, tokenizeLines } from "@/util/emphasis";
import { MetalText } from "./MetalText";

const EMPHASIS_TYPE_CLASS =
  "font-serif text-[1.06em] font-normal italic tracking-[-0.02em]";

export const EMPHASIS_CLASS = `${EMPHASIS_TYPE_CLASS} pr-[0.04em] text-foreground`;
export const EMPHASIS_GRADIENT_CLASS = `${EMPHASIS_TYPE_CLASS} pr-[0.04em] text-gradient-noise`;

const EMPHASIS_VARIANT_CLASS = {
  solid: EMPHASIS_CLASS,
  gradient: EMPHASIS_GRADIENT_CLASS,
  sweep: `${EMPHASIS_TYPE_CLASS} -mr-[0.06em] pr-[0.1em] text-sweep`,
} as const;

type EmphasisVariant = keyof typeof EMPHASIS_VARIANT_CLASS;

type SplitWordsProps = {
  lines: readonly string[];
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p" | "span">;
  className?: string;
  lineClassName?: string;
  delay?: number;
  highlight?: string;
  highlightClassName?: string;
  emphasisVariant?: EmphasisVariant;
};

type WordProps = Token &
  Pick<SplitWordsProps, "highlight" | "highlightClassName"> & {
    emphasisVariant: EmphasisVariant;
  };

function WordContent({
  word,
  highlight,
  highlightClassName,
}: Omit<WordProps, "emphasis" | "emphasisVariant" | "index">) {
  if (highlight && word.startsWith(highlight)) {
    return (
      <>
        <MetalText text={highlight} className={highlightClassName} />
        {word.slice(highlight.length)}
      </>
    );
  }
  return word;
}

function Word({ emphasis, emphasisVariant, ...content }: WordProps) {
  const gradient = emphasis && emphasisVariant === "gradient";
  const sweep = emphasis && emphasisVariant === "sweep";
  return (
    <>
      <span className="split-word">
        <span
          style={
            {
              "--i": content.index,
              ...(sweep && PHRASE_SWEEP_VARS),
            } as CSSProperties
          }
          className={
            emphasis ? EMPHASIS_VARIANT_CLASS[emphasisVariant] : undefined
          }
          data-text={gradient || sweep ? content.word : undefined}
        >
          <WordContent {...content} />
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
  highlightClassName,
  emphasisVariant = "solid",
}: SplitWordsProps) {
  const tokenLines =
    emphasisVariant === "sweep"
      ? tokenizeLines(lines).map(mergeEmphasisRuns)
      : tokenizeLines(lines);
  return (
    <Tag
      data-reveal="split"
      className={className}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {tokenLines.map((tokens, lineIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: lines are static and positional
        <span key={lineIndex} className={lineClassName}>
          {tokens.map((token) => (
            <Word
              key={token.index}
              {...token}
              highlight={highlight}
              highlightClassName={highlightClassName}
              emphasisVariant={emphasisVariant}
            />
          ))}
        </span>
      ))}
    </Tag>
  );
}
