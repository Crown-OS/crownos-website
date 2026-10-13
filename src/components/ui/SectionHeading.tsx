import type { CSSProperties } from "react";
import type { SectionCopy } from "@/data/feature";
import { Emphasized } from "./Emphasized";

export function SectionHeading({
  id,
  title,
  lead,
}: SectionCopy & { id: string }) {
  return (
    <header className="grid max-w-4xl gap-6 md:gap-8">
      <h2 id={id} data-reveal className="text-balance text-headline text-trim">
        <Emphasized text={title} />
      </h2>
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
