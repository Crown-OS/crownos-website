import { BenchmarkComparison } from "@/components/benchmarks/BenchmarkComparison";
import { benchmarkCopy } from "@/data/benchmarks";

export function Benchmarks() {
  const { headline, subline } = benchmarkCopy;
  return (
    <section
      id="benchmarks"
      aria-labelledby="benchmarks-title"
      className="mx-auto max-w-310 px-gutter py-24 font-inter md:py-36"
    >
      <header className="scroll-reveal grid justify-items-center gap-5 text-center">
        <h2
          id="benchmarks-title"
          className="max-w-[13em] text-[2.25rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-5xl md:leading-[1.1]"
        >
          {headline}
        </h2>
        <p className="max-w-[34em] text-[1.0625rem] tracking-[-0.011em] text-muted md:text-lg">
          {subline}
        </p>
      </header>
      <div className="scroll-reveal mt-16 md:mt-20">
        <BenchmarkComparison />
      </div>
    </section>
  );
}
