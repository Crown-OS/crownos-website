import { CrownLinkShowcase } from "@/components/crownlink/CrownLinkShowcase";
import { crownLinkCopy } from "@/data/crownlink";

export function CrownLink() {
  const { headline, summary } = crownLinkCopy;
  return (
    <section
      id="crownlink"
      aria-labelledby="crownlink-title"
      className="px-gutter py-24 font-inter md:py-36"
    >
      <header className="scroll-reveal mx-auto grid max-w-3xl justify-items-center gap-5 text-center">
        <h2
          id="crownlink-title"
          className="text-[2.25rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-5xl md:leading-[1.1]"
        >
          {headline}
        </h2>
        <p className="max-w-[34em] text-[1.0625rem] leading-normal tracking-[-0.011em] text-muted md:text-lg">
          {summary}
        </p>
      </header>
      <CrownLinkShowcase />
    </section>
  );
}
