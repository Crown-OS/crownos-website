import type { CSSProperties, ReactNode } from "react";
import type { FileArt, FileThumbKind } from "@/data/system-apps/files";
import { Icon } from "../../kit/Icon";

const ART = {
  aurora: "var(--art-aurora)",
  silver: "var(--art-silver)",
  dusk: "var(--art-dusk)",
} as const satisfies Record<FileArt, string>;

const CODE_LINES = [
  ["#c792ea", "55%"],
  ["#8fd0ff", "80%"],
  ["#d4d4d8", "40%"],
  ["#c3e88d", "70%"],
  ["#d4d4d8", "60%"],
  ["#f78c6c", "35%"],
] as const;

const VECTOR_DOTS = ["#8f6dfb", "#1fb0e6", "#eb9d4c", "#e2577a"] as const;

export function FolderGradients() {
  return (
    <svg width={0} height={0} className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="cu-folder-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5670" />
          <stop offset="1" stopColor="#3b384b" />
        </linearGradient>
        <linearGradient id="cu-folder-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a29dbd" />
          <stop offset="1" stopColor="#6c6886" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const art = (name: FileArt) => ({ "--art": ART[name] }) as CSSProperties;

function Folder({
  glyph,
}: {
  glyph?: Extract<FileThumbKind, { kind: "folder" }>["glyph"];
}) {
  return (
    <span className="relative grid place-items-center">
      <svg viewBox="0 0 66 54" width={66} height={54} aria-hidden="true">
        <path
          d="M4 8.5a4 4 0 0 1 4-4h15a4 4 0 0 1 2.9 1.2l3.4 3.6a4 4 0 0 0 2.9 1.2H58a4 4 0 0 1 4 4V46a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"
          fill="url(#cu-folder-back)"
        />
        <rect
          x="8"
          y="13"
          width="50"
          height="22"
          rx="2"
          fill="#ececf1"
          opacity=".92"
        />
        <path
          d="M4 21a4 4 0 0 1 4-4h50a4 4 0 0 1 4 4v25a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"
          fill="url(#cu-folder-front)"
        />
        <path
          d="M8 17.6h50"
          stroke="#fff"
          strokeOpacity=".45"
          strokeWidth="1.2"
        />
      </svg>
      {glyph && (
        <Icon
          name={glyph}
          size={18}
          stroke={2}
          className="absolute top-6.25 text-[rgb(25_22_40/0.5)]"
        />
      )}
    </span>
  );
}

function Page({
  badge,
  color,
  dark = false,
  children,
}: {
  badge: string;
  color: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <span className={`cu-page ${dark ? "is-dark" : ""}`}>
      {children}
      <span
        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-[3px] px-1 py-px font-bold text-[7.5px] text-white tracking-[0.04em]"
        style={{ background: color }}
      >
        {badge}
      </span>
    </span>
  );
}

export function FileThumb({ thumb }: { thumb: FileThumbKind }) {
  switch (thumb.kind) {
    case "folder":
      return <Folder glyph={thumb.glyph} />;
    case "image":
      return <span className="cu-photo" style={art(thumb.art)} />;
    case "video":
      return (
        <span
          className="cu-photo grid place-items-center"
          style={art(thumb.art)}
        >
          <Icon
            name="play"
            size={14}
            stroke={0}
            className="fill-white opacity-90"
          />
          <span className="absolute right-0.75 bottom-0.75 rounded-[3px] bg-black/55 px-0.75 font-semibold text-[8px] text-white">
            {thumb.duration}
          </span>
        </span>
      );
    case "disc":
      return <span className="cu-disc" />;
    case "archive":
      return <span className="cu-archive" />;
    case "code":
      return (
        <Page badge={thumb.badge} color={thumb.color} dark>
          <span className="absolute inset-x-1.5 top-3.5 bottom-4.5 flex flex-col gap-0.75">
            {CODE_LINES.map(([color, width]) => (
              <i
                key={`${color}-${width}`}
                className="block h-0.5 rounded-full"
                style={{ background: color, width }}
              />
            ))}
          </span>
        </Page>
      );
    case "vector":
      return (
        <Page badge={thumb.badge} color={thumb.color}>
          <span className="absolute inset-x-2 top-3.5 bottom-5 grid grid-cols-2 gap-1">
            {VECTOR_DOTS.map((color) => (
              <i
                key={color}
                className="rounded-full"
                style={{ background: color }}
              />
            ))}
          </span>
        </Page>
      );
    case "sheet":
      return (
        <Page badge={thumb.badge} color={thumb.color}>
          <span className="cu-sheet-grid" />
        </Page>
      );
    case "audio":
      return (
        <Page badge={thumb.badge} color={thumb.color}>
          <svg
            viewBox="0 0 34 22"
            preserveAspectRatio="none"
            className="absolute inset-x-1.5 top-4.5 h-5.5 w-[calc(100%-12px)] fill-none stroke-[#d97706] stroke-[1.4]"
            aria-hidden="true"
          >
            <path d="M1 11h3l2-6 2 12 2-9 2 6 2-10 2 14 2-8 2 4 2-7 2 9 2-5 2 2h3" />
          </svg>
        </Page>
      );
    case "page":
      return (
        <Page badge={thumb.badge} color={thumb.color}>
          <span className="cu-page-lines" />
        </Page>
      );
  }
}
