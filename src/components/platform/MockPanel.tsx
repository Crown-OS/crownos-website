import type { ComponentProps } from "react";

export function MockPanel({
  className = "",
  ...panelProps
}: ComponentProps<"div">) {
  return (
    <div
      {...panelProps}
      className={`rounded-2xl border border-white/10 bg-[#101012] shadow-[0_1px_0_rgb(255_255_255/0.04)_inset,0_16px_40px_rgb(0_0_0/0.45)] ${className}`}
    />
  );
}
