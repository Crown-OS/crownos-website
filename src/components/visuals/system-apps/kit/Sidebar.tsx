import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icon-paths";

export function SidebarSection({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-1">
      {caption && (
        <h3 className="mb-0.5 flex h-6.5 items-center px-2.5 font-medium text-(--cu-caption) text-[12px]">
          {caption}
        </h3>
      )}
      {children}
    </section>
  );
}

export function SidebarItem({
  icon,
  label,
  current = false,
  trailing,
  indent = false,
}: {
  icon?: IconName;
  label: string;
  current?: boolean;
  trailing?: ReactNode;
  indent?: boolean;
}) {
  return (
    <div
      aria-current={current || undefined}
      className={`flex h-9 shrink-0 items-center gap-2.5 rounded-[18px] px-2.5 font-medium text-[14px] ${
        current
          ? "bg-(--cu-selected) text-(--cu-primary) shadow-[inset_0_0_0_1px_var(--cu-selected-ring)]"
          : indent
            ? "text-(--cu-subitem-text)"
            : "text-(--cu-sidebar-text)"
      }`}
    >
      {icon && (
        <Icon
          name={icon}
          className={current ? "text-(--cu-primary)" : "text-(--cu-icon-muted)"}
        />
      )}
      <span className={`truncate ${indent ? "pl-5" : ""}`}>{label}</span>
      {trailing && (
        <span className="ml-auto flex shrink-0 items-center gap-1.5 font-normal text-(--cu-muted) text-[12px]">
          {trailing}
        </span>
      )}
    </div>
  );
}

export const BRAND_ART_SIZE = 22;

export function SidebarAppBrand({
  art,
  label,
}: {
  art: ReactNode;
  label: string;
}) {
  return (
    <div className="flex h-11 shrink-0 items-center gap-2.5 px-2.5 font-medium text-(--cu-primary) text-[15px]">
      {art}
      <span className="truncate">{label}</span>
    </div>
  );
}

export function SidebarBrand({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 px-2 py-3.5">
      <span className="grid size-9 place-items-center rounded-[10px] bg-(image:--cu-accent) text-white">
        <Icon name={icon} size={22} stroke={1.9} />
      </span>
      <span className="font-semibold text-(--cu-primary) text-[16px]">
        {label}
      </span>
    </div>
  );
}
