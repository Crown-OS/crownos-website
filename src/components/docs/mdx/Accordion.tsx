import type { ReactNode } from "react";
import { DocIcon } from "../DocIcon";

type DisclosureProps = { title: string; children: ReactNode };

export function Accordion({ title, children }: DisclosureProps) {
  return (
    <details className="docs-disclosure group/accordion squircle rounded-tile border border-border bg-white/[0.02]">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
        <DocIcon
          name="chevron"
          className="size-4 shrink-0 text-faint transition-transform duration-300 ease-out-expo group-open/accordion:rotate-90"
        />
        {title}
      </summary>
      <div className="docs-flow px-5 pb-5 pl-12">{children}</div>
    </details>
  );
}

export function AccordionGroup({ children }: { children: ReactNode }) {
  return (
    <div className="docs-accordion-group squircle overflow-hidden rounded-tile border border-border bg-white/[0.02]">
      {children}
    </div>
  );
}

export function Expandable({
  title = "properties",
  children,
}: Partial<DisclosureProps>) {
  return (
    <details className="docs-disclosure group/expandable squircle mt-4 rounded-lg border border-border">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-muted text-ui transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
        <DocIcon
          name="chevron"
          className="size-3.5 transition-transform duration-300 ease-out-expo group-open/expandable:rotate-90"
        />
        <span className="group-open/expandable:hidden">Show {title}</span>
        <span className="hidden group-open/expandable:inline">
          Hide {title}
        </span>
      </summary>
      <div className="border-border border-t px-4">{children}</div>
    </details>
  );
}
