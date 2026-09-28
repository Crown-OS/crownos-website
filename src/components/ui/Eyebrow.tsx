import type { ReactNode } from "react";

type EyebrowProps = { children: ReactNode; className?: string };

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      data-reveal="wipe"
      className={`inline-block text-ui text-muted ${className}`}
    >
      ({children})
    </span>
  );
}
