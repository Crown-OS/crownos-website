"use client";

import { useEffect, useRef } from "react";
import { SearchIcon } from "@/components/icons";

const FOCUS_KEY = "/";
const EDITABLE = "input, textarea, select, [contenteditable]";

type SearchFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchField({ label, value, onChange }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusOnSlash = (event: KeyboardEvent) => {
      if (event.key !== FOCUS_KEY) return;
      if ((event.target as Element).closest(EDITABLE)) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", focusOnSlash);
    return () => window.removeEventListener("keydown", focusOnSlash);
  }, []);

  return (
    <label className="group flex h-16 items-center gap-4 border-border-strong border-b transition-colors duration-500 focus-within:border-foreground md:h-20">
      <SearchIcon className="size-5 shrink-0 text-muted transition-colors duration-500 group-focus-within:text-foreground md:size-6" />
      <span className="sr-only">{label}</span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        placeholder={`${label}…`}
        autoComplete="off"
        spellCheck={false}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => event.key === "Escape" && onChange("")}
        className="min-w-0 flex-1 bg-transparent text-title outline-none placeholder:text-faint focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="font-mono text-micro text-muted uppercase transition-colors hover:text-foreground"
        >
          Clear
        </button>
      ) : (
        <kbd className="grid size-7 place-items-center rounded-md border border-border-strong font-mono text-micro text-muted">
          {FOCUS_KEY}
        </kbd>
      )}
    </label>
  );
}
