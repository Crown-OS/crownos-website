import type { CSSProperties, ReactNode } from "react";
import { RevealText } from "@/components/motion";
import {
  ConstructionPattern,
  type PatternKey,
} from "@/components/visuals/construction";
import type { SectionCopy } from "@/data/feature";

type Alignment = "start" | "center";

const ALIGNMENT_CLASSES: Record<Alignment, string> = {
  start: "",
  center: "mx-auto justify-items-center text-center",
};

function PatternBand({
  pattern,
  children,
}: {
  pattern: PatternKey;
  children: ReactNode;
}) {
  return (
    <div className="relative -mx-frame-x -mt-frame-y px-frame-x pt-frame-y">
      <ConstructionPattern name={pattern} />
      {children}
    </div>
  );
}

export function SectionHeading({
  id,
  title,
  lead,
  align = "start",
  pattern,
}: SectionCopy & { id: string; align?: Alignment; pattern?: PatternKey }) {
  const header = (
    <header
      className={`relative grid max-w-3xl gap-6 md:gap-7 ${ALIGNMENT_CLASSES[align]}`}
    >
      <RevealText
        id={id}
        text={title}
        className="text-balance text-headline text-trim"
      />
      {lead && (
        <p
          data-reveal
          className="max-w-xl text-pretty font-normal text-lead text-muted text-trim"
          style={{ "--delay": "90ms" } as CSSProperties}
        >
          {lead}
        </p>
      )}
    </header>
  );
  return pattern ? (
    <PatternBand pattern={pattern}>{header}</PatternBand>
  ) : (
    header
  );
}
