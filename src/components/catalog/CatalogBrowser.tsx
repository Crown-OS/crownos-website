"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import {
  type CSSProperties,
  type ReactNode,
  useDeferredValue,
  useState,
} from "react";
import { Tabs } from "@/components/ui";
import { ALL_CATEGORIES, type CatalogMeta } from "@/data/catalog";
import {
  matchesTerms,
  queryTerms,
  searchableText,
} from "@/util/catalog-search";
import { SearchField } from "./SearchField";

const CARD_TRANSITION = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const HIDDEN = { opacity: 0, scale: 0.94, filter: "blur(10px)" };
const SHOWN = { opacity: 1, scale: 1, filter: "blur(0px)" };
const STAGGER_MS = 90;

type CatalogBrowserProps<Meta extends CatalogMeta> = {
  id: string;
  label: string;
  noun: string;
  entries: readonly Meta[];
  columns: number;
  gridClassName: string;
  renderCard: (entry: Meta, index: number) => ReactNode;
};

const uniqueCategories = (entries: readonly CatalogMeta[]) => [
  ALL_CATEGORIES,
  ...new Set(entries.map((entry) => entry.category)),
];

export function CatalogBrowser<Meta extends CatalogMeta>({
  id,
  label,
  noun,
  entries,
  columns,
  gridClassName,
  renderCard,
}: CatalogBrowserProps<Meta>) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const deferredQuery = useDeferredValue(query);

  const indexed = entries.map((entry, index) => ({
    entry,
    index,
    text: searchableText(entry),
  }));
  const terms = queryTerms(deferredQuery);
  const visible = indexed.filter(
    ({ entry, text }) =>
      (category === ALL_CATEGORIES || entry.category === category) &&
      matchesTerms(text, terms),
  );
  const categories = uniqueCategories(entries).map((name) => ({
    id: name,
    label: name,
  }));
  const panelId = `${id}-results`;

  return (
    <div className="grid gap-12 md:gap-16">
      <div className="grid gap-6" data-reveal>
        <div className="flex items-end gap-6">
          <div className="flex-1">
            <SearchField label={label} value={query} onChange={setQuery} />
          </div>
          <output
            aria-live="polite"
            className="hidden pb-8 font-mono text-micro text-muted uppercase tabular-nums sm:block"
          >
            ({String(visible.length).padStart(2, "0")}) {noun}
          </output>
        </div>
        <Tabs
          label={`${noun} categories`}
          options={categories}
          value={category}
          onChange={setCategory}
          idPrefix={`${id}-category`}
          panelId={panelId}
          className="overflow-x-auto"
        />
      </div>

      <div id={panelId} role="tabpanel">
        <m.ul layout className={gridClassName}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(({ entry, index }, position) => (
              <m.li
                key={entry.slug}
                layout
                initial={HIDDEN}
                animate={SHOWN}
                exit={HIDDEN}
                transition={CARD_TRANSITION}
              >
                <div
                  data-reveal
                  className="h-full"
                  style={
                    {
                      "--delay": `${(position % columns) * STAGGER_MS}ms`,
                    } as CSSProperties
                  }
                >
                  {renderCard(entry, index)}
                </div>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>

        {visible.length === 0 && (
          <div className="grid justify-items-center gap-6 py-24 text-center">
            <p className="text-balance text-title text-trim">
              Nothing matches “{deferredQuery || category}”
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(ALL_CATEGORIES);
              }}
              className="btn btn-secondary h-11 px-5 text-ui"
            >
              Show all {noun}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
