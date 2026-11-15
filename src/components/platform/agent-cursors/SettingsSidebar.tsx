import { Monitor01 } from "@untitledui/icons/Monitor01";
import { Palette } from "@untitledui/icons/Palette";
import { Settings01 } from "@untitledui/icons/Settings01";
import { VolumeMax } from "@untitledui/icons/VolumeMax";
import { Wifi } from "@untitledui/icons/Wifi";
import { settingsSession } from "@/data/agent-cursors";

const PAGE_ICONS = [Wifi, Palette, Monitor01, VolumeMax] as const;

export function SettingsSidebar() {
  const { pages, activePage } = settingsSession;
  return (
    <aside className="flex w-[calc(var(--u)*136)] shrink-0 flex-col gap-1 p-1">
      <span className="flex h-9 items-center gap-2.5 px-2 text-base font-medium text-(--cu-primary)">
        <Settings01 className="size-4.5" strokeWidth={1.8} />
        Settings
      </span>
      {pages.map((page, index) => {
        const Icon = PAGE_ICONS[index];
        const isActive = index === activePage;
        return (
          <span
            key={page}
            className={`flex h-9 items-center gap-2.5 rounded-full px-2.5 text-base font-medium ${isActive ? "bg-(--cu-selected) text-(--cu-primary) shadow-[inset_0_0_0_1px_var(--cu-selected-ring)]" : "text-(--cu-sidebar-text)"}`}
          >
            <Icon className="size-4.5 shrink-0" strokeWidth={1.8} />
            {page}
          </span>
        );
      })}
    </aside>
  );
}
