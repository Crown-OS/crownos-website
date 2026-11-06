import {
  disks,
  PARTITION_COLORS,
  type VolumeState,
} from "@/data/system-apps/disks";
import { CrownWindow } from "../kit/CrownWindow";
import {
  GhostButton,
  SecondaryButton,
  SectionHeading,
  StatusLabel,
  UsageMeter,
} from "../kit/controls";
import { Icon } from "../kit/Icon";
import { SidebarBrand, SidebarItem, SidebarSection } from "../kit/Sidebar";

const HEALTH_GOOD = "#4ade80";
const MIN_SEGMENT_SHARE = 0.02;
const LABEL_SHARE = 0.08;

const VOLUME_DOT = {
  mounted: "bg-[#4ade80]",
  unmounted: "shadow-[inset_0_0_0_1.5px_#9f9f9f]",
  locked: "shadow-[inset_0_0_0_1.5px_#fbbf24]",
} as const satisfies Record<VolumeState, string>;

function DisksSidebar() {
  return (
    <>
      <SidebarBrand icon="hard-drive" label={disks.brand} />
      <SidebarItem icon="layout-grid" label={disks.overview} />
      {disks.sections.map((section) => (
        <SidebarSection key={section.caption} caption={section.caption}>
          {section.disks.map((disk) => (
            <div key={disk.label} className="flex flex-col gap-1">
              <SidebarItem
                icon={disk.icon}
                label={disk.label}
                trailing={
                  <>
                    {disk.size}
                    <Icon
                      name="chevron-down"
                      size={15}
                      className="text-(--cu-icon-muted)"
                    />
                  </>
                }
              />
              {disk.volumes.map((volume) => (
                <SidebarItem
                  key={volume.label}
                  label={volume.label}
                  indent
                  current={
                    volume.label === disks.selected.volume &&
                    disk.label === disks.selected.disk
                  }
                  trailing={
                    <>
                      {volume.filesystem}
                      <span
                        className={`size-1.75 rounded-full ${VOLUME_DOT[volume.state]}`}
                      />
                    </>
                  }
                />
              ))}
            </div>
          ))}
        </SidebarSection>
      ))}
      <div className="mt-auto">
        <SidebarItem icon="plus" label={disks.openImage} />
      </div>
    </>
  );
}

function PartitionMap() {
  const { partitions } = disks.page;
  const selectedLabel = disks.selected.volume;
  return (
    <div className="flex h-16 gap-1">
      {partitions.map((partition, index) => {
        const color = PARTITION_COLORS[index % PARTITION_COLORS.length];
        const isSelected = partition.label === selectedLabel;
        return (
          <div
            key={partition.label}
            className={`relative min-w-2.5 overflow-hidden rounded-lg ${isSelected ? "ring-2 ring-[#6d48e8]" : ""}`}
            style={{
              flexGrow: Math.max(partition.share, MIN_SEGMENT_SHARE),
              flexBasis: 0,
              background: `color-mix(in srgb, ${color} 30%, transparent)`,
            }}
          >
            {partition.share >= LABEL_SHARE && (
              <div className="p-2.5">
                <p className="font-medium text-(--cu-primary) text-[14px]">
                  {partition.label}
                </p>
                <p className="text-(--cu-body) text-[12px]">
                  {partition.detail}
                </p>
              </div>
            )}
            <span
              className="absolute bottom-0 left-0 h-1"
              style={{
                width: `${partition.used * 100}%`,
                background: `color-mix(in srgb, ${color} 70%, white)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function DisksApp() {
  const { page } = disks;
  return (
    <CrownWindow
      sidebar={<DisksSidebar />}
      toolbar={
        <>
          {disks.toolbar.map((action) => (
            <GhostButton
              key={action.label}
              icon={action.icon}
              label={action.label}
            />
          ))}
          <GhostButton icon="hard-drive-download" />
          <GhostButton icon="ellipsis" />
          <span className="flex-1" />
        </>
      }
    >
      <div className="flex flex-col gap-6 p-8">
        <header className="flex items-center gap-3.5">
          <Icon
            name="hard-drive"
            size={32}
            stroke={1.6}
            className="text-(--cu-icon)"
          />
          <div className="grid gap-0.5">
            <h2 className="font-semibold text-(--cu-primary) text-[22px] leading-tight">
              {page.title}
            </h2>
            <p className="text-(--cu-muted) text-[12px]">{page.caption}</p>
          </div>
          <span className="ml-auto">
            <StatusLabel color={HEALTH_GOOD}>{page.status}</StatusLabel>
          </span>
        </header>
        <PartitionMap />
        <section className="crownui-card grid gap-3 p-4.5">
          <div className="flex items-center gap-3">
            <div className="grid gap-0.5">
              <h3 className="font-semibold text-(--cu-primary) text-[17px]">
                {page.selection.title}
              </h3>
              <p className="text-(--cu-muted) text-[12px]">
                {page.selection.caption}
              </p>
            </div>
            <span className="ml-auto">
              <SecondaryButton
                icon="folder-open"
                label={page.selection.action}
              />
            </span>
          </div>
          <UsageMeter
            segments={[{ share: page.selection.used, color: "#6ee7a0" }]}
          />
          <p className="text-(--cu-muted) text-[12px]">
            {page.selection.usage}
          </p>
        </section>
        <section className="grid gap-2">
          <SectionHeading>Health</SectionHeading>
          <div className="crownui-card">
            <div className="flex items-center gap-3 px-4.5 py-3.5">
              <StatusLabel color={HEALTH_GOOD}>{page.status}</StatusLabel>
              <span className="text-(--cu-body) text-[14px]">
                {page.healthSummary}
              </span>
            </div>
            {page.health.map((row) => (
              <div
                key={row.label}
                className="flex h-11 items-center justify-between px-4.5 text-[14px]"
              >
                <span className="text-(--cu-body)">{row.label}</span>
                <span className="text-(--cu-muted)">{row.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CrownWindow>
  );
}
