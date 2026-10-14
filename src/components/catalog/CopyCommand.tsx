"use client";

import { useState } from "react";

const RESET_AFTER_MS = 1800;

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), RESET_AFTER_MS);
  };

  return (
    <div className="squircle flex items-center justify-between gap-4 rounded-tile border border-border-strong bg-white/[0.03] py-2 pr-2 pl-5">
      <code className="truncate font-mono text-ui">
        <span className="text-faint select-none">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="btn btn-secondary h-11 shrink-0 px-5 text-ui"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
