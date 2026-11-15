import { CrownIcon } from "@/components/icons/CrownIcon";
import type { TeamMember } from "@/data/team";
import { PortraitImage } from "./PortraitImage";

type TeamPortraitProps = {
  member: TeamMember;
  className?: string;
};

export function TeamPortrait({ member, className }: TeamPortraitProps) {
  return (
    <div
      className={`grid place-items-center overflow-hidden shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)] ${member.portrait ? "bg-black" : "bg-[radial-gradient(120%_90%_at_50%_0%,#2a2a2e,#0e0e10)]"} ${className ?? ""}`}
    >
      {member.portrait ? (
        <PortraitImage
          basePath={member.portrait}
          kind="avatar"
          sizes="44px"
          className="size-full object-cover"
        />
      ) : (
        <CrownIcon className="w-[28%] text-white/15" />
      )}
    </div>
  );
}
