import Link from "next/link";
import type { CSSProperties } from "react";
import { FEATURE_ICONS } from "@/components/feature-icons";
import { Magnetic, RollText } from "@/components/motion";
import { BeamBackdrop } from "@/components/ui";
import type { Feature } from "@/data/feature";
import type { NavLink } from "@/data/footer";
import { ShowcaseVisual } from "./ShowcaseVisual";

type CardSize = "wide" | "compact";
type RailEdge = "top" | "bottom";

const SIZES = {
  wide: {
    frame: "md:col-span-2",
    body: "px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16",
    tile: "size-16 md:size-20",
    icon: "size-8 md:size-10",
    title: "max-w-2xl text-headline",
    visual: "max-w-5xl pt-12 md:pt-16",
  },
  compact: {
    frame: "",
    body: "px-6 pt-12 pb-10 md:px-10 md:pt-16 md:pb-12",
    tile: "size-14 md:size-16",
    icon: "size-7 md:size-8",
    title: "max-w-xl text-tagline",
    visual: "pt-10 md:pt-12",
  },
} as const satisfies Record<CardSize, Record<string, string>>;

const BUTTON_SIZE =
  "h-12 min-w-44 px-6 font-medium text-ui md:h-14 md:px-8 md:text-lead";

function Rail({ edge }: { edge: RailEdge }) {
  const placement =
    edge === "top"
      ? "bottom-full bg-linear-to-t"
      : "top-full hidden bg-linear-to-b md:block";
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 h-24 w-px -translate-x-1/2 from-white/20 to-transparent ${placement}`}
    >
      <span className="absolute top-1/2 left-1/2 size-3 -translate-1/2 rounded-full border border-white/18 bg-card shadow-[inset_0_0_0_3px_var(--color-background)]" />
    </span>
  );
}

function CardAction({
  link,
  variant,
}: {
  link: NavLink;
  variant: "primary" | "secondary";
}) {
  const className = `btn btn-${variant} ${BUTTON_SIZE}`;
  const label = <RollText text={link.label} />;
  return (
    <Magnetic>
      {link.href.startsWith("/") ? (
        <Link href={link.href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      )}
    </Magnetic>
  );
}

export function ShowcaseCard({
  feature,
  size,
  rails,
  delay = 0,
}: {
  feature: Feature;
  size: CardSize;
  rails: readonly RailEdge[];
  delay?: number;
}) {
  const sizing = SIZES[size];
  const Icon = feature.icon && FEATURE_ICONS[feature.icon];

  return (
    <div
      data-reveal
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      className={`beam-bezel squircle relative grid ${sizing.frame}`}
    >
      {rails.map((edge) => (
        <Rail key={edge} edge={edge} />
      ))}
      <article
        data-spotlight
        data-tone={feature.tone}
        className={`beam-surface squircle rounded-card group relative flex flex-col items-center overflow-hidden text-center ${sizing.body}`}
      >
        <BeamBackdrop />
        {Icon && (
          <span
            className={`icon-tile-vivid squircle rounded-tile relative grid place-items-center ${sizing.tile}`}
          >
            <Icon className={sizing.icon} />
          </span>
        )}
        <h3
          className={`relative mt-8 text-balance font-medium text-white text-trim md:mt-10 ${sizing.title}`}
        >
          {feature.label}
        </h3>
        <p className="relative mt-6 max-w-2xl text-pretty font-normal text-lead text-white/70 leading-normal">
          {feature.description}
        </p>
        {feature.actions && (
          <div className="relative mt-8 flex flex-wrap justify-center gap-3 md:mt-10 md:gap-4">
            <CardAction link={feature.actions.primary} variant="primary" />
            {feature.actions.secondary && (
              <CardAction
                link={feature.actions.secondary}
                variant="secondary"
              />
            )}
          </div>
        )}
        {feature.visual && (
          <div className={`relative mt-auto w-full text-left ${sizing.visual}`}>
            <ShowcaseVisual name={feature.visual} />
          </div>
        )}
      </article>
    </div>
  );
}
