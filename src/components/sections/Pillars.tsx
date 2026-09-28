import { ShaderCanvas, SplitWords } from "@/components/motion";
import { pillars } from "@/data/crownos";
import { ASCII_GLYPHS, ASCII_SHADER } from "@/shaders/ascii";

const LINES = pillars.map(({ word, mark }) => `${word} ${mark}`);

export function Pillars() {
  return (
    <section
      aria-label="Principles"
      className="relative isolate grid min-h-svh place-items-center overflow-clip px-gutter py-24"
    >
      <ShaderCanvas
        fragment={ASCII_SHADER}
        glyphs={ASCII_GLYPHS}
        cellSize={13}
        className="-z-10"
      />
      <SplitWords
        as="h2"
        lines={LINES}
        className="text-center text-[clamp(3.25rem,9vw,9rem)] leading-[0.98] tracking-[-0.06em]"
      />
    </section>
  );
}
