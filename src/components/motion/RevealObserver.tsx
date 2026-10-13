"use client";

import { useEffect } from "react";
import { onRevealsReleased } from "@/util/intro";
import { prefersReducedMotion } from "@/util/reduced-motion";
import { markRevealed, REVEALED_ATTRIBUTE } from "@/util/reveal";

const PENDING = `[data-reveal]:not([${REVEALED_ATTRIBUTE}])`;

function observeReveals() {
  if (prefersReducedMotion()) {
    document.querySelectorAll(PENDING).forEach(markRevealed);
    return () => {};
  }

  const intersection = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        markRevealed(entry.target);
        intersection.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );

  const observePending = () =>
    document.querySelectorAll(PENDING).forEach((element) => {
      intersection.observe(element);
    });

  observePending();
  const mutations = new MutationObserver(observePending);
  mutations.observe(document.body, { childList: true, subtree: true });

  return () => {
    mutations.disconnect();
    intersection.disconnect();
  };
}

export function RevealObserver() {
  useEffect(() => onRevealsReleased(observeReveals), []);
  return null;
}
