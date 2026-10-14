import type { ReactNode } from "react";

const CORNERS = [
  "top-0 left-0",
  "top-0 left-full",
  "top-full left-0",
  "top-full left-full",
] as const;

export function CatalogFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`catalog-frame ${className ?? ""}`}>
      {CORNERS.map((corner) => (
        <span key={corner} aria-hidden className={`corner-mark ${corner}`} />
      ))}
      {children}
    </div>
  );
}
