import Link from "next/link";
import { CrownIcon } from "@/components/icons";
import { RollText } from "@/components/motion";
import { Section } from "@/components/ui";
import { beta } from "@/data/beta";

export function Beta() {
  return (
    <Section
      id="download"
      labelledBy="beta-title"
      className="grid justify-items-center gap-8 overflow-clip text-center md:gap-12"
    >
      <div
        aria-hidden
        data-tone="dusk"
        className="aurora pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[90%] [mask-image:linear-gradient(to_top,#000_15%,transparent)]"
      />
      <span
        data-reveal
        className="squircle rounded-badge grid size-24 place-items-center bg-[linear-gradient(160deg,var(--color-brand-light),var(--color-brand)_55%,var(--color-brand-deep))] shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_32px_64px_-24px_rgb(20_142_255/0.6)] md:size-32"
      >
        <CrownIcon className="w-12 md:w-16" />
      </span>
      <p
        data-reveal
        className="inline-flex items-center gap-3 font-mono text-micro text-muted uppercase"
      >
        <span className="size-1.5 animate-pulse rounded-full bg-brand" />
        {beta.status}
      </p>
      <h2
        id="beta-title"
        data-reveal
        className="max-w-4xl text-balance text-display text-trim"
      >
        {beta.title}
      </h2>
      <p
        data-reveal
        className="max-w-xl text-pretty font-normal text-lead text-muted"
      >
        {beta.lead}
      </p>
      <Link
        data-reveal
        href={beta.cta.href}
        className="inline-flex h-14 items-center rounded-full bg-paper px-8 text-ink text-lead"
      >
        <RollText text={beta.cta.label} />
      </Link>
      <p className="font-mono text-faint text-micro uppercase">
        {beta.platforms}
      </p>
    </Section>
  );
}
