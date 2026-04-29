const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-[0.78rem] text-[0.95rem] font-medium transition-[transform,background,border-color,box-shadow] duration-150 cursor-pointer [&>svg]:size-4";

export const btnPrimary = `${btnBase} border-[color-mix(in_srgb,var(--color-foreground)_30%,transparent)] bg-cta text-accent-fg shadow-glow-cta hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--color-foreground)_50%,transparent)] hover:opacity-100`;

export const btnSecondary = `${btnBase} border-border bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] text-foreground backdrop-blur-[6px] hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--color-foreground)_50%,transparent)] hover:opacity-100`;

export const btnGhost = `${btnBase} border-transparent bg-transparent text-foreground hover:bg-[color-mix(in_srgb,var(--color-foreground)_5%,transparent)] hover:opacity-100`;

export const iconTile =
  "relative inline-flex size-[2.6rem] items-center justify-center rounded-md border border-border bg-icon-tile text-foreground shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_12%,transparent)]";

export const iconTileSm =
  "relative inline-flex size-[2.5rem] items-center justify-center rounded-md border border-border bg-icon-tile text-foreground shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_12%,transparent)]";

export const card =
  "relative isolate overflow-hidden grid gap-3 rounded-xl border border-border bg-card p-[1.4rem] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-foreground)_30%,transparent)] hover:shadow-pop before:absolute before:inset-0 before:-z-10 before:bg-card-radial before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100";

export const archChip =
  "rounded-full border border-border bg-[color-mix(in_srgb,var(--color-foreground)_3%,transparent)] px-[0.6rem] py-1 text-[0.78rem] text-muted-strong";
