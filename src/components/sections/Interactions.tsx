import { Parallax } from "@/components/motion";
import { IconTile, Section } from "@/components/ui";
import { Visual } from "@/components/visuals";
import { interactions } from "@/data/interactions";

export function Interactions() {
  return (
    <Section labelledBy="interactions-title">
      <h2 id="interactions-title" className="sr-only">
        Everyday interactions
      </h2>
      <div className="grid gap-24 md:gap-32">
        {interactions.map(({ icon, title, description, visual }) => (
          <article
            key={title}
            className="grid items-center gap-12 md:grid-cols-12 md:gap-6"
          >
            <div
              data-reveal
              className="grid justify-items-start gap-8 md:col-span-5 md:gap-10 lg:col-span-4 lg:col-start-2"
            >
              <IconTile icon={icon} />
              <div className="grid gap-6">
                <h3 className="text-balance text-tagline text-trim">{title}</h3>
                <p className="text-pretty font-normal text-lead text-muted">
                  {description}
                </p>
              </div>
            </div>
            <Parallax className="md:col-span-7 lg:col-span-6 lg:col-start-7">
              <div
                data-reveal
                data-spotlight
                data-tone="tide"
                className="aurora squircle rounded-card scroll-unveil relative aspect-[6/5] overflow-hidden"
              >
                <div className="scroll-zoom size-full">
                  <Visual name={visual} />
                </div>
              </div>
            </Parallax>
          </article>
        ))}
      </div>
    </Section>
  );
}
