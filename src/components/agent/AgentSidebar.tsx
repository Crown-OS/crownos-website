import { agentChatGroups, agentChats } from "@/data/agent";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function AgentSidebar() {
  return (
    <aside className="hidden mask-[linear-gradient(to_bottom,#000_70%,transparent_96%)] w-[17.5rem] shrink-0 flex-col gap-1 border-white/6 border-r bg-white/[0.025] p-2 md:flex">
      <div className="flex items-center justify-between px-2 py-2">
        <span className="flex gap-2">
          <span className="size-3 rounded-full bg-white/15" />
          <span className="size-3 rounded-full bg-white/15" />
          <span className="size-3 rounded-full bg-white/15" />
        </span>
        <svg
          aria-hidden="true"
          {...ICON_PROPS}
          className="size-[1.125rem] text-white/60"
        >
          <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </div>
      <div className="mb-2 flex items-center gap-2.5 rounded-lg bg-white/6 px-3 py-2.5 text-[0.875rem] text-white/45">
        <svg aria-hidden="true" {...ICON_PROPS} className="size-4">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        Search chats
      </div>
      {agentChatGroups.map((group) => (
        <span
          key={group}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.9375rem] text-white/85"
        >
          <svg
            aria-hidden="true"
            {...ICON_PROPS}
            className="size-4 text-white/60"
          >
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          </svg>
          {group}
        </span>
      ))}
      {agentChats.map((chat, index) => (
        <span
          key={chat}
          className={`truncate rounded-lg px-3 py-2 text-[0.875rem] ${index === 0 ? "bg-white/8 text-white" : "text-white/70"}`}
        >
          {chat}
        </span>
      ))}
    </aside>
  );
}
