import type { CSSProperties } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { Visual } from "@/components/visuals";
import { foundation } from "@/data/foundation";

const STAGGER_MS = 90;

export function Foundation() {
  return (
    <Section labelledBy="foundation-title">
      <SectionHeading id="foundation-title" {...foundation.heading} />
      <div className="-mx-frame-x mt-stack -mb-frame-y grid divide-y divide-border border-border border-t md:grid-cols-3 md:divide-x md:divide-y-0">
        {foundation.pillars.map(
          ({ label, title, description, visual }, index) => (
            <article
              key={title}
              data-reveal
              data-spotlight
              style={{ "--delay": `${index * STAGGER_MS}ms` } as CSSProperties}
              className="relative grid content-start justify-items-center gap-8 px-frame-x py-12 text-center md:gap-12 md:px-8 lg:px-12 lg:py-16"
            >
              <div className="size-48 md:size-56">
                <Visual name={visual} />
              </div>
              <div className="grid justify-items-center gap-5">
                <hgroup className="grid justify-items-center gap-3">
                  <p className="font-mono text-micro text-faint uppercase text-trim">
                    {label}
                  </p>
                  <h3 className="text-balance text-title text-trim">{title}</h3>
                </hgroup>
                <p className="max-w-sm text-pretty font-normal text-body text-muted text-trim">
                  {description}
                </p>
              </div>
            </article>
          ),
        )}
      </div>
    </Section>
  );
}
