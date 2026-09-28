import type { CSSProperties } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { SplitWords } from "@/components/motion";
import { ecosystem } from "@/data/crownos";

const ROW_STAGGER_MS = 60;
const pad = (value: number) => String(value).padStart(2, "0");

function FeatureRow({
  name,
  description,
  index,
}: {
  name: string;
  description: string;
  index: number;
}) {
  return (
    <li
      data-reveal
      style={{ "--delay": `${index * ROW_STAGGER_MS}ms` } as CSSProperties}
      className="group relative grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-border border-b py-5 md:py-6"
    >
      <h3 className="text-title transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
        {name}
      </h3>
      <span className="row-span-2 text-title text-muted tabular-nums">
        {pad(index + 1)}
      </span>
      <p className="text-ui text-muted leading-snug transition-[color,translate] duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-muted-strong">
        {description}
      </p>
      <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-foreground transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
    </li>
  );
}

export function Ecosystem() {
  const count = pad(ecosystem.features.length);
  return (
    <section
      id="ecosystem"
      className="grid gap-16 px-gutter py-[clamp(6rem,12vw,10rem)] md:grid-cols-12 md:gap-4"
    >
      <div className="grid content-start gap-8 self-start md:sticky md:top-28 md:col-span-5 lg:col-span-4">
        <SplitWords as="h2" lines={ecosystem.lines} className="text-headline" />
        <div
          data-reveal
          className="h-3 w-full max-w-[36rem] bg-foreground/45"
        />
        <span className="text-ui text-muted">
          ({ecosystem.label} — {count})
        </span>
        <p
          data-reveal
          className="max-w-[28rem] text-lead text-muted-strong indent-[clamp(3rem,8vw,8rem)]"
        >
          {ecosystem.body}
        </p>
        <ArrowUpRightIcon
          strokeWidth={3}
          className="size-24 text-foreground/15 max-md:hidden"
        />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-[clamp(1.5rem,5vw,5rem)] md:col-span-7 md:col-start-6 lg:col-start-6">
        <span className="pt-6 text-title text-muted">({count})</span>
        <ol>
          {ecosystem.features.map((feature, index) => (
            <FeatureRow key={feature.name} {...feature} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
