import type { CSSProperties } from "react";
import type { CursorIdentity } from "./layout";
import { motionTrack } from "./motionTrack";

type AgentCursorProps = {
  identity: CursorIdentity;
  rest: readonly [number, number];
};

export function AgentCursor({ identity, rest }: AgentCursorProps) {
  return (
    <span
      aria-hidden="true"
      className="agent-motion pointer-events-none absolute top-0 left-0 z-10 origin-top-left"
      style={
        {
          ...motionTrack(identity.track),
          translate: `calc(var(--u) * var(--window-scale) * ${rest[0]}) calc(var(--u) * var(--window-scale) * ${rest[1]})`,
        } as CSSProperties
      }
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 14 19"
        className={`block h-5 w-auto stroke-ink/70 drop-shadow-[0_2px_3px_rgb(0_0_0/0.5)] ${identity.fillClass}`}
      >
        <path
          d="M1 1v15.5l4.2-4 2.9 6.2 2.6-1.2-2.8-6H13.5Z"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`absolute top-4.5 left-3 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap shadow-[0_4px_12px_rgb(0_0_0/0.4)] ${identity.pillClass}`}
      >
        {identity.name}
      </span>
    </span>
  );
}
