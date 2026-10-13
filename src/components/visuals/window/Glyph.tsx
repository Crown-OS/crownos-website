const GLYPH_PATHS = {
  "chevron-left": "m15 18-6-6 6-6",
  "chevron-right": "m9 18 6-6-6-6",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-up": "m18 15-6-6-6 6",
  refresh: "M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5",
  more: "M12 5v.01M12 12v.01M12 19v.01",
  expand: "M14 4h6v6M10 20H4v-6M20 4l-6 6M4 20l6-6",
  close: "M18 6 6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM18 11a6 6 0 0 1-12 0M12 17v4",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
  download: "M12 4v11m-5-5 5 5 5-5M5 20h14",
  sparkle: "M12 3l2 6.2 6 1.8-6 1.8-2 6.2-2-6.2-6-1.8 6-1.8Z",
  shield: "M12 3 5 6v6c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6Z",
  window: "M3 5h18v14H3ZM3 9h18",
  focus: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M9 9h6v6H9Z",
  globe:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.7 3.7 5.7 3.7 9s-1.2 6.3-3.7 9c-2.5-2.7-3.7-5.7-3.7-9s1.2-6.3 3.7-9Z",
  folder:
    "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
  phone:
    "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM11 18h2",
  tablet:
    "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM11 18h2",
  server: "M4 4h16v6H4ZM4 14h16v6H4ZM8 7v.01M8 17v.01",
  clipboard: "M9 3h6v3H9ZM9 5H6v16h12V5h-3M9 12h6M9 16h4",
  bell: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4ZM10 21h4",
  call: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  camera:
    "M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  hotspot:
    "M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5v.01M2 9a15 15 0 0 1 20 0",
  terminal: "M4 17l6-5-6-5M12 19h8",
  lock: "M6 11h12v10H6ZM8 11V7a4 4 0 0 1 8 0v4",
  check: "m5 12 5 5 9-10",
} as const;

export type GlyphName = keyof typeof GLYPH_PATHS;

export function Glyph({
  name,
  className = "size-4",
  strokeWidth = 1.75,
}: {
  name: GlyphName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "more" ? 3 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path d={GLYPH_PATHS[name]} />
    </svg>
  );
}
