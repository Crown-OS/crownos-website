import { ScrubWords } from "@/components/motion";
import { Eyebrow } from "@/components/ui";
import { manifesto } from "@/data/crownos";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative px-gutter py-[clamp(7rem,18vw,15rem)]"
    >
      <Eyebrow>{manifesto.label}</Eyebrow>
      <ScrubWords
        text={manifesto.text}
        className="mt-6 max-w-[80rem] text-headline md:indent-[clamp(6rem,24vw,24rem)]"
      />
      <p
        data-reveal
        className="mt-16 text-right font-mono text-micro text-muted uppercase"
      >
        {manifesto.signature}
      </p>
    </section>
  );
}
