import type { NavLink } from "./footer";

export type Author = {
  name: string;
  avatar: string;
  links: readonly NavLink[];
};

export const AUTHORS = {
  "rama-krishnan": {
    name: "Rama Krishnan V",
    avatar: "/authors/rama-krishnan.jpg",
    links: [
      { label: "GitHub", href: "https://github.com/marvelxcodes" },
      { label: "X", href: "https://x.com/marvelxcodes" },
    ],
  },
} as const satisfies Record<string, Author>;

export type AuthorId = keyof typeof AUTHORS;
export const AUTHOR_IDS = Object.keys(AUTHORS) as AuthorId[];

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  author: AuthorId;
};

export const blogCopy = {
  eyebrow: "Engineering",
  title: ["Blog"],
  lead: "How we build CrownOS: the measurements, the bugs and the fixes, written by the people who made them.",
} as const;
