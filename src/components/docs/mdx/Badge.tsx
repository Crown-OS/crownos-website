import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 items-center rounded-control border border-border-strong px-2 font-mono text-[0.6875rem] text-muted uppercase tracking-wide">
      {children}
    </span>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border-strong border-b-2 bg-white/[0.04] px-1.5 font-mono text-[0.75rem] text-foreground">
      {children}
    </kbd>
  );
}
