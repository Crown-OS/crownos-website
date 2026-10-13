export type RonTokenKind =
  | "plain"
  | "string"
  | "number"
  | "keyword"
  | "variant";
export type RonToken = { text: string; kind: RonTokenKind };

const RON_TOKEN =
  /("[^"]*")|\b(true|false|None|Some)\b|(-?\b\d+(?:\.\d+)?\b)|\b([A-Z]\w*)\b/g;

const KIND_BY_GROUP: RonTokenKind[] = [
  "string",
  "keyword",
  "number",
  "variant",
];

export function highlightRon(line: string): RonToken[] {
  const tokens: RonToken[] = [];
  let cursor = 0;
  for (const match of line.matchAll(RON_TOKEN)) {
    const group = match.slice(1).findIndex(Boolean);
    if (match.index > cursor) {
      tokens.push({ text: line.slice(cursor, match.index), kind: "plain" });
    }
    tokens.push({ text: match[0], kind: KIND_BY_GROUP[group] });
    cursor = match.index + match[0].length;
  }
  if (cursor < line.length) {
    tokens.push({ text: line.slice(cursor), kind: "plain" });
  }
  return tokens;
}
