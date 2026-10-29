"use client";

import type { MouseEvent, ReactNode } from "react";
import { useClipboard } from "@/util/use-clipboard";

type CopyCodeButtonProps = { copyIcon: ReactNode; copiedIcon: ReactNode };

export function CopyCodeButton({ copyIcon, copiedIcon }: CopyCodeButtonProps) {
  const { copied, copy } = useClipboard();

  const copyBlock = (event: MouseEvent<HTMLButtonElement>) => {
    const code = event.currentTarget
      .closest("figure")
      ?.querySelector("pre code");
    if (code instanceof HTMLElement) copy(code.innerText.trimEnd());
  };

  return (
    <button
      type="button"
      onClick={copyBlock}
      aria-label={copied ? "Copied" : "Copy code"}
      className="absolute top-2 right-2 grid size-8 place-items-center rounded-md bg-gray-950/80 text-faint transition-colors hover:bg-white/[0.08] hover:text-foreground"
    >
      {copied ? copiedIcon : copyIcon}
    </button>
  );
}
