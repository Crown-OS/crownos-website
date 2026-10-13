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
              className="grid justify-items-start gap-6 md:col-span-5 md:gap-8 lg:col-span-4 lg:col-start-2"
            >
              <IconTile icon={icon} />
              <h3 className="text-balance text-headline text-trim">{title}</h3>
              <p className="text-pretty font-normal text-lead text-muted">
                {description}
              </p>
            </div>
            <Parallax className="md:col-span-7 lg:col-span-6 lg:col-start-7">
              <div
                data-reveal
                data-tone="tide"
                className="aurora squircle rounded-card aspect-[6/5] overflow-hidden"
              >
                <Visual name={visual} />
              </div>
            </Parallax>
          </article>
        ))}
      </div>
    </Section>
  );
}
