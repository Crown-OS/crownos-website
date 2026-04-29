export const pageHero =
  "relative isolate grid gap-4 overflow-hidden rounded-[2rem] border border-border p-[clamp(2rem,5vw,3.5rem)] bg-page-hero";

export const pageOrbsWrap = "absolute inset-0 -z-10 pointer-events-none";

export const pageOrbA =
  "absolute -top-32 -right-24 size-[22rem] rounded-full opacity-50 blur-[80px] bg-orb-page animate-float";

export const pageOrbB =
  "absolute -bottom-40 -left-24 size-[22rem] rounded-full opacity-50 blur-[80px] bg-orb-soft animate-float-slow";

export const pageBadge =
  "inline-flex w-fit items-center gap-2 rounded-full border border-border bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] px-[0.8rem] py-[0.35rem] text-[0.82rem] text-muted-strong backdrop-blur-[6px] [&>svg]:size-[0.85rem]";

export const pageTitle =
  "max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] leading-none tracking-[-0.045em] text-balance text-gradient";

export const pageDescription =
  "max-w-[60ch] text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.65] text-muted-strong";

export const pageActions = "mt-2 flex flex-wrap gap-3";

export const section = "grid gap-6";

export const cardGrid2 = "grid grid-cols-2 gap-4 max-[720px]:grid-cols-1";
export const cardGrid3 =
  "grid grid-cols-3 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1";
export const cardGrid4 =
  "grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1";

export const subCard =
  "relative isolate grid gap-3 overflow-hidden rounded-2xl border border-border bg-card p-[1.4rem] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-foreground)_30%,transparent)] hover:shadow-pop before:absolute before:inset-0 before:-z-10 before:bg-card-radial before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100";

export const cardHeader = "flex items-center gap-3";

export const cardTitle = "text-[1.05rem] tracking-[-0.02em]";

export const cardDesc = "text-[0.93rem] leading-[1.55] text-muted";

export const iconBox =
  "inline-flex size-10 items-center justify-center rounded-md border border-border bg-icon-tile text-foreground shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_12%,transparent)] [&>svg]:size-5";

export const code =
  "overflow-x-auto rounded-2xl border border-border bg-[color-mix(in_srgb,var(--color-pitch)_60%,transparent)] px-[1.1rem] py-4 font-mono text-[0.85rem] leading-[1.7] text-muted-strong backdrop-blur-[12px]";

export const promptToken = "text-foreground";
export const commentToken = "text-gray-500";

export const statRow = "grid grid-cols-4 gap-4 max-[720px]:grid-cols-2";
export const statCard =
  "grid gap-1 rounded-2xl border border-border bg-card px-5 py-[1.1rem]";
export const statValue = "text-[1.6rem] font-semibold tracking-[-0.025em]";
export const statLabel = "text-[0.86rem] text-muted";

export const ctaBanner =
  "relative isolate grid gap-4 overflow-hidden rounded-2xl border border-border bg-cta-banner p-[clamp(1.5rem,3vw,2.25rem)]";

export const ctaBannerHeading =
  "max-w-[28ch] text-[clamp(1.4rem,2.5vw,1.8rem)] tracking-[-0.03em]";

export const ctaBannerText = "max-w-[60ch] leading-[1.6] text-muted-strong";
