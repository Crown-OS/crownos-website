import { FEATURE_ICONS } from "@/components/feature-icons";
import type { IconKey } from "@/data/feature";

export function IconTile({ icon }: { icon: IconKey }) {
  const Icon = FEATURE_ICONS[icon];
  return (
    <span className="icon-tile squircle rounded-tile grid size-12 place-items-center md:size-14">
      <Icon className="size-6" />
    </span>
  );
}
