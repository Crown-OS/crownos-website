import type { CSSProperties } from "react";
import { Parallax } from "@/components/motion";
import { Section } from "@/components/ui";
import { Visual } from "@/components/visuals";
import type { Feature } from "@/data/feature";
import { showcase } from "@/data/showcase";

type Layout = "spotlight" | "stacked";

const CARD_SURFACE =
  "aurora squircle rounded-card group relative overflow-hidden";

function CardHeading({ label }: Pick<Feature, "label">) {
  return (
    <h3 className="max-w-xl text-balance font-content font-medium text-tagline text-white text-trim">
      {label}
    </h3>
  );
}

function CardDescription({ text }: { text: string }) {
  return (
    <p className="max-w-lg text-pretty font-normal text-lead text-white/75 text-trim">
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
      <div className="transition-[scale] duration-700 ease-out-expo group-hover:scale-[1.03]">
        <Visual name={feature.visual} />
      </div>
    </Parallax>
  );

  if (layout === "spotlight") {
    return (
      <article
        data-reveal
        data-spotlight
        data-tone={feature.tone}
        className={`${CARD_SURFACE} grid gap-12 p-8 md:col-span-2 md:p-12 lg:grid-cols-[5fr_7fr] lg:gap-16`}
      >
        <div className="flex flex-col justify-between gap-6">
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
      data-spotlight
      data-tone={feature.tone}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      className={`${CARD_SURFACE} flex flex-col gap-6 p-8 md:row-span-3 md:grid md:grid-rows-subgrid md:p-12`}
    >
      <CardHeading {...feature} />
      <CardDescription text={feature.description} />
      <div className="mt-auto pt-6">{visual}</div>
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
            key={feature.label}
            feature={feature}
            layout="stacked"
            delay={index * 90}
          />
        ))}
      </div>
    </Section>
  );
}
