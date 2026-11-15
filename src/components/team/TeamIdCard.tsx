import type { CSSProperties, Ref } from "react";
import type { TeamMember } from "@/data/team";
import { TeamBadge } from "./TeamBadge";

type TeamIdCardProps = {
  member: TeamMember;
  index: number;
  restStyle: CSSProperties;
  cardRef: Ref<HTMLLIElement>;
  twistRef: Ref<HTMLDivElement>;
};

export function TeamIdCard({
  member,
  index,
  restStyle,
  cardRef,
  twistRef,
}: TeamIdCardProps) {
  return (
    <li
      ref={cardRef}
      data-card-index={index}
      className="group/lanyard absolute flex w-[min(20rem,calc(100%-1rem))] cursor-grab touch-none flex-col items-center [transform:translateX(-50%)] origin-[50%_0] select-none perspective-[1400px] data-dragging:cursor-grabbing"
      style={restStyle}
    >
      <span aria-hidden="true" className="team-lanyard-clip" />
      <div ref={twistRef} className="w-full transform-3d">
        <div className="relative transform-3d">
          <TeamBadge member={member} />
          <span
            aria-hidden="true"
            className="absolute top-[1.125rem] left-1/2 z-2 h-3 w-16 translate-x-[-50%] rounded-[9999px] bg-[#050506] [box-shadow:inset_0_1px_2px_rgb(0_0_0/0.9),0_0_0_1.5px_#8e8e95,0_0_0_2.5px_rgb(255_255_255/0.1)]"
          />
        </div>
      </div>
    </li>
  );
}
