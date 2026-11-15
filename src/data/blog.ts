import { type TeamMember, teamMembers } from "./team";

export const POST_CATEGORIES = {
  engineering: "Engineering",
  product: "Product",
  company: "Company",
} as const;

export type PostCategory = keyof typeof POST_CATEGORIES;
export const POST_CATEGORY_IDS = Object.keys(POST_CATEGORIES) as PostCategory[];

export const AUTHOR_IDS = ["rama-krishnan"] as const;
export type AuthorId = (typeof AUTHOR_IDS)[number];

export function findAuthor(authorId: AuthorId): TeamMember {
  const author = teamMembers.find((member) => member.id === authorId);
  if (!author) throw new Error(`Blog author "${authorId}" is not on the team`);
  return author;
}

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: PostCategory;
  author: AuthorId;
  readingMinutes: number;
};

export const blogCopy = {
  metaTitle: "Blog",
  metaDescription:
    "How we build CrownOS: the measurements, the bugs and the fixes, written by the people who made them.",
  eyebrow: "Blog",
  title: "Our Writings",
  latest: "Latest",
  allCategories: "All articles",
  backLabel: "Blog",
  published: "Published",
  contents: "On this page",
  readMore: "Read more",
} as const;

export const blogHighlightCopy = {
  headline: "Notes from the people building the OS",
  allPosts: "All posts",
  previous: "Previous posts",
  next: "Next posts",
} as const;

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
