import type { DocTemplate } from "@/data/docs";
import { slugify } from "./slug";

export type DocHeading = { id: string; text: string; depth: 2 | 3 };

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{2,3})\s+(.+?)\s*#*$/;
const UPDATE_LABEL = /<Update\b[^>]*\blabel="([^"]+)"/;
const INLINE_CODE = /`([^`]+)`/g;
const LINK = /\[([^\]]+)\]\([^)]*\)/g;
const EMPHASIS = /\*+/g;

const plainText = (markdown: string) =>
  markdown.replace(INLINE_CODE, "$1").replace(LINK, "$1").replace(EMPHASIS, "");

const heading = (text: string, depth: 2 | 3): DocHeading => ({
  id: slugify(text),
  text,
  depth,
});

function* proseLines(source: string) {
  let fenced = false;
  for (const line of source.split("\n")) {
    if (FENCE.test(line)) fenced = !fenced;
    else if (!fenced) yield line;
  }
}

const markdownHeadings = (source: string) =>
  [...proseLines(source)].flatMap((line) => {
    const match = HEADING.exec(line);
    return match
      ? [heading(plainText(match[2]), match[1].length === 2 ? 2 : 3)]
      : [];
  });

const updateHeadings = (source: string) =>
  [...proseLines(source)].flatMap((line) => {
    const match = UPDATE_LABEL.exec(line);
    return match ? [heading(match[1], 2)] : [];
  });

export const extractHeadings = (source: string, template: DocTemplate) =>
  template === "changelog" ? updateHeadings(source) : markdownHeadings(source);
