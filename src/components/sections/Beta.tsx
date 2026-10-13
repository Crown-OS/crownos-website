import Link from "next/link";
import { Magnetic, RevealText, RollText } from "@/components/motion";
import { Section } from "@/components/ui";
import { beta } from "@/data/beta";

export function Beta() {
  return (
    <Section
      id="download"
      labelledBy="beta-title"
      className="grid justify-items-center gap-10 overflow-clip text-center md:gap-12"
    >
      <div
        aria-hidden
        data-tone="dusk"
        className="aurora pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[90%] [mask-image:linear-gradient(to_top,#000_15%,transparent)]"
      />
      <div className="grid justify-items-center gap-6">
        <RevealText
          id="beta-title"
          text={beta.title}
          delay={90}
          className="max-w-4xl text-balance text-display text-trim"
        />
        <p
          data-reveal
          className="max-w-xl text-pretty font-normal text-lead text-muted"
        >
          {beta.lead}
        </p>
      </div>
      <Magnetic>
        <Link
          data-reveal
          href={beta.cta.href}
          className="inline-flex h-14 items-center rounded-full bg-paper px-8 text-ink text-lead"
        >
          <RollText text={beta.cta.label} />
        </Link>
      </Magnetic>
    </Section>
  );
}
