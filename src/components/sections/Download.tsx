import { Brackets, SplitWords } from "@/components/motion";
import { PillLink } from "@/components/ui";
import { download } from "@/data/crownos";

export function Download() {
  return (
    <section
      id="download"
      className="relative isolate overflow-clip bg-spotlight px-gutter py-[clamp(7rem,18vw,15rem)]"
    >
      <div className="text-[clamp(2.75rem,8vw,8.5rem)] leading-[0.92] tracking-[-0.06em]">
        <Brackets>
          <SplitWords as="h2" lines={download.lines} className="text-center" />
        </Brackets>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-3">
          <PillLink
            href={download.primary.href}
            label={download.primary.label}
            tone="solid"
            cursorLabel="Get"
          />
          <PillLink
            href={download.secondary.href}
            label={download.secondary.label}
            cursorLabel="Read"
          />
        </div>
        <p data-reveal className="font-mono text-micro text-muted uppercase">
          {download.meta}
        </p>
      </div>
    </section>
  );
}
