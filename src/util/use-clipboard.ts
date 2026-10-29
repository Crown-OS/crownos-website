"use client";

import { useState } from "react";

const RESET_AFTER_MS = 1800;

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), RESET_AFTER_MS);
  };

  return { copied, copy };
}
