import * as m from "motion/react-m";
import { OsLogo } from "@/components/os-logos";
import type { MeterTab } from "@/data/comparison";

const FILL_SPRING = { type: "spring", stiffness: 70, damping: 20 } as const;
const STAGGER_S = 0.08;

export function ComparisonMeters({ tab }: { tab: MeterTab }) {
  return (
    <ul className="grid gap-8 md:gap-12">
      {tab.rows.map(({ os, name, value, display }, index) => {
        const leading = index === 0;
        const tone = leading ? "" : "text-muted";
        return (
          <li key={name} className="grid gap-3 md:gap-4">
            <div className="flex items-center justify-between gap-6">
              <p
                className={`flex items-center gap-3 text-lead ${leading ? "" : "text-muted-strong"}`}
              >
                <OsLogo os={os} className="size-5 shrink-0 md:size-6" />
                {name}
              </p>
              <p className={`font-normal text-lead tabular-nums ${tone}`}>
                {display}
              </p>
            </div>
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
          </li>
        );
      })}
    </ul>
  );
}
