import { TocColumn } from "./TocColumn";
import type { TemplateProps } from "./types";

export function ProductTemplate({
  headings,
  header,
  footer,
  children,
}: TemplateProps) {
  return (
    <div className="grid gap-16 xl:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="min-w-0 max-w-3xl">
        {header}
        <div className="docs-flow mt-12 text-body text-muted-strong">
          {children}
        </div>
        {footer}
      </article>
      <TocColumn headings={headings} />
    </div>
  );
}
