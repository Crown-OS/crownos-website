import { type SidebarGroup, settingsWindow } from "@/data/settings-window";
import { LucideIcon } from "./icons";
import { SettingsText } from "./text";
import { FONT_SIZE, SETTINGS_COLOR } from "./theme";

const COLUMN = { x: 24, width: 236, top: 24 };
const LABEL = { indent: 10, height: 26, gap: 2, baseline: 12 };
const ITEM = { height: 36, gap: 4, radius: 16, padding: 10, iconSize: 18 };
const GROUP_GAP = 6;
const ICON_X = COLUMN.x + ITEM.padding;
const LABEL_X = ICON_X + ITEM.iconSize + 10;

type PlacedItem = SidebarGroup["pages"][number] & { top: number };
type PlacedGroup = { label: string; top: number; items: PlacedItem[] };

function layoutGroups(): PlacedGroup[] {
  let cursor = COLUMN.top;
  return settingsWindow.sidebar.map(({ label, pages }) => {
    const top = cursor;
    const itemsTop = top + LABEL.height + LABEL.gap;
    const items = pages.map((page, index) => ({
      ...page,
      top: itemsTop + index * (ITEM.height + ITEM.gap),
    }));
    cursor =
      itemsTop + pages.length * (ITEM.height + ITEM.gap) - ITEM.gap + GROUP_GAP;
    return { label, top, items };
  });
}

const GROUPS = layoutGroups();

function SelectedPill({ top }: { top: number }) {
  return (
    <rect
      x={COLUMN.x + 0.5}
      y={top + 0.5}
      width={COLUMN.width - 1}
      height={ITEM.height - 1}
      rx={ITEM.radius - 0.5}
      fill={SETTINGS_COLOR.sidebarSelected}
      stroke={SETTINGS_COLOR.sidebarSelectedBorder}
    />
  );
}

function SidebarItem({ title, icon, top }: PlacedItem) {
  const selected = title === settingsWindow.page.title;
  const center = top + ITEM.height / 2;
  return (
    <g>
      {selected && <SelectedPill top={top} />}
      <LucideIcon
        name={icon}
        x={ICON_X}
        y={center - ITEM.iconSize / 2}
        size={ITEM.iconSize}
        stroke={1.8}
        color={selected ? SETTINGS_COLOR.primary : SETTINGS_COLOR.sidebarIcon}
      />
      <SettingsText
        x={LABEL_X}
        y={center + 6}
        weight="medium"
        color={selected ? SETTINGS_COLOR.primary : SETTINGS_COLOR.sidebarText}
      >
        {title}
      </SettingsText>
    </g>
  );
}

export function Sidebar() {
  return (
    <g>
      {GROUPS.map(({ label, top, items }) => (
        <g key={label}>
          <SettingsText
            x={COLUMN.x + LABEL.indent}
            y={top + LABEL.baseline}
            size={FONT_SIZE.caption}
            weight="medium"
            color={SETTINGS_COLOR.sidebarIcon}
          >
            {label}
          </SettingsText>
          {items.map((item) => (
            <SidebarItem key={item.title} {...item} />
          ))}
        </g>
      ))}
    </g>
  );
}
