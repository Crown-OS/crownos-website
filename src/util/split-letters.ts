export type Letter = { char: string; index: number };
export type Word = { letters: Letter[] };

export function splitLetters(text: string): { words: Word[]; count: number } {
  let index = 0;
  const words = text
    .split(" ")
    .filter(Boolean)
    .map((word) => ({
      letters: [...word].map((char) => ({ char, index: index++ })),
    }));
  return { words, count: index };
}
