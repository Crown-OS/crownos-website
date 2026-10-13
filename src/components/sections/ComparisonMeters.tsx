import * as m from "motion/react-m";
import type { MeterTab } from "@/data/comparison";

const FILL_SPRING = { type: "spring", stiffness: 70, damping: 20 } as const;
const STAGGER_S = 0.08;

export function ComparisonMeters({ tab }: { tab: MeterTab }) {
  return (
    <ul className="grid gap-8 md:gap-12">
      {tab.rows.map(({ name, value, display }, index) => {
        const leading = index === 0;
        return (
          <li
            key={name}
            className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 md:gap-x-12"
          >
            <p
              className={`col-span-2 text-lead text-trim ${leading ? "" : "text-muted-strong"}`}
            >
              {name}
            </p>
            <div className="meter-segments relative h-6 md:h-8">
              <span className="absolute inset-0 bg-white/10" />
              <m.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: value / tab.scale }}
                viewport={{ once: true }}
                transition={{ ...FILL_SPRING, delay: index * STAGGER_S }}
                className={`absolute inset-0 origin-left ${leading ? "bg-white" : "bg-white/45"}`}
              />
            </div>
            <p
              className={`min-w-24 text-right text-title tabular-nums text-trim ${leading ? "" : "text-muted"}`}
            >
              {display}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
