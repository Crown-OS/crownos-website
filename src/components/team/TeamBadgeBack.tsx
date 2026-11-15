import { CrownIcon } from "@/components/icons/CrownIcon";
import {
  TEAM_LINK_KINDS,
  TEAM_LINK_LABELS,
  type TeamMember,
} from "@/data/team";
import { TeamPortrait } from "./TeamPortrait";

type TeamBadgeBackProps = {
  member: TeamMember;
  isHidden: boolean;
  onFlip: () => void;
};

export function TeamBadgeBack({
  member,
  isHidden,
  onFlip,
}: TeamBadgeBackProps) {
  return (
    <div
      inert={isHidden}
      className="team-badge-face team-badge-face-back flex flex-col p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-label text-white/40">Profile</span>
        <button
          type="button"
          onClick={onFlip}
          aria-label="Show the front of the card"
          className="grid size-8 cursor-pointer place-items-center rounded-full bg-white/8 text-white/70 transition-colors hover:bg-white/14 hover:text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
          </svg>
        </button>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <TeamPortrait member={member} className="size-11 rounded-full" />
        <div className="grid gap-1.5">
          <span className="text-lg leading-none tracking-[-0.03em] text-white">
            {member.name}
          </span>
          <span className="font-inter text-[0.8125rem] leading-none text-white/50">
            {member.role}
          </span>
        </div>
      </div>
      {member.location && (
        <span className="mt-4 text-label text-white/40">{member.location}</span>
      )}
      <p className="mt-4 font-inter text-sm leading-snug font-normal tracking-[-0.01em] text-white/70">
        {member.bio}
      </p>

      <div className="mt-5 border-white/10 border-t pt-4">
        <span className="text-label text-white/40">Working on</span>
        <ul className="mt-3 font-inter text-sm font-normal text-white/80">
          {member.focus.map((item) => (
            <li key={item} className="border-white/8 border-b py-2.5">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-5">
        <div className="grid gap-2.5">
          <span className="text-label text-white/40">Let's connect</span>
          <ul className="flex gap-3 font-inter text-sm text-white/80">
            {TEAM_LINK_KINDS.filter((kind) => member.links[kind]).map(
              (kind) => (
                <li key={kind}>
                  <a
                    href={member.links[kind]}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {TEAM_LINK_LABELS[kind]} ↗
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <CrownIcon className="w-7 text-white/20" />
      </div>
    </div>
  );
}
