import type { CSSProperties } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { Visual } from "@/components/visuals";
import { foundation } from "@/data/foundation";

const STAGGER_MS = 90;

export function Foundation() {
  return (
    <Section labelledBy="foundation-title">
      <SectionHeading
        id="foundation-title"
        align="center"
        {...foundation.heading}
      />
      <div className="mt-12 grid divide-y divide-border border-border border-y md:mt-24 md:grid-cols-3 md:divide-x md:divide-y-0">
        {foundation.pillars.map(
          ({ label, title, description, visual }, index) => (
            <article
              key={title}
              data-reveal
              style={{ "--delay": `${index * STAGGER_MS}ms` } as CSSProperties}
              className="grid content-start justify-items-center gap-6 px-6 py-12 text-center md:px-8 lg:px-12 lg:py-16"
            >
              <div className="mb-6 size-48 md:mb-12 md:size-56">
                <Visual name={visual} />
              </div>
              <p className="font-mono text-micro text-faint uppercase">
                {label}
              </p>
              <h3 className="text-balance text-title text-trim">{title}</h3>
              <p className="max-w-sm text-pretty font-normal text-lead text-muted">
                {description}
              </p>
            </article>
          ),
        )}
      </div>
    </Section>
  );
}
