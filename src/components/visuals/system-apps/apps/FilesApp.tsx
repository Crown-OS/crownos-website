import { files } from "@/data/system-apps/files";
import { CrownWindow } from "../kit/CrownWindow";
import { PrimaryButton, SecondaryButton, UsageMeter } from "../kit/controls";
import { FilesAppIcon } from "../kit/FilesAppIcon";
import { Icon } from "../kit/Icon";
import {
  BRAND_ART_SIZE,
  SidebarAppBrand,
  SidebarItem,
  SidebarSection,
} from "../kit/Sidebar";
import { FileThumb, FolderGradients } from "./files/FileThumb";

const STORAGE_SEGMENTS = [
  { share: 0.34, color: "var(--cu-accent-end)" },
  { share: 0.15, color: "#a1a1aa" },
  { share: 0.09, color: "#5f5f68" },
] as const;

function FilesSidebar() {
  return (
    <>
      <SidebarAppBrand
        art={<FilesAppIcon size={BRAND_ART_SIZE} />}
        label={files.brand}
      />
      <SidebarSection caption="Favorites">
        {files.favorites.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            current={item.label === files.current}
            trailing={"trailing" in item ? item.trailing : undefined}
          />
        ))}
      </SidebarSection>
      <SidebarSection caption="Devices">
        <SidebarItem
          icon={files.devices[0].icon}
          label={files.devices[0].label}
        />
        <SidebarItem
          icon={files.devices[1].icon}
          label={files.devices[1].label}
          trailing={
            <span className="size-1.75 rounded-full bg-(--cu-success) shadow-[0_0_8px_rgb(74_222_128/0.6)]" />
          }
        />
      </SidebarSection>
      <div className="crownui-card mt-auto grid gap-2 p-3">
        <div className="flex items-center gap-2 font-medium text-(--cu-primary) text-[13px]">
          <Icon
            name="hard-drive"
            size={16}
            className="text-(--cu-icon-muted)"
          />
          {files.storage.label}
          <span className="ml-auto font-normal text-(--cu-muted) text-[12px]">
            {files.storage.percent}
          </span>
        </div>
        <UsageMeter segments={STORAGE_SEGMENTS} height={6} />
        <small className="text-(--cu-muted) text-[11px]">
          {files.storage.caption}
        </small>
      </div>
    </>
  );
}

function FilesToolbar() {
  return (
    <>
      <span className="grid size-7 place-items-center text-(--cu-icon)">
        <Icon name="chevron-left" />
      </span>
      <span className="grid size-7 place-items-center text-(--cu-disabled)">
        <Icon name="chevron-right" />
      </span>
      <nav className="flex min-w-0 items-center gap-0.5 text-(--cu-muted)">
        <Icon name="house" size={16} className="mx-1.5" />
        {files.path.map((segment, index) => (
          <span key={segment} className="flex items-center gap-0.5">
            <Icon
              name="chevron-right"
              size={14}
              className="text-(--cu-disabled)"
            />
            <span
              className={`px-1.5 ${index === files.path.length - 1 ? "font-semibold text-(--cu-primary)" : ""}`}
            >
              {segment}
            </span>
          </span>
        ))}
      </nav>
      <span className="flex-1" />
      <span className="crownui-field flex h-7 gap-0.5 rounded-full p-0.5">
        <span className="grid w-8 place-items-center rounded-full bg-[#2e2e32] text-(--cu-primary) shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
          <Icon name="layout-grid" size={15} />
        </span>
        <span className="grid w-8 place-items-center text-(--cu-icon-muted)">
          <Icon name="list" size={15} />
        </span>
      </span>
      <span className="crownui-field flex h-7 w-34 items-center gap-2 rounded-full px-3 text-(--cu-muted) text-[13px]">
        <Icon name="search" size={15} />
        Search
      </span>
    </>
  );
}

function FileDetails() {
  const selected = files.items[files.selected];
  const { details } = files;
  return (
    <aside className="flex min-h-0 flex-col gap-3 border-(--cu-hairline) border-l p-4">
      <div
        className="h-28 shrink-0 rounded-[10px] shadow-[inset_0_0_0_1px_var(--cu-border)]"
        style={{ background: "var(--art-aurora)" }}
      />
      <div className="grid gap-0.75">
        <strong className="truncate font-semibold text-(--cu-primary) text-[14px]">
          {selected.name}
        </strong>
        <span className="text-(--cu-muted) text-[12px]">{details.kind}</span>
      </div>
      <dl className="grid gap-2 border-(--cu-hairline) border-t pt-3">
        {details.info.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-(--cu-muted) text-[11px]">{label}</dt>
            <dd className="mt-px text-(--cu-body) text-[12px]">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-1.5">
        {details.tags.map(({ label, color }) => (
          <span
            key={label}
            className="crownui-field flex h-5.5 items-center gap-1.5 rounded-full px-2 text-(--cu-body) text-[11px]"
          >
            <i
              className="size-1.5 rounded-full"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-1.5">
        <PrimaryButton label={details.open} />
        <SecondaryButton icon="smartphone" label={details.send} />
      </div>
    </aside>
  );
}

export function FilesApp() {
  return (
    <CrownWindow sidebar={<FilesSidebar />} toolbar={<FilesToolbar />}>
      <FolderGradients />
      <div className="grid h-full grid-cols-[1fr_224px] grid-rows-[1fr_32px]">
        <div className="grid grid-cols-4 content-start gap-x-1.5 gap-y-1 overflow-hidden p-3 [zoom:1.3]">
          {files.items.map((item, index) => {
            const isSelected = index === files.selected;
            return (
              <div
                key={item.name}
                className="flex min-w-0 flex-col items-center gap-1 px-0.5 py-1"
              >
                <span
                  className={`grid h-15.5 w-19 place-items-center rounded-[10px] ${isSelected ? "bg-white/9" : ""}`}
                >
                  <FileThumb thumb={item.thumb} />
                </span>
                <span
                  className={`max-w-full truncate rounded-md px-1.5 py-0.5 font-medium text-[12px] ${
                    isSelected
                      ? "bg-(--cu-accent-end) text-white"
                      : "text-(--cu-body)"
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-(--cu-muted) text-[11px] tabular-nums">
                  {item.meta}
                </span>
              </div>
            );
          })}
        </div>
        <FileDetails />
        <footer className="col-span-full flex items-center justify-between border-(--cu-hairline) border-t px-4 text-(--cu-muted) text-[12px]">
          <span>{files.status}</span>
          <span className="flex items-center gap-2">
            <span className="w-18">
              <UsageMeter
                segments={[{ share: 0.58, color: "var(--cu-accent-end)" }]}
                height={6}
              />
            </span>
            {files.free}
          </span>
        </footer>
      </div>
    </CrownWindow>
  );
}
