import { AppWindow, type WindowTab } from "./window/AppWindow";
import { GlyphTile, Toggle } from "./window/controls";
import { Glyph, type GlyphName } from "./window/Glyph";

const TABS: readonly WindowTab[] = [
  { title: "Devices", active: true },
  { title: "Transfers" },
  { title: "Calls" },
];

const DEVICES: readonly {
  icon: GlyphName;
  name: string;
  status: string;
  selected?: boolean;
}[] = [
  { icon: "phone", name: "Pixel 9 Pro", status: "Connected", selected: true },
  { icon: "tablet", name: "iPad Air", status: "Nearby" },
  { icon: "server", name: "homelab", status: "2 agents running" },
  { icon: "phone", name: "Galaxy S24", status: "Last seen 2h ago" },
];

const ECOSYSTEM: readonly { icon: GlyphName; name: string; on: boolean }[] = [
  { icon: "clipboard", name: "Clipboard Sync", on: true },
  { icon: "bell", name: "Notification Sync", on: true },
  { icon: "folder", name: "Quick File Sharing", on: true },
  { icon: "call", name: "Call Bridge", on: true },
  { icon: "camera", name: "Camera Share", on: false },
  { icon: "hotspot", name: "Instant Hotspot", on: false },
];

function DeviceList() {
  return (
    <aside className="flex w-44 shrink-0 flex-col gap-1 bg-neutral-100 px-2 pt-3">
      <span className="px-2 pb-1 text-neutral-400 text-xs">Paired devices</span>
      {DEVICES.map(({ icon, name, status, selected }) => (
        <div
          key={name}
          className={`flex items-center gap-2.5 rounded-lg px-2 py-2 ${
            selected ? "bg-white shadow-[0_1px_2px_rgb(0_0_0/0.06)]" : ""
          }`}
        >
          <Glyph name={icon} className="size-4 text-neutral-600" />
          <span className="grid min-w-0 gap-0.5">
            <span className="truncate text-neutral-900">{name}</span>
            <span className="truncate text-neutral-500 text-xs">{status}</span>
          </span>
        </div>
      ))}
    </aside>
  );
}

function DeviceDetail() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4 bg-white px-5 pt-4">
      <header className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-neutral-100 text-neutral-800">
          <Glyph name="phone" className="size-5.5" />
        </span>
        <span className="grid flex-1 gap-1">
          <span className="font-medium text-base text-neutral-900">
            Pixel 9 Pro
          </span>
          <span className="flex items-center gap-1 text-neutral-500 text-xs">
            <Glyph name="lock" className="size-3" />
            End-to-end encrypted · 4 ms
          </span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-700 text-xs">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Connected
        </span>
      </header>
      <ul className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80">
        {ECOSYSTEM.map(({ icon, name, on }) => (
          <li key={name} className="flex items-center gap-3 px-3 py-1.5">
            <GlyphTile icon={icon} />
            <span className="flex-1 text-neutral-800">{name}</span>
            <Toggle on={on} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LinkWindow() {
  return (
    <AppWindow
      label="Crown Link pairing a phone with clipboard, notification, file and call sync"
      width={560}
      height={400}
      tabs={TABS}
    >
      <DeviceList />
      <DeviceDetail />
    </AppWindow>
  );
}
