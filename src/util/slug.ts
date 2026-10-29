const NON_WORD = /[^\p{L}\p{N}\s-]/gu;
const WHITESPACE = /\s+/g;

export const slugify = (text: string) =>
  text.toLowerCase().replace(NON_WORD, "").trim().replace(WHITESPACE, "-");
