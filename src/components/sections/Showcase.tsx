import type { CSSProperties } from "react";
import { Parallax } from "@/components/motion";
import { Section } from "@/components/ui";
import { Visual } from "@/components/visuals";
import type { Feature } from "@/data/feature";
import { showcase } from "@/data/showcase";

type Layout = "spotlight" | "stacked";

const CARD_SURFACE = "aurora squircle rounded-card relative overflow-hidden";

function CardHeading({ label, title }: Pick<Feature, "label" | "title">) {
  return (
    <hgroup className="grid gap-3">
      <p className="text-tagline text-white/60 text-trim">{label}</p>
      <h3 className="text-balance text-tagline text-trim">{title}</h3>
    </hgroup>
  );
}

function CardDescription({ text }: { text: string }) {
  return (
    <p className="max-w-lg text-pretty font-normal text-lead text-white/80">
      {text}
    </p>
  );
}

function ShowcaseCard({
  feature,
  layout,
  delay = 0,
}: {
  feature: Feature;
  layout: Layout;
  delay?: number;
}) {
  const visual = feature.visual && (
    <Parallax distance={20} className="relative">
      <Visual name={feature.visual} />
    </Parallax>
  );

  if (layout === "spotlight") {
    return (
      <article
        data-reveal
        data-tone={feature.tone}
        className={`${CARD_SURFACE} grid gap-12 p-8 md:col-span-2 md:p-12 lg:grid-cols-[5fr_7fr] lg:gap-16`}
      >
        <div className="flex flex-col justify-between gap-12">
          <CardHeading {...feature} />
          <CardDescription text={feature.description} />
        </div>
        {visual}
      </article>
    );
  }

  return (
    <article
      data-reveal
      data-tone={feature.tone}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      className={`${CARD_SURFACE} flex flex-col gap-12 p-8 md:p-12`}
    >
      <div className="grid gap-6">
        <CardHeading {...feature} />
        <CardDescription text={feature.description} />
      </div>
      <div className="mt-auto">{visual}</div>
    </article>
  );
}

export function Showcase() {
  return (
    <Section labelledBy="showcase-title">
      <h2 id="showcase-title" className="sr-only">
        Highlights
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <ShowcaseCard feature={showcase.spotlight} layout="spotlight" />
        {showcase.pair.map((feature, index) => (
          <ShowcaseCard
            key={feature.title}
            feature={feature}
            layout="stacked"
            delay={index * 90}
          />
        ))}
      </div>
    </Section>
  );
}
