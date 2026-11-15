import type { AppChipTone } from "@/data/agent";

const CHIP_TONES = {
  orange: "bg-sweep-orange text-ink",
  blue: "bg-sweep-blue text-white",
  neutral: "bg-white/80 text-ink",
} as const;

export function AppChip({ app, tone }: { app: string; tone: AppChipTone }) {
  return (
    <span className="mx-0.5 inline-flex items-center gap-1.5 rounded-md bg-white/8 px-1.5 py-0.5 align-[0.05em] text-[0.875rem] leading-none text-white">
      <span
        aria-hidden="true"
        className={`grid size-3.5 place-items-center rounded-[4px] text-[0.5625rem] font-semibold ${CHIP_TONES[tone]}`}
      >
        {app[0]}
      </span>
      {app}
    </span>
  );
}
