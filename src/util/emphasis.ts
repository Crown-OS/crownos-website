const EMPHASIS_MARK = "*";
const WHITESPACE = /(\s+)/;

export type EmphasisPart = { text: string; emphasized: boolean };
export type EmphasisWord = EmphasisPart & { index: number };

export const splitEmphasis = (text: string): EmphasisPart[] =>
  text
    .split(EMPHASIS_MARK)
    .map((part, index) => ({ text: part, emphasized: index % 2 === 1 }));

export function splitEmphasisWords(text: string) {
  let index = 0;
  return splitEmphasis(text).flatMap(({ text: part, emphasized }) =>
    part
      .split(WHITESPACE)
      .filter(Boolean)
      .map((chunk): EmphasisWord | null =>
        WHITESPACE.test(chunk)
          ? null
          : { text: chunk, emphasized, index: index++ },
      ),
  );
}
