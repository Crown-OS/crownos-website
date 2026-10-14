import { Magnetic, RevealText, RollText } from "@/components/motion";
import { HorizonGrid, Section } from "@/components/ui";
import { beta } from "@/data/beta";
import { site } from "@/data/site";

export function Beta() {
  return (
    <Section
      id="download"
      labelledBy="beta-title"
      className="grid justify-items-center gap-10 overflow-clip pb-(--horizon-floor) text-center [--horizon-floor:24rem] md:gap-12"
    >
      <HorizonGrid label={site.name} />
      <div className="grid justify-items-center gap-8">
        <RevealText
          id="beta-title"
          text={beta.title}
          delay={90}
          className="max-w-4xl text-balance text-display text-trim"
        />
        <p
          data-reveal
          className="max-w-md text-balance font-normal text-lead text-muted leading-normal"
        >
          {beta.lead}
        </p>
      </div>
      <Magnetic>
        <a
          data-reveal
          href={beta.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary h-14 px-8 font-medium text-lead"
        >
          <RollText text={beta.cta.label} />
        </a>
      </Magnetic>
    </Section>
  );
}
