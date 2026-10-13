import type { CSSProperties } from "react";
import { RevealText } from "@/components/motion";
import type { SectionCopy } from "@/data/feature";

type Alignment = "start" | "center";

const ALIGNMENT_CLASSES: Record<Alignment, string> = {
  start: "",
  center: "mx-auto justify-items-center text-center",
};

export function SectionHeading({
  id,
  title,
  lead,
  align = "start",
}: SectionCopy & { id: string; align?: Alignment }) {
  return (
    <header
      className={`grid max-w-4xl gap-6 md:gap-8 ${ALIGNMENT_CLASSES[align]}`}
    >
      <RevealText
        id={id}
        text={title}
        className="text-balance text-headline text-trim"
      />
      {lead && (
        <p
          data-reveal
          className="max-w-2xl text-pretty font-normal text-lead text-muted text-trim"
          style={{ "--delay": "90ms" } as CSSProperties}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
