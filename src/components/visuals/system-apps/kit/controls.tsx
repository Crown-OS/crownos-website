import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icon-paths";

export function SearchField({
  placeholder,
  width,
}: {
  placeholder: string;
  width: number;
}) {
  return (
    <div
      className="crownui-field flex h-8.5 shrink-0 items-center gap-2.25 rounded-[17px] pl-2.5 text-(--cu-muted) text-[13px]"
      style={{ width }}
    >
      <Icon name="search" size={17} />
      {placeholder}
    </div>
  );
}

export function GhostButton({
  icon,
  label,
}: {
  icon?: IconName;
  label?: string;
}) {
  return (
    <span
      className={`flex h-7 shrink-0 items-center gap-1 rounded-full text-(--cu-body) text-[12px] ${
        label ? "px-3.5" : "w-7 justify-center"
      }`}
    >
      {icon && <Icon name={icon} size={label ? 13 : 15} />}
      {label}
    </span>
  );
}

export function PrimaryButton({
  icon,
  label,
}: {
  icon?: IconName;
  label: string;
}) {
  return (
    <span className="flex h-8.5 shrink-0 items-center gap-1.5 rounded-[17px] bg-(image:--cu-accent) px-5 font-medium text-[14px] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
      {icon && <Icon name={icon} size={15} />}
      {label}
    </span>
  );
}

export function SecondaryButton({
  icon,
  label,
}: {
  icon?: IconName;
  label: string;
}) {
  return (
    <span className="crownui-field flex h-7 shrink-0 items-center gap-1 rounded-full px-3.5 text-(--cu-primary) text-[12px]">
      {icon && <Icon name={icon} size={13} />}
      {label}
    </span>
  );
}

export function UsageMeter({
  segments,
  height = 8,
}: {
  segments: readonly { share: number; color: string }[];
  height?: number;
}) {
  return (
    <div
      className="flex overflow-hidden rounded-full bg-(--cu-track)"
      style={{ height }}
    >
      {segments.map(({ share, color }) => (
        <span
          key={color}
          className="h-full"
          style={{ width: `${share * 100}%`, background: color }}
        />
      ))}
    </div>
  );
}

export function StatusLabel({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 text-[12px]" style={{ color }}>
      <span className="size-1.75 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="px-1 font-semibold text-(--cu-muted) text-[12px]">
      {children}
    </h4>
  );
}

export function SelectField({ value }: { value: string }) {
  return (
    <span className="crownui-field flex h-8.5 w-63 shrink-0 items-center justify-between rounded-2xl pr-2 pl-2.5 text-(--cu-primary) text-[14px]">
      {value}
      <Icon name="chevron-down" size={20} className="text-(--cu-muted)" />
    </span>
  );
}

export function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative h-6 w-12 shrink-0 rounded-full ${
        on ? "bg-(image:--cu-accent)" : "bg-(image:--cu-toggle-off)"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-7 rounded-full bg-(--cu-knob) shadow-[0_0_4px_rgb(0_0_0/0.14),inset_0_0_0_2px_var(--cu-knob-rim)] ${
          on ? "left-4.5" : "left-0.5"
        }`}
      />
    </span>
  );
}
