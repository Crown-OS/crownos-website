import { ScrubWords, VisionStack } from "@/components/motion";
import { Eyebrow } from "@/components/ui";
import { our_vision } from "@/data/crownos";

export function OurVision() {
  return (
    <section
      id="manifesto"
      className="relative px-gutter pt-[clamp(7rem,18vw,15rem)] pb-[clamp(2rem,4vw,3rem)]"
    >
      <Eyebrow>{our_vision.label}</Eyebrow>
      <ScrubWords
        text={our_vision.intro}
        className="mt-6 max-w-[80rem] text-headline"
      />
      <div className="mt-[clamp(3rem,8vw,6rem)]">
        <VisionStack panels={our_vision.panels} />
      </div>
    </section>
  );
}
