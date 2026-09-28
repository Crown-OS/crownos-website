import { marqueeWords } from "@/data/crownos";

const COPIES = [0, 1] as const;

export function MarqueeBand() {
  return (
    <section
      aria-label={marqueeWords.join(", ")}
      className="relative z-10 overflow-clip border-ink/10 border-t bg-paper py-[clamp(0.25rem,1vw,1rem)] text-ink"
    >
      <div className="marquee-track">
        {COPIES.map((copy) => (
          <div
            key={copy}
            aria-hidden
            className="flex shrink-0 items-center text-[clamp(3.5rem,9.5vw,10rem)] leading-[1.02] tracking-[-0.06em]"
          >
            {marqueeWords.map((word) => (
              <span key={word} className="flex items-center">
                <span className="px-[0.14em]">{word}</span>
                <span className="px-16"></span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
