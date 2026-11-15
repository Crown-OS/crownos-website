import type { TeamMember } from "@/data/team";
import { TeamWire } from "./TeamWire";

export function TeamLine({ members }: { members: readonly TeamMember[] }) {
  return (
    <div className="relative left-1/2 w-[min(100vw,90rem)] -translate-x-1/2 overflow-x-auto px-gutter lg:overflow-visible [scrollbar-width:none]">
      <div className="min-w-[60rem] lg:min-w-0">
        <TeamWire members={members} />
      </div>
    </div>
  );
}
