import { SkeletonBar } from "../../SkeletonBar";

const MESSAGES = [
  { id: "greeting", from: "them", width: "70%" },
  { id: "reply", from: "me", width: "56%" },
  { id: "question", from: "them", width: "48%" },
  { id: "answer", from: "me", width: "64%" },
] as const;

export function ChatAppContent() {
  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-1.5 border-b border-[#27272a] px-2 py-2">
        <span className="size-4 shrink-0 rounded-full bg-[conic-gradient(from_200deg,var(--color-sweep-sky),var(--color-sweep-blue),var(--color-sweep-pink),var(--color-sweep-sky))]" />
        <SkeletonBar width="45%" className="h-1.5 bg-white/25" />
      </div>
      <ul className="grid grow content-end gap-1.5 p-2">
        {MESSAGES.map(({ id, from, width }) => (
          <li
            key={id}
            style={{ width }}
            className={`h-4 rounded-lg ${from === "me" ? "justify-self-end bg-[linear-gradient(180deg,var(--color-sweep-sky),var(--color-sweep-blue))] opacity-85" : "bg-white/10"}`}
          />
        ))}
      </ul>
      <div className="mx-2 mb-2 flex h-5 items-center rounded-full bg-white/6 px-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
        <SkeletonBar width="40%" className="h-1 bg-white/15" />
      </div>
    </div>
  );
}
