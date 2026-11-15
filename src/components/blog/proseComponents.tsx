import type { MDXComponents } from "mdx/types";

export const proseComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-14 scroll-mt-10 text-[1.375rem] leading-[1.3] font-medium tracking-[-0.015em] text-white first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 scroll-mt-10 text-[1.125rem] font-medium text-white"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mt-5 text-[1.0625rem] leading-[1.6] text-white/60"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-5 grid gap-2.5 text-[1.0625rem] leading-[1.6] text-white/60"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 grid list-decimal gap-2.5 pl-6 text-[1.0625rem] leading-[1.6] text-white/60 marker:text-white/40"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="relative pl-1 [ul>&]:pl-6 [ul>&]:before:absolute [ul>&]:before:top-[0.8em] [ul>&]:before:left-0 [ul>&]:before:h-px [ul>&]:before:w-3 [ul>&]:before:bg-sweep-sky"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-sweep-sky"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-medium text-white" {...props} />,
  code: (props) => (
    <code
      className="bg-white/6 px-1.5 py-0.5 font-mono text-[0.85em] text-white [pre_&]:bg-transparent [pre_&]:p-0"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto border border-white/8 bg-surface p-5 text-[0.875rem] leading-[1.7]"
      {...props}
    />
  ),
  table: (props) => (
    <div className="mt-7 overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-[0.9375rem]"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-white/10 bg-white/4 px-3.5 py-3 font-medium text-white"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border border-white/10 px-3.5 py-3 text-white/70"
      {...props}
    />
  ),
};
