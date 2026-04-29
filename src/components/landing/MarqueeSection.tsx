import type { ComponentType, SVGProps } from "react";

export type MarqueeItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
};

type MarqueeSectionProps = {
  items: MarqueeItem[];
};

export function MarqueeSection({ items }: MarqueeSectionProps) {
  const doubled = [...items, ...items];
  return (
    <section
      aria-label="Project highlights"
      className="relative overflow-hidden border-y border-border py-[1.1rem] bg-marquee marquee-mask"
    >
      <div className="flex w-max gap-12 animate-scroll-x">
        {doubled.map((item, idx) => {
          const Icon = item.icon;
          return (
            <span
              key={`${item.label}-${idx}`}
              className="inline-flex items-center gap-[0.6rem] whitespace-nowrap text-[0.95rem] text-muted [&>svg]:size-4 [&>svg]:text-muted-strong"
            >
              <Icon />
              <strong className="font-medium text-foreground">
                {item.value}
              </strong>{" "}
              {item.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}
