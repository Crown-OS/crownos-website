"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { matchesTerms, queryTerms } from "@/util/catalog-search";
import type { SearchEntry } from "@/util/docs-navigation";

const RESULT_LIMIT = 8;

type DocsSearchProps = { entries: SearchEntry[]; searchIcon: ReactNode };

const searchable = (entry: SearchEntry) =>
  `${entry.title} ${entry.description} ${entry.section}`.toLowerCase();

export function DocsSearch({ entries, searchIcon }: DocsSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const terms = queryTerms(query);
  const results = entries
    .filter((entry) => matchesTerms(searchable(entry), terms))
    .slice(0, RESULT_LIMIT);

  const open = () => {
    dialogRef.current?.showModal();
    inputRef.current?.select();
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const openOnShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", openOnShortcut);
    return () => window.removeEventListener("keydown", openOnShortcut);
  });

  const navigateResults = (event: KeyboardEvent<HTMLInputElement>) => {
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (step && results.length > 0) {
      event.preventDefault();
      setCursor((cursor + step + results.length) % results.length);
    } else if (event.key === "Enter" && results[cursor]) {
      router.push(results[cursor].href);
      close();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex h-9 w-full items-center gap-3 rounded-control border border-border bg-white/[0.03] px-3.5 text-muted text-ui transition-colors hover:border-border-strong hover:text-foreground"
      >
        <span className="size-4 shrink-0">{searchIcon}</span>
        <span className="flex-1 truncate text-left max-sm:sr-only">
          Search docs
        </span>
        <kbd className="font-mono text-faint text-micro max-sm:hidden">⌘K</kbd>
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Search documentation"
        data-lenis-prevent
        onClick={(event) => event.target === event.currentTarget && close()}
        onKeyDown={(event) => event.key === "Escape" && close()}
        className="squircle mx-auto mt-[12vh] w-[min(40rem,calc(100%-2rem))] rounded-card border border-border-strong bg-gray-950 p-0 text-foreground opacity-0 shadow-2xl shadow-black transition-[opacity,scale,display,overlay] transition-discrete duration-300 ease-out-expo backdrop:bg-black/70 backdrop:backdrop-blur-sm open:opacity-100 starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="flex items-center gap-3 border-border border-b px-5">
          <span className="size-4 shrink-0 text-faint">{searchIcon}</span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded
            aria-controls={listId}
            aria-activedescendant={
              results[cursor] ? `${listId}-${cursor}` : undefined
            }
            placeholder="Search guides, APIs and help articles"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={navigateResults}
            className="h-14 flex-1 bg-transparent text-body outline-none placeholder:text-faint"
          />
          <kbd className="font-mono text-faint text-micro">esc</kbd>
        </div>
        {results.length === 0 && (
          <p className="px-4 py-12 text-center text-muted text-ui">
            No pages match “{query}”
          </p>
        )}
        <div
          id={listId}
          role="listbox"
          aria-label="Results"
          className="grid max-h-[50vh] gap-1 overflow-y-auto p-2 empty:hidden"
        >
          {results.map((entry, index) => (
            <div
              key={entry.href}
              id={`${listId}-${index}`}
              role="option"
              tabIndex={-1}
              aria-selected={index === cursor}
              onPointerMove={() => setCursor(index)}
            >
              <Link
                href={entry.href}
                onClick={close}
                tabIndex={-1}
                className={`grid gap-1 rounded-lg px-4 py-3 transition-colors ${index === cursor ? "bg-white/[0.07]" : ""}`}
              >
                <span className="font-mono text-[0.6875rem] text-faint uppercase">
                  {entry.section}
                </span>
                <span className="font-medium text-ui">{entry.title}</span>
                <span className="truncate text-micro text-muted">
                  {entry.description}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}
