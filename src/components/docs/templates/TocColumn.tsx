import type { DocHeading } from "@/util/docs-headings";
import { DocsToc } from "../shell/DocsToc";

export function TocColumn({
  headings,
  title = "On this page",
}: {
  headings: DocHeading[];
  title?: string;
}) {
  return (
    <aside className="max-xl:hidden">
      <div
        data-lenis-prevent
        className="sticky top-(--docs-anchor) max-h-[calc(100svh-var(--docs-anchor))] overflow-y-auto pb-10"
      >
        <DocsToc headings={headings} title={title} />
      </div>
    </aside>
  );
}
