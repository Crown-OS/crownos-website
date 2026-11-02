import { ECOSYSTEM_ARTWORK, type EcosystemIconName } from "./artwork";
import { STROKE } from "./line-kit";

export function EcosystemIcon({
  name,
  className,
}: {
  name: EcosystemIconName;
  className?: string;
}) {
  const Artwork = ECOSYSTEM_ARTWORK[name];
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={`shrink-0 select-none ${className ?? ""}`}
    >
      <Artwork />
    </svg>
  );
}
