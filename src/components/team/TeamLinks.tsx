import {
  TEAM_LINK_KINDS,
  TEAM_LINK_LABELS,
  type TeamMember,
} from "@/data/team";

export function TeamLinks({ member }: { member: TeamMember }) {
  const kinds = TEAM_LINK_KINDS.filter((kind) => member.links[kind]);
  if (kinds.length === 0) return null;
  return (
    <ul className="pointer-events-auto relative mt-5 flex justify-center gap-5 text-[0.9375rem] tracking-[-0.01em]">
      {kinds.map((kind) => (
        <li key={kind}>
          <a
            href={member.links[kind]}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on ${TEAM_LINK_LABELS[kind]}`}
            className="group/link inline-flex items-center gap-1 text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {TEAM_LINK_LABELS[kind]}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5 transition-transform duration-300 ease-(--ease-out-expo) group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
