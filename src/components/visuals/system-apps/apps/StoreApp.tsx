import {
  STORE_ICON_PATH,
  type StoreApp as StoreEntry,
  store,
} from "@/data/system-apps/store";
import { CrownWindow } from "../kit/CrownWindow";
import { SearchField } from "../kit/controls";
import { Icon } from "../kit/Icon";
import {
  BRAND_ART_SIZE,
  SidebarAppBrand,
  SidebarItem,
  SidebarSection,
} from "../kit/Sidebar";
import { StoreAppIcon } from "../kit/StoreAppIcon";

function StoreSidebar() {
  return (
    <>
      <SidebarAppBrand
        art={<StoreAppIcon size={BRAND_ART_SIZE} />}
        label={store.brand}
      />
      <StoreNavigation />
    </>
  );
}

function StoreNavigation() {
  return store.navigation.map((section) => (
    <SidebarSection key={section.caption} caption={section.caption}>
      {section.items.map((item, index) => (
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          current={section.caption === "Store" && index === 0}
          trailing={"count" in item ? item.count : undefined}
        />
      ))}
    </SidebarSection>
  ));
}

function AppCard({ app }: { app: StoreEntry }) {
  return (
    <article className="flex h-23 items-center gap-3 rounded-[14px] bg-(--cu-raised) p-3 shadow-[inset_0_0_0_1px_var(--cu-hairline)]">
      {/* biome-ignore lint/performance/noImgElement: tiny static catalog icon inside a scaled mock window */}
      <img
        src={`${STORE_ICON_PATH}/${app.id}.webp`}
        alt=""
        width={56}
        height={56}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="size-14 shrink-0 rounded-[12.3px]"
      />
      <div className="grid min-w-0 flex-1 gap-0.75">
        <strong className="truncate font-semibold text-(--cu-primary) text-[14px]">
          {app.name}
        </strong>
        <p className="line-clamp-2 text-(--cu-muted) text-[12px] leading-snug">
          {app.summary}
        </p>
        <span className="text-(--cu-muted) text-[11px]">{app.sources}</span>
      </div>
      {app.installed && (
        <Icon
          name="circle-check"
          size={16}
          className="self-start text-(--cu-success)"
        />
      )}
    </article>
  );
}

export function StoreApp() {
  return (
    <CrownWindow
      sidebar={<StoreSidebar />}
      toolbar={
        <>
          <span className="flex-1" />
          <SearchField placeholder={store.search} width={320} />
          <span className="flex-1" />
        </>
      }
    >
      <header className="px-6 pt-5 pb-3">
        <h2 className="font-bold text-(--cu-primary) text-[24px] leading-tight">
          {store.title}
        </h2>
        <p className="mt-0.5 text-(--cu-muted) text-[13px]">{store.subtitle}</p>
      </header>
      <div className="grid grid-cols-2 gap-3 px-6">
        {store.apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </CrownWindow>
  );
}
