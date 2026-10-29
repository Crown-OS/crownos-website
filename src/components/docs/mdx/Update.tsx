import type { ReactNode } from "react";
import { slugify } from "@/util/slug";
import { Badge } from "./Badge";

type UpdateProps = {
  label: string;
  description?: string;
  tags?: string[];
  children: ReactNode;
};

export function Update({
  label,
  description,
  tags = [],
  children,
}: UpdateProps) {
  return (
    <section
      id={slugify(label)}
      className="grid scroll-mt-(--docs-anchor) gap-6 border-border border-b py-12 first:pt-0 last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
    >
      <header className="grid content-start gap-3 md:sticky md:top-(--docs-anchor) md:self-start">
        <span className="w-fit rounded-control bg-paper px-3 py-1 font-mono text-ink text-micro">
          {label}
        </span>
        {description && (
          <span className="font-medium text-foreground text-ui">
            {description}
          </span>
        )}
        {tags.length > 0 && (
          <span className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
        )}
      </header>
      <div className="docs-flow docs-update min-w-0">{children}</div>
    </section>
  );
}
