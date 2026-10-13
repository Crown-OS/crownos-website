import type { CSSProperties, JSX } from "react";
import { Emphasis } from "@/components/ui/Emphasized";
import { splitEmphasisWords } from "@/util/emphasis";

type RevealTextProps = {
  text: string;
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p">;
  id?: string;
  className?: string;
  delay?: number;
};

export function RevealText({
  text,
  as: Tag = "h2",
  id,
  className,
  delay = 0,
}: RevealTextProps) {
  return (
    <Tag
      id={id}
      data-reveal="split"
      className={className}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {splitEmphasisWords(text).map((word, position) =>
        word ? (
          <span key={`w${word.index}`} className="split-word">
            <span style={{ "--i": word.index } as CSSProperties}>
              {word.emphasized ? <Emphasis>{word.text}</Emphasis> : word.text}
            </span>
          </span>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: gaps are static and positional
          <span key={`s${position}`}> </span>
        ),
      )}
    </Tag>
  );
}
