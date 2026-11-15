import { discordInviteUrl } from "./community";

export const TEAM_LINK_KINDS = ["portfolio", "github", "x", "discord"] as const;

export type TeamLinkKind = (typeof TEAM_LINK_KINDS)[number];

export const TEAM_LINK_LABELS: Record<TeamLinkKind, string> = {
  portfolio: "Portfolio",
  github: "GitHub",
  x: "X",
  discord: "Discord",
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  location?: string;
  bio: string;
  portrait?: string;
  focus: readonly string[];
  links: Partial<Record<TeamLinkKind, string>>;
};

const PLACEHOLDER_MEMBER = {
  name: "Team member",
  role: "Role title",
  location: "City, Country",
  bio: "One line about what this person builds for CrownOS.",
  focus: ["Project / Area"],
  links: { portfolio: "#", github: "#", x: "#" },
} as const;

export const teamMembers: readonly TeamMember[] = [
  {
    id: "rama-krishnan",
    name: "Ramakrishnan V",
    role: "Creator of CrownOS",
    bio: "Building an agent native desktop on the Linux kernel.",
    portrait: "/team/rama-krishnan",
    focus: ["OS / CrownOS", "Toolkit / CrownUI"],
    links: {
      portfolio: "https://ramakrishnan.crownos.org",
      github: "https://github.com/marvelxcodes",
      x: "https://x.com/marvelxcodes",
    },
  },
  { id: "member-02", ...PLACEHOLDER_MEMBER },
  { id: "member-03", ...PLACEHOLDER_MEMBER },
  {
    id: "open-position",
    name: "This could be you",
    role: "We are looking for people",
    bio: "Join a small open source team and help build an agent native desktop on the Linux kernel.",
    focus: ["Engineering", "Design"],
    links: {
      github: "https://github.com/Crown-OS",
      discord: discordInviteUrl,
    },
  },
];

export const teamCopy = {
  headline: "Meet the people behind the OS",
  summary:
    "A small open source team building CrownOS, an agent native desktop on the Linux kernel. We design every layer in the open, from the compositor to the apps you rely on every day.",
} as const;
