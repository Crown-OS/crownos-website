import type { CSSProperties, ReactNode } from "react";

const COPIES = [0, 1] as const;

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
};

export function Marquee({
  children,
  className,
  durationSeconds,
}: MarqueeProps) {
  const style = durationSeconds
    ? ({ "--marquee-duration": `${durationSeconds}s` } as CSSProperties)
    : undefined;

  return (
    <div aria-hidden className="marquee-track" style={style}>
      {COPIES.map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 items-center ${className ?? ""}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
