import { ShaderCanvas, SplitWords } from "@/components/motion";
import { PillLink } from "@/components/ui";
import { download, hero } from "@/data/crownos";
import { INTRO_STAGGER } from "@/data/intro";
import {
  DARK_VEIL_RESOLUTION_SCALE,
  DARK_VEIL_SHADER,
} from "@/shaders/dark-veil";
import { HeroLaptop } from "./hero/HeroLaptop";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-svh flex-col overflow-clip px-gutter pt-[4.5rem] pb-8"
    >
      <ShaderCanvas
        fragment={DARK_VEIL_SHADER}
        resolutionScale={DARK_VEIL_RESOLUTION_SCALE}
        className="-z-10 mask-b-from-78%"
      />
      <HeroLaptop className="-z-5 pointer-events-none absolute inset-0" />

      <div className="mt-[clamp(3rem,14vh,10rem)] grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-4">
        <SplitWords
          as="h1"
          lines={hero.lines}
          highlight={hero.brand}
          highlightClassName="text-[1.3em]"
          emphasisVariant="sweep"
          revealFrom="right"
          revealGate="intro"
          delay={INTRO_STAGGER.heroText * 1000}
          className="text-display md:col-span-6 md:col-start-7 *:nth-[n+3]:text-[0.62em] *:nth-[n+3]:leading-[1.1] *:nth-[n+3]:tracking-[-0.03em] *:nth-[n+3]:text-muted"
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
