import type { CatalogMeta } from "@/data/catalog";

const WHITESPACE = /\s+/;

export const searchableText = (entry: CatalogMeta) =>
  [entry.name, entry.description, entry.category, entry.author, ...entry.tags]
    .join(" ")
    .toLowerCase();

export function matchesQuery(text: string, query: string) {
  const terms = query.toLowerCase().split(WHITESPACE).filter(Boolean);
  return terms.every((term) => text.includes(term));
}

export const formatOrdinal = (index: number) =>
  String(index + 1).padStart(2, "0");
