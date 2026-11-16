const TOOLS = ["select", "brush", "eraser", "fill", "text"] as const;
const ACTIVE_TOOL: (typeof TOOLS)[number] = "brush";

export function PaintAppContent() {
  return (
    <div className="flex size-full">
      <ul className="grid w-6 shrink-0 content-start justify-items-center gap-1.5 border-r border-[#27272a] pt-2">
        {TOOLS.map((tool) => (
          <li
            key={tool}
            className={`size-3 rounded-[calc(var(--u)*3)] ${tool === ACTIVE_TOOL ? "bg-white/45" : "bg-white/10"}`}
          />
        ))}
      </ul>
      <div className="m-2 grow rounded-md bg-[#161618] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]" />
    </div>
  );
}
