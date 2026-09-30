export type Token = { word: string; emphasis: boolean; index: number };

const EMPHASIS_MARK = "*";
const CLOSING_MARK = /\*\W*$/;

export function tokenize(text: string, offset = 0): Token[] {
  let emphasis = false;
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((raw, position) => {
      const marked = raw.length > 1 && raw.includes(EMPHASIS_MARK);
      if (marked && raw.startsWith(EMPHASIS_MARK)) emphasis = true;
      const token = {
        word: marked ? raw.replaceAll(EMPHASIS_MARK, "") : raw,
        emphasis,
        index: offset + position,
      };
      if (marked && CLOSING_MARK.test(raw)) emphasis = false;
      return token;
    });
}

export function tokenizeLines(lines: readonly string[]): Token[][] {
  let offset = 0;
  return lines.map((line) => {
    const tokens = tokenize(line, offset);
    offset += tokens.length;
    return tokens;
  });
}

export function mergeEmphasisRuns(tokens: readonly Token[]): Token[] {
  return tokens.reduce<Token[]>((merged, token) => {
    const previous = merged.at(-1);
    if (previous?.emphasis && token.emphasis) {
      merged[merged.length - 1] = {
        ...previous,
        word: `${previous.word} ${token.word}`,
      };
    } else {
      merged.push(token);
    }
    return merged;
  }, []);
}
