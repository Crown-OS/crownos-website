import type { CatalogMeta } from "@/data/catalog";

const WHITESPACE = /\s+/;

export const searchableText = (entry: CatalogMeta) =>
  [entry.name, entry.description, entry.category, entry.author, ...entry.tags]
    .join(" ")
    .toLowerCase();

export const queryTerms = (query: string) =>
  query.toLowerCase().split(WHITESPACE).filter(Boolean);

export const matchesTerms = (text: string, terms: readonly string[]) =>
  terms.every((term) => text.includes(term));

export const formatOrdinal = (index: number) =>
  String(index + 1).padStart(2, "0");
