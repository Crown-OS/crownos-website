import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cache } from "react";
import { AUTHOR_IDS, POST_CATEGORY_IDS, type PostMeta } from "@/data/blog";
import { FrontmatterError, readFrontmatter } from "./frontmatter";
import { extractPostHeadings, type PostHeading } from "./post-headings";
import { readingMinutes } from "./reading-time";

const BLOG_ROOT = path.join(process.cwd(), "src", "content", "blog");
const MDX_EXTENSION = ".mdx";
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type Post = {
  meta: PostMeta;
  headings: PostHeading[];
  Content: MDXContent;
};

function readDate(source: string, value: string) {
  if (!ISO_DATE.test(value) || Number.isNaN(Date.parse(value))) {
    throw new FrontmatterError(`${source}: "date" must be YYYY-MM-DD`);
  }
  return value;
}

async function loadPost(slug: string): Promise<Post> {
  const source = `blog/${slug}${MDX_EXTENSION}`;
  const [{ default: Content, frontmatter }, raw] = await Promise.all([
    import(`@/content/blog/${slug}.mdx`),
    readFile(path.join(BLOG_ROOT, `${slug}${MDX_EXTENSION}`), "utf8"),
  ]);
  const reader = readFrontmatter(source, frontmatter);
  return {
    meta: {
      slug,
      title: reader.text("title"),
      description: reader.text("description"),
      date: readDate(source, reader.text("date")),
      category: reader.oneOf("category", POST_CATEGORY_IDS),
      author: reader.oneOf("author", AUTHOR_IDS),
      readingMinutes: readingMinutes(raw),
    },
    headings: extractPostHeadings(raw),
    Content,
  };
}

export const loadPosts = cache(async () => {
  const files = await readdir(BLOG_ROOT);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(MDX_EXTENSION))
      .map((file) => loadPost(path.basename(file, MDX_EXTENSION))),
  );
  return posts.sort((left, right) =>
    right.meta.date.localeCompare(left.meta.date),
  );
});

export const loadPostMetas = cache(async () =>
  (await loadPosts()).map(({ meta }) => meta),
);

export const findPost = (posts: Post[], slug: string) =>
  posts.find((post) => post.meta.slug === slug);
