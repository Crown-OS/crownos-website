import { Magnetic, RevealText, RollText } from "@/components/motion";
import { HorizonGrid, Section } from "@/components/ui";
import { beta } from "@/data/beta";

export function Beta() {
  return (
    <Section
      id="download"
      labelledBy="beta-title"
      edge="open-end"
      className="grid justify-items-center gap-8 overflow-clip pb-(--horizon-floor) text-center [--horizon-floor:24rem] md:gap-10 lg:pt-30"
    >
      <HorizonGrid />
      <div className="grid justify-items-center gap-8 md:gap-10">
        <RevealText
          id="beta-title"
          text={beta.title}
          delay={90}
          className="max-w-4xl text-balance text-display text-trim"
        />
        <p
          data-reveal
          className="max-w-md text-balance font-normal text-lead text-muted text-trim"
        >
          {beta.lead}
        </p>
      </div>
      <Magnetic>
        <a
          data-reveal
          href={beta.cta.href}
          className="btn btn-primary font-display mb-12 h-12 min-w-44 px-6 font-medium text-ui md:mb-16 md:h-14 md:px-8 md:text-lead"
        >
          <RollText text={beta.cta.label} />
        </a>
      </Magnetic>
    </Section>
  );
}
