import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/catalog/CatalogHeader";
import { ArrowIcon } from "@/components/icons";
import { RevealText, RollText } from "@/components/motion";
import type { PostMeta } from "@/data/blog";
import { formatLongDate } from "@/util/format-date";
import { AuthorByline } from "./AuthorByline";

export function PostArticle({
  meta,
  children,
}: {
  meta: PostMeta;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto grid w-full max-w-3xl gap-16 px-gutter pt-32 pb-section md:pt-48">
      <header className="grid gap-10">
        <Link
          href="/blog"
          className="group flex w-fit items-center gap-3 font-mono text-micro text-muted uppercase transition-colors hover:text-foreground"
        >
          <ArrowIcon className="size-4 rotate-180 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
          <RollText text="All posts" />
        </Link>
        <Eyebrow>
          ({meta.tag}) ·{" "}
          <time dateTime={meta.date}>{formatLongDate(meta.date)}</time>
        </Eyebrow>
        <RevealText
          as="h1"
          text={meta.title}
          className="text-balance font-display text-display text-trim"
        />
        <p
          data-reveal
          className="text-pretty font-normal text-lead text-muted leading-normal"
        >
          {meta.description}
        </p>
        <div data-reveal className="border-border border-y py-6">
          <AuthorByline author={meta.author} />
        </div>
      </header>
      <div className="docs-flow text-body text-muted-strong">{children}</div>
    </article>
  );
}
