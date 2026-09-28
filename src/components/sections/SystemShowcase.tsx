import type { CSSProperties } from "react";
import { CrownLogo } from "@/components/brand/CrownLogo";
import { HorizontalTrack, SplitWords } from "@/components/motion";
import { type Capability, system } from "@/data/crownos";
import { CapabilityVisual } from "./CapabilityVisual";

const CARD_OFFSETS = ["md:mb-0", "md:mb-16", "md:mb-6", "md:mb-24"] as const;

function IntroPanel() {
  return (
    <div className="relative flex min-h-svh w-screen shrink-0 flex-col px-gutter pt-28 pb-10 md:h-full md:min-h-0">
      <p data-reveal className="max-w-[36rem] text-title">
        {system.intro}
      </p>

      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <CrownLogo className="w-[min(46vw,26rem)] animate-float drop-shadow-[10px_18px_30px_rgb(0_0_0/0.55)]" />
      </div>

      <div className="absolute inset-x-gutter top-1/2 flex justify-between text-ui text-muted uppercase">
        <span>{system.sideLeft}</span>
        <span>{system.sideRight}</span>
      </div>

      <SplitWords
        as="p"
        lines={[system.wordmark]}
        className="mt-auto text-mega"
      />
    </div>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  return (
    <article
      data-reveal
      style={{ "--delay": `${index * 90}ms` } as CSSProperties}
      className={`group grid w-full content-end gap-3 md:w-[clamp(17rem,24vw,24rem)] ${CARD_OFFSETS[index]}`}
    >
      <p className="font-mono text-micro text-ink/50 uppercase">
        {capability.kicker}
      </p>
      <h3 className="text-title">{capability.title}</h3>
      <div className="grid h-[clamp(11rem,30vh,16rem)] content-center rounded-lg bg-ink p-5 text-foreground">
        <CapabilityVisual visual={capability.visual} />
      </div>
      <p className="max-w-[22rem] text-ui text-ink/60 leading-snug">
        {capability.description}
      </p>
    </article>
  );
}

function CapabilityDeck() {
  return (
    <div className="shrink-0 px-gutter py-6 md:h-full md:pl-0">
      <div className="flex h-full flex-col justify-between gap-12 rounded-2xl bg-paper p-[clamp(1.25rem,3vw,2.5rem)] text-ink">
        <SplitWords
          as="h2"
          lines={[`${system.cardTitle} *`]}
          className="text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-[-0.06em]"
        />
        <div className="grid gap-10 md:flex md:items-end md:gap-5">
          {system.capabilities.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatementPanel() {
  return (
    <div className="flex shrink-0 flex-col justify-between gap-16 px-gutter py-24 md:h-full md:w-[min(92vw,78rem)] md:py-20">
      <SplitWords
        as="p"
        lines={[system.statement]}
        lineClassName="inline"
        className="max-w-[46rem] text-title"
      />
      <SplitWords
        as="p"
        lines={[system.signature]}
        className="text-[clamp(3.5rem,11vw,11rem)] leading-[0.9] tracking-[-0.06em]"
      />
    </div>
  );
}

export function SystemShowcase() {
  return (
    <HorizontalTrack id="system" label="System">
      <IntroPanel />
      <CapabilityDeck />
      <StatementPanel />
    </HorizontalTrack>
  );
}
