import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-8 text-balance font-display text-title text-trim first:mt-0"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-4 text-lead text-trim" {...props} />,
  p: (props) => (
    <p
      className="max-w-2xl text-pretty font-normal text-lead text-muted leading-normal"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="grid gap-3 font-normal text-lead text-muted leading-normal"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="relative pl-6 before:absolute before:top-[0.65em] before:left-0 before:h-px before:w-3 before:bg-faint"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-foreground underline decoration-faint underline-offset-4 transition-colors hover:decoration-foreground"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-xs bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="squircle overflow-x-auto rounded-tile border border-border bg-white/[0.03] p-6 font-mono text-ui leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto">
      <table className="w-full border-border border-t text-left" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-border border-b py-4 pr-6 font-mono font-normal text-faint text-micro uppercase"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-border border-b py-4 pr-6 font-normal text-muted text-ui"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
