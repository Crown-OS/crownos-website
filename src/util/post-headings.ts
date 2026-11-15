import GithubSlugger from "github-slugger";

export type PostHeading = { id: string; title: string };

const CODE_FENCE = /^(```|~~~)/;
const SECOND_LEVEL_HEADING = /^##\s+(.+?)\s*#*$/;
const INLINE_MARKUP = /[`*_]|\[([^\]]*)\]\([^)]*\)/g;

export function extractPostHeadings(source: string): PostHeading[] {
  const slugger = new GithubSlugger();
  const headings: PostHeading[] = [];
  let isInsideCodeFence = false;
  for (const line of source.split("\n")) {
    if (CODE_FENCE.test(line.trim())) isInsideCodeFence = !isInsideCodeFence;
    if (isInsideCodeFence) continue;
    const match = SECOND_LEVEL_HEADING.exec(line);
    if (!match) continue;
    const title = match[1].replace(INLINE_MARKUP, "$1");
    headings.push({ id: slugger.slug(title), title });
  }
  return headings;
}
