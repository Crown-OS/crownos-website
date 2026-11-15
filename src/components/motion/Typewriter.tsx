"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_DELAY = 55;
const DELETE_DELAY = 28;
const HOLD_DELAY = 1800;
const NEXT_DELAY = 350;

type TypewriterProps = {
  phrases: readonly string[];
  className?: string;
};

export function Typewriter({ phrases, className = "" }: TypewriterProps) {
  const [text, setText] = useState(phrases[0]);
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let length = phrases[0].length;
    let isDeleting = true;
    let isVisible = false;
    let timer = 0;

    const schedule = (delay: number) => {
      timer = window.setTimeout(step, delay);
    };

    function step() {
      if (!isVisible) return;
      const phrase = phrases[phraseIndex];
      if (isDeleting) {
        length -= 1;
        setText(phrase.slice(0, length));
        if (length > 0) return schedule(DELETE_DELAY);
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        return schedule(NEXT_DELAY);
      }
      const nextPhrase = phrases[phraseIndex];
      length += 1;
      setText(nextPhrase.slice(0, length));
      if (length < nextPhrase.length) return schedule(TYPE_DELAY);
      isDeleting = true;
      schedule(HOLD_DELAY);
    }

    const visibility = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      window.clearTimeout(timer);
      if (isVisible) schedule(HOLD_DELAY);
    });
    visibility.observe(host);

    return () => {
      visibility.disconnect();
      window.clearTimeout(timer);
    };
  }, [phrases]);

  return (
    <span ref={hostRef} className={className}>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[1.1em] w-0.5 animate-[caret-blink_1s_steps(1)_infinite] rounded-[1px] bg-sweep-sky align-[-0.18em]" />
      </span>
    </span>
  );
}
