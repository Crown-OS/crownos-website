"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/util/frame-loop";
import { markRevealed, REVEALED_ATTRIBUTE } from "@/util/reveal";

const PENDING = `[data-reveal]:not([${REVEALED_ATTRIBUTE}])`;

export function RevealObserver() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.querySelectorAll(PENDING).forEach(markRevealed);
      return;
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
  }, []);

  return null;
}
