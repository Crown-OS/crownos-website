const SKELETON_WIDTHS = ["72%", "54%", "64%", "38%"];

export function WindowChrome({ title }: { title: string }) {
  return (
    <>
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-white/8 border-b px-3">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-2 rounded-full bg-white/18" />
        ))}
        <span className="ml-3 truncate font-mono text-[10px] text-white/45">
          {title}
        </span>
      </div>
      <div className="grid gap-2 p-3">
        {SKELETON_WIDTHS.map((width) => (
          <span
            key={width}
            className="h-1.5 rounded-full bg-white/10"
            style={{ width }}
          />
        ))}
      </div>
    </>
  );
}
