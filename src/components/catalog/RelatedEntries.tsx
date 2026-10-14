import type { ReactNode } from "react";
import { RevealText } from "@/components/motion";

export function RelatedEntries({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="related-title" className="grid gap-stack">
      <RevealText
        id="related-title"
        text={title}
        className="text-balance text-headline text-trim"
      />
      {children}
    </section>
  );
}
