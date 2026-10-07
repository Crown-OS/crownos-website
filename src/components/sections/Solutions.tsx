import Link from "next/link";
import type { CSSProperties } from "react";
import { PlusIcon } from "@/components/icons";
import { SplitWords } from "@/components/motion";
import { Eyebrow, PillLink } from "@/components/ui";
import { type Solution, solutions } from "@/data/crownos";
import { SolutionVisual } from "./SolutionVisual";

const CARD_STAGGER_MS = 80;

const SPANS: Record<Solution["span"], string> = {
  lead: "md:col-span-7",
  side: "md:col-span-5",
  third: "md:col-span-4",
  full: "md:col-span-12",
};

const LAYOUTS: Record<Solution["span"], string> = {
  lead: "flex-col",
  side: "flex-col",
  third: "flex-col",
  full: "flex-col md:flex-row-reverse md:*:basis-1/2",
};

const MIRROR_EDGES: Record<Solution["span"], string> = {
  lead: "",
  side: "",
  third: "",
  full: "md:plate-mirror-start",
};

function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  return (
    <li
      data-reveal
      style={{ "--delay": `${index * CARD_STAGGER_MS}ms` } as CSSProperties}
      className={SPANS[solution.span]}
    >
      <Link
        href={solutions.href}
        data-cursor="Explore"
        className={`group plate-chrome flex h-full overflow-clip rounded-lg ${LAYOUTS[solution.span]}`}
      >
        <div
          className={`plate-mirror grid grid-cols-1 min-h-[clamp(14rem,24vw,20rem)] flex-1 content-center ${MIRROR_EDGES[solution.span]}`}
        >
          <SolutionVisual visual={solution.visual} />
        </div>
        <div className="plate-satin flex items-end justify-between gap-6">
          <h3 className="grid max-w-[24ch] gap-3 text-deboss text-title">
            <span className="font-mono text-micro text-muted uppercase">
              {solution.audience}
            </span>
            {solution.title}
          </h3>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border-strong shadow-deboss transition-[background-color,color,rotate] duration-500 ease-out-expo group-hover:rotate-90 group-hover:bg-foreground group-hover:text-background">
            <PlusIcon className="size-4" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="px-gutter py-[clamp(6rem,12vw,10rem)]">
      <div className="grid gap-10 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-6">
          <Eyebrow>{solutions.label}</Eyebrow>
          <SplitWords
            as="h2"
            lines={solutions.lines}
            className="mt-6 text-headline"
          />
        </div>
        <div className="grid content-end justify-items-start gap-8 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7">
          <p data-reveal className="text-lead text-muted-strong">
            {solutions.body}
          </p>
          <PillLink href={solutions.href} label="Explore features" />
        </div>
      </div>

      <ul className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-1 gap-3 md:grid-cols-12">
        {solutions.items.map((solution, index) => (
          <SolutionCard
            key={solution.visual}
            solution={solution}
            index={index}
          />
        ))}
      </ul>
    </section>
  );
}
