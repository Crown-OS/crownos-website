import { AppWindow, type WindowTab } from "./window/AppWindow";
import { Chip, GlyphTile, Toggle } from "./window/controls";
import { Glyph, type GlyphName } from "./window/Glyph";

const TABS: readonly WindowTab[] = [
  { title: "Agent", icon: "sparkle", pinned: true },
  { title: "Plugins", active: true },
  { title: "Appearance" },
  { title: "Displays" },
  { title: "Keyboard" },
];

const API_SURFACES = ["windows.style", "windows.focus", "compositor"];

const GRANTS: readonly {
  icon: GlyphName;
  scope: string;
  reason: string;
  granted: boolean;
  badge?: string;
}[] = [
  {
    icon: "window",
    scope: "windows.style",
    reason: "Change the opacity of other windows",
    granted: true,
    badge: "Required",
  },
  {
    icon: "focus",
    scope: "windows.focus",
    reason: "Know which window has focus",
    granted: true,
    badge: "Required",
  },
  {
    icon: "globe",
    scope: "network",
    reason: "Reach the internet",
    granted: false,
  },
  {
    icon: "folder",
    scope: "files.home",
    reason: "Read your home folder",
    granted: false,
  },
];

function Toolbar() {
  return (
    <div className="flex h-11 shrink-0 items-center gap-3 bg-white px-4 text-neutral-500">
      <Glyph name="chevron-left" />
      <Glyph name="chevron-right" className="size-4 text-neutral-300" />
      <Glyph name="refresh" className="size-3.5" />
      <div className="flex h-7.5 flex-1 items-center gap-2.5 rounded-full bg-neutral-100 pr-3 pl-1 text-sm">
        <span className="flex h-5.5 items-center gap-1 rounded-full bg-brand/12 px-2 font-medium text-brand text-xs">
          <Glyph name="sparkle" className="size-3" />
          Ask Crown:
        </span>
        <span className="truncate text-neutral-900">
          settings
          <span className="text-neutral-400">://plugins/focus-dim</span>
        </span>
      </div>
      <Glyph name="download" />
      <span className="grid size-6 place-items-center rounded-full bg-neutral-200 font-medium text-[0.65em] text-neutral-600">
        AK
      </span>
      <Glyph name="more" />
    </div>
  );
}

function AgentPanel() {
  return (
    <aside className="flex w-68 shrink-0 flex-col gap-2 bg-neutral-100 px-2 pt-1 pb-2">
      <div className="flex h-8 items-center gap-2.5 px-2 text-neutral-500">
        <span className="flex-1 text-neutral-800 text-sm">Crown Agent</span>
        <Glyph name="more" className="size-3.5" />
        <Glyph name="expand" className="size-3.5" />
        <Glyph name="close" className="size-3.5" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden rounded-xl bg-white p-3 text-base leading-snug">
        <p className="ml-6 rounded-2xl bg-neutral-100 px-3 py-2 text-neutral-900">
          Dim every window except the one I'm focused on
        </p>
        <p className="px-1 text-neutral-700">
          Okay! I'll write a plugin that fades unfocused windows and run it in a
          sandbox with only the access it needs.
        </p>
        <div className="grid gap-2.5 px-1">
          <p className="flex items-center gap-2 text-neutral-800 text-sm">
            <Glyph name="sparkle" className="size-3.5 text-brand" />
            <span className="flex-1">Writing focus-dim…</span>
            <Glyph name="chevron-up" className="size-3.5 text-neutral-400" />
          </p>
          <div className="flex flex-wrap gap-1.5">
            {API_SURFACES.map((surface) => (
              <Chip key={surface} icon="window">
                {surface}
              </Chip>
            ))}
          </div>
        </div>
        <div className="mt-auto grid gap-2.5 rounded-2xl bg-neutral-100 p-2.5 text-sm">
          <span className="text-neutral-400">Ask Crown anything</span>
          <div className="flex items-center gap-2 text-neutral-600">
            <Glyph name="plus" />
            <span className="flex h-6 items-center gap-1 rounded-full bg-brand/12 px-2 text-brand text-xs">
              <Glyph name="sparkle" className="size-3" />
              Agent
              <Glyph name="close" className="size-2.5" strokeWidth={2.5} />
            </span>
            <Glyph name="mic" className="ml-auto size-4" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function AgentCursor() {
  return (
    <div className="cursor-drift absolute top-[58%] left-[46%] z-10 flex flex-col items-start">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-6 drop-shadow-sm"
      >
        <path
          d="M4 3.5 20 10l-7 2.5L10 20Z"
          className="fill-brand stroke-white"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
      <span className="ml-3 rounded-full bg-brand px-3 py-1.5 font-medium text-sm text-white shadow-[0_6px_16px_-4px_rgb(20_142_255/0.6)]">
        Only what it needs
      </span>
    </div>
  );
}

function GrantRow({
  icon,
  scope,
  reason,
  granted,
  badge,
}: (typeof GRANTS)[number]) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-neutral-200/80 bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
      <GlyphTile icon={icon} />
      <div className="grid min-w-0 flex-1 gap-0.5">
        <span className="font-medium font-mono text-neutral-900 text-xs">
          {scope}
        </span>
        <span className="truncate text-neutral-500 text-xs">{reason}</span>
      </div>
      {badge && (
        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[0.8em] text-brand">
          {badge}
        </span>
      )}
      <Toggle on={granted} />
    </li>
  );
}

function PluginPane() {
  return (
    <section className="relative flex min-w-0 flex-1 flex-col gap-4 bg-[linear-gradient(180deg,#f6f6f8,#fff_40%)] px-5 pt-4">
      <nav className="flex items-center gap-2 text-neutral-500 text-xs">
        <span className="flex h-6 items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 text-brand">
          <Glyph name="chevron-left" className="size-3" />
          Back
        </span>
        <span className="font-medium text-neutral-900">Plugins</span>
        <Glyph name="chevron-right" className="size-3 text-neutral-300" />
        <span>focus-dim</span>
        <Glyph name="chevron-right" className="size-3 text-neutral-300" />
        <span>Permissions</span>
      </nav>
      <header className="grid gap-1.5">
        <h4 className="font-medium text-lg text-neutral-900">Focus Dim</h4>
        <p className="flex items-center gap-3 text-neutral-500 text-xs">
          <span className="flex items-center gap-1">
            <Glyph name="shield" className="size-3.5" />
            Sandboxed
          </span>
          <span className="flex items-center gap-1">
            <Glyph name="sparkle" className="size-3.5" />
            Written by Crown Agent · v0.1
          </span>
        </p>
      </header>
      <ul className="grid gap-2">
        {GRANTS.map((grant) => (
          <GrantRow key={grant.scope} {...grant} />
        ))}
      </ul>
      <p className="mt-auto flex items-center gap-2 border-neutral-200 border-t py-3 font-mono text-neutral-500 text-xs">
        <span className="pulse-dot size-1.5 rounded-full bg-emerald-500" />
        Running in sandbox · 0.4 MB
      </p>
      <AgentCursor />
    </section>
  );
}

export function AgentWindow() {
  return (
    <AppWindow
      label="Crown Agent writing a sandboxed focus-dim plugin and granting it only window permissions"
      width={760}
      height={520}
      tabs={TABS}
      toolbar={<Toolbar />}
    >
      <AgentPanel />
      <PluginPane />
    </AppWindow>
  );
}
