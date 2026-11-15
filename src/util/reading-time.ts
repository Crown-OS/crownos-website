const WORDS_PER_MINUTE = 220;
const FRONTMATTER = /^---[\s\S]*?---/;

export function readingMinutes(source: string) {
  const words = source.replace(FRONTMATTER, "").split(/\s+/).filter(Boolean);
  return Math.max(1, Math.round(words.length / WORDS_PER_MINUTE));
}
