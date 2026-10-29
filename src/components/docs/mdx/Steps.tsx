import type { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="grid [counter-reset:step]">{children}</ol>;
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-5 pb-8 [counter-increment:step] last:pb-0">
      <span
        aria-hidden
        className="relative z-10 grid size-8 place-items-center rounded-full border border-border-strong bg-background font-mono text-micro text-foreground before:content-[counter(step)]"
      />
      <span
        aria-hidden
        className="absolute top-9 bottom-1 left-4 w-px bg-border-strong [li:last-child>&]:hidden"
      />
      <div className="docs-flow pt-1.5 [--flow:1rem]">
        <p className="font-medium text-foreground">{title}</p>
        {children}
      </div>
    </li>
  );
}
