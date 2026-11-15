import { ChevronLeft } from "@untitledui/icons/ChevronLeft";
import { ChevronRight } from "@untitledui/icons/ChevronRight";
import { Lock01 } from "@untitledui/icons/Lock01";
import { RefreshCw01 } from "@untitledui/icons/RefreshCw01";
import { browserSession } from "@/data/agent-cursors";
import { SkeletonBar } from "../SkeletonBar";
import { AgentCursor } from "./AgentCursor";
import { CrownWindow } from "./CrownWindow";
import { CURSORS, WINDOW_PLACEMENTS } from "./layout";
import { motionTrack } from "./motionTrack";

const NAVIGATION_ICONS = [ChevronLeft, ChevronRight, RefreshCw01] as const;
const PARAGRAPH_WIDTHS = ["94%", "88%", "72%"] as const;

function BrowserToolbar() {
  return (
    <>
      {NAVIGATION_ICONS.map((Icon) => (
        <span
          key={Icon.displayName}
          className="grid size-7 shrink-0 place-items-center text-(--cu-icon)"
        >
          <Icon className="size-4.5" strokeWidth={1.8} />
        </span>
      ))}
      <span className="crownui-field relative ml-1 flex h-7 min-w-0 grow items-center gap-2 rounded-full px-3 text-sm">
        <Lock01
          className="size-3.5 shrink-0 text-(--cu-muted)"
          strokeWidth={1.8}
        />
        <span
          className="agent-motion absolute left-9 text-(--cu-muted) opacity-0"
          style={motionTrack("agent-browser-placeholder")}
        >
          Search or enter address
        </span>
        <span
          className="agent-motion truncate text-(--cu-primary)"
          style={motionTrack("agent-browser-url")}
        >
          {browserSession.url}
        </span>
      </span>
    </>
  );
}

export function BrowserWindow() {
  const { heading, contents, activeContent } = browserSession;
  return (
    <CrownWindow
      placement={WINDOW_PLACEMENTS.browser}
      toolbar={<BrowserToolbar />}
      cursor={<AgentCursor identity={CURSORS.you} rest={[300, 170]} />}
    >
      <div
        className="agent-motion grid h-full grid-cols-[calc(var(--spacing)*30)_1fr] gap-5 p-4"
        style={motionTrack("agent-browser-page")}
      >
        <nav className="grid content-start gap-1 text-sm">
          <span className="flex h-6.5 items-center px-2.5 text-xs font-medium text-(--cu-caption)">
            Contents
          </span>
          {contents.map((item, index) => (
            <span
              key={item}
              className="relative flex h-8 items-center rounded-full px-2.5 font-medium text-(--cu-sidebar-text)"
            >
              {index === activeContent && (
                <span
                  className="agent-motion absolute inset-0 rounded-full bg-(--cu-selected) shadow-[inset_0_0_0_1px_var(--cu-selected-ring)]"
                  style={motionTrack("agent-browser-toc")}
                />
              )}
              <span className="relative">{item}</span>
            </span>
          ))}
        </nav>
        <article
          className="agent-motion grid -translate-y-14 content-start gap-3 pt-1.5"
          style={motionTrack("agent-browser-scroll")}
        >
          <span className="text-lg font-bold text-(--cu-primary)">
            {heading}
          </span>
          {PARAGRAPH_WIDTHS.map((width) => (
            <SkeletonBar key={width} width={width} className="bg-white/10" />
          ))}
          <span className="mt-2 text-base font-medium text-(--cu-primary)">
            {contents[activeContent]}
          </span>
          {PARAGRAPH_WIDTHS.map((width) => (
            <SkeletonBar
              key={`second-${width}`}
              width={width}
              className="bg-white/8"
            />
          ))}
          <span className="crownui-card mt-1 grid gap-2 p-3 font-mono text-xs text-(--cu-muted)">
            <span>~/.config/pipewire/pipewire.conf</span>
            <SkeletonBar width="60%" className="bg-white/8" />
          </span>
        </article>
      </div>
    </CrownWindow>
  );
}
