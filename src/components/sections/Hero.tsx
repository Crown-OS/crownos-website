import { ShaderCanvas, SplitWords } from "@/components/motion";
import { PillLink } from "@/components/ui";
import { download, hero } from "@/data/crownos";
import { TERRAIN_SHADER } from "@/shaders/terrain";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-svh flex-col overflow-clip px-gutter pt-[4.5rem] pb-8"
    >
      <ShaderCanvas fragment={TERRAIN_SHADER} className="-z-10" />

      <div className="mt-[clamp(3rem,14vh,10rem)] grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-4">
        <SplitWords
          as="h1"
          lines={hero.lines}
          highlight={hero.brand}
          delay={150}
          className="text-display md:col-span-6 md:col-start-7"
        />
      </div>

      <div className="mt-auto grid grid-cols-12 items-end gap-4 pt-16 text-ui text-muted">
        <span className="col-span-4 md:col-span-6">{hero.year}</span>
        <span className="hidden md:col-span-3 md:block">Scroll down</span>
        <div className="col-span-8 justify-self-end md:col-span-3">
          <PillLink href={download.primary.href} label={hero.cta} />
        </div>
      </div>
    </section>
  );
}
