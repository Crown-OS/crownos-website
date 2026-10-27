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
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="47"
        rx="11"
        className="fill-none stroke-white/12"
        strokeWidth={STROKE.hair}
        strokeDasharray="0.75 1"
      />
      <Artwork />
    </svg>
  );
}
