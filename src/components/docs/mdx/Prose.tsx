import Link from "next/link";
import type { ComponentProps } from "react";
import { textOf } from "@/util/react-text";
import { slugify } from "@/util/slug";

type HeadingTag = "h2" | "h3" | "h4";

const HEADING_STYLES: Record<HeadingTag, string> = {
  h2: "text-title text-trim",
  h3: "text-lead font-medium text-trim",
  h4: "text-body font-medium",
};

function anchoredHeading(Tag: HeadingTag) {
  return function AnchoredHeading({
    children,
    ...props
  }: ComponentProps<HeadingTag>) {
    const id = slugify(textOf(children));
    return (
      <Tag
        id={id}
        className={`group/heading scroll-mt-(--docs-anchor) text-balance text-foreground ${HEADING_STYLES[Tag]}`}
        {...props}
      >
        <a href={`#${id}`} className="relative">
          {children}
          <span
            aria-hidden
            className="absolute top-1/2 -left-5 -translate-y-1/2 font-normal text-faint opacity-0 transition-opacity group-hover/heading:opacity-100"
          >
            #
          </span>
        </a>
      </Tag>
    );
  };
}

function Anchor({ href = "", ...props }: ComponentProps<"a">) {
  const className =
    "font-medium text-foreground underline decoration-faint underline-offset-4 transition-colors hover:decoration-foreground";
  if (href.startsWith("/"))
    return <Link href={href} className={className} {...props} />;
  if (href.startsWith("#"))
    return <a href={href} className={className} {...props} />;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...props}
    />
  );
}

function InlineCode(props: ComponentProps<"code">) {
  if ("data-language" in props) return <code {...props} />;
  return (
    <code
      className="rounded-sm border border-border bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  );
}

export const proseComponents = {
  h2: anchoredHeading("h2"),
  h3: anchoredHeading("h3"),
  h4: anchoredHeading("h4"),
  p: (props: ComponentProps<"p">) => <p className="text-pretty" {...props} />,
  a: Anchor,
  code: InlineCode,
  pre: (props: ComponentProps<"pre">) => <pre {...props} />,
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-medium text-foreground" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => <ul className="grid gap-2" {...props} />,
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="grid list-decimal gap-2 pl-5 marker:font-mono marker:text-faint"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => (
    <li
      className="relative pl-5 in-[ol]:pl-1 before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-2.5 before:bg-faint in-[ol]:before:hidden"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="docs-flow border-border-strong border-l pl-5 text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="border-border" />,
  img: ({ alt = "", ...props }: ComponentProps<"img">) => (
    // biome-ignore lint/performance/noImgElement: static export serves MDX images as-is
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className="squircle rounded-tile"
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="squircle overflow-x-auto rounded-tile border border-border">
      <table className="w-full border-collapse text-left text-ui" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="border-border border-b bg-white/[0.02] px-4 py-3 font-mono font-normal text-faint text-micro uppercase"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      className="border-border border-b px-4 py-3 align-top leading-normal [tr:last-child>&]:border-b-0"
      {...props}
    />
  ),
};
