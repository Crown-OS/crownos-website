import { CrownIcon } from "@/components/icons/CrownIcon";
import type { TeamMember } from "@/data/team";
import { PortraitImage } from "./PortraitImage";
import { TeamLinks } from "./TeamLinks";

type TeamBadgeFrontProps = {
  member: TeamMember;
  isHidden: boolean;
  onFlip: () => void;
};

export function TeamBadgeFront({
  member,
  isHidden,
  onFlip,
}: TeamBadgeFrontProps) {
  return (
    <div
      inert={isHidden}
      className="team-badge-face team-badge-face-front flex aspect-[320/420] w-full flex-col text-center"
    >
      <button
        type="button"
        onClick={onFlip}
        aria-label={`View ${member.name}'s profile`}
        className="absolute inset-0 cursor-pointer rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset"
      />
      <div className="pointer-events-none bg-black absolute inset-0">
        {member.portrait ? (
          <PortraitImage
            basePath={member.portrait}
            kind="card"
            sizes="20rem"
            className="absolute bottom-0 w-full grayscale"
          />
        ) : (
          <CrownIcon className="absolute top-1/3 left-1/2 w-24 -translate-x-1/2 text-white/10" />
        )}
      </div>
      <div className="team-badge-caption pointer-events-none relative isolate mt-auto flex flex-col items-center px-5 pt-16 pb-5 text-center">
        <span className="pointer-events-none block text-[1.625rem] leading-none tracking-[-0.035em]">
          {member.name}
        </span>
        <span className="pointer-events-none mt-2 block text-[0.9375rem] leading-none tracking-[-0.01em] text-white/60">
          {member.role}
        </span>
        <TeamLinks member={member} />
      </div>
    </div>
  );
}
