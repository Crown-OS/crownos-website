import { Marquee, SplitWords } from "@/components/motion";
import { OS_LOGOS } from "@/components/os-logos";
import { Eyebrow } from "@/components/ui";
import { our_vision } from "@/data/crownos";

const MARQUEE_SECONDS = 24;

export function OurVision() {
  return (
    <section
      id="manifesto"
      className="relative overflow-clip py-[clamp(5rem,12vw,10rem)]"
    >
      <div className="px-gutter">
        <Eyebrow>{our_vision.label}</Eyebrow>
        <SplitWords
          as="p"
          lines={[our_vision.intro]}
          lineClassName="inline"
          className="mt-6 block max-w-[80rem] text-headline"
        />
      </div>
      <p className="sr-only">
        {our_vision.panels.map((panel) => panel.statement).join(" ")}
      </p>
      <Marquee
        durationSeconds={MARQUEE_SECONDS}
        className="mt-[clamp(3rem,8vw,6rem)] text-mega leading-[0.9]"
      >
        {our_vision.panels.map((panel) => {
          const Logo = OS_LOGOS[panel.os];
          return (
            <span key={panel.os} className="flex items-center">
              <span className="whitespace-nowrap px-[0.18em]">
                {panel.statement}
              </span>
              <Logo className="mx-[0.18em] aspect-square h-[0.74em] w-auto" />
            </span>
          );
        })}
      </Marquee>
    </section>
  );
}
