import type { CSSProperties } from "react";
import { IconTile, Section, SectionHeading } from "@/components/ui";
import { trust } from "@/data/trust";

const STAGGER_MS = 80;

export function Trust() {
  return (
    <Section labelledBy="trust-title">
      <SectionHeading id="trust-title" {...trust.heading} />
      <div className="mt-stack grid border-border border-b md:grid-cols-2">
        {trust.points.map(({ icon, title, description }, index) => (
          <article
            key={title}
            data-reveal
            data-spotlight
            style={{ "--delay": `${index * STAGGER_MS}ms` } as CSSProperties}
            className="relative grid content-start justify-items-start gap-8 border-border border-t py-8 md:p-8 md:odd:border-r md:odd:pl-0 md:even:pr-0 lg:py-12"
          >
            {icon && <IconTile icon={icon} />}
            <div className="grid gap-4">
              <h3 className="text-balance text-title text-trim">{title}</h3>
              <p className="max-w-xl text-pretty font-normal text-lead text-muted">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
