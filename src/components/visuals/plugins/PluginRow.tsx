import {
  GhostButton,
  Toggle,
} from "@/components/visuals/system-apps/kit/controls";
import { Icon } from "@/components/visuals/system-apps/kit/Icon";
import type { PluginMeta } from "@/data/catalog";

type PluginRowProps = Pick<PluginMeta, "name" | "version" | "author"> & {
  enabled: boolean;
  height: number;
};

export function PluginRow({
  name,
  version,
  author,
  enabled,
  height,
}: PluginRowProps) {
  return (
    <div className="flex items-center gap-3 px-4.5" style={{ height }}>
      <div className="flex min-w-0 shrink items-center gap-2.5">
        <Icon name="puzzle" className="text-(--cu-icon)" />
        <div className="flex min-w-0 flex-col gap-0.75">
          <span className="truncate text-(--cu-body) text-[14px] leading-[17px]">
            {name}
          </span>
          <span className="truncate text-(--cu-muted) text-[12px] leading-[15px]">
            v{version} · {enabled ? "Running" : author}
          </span>
        </div>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-2.5">
        <GhostButton label="Details…" />
        <Toggle on={enabled} />
      </div>
    </div>
  );
}
