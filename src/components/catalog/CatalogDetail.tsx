import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/icons";
import { RevealText, RollText } from "@/components/motion";
import {
  type CatalogKind,
  type CatalogMeta,
  catalogCopy,
} from "@/data/catalog";
import { Eyebrow } from "./CatalogHeader";
import { CopyCommand } from "./CopyCommand";

type CatalogDetailProps = {
  kind: CatalogKind;
  meta: CatalogMeta;
  visual: ReactNode;
  related: ReactNode;
  children: ReactNode;
};

function MetaList({ meta }: { meta: CatalogMeta }) {
  const rows = [
    ["Author", meta.author],
    ["Version", meta.version],
    ["Category", meta.category],
    ["Tags", meta.tags.join(", ")],
  ];
  return (
    <dl className="grid border-border border-t">
      {rows.map(([term, detail]) => (
        <div
          key={term}
          className="flex justify-between gap-6 border-border border-b py-4"
        >
          <dt className="font-mono text-micro text-faint uppercase">{term}</dt>
          <dd className="text-right text-muted text-ui">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CatalogDetail({
  kind,
  meta,
  visual,
  related,
  children,
}: CatalogDetailProps) {
  return (
    <article className="mx-auto grid w-full max-w-[90rem] gap-section px-gutter pt-32 pb-section md:pt-48">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="grid content-start gap-12 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Link
            href={`/${kind}`}
            className="group flex w-fit items-center gap-3 font-mono text-micro text-muted uppercase transition-colors hover:text-foreground"
          >
            <ArrowIcon className="size-4 rotate-180 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
            <RollText text={`All ${kind}`} />
          </Link>
          <div className="grid gap-6">
            <Eyebrow>
              ({meta.category}) — {catalogCopy[kind].eyebrow}
            </Eyebrow>
            <RevealText
              as="h1"
              text={meta.name}
              className="font-display text-display text-trim"
            />
          </div>
          <p
            data-reveal
            className="text-pretty font-normal text-lead text-muted leading-normal"
          >
            {meta.description}
          </p>
          <div data-reveal className="grid gap-8">
            <CopyCommand
              command={`${catalogCopy[kind].install} ${meta.slug}`}
            />
            <MetaList meta={meta} />
          </div>
        </div>
        <div className="grid content-start gap-16 lg:col-span-6 lg:col-start-7">
          <div data-reveal>{visual}</div>
          <div data-reveal className="grid gap-6">
            {children}
          </div>
        </div>
      </div>
      {related}
    </article>
  );
}
