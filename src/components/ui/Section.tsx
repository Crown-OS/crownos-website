import type { ReactNode } from "react";

type FrameEdge = "closed" | "open-end";

const FRAME_EDGES = {
  closed: { band: "border-y lg:border-y-0", box: "lg:border" },
  "open-end": {
    band: "border-t lg:border-t-0",
    box: "lg:border-x lg:border-t",
  },
} as const satisfies Record<FrameEdge, { band: string; box: string }>;

type SectionProps = {
  labelledBy: string;
  id?: string;
  edge?: FrameEdge;
  className?: string;
  children: ReactNode;
};

export function Section({
  labelledBy,
  id,
  edge = "closed",
  className,
  children,
}: SectionProps) {
  const edges = FRAME_EDGES[edge];
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`defer-render border-border ${edges.band}`}
    >
      <div
        className={`relative mx-auto w-full max-w-frame border-border px-frame-x py-frame-y ${edges.box} ${className ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
