import type { CSSProperties } from "react";
import { IconTile, Section, SectionHeading } from "@/components/ui";
import { trust } from "@/data/trust";

const STAGGER_MS = 80;

export function Trust() {
  return (
    <Section labelledBy="trust-title">
      <SectionHeading id="trust-title" {...trust.heading} pattern="poster" />
      <div className="-mx-frame-x mt-stack -mb-frame-y grid md:grid-cols-2">
        {trust.points.map(({ icon, label, title, description }, index) => (
          <article
            key={title}
            data-reveal
            data-spotlight
            style={{ "--delay": `${index * STAGGER_MS}ms` } as CSSProperties}
            className="relative grid content-start justify-items-start gap-8 border-border border-t px-frame-x py-12 lg:py-16 md:odd:border-r"
          >
            {icon && <IconTile icon={icon} />}
            <div className="grid gap-5">
              <hgroup className="grid gap-3">
                <p className="font-mono text-micro text-faint uppercase text-trim">
                  {label}
                </p>
                <h3 className="text-balance text-title text-trim">{title}</h3>
              </hgroup>
              <p className="max-w-xl text-pretty font-normal text-body text-muted text-trim">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
