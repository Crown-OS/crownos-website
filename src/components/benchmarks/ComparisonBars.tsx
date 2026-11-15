import type { CSSProperties } from "react";
import { CrownIcon } from "@/components/icons/CrownIcon";
import { OperatingSystemIcon } from "@/components/icons/OperatingSystemIcon";
import {
  type BenchmarkMetric,
  type Competitor,
  formatAmount,
  savingShare,
} from "@/data/benchmarks";

const BAR_MOTION =
  "[transition:width_0.7s_var(--ease-out-expo),margin_0.7s_var(--ease-out-expo)] motion-reduce:[transition:none]";

type ComparisonBarsProps = {
  metric: BenchmarkMetric;
  competitor: Competitor;
};

function share(value: number, scale: number) {
  return `${(value / scale) * 100}%`;
}

export function ComparisonBars({ metric, competitor }: ComparisonBarsProps) {
  const scale = Math.max(...metric.competitors.map(({ value }) => value));
  const saving = competitor.value - metric.crownos;
  const geometry = {
    "--competitor-share": share(competitor.value, scale),
    "--crownos-share": share(metric.crownos, scale),
  } as CSSProperties;

  return (
    <div className="grid gap-10" style={geometry}>
      <div className="grid gap-4">
        <p className="flex items-baseline justify-between text-[0.9375rem]">
          <span className="flex items-center gap-2.5 text-white/70">
            <OperatingSystemIcon
              system={competitor.id}
              className="size-4 shrink-0 self-center"
            />
            {competitor.name}
            <span className="ml-3 text-white/45">
              {formatAmount(competitor.value, metric.unit)}
            </span>
          </span>
        </p>
        <div className="h-10 overflow-hidden rounded-md border border-white/10 bg-white/4">
          <div
            className={`${BAR_MOTION} h-full w-(--competitor-share) bg-white/18`}
          />
        </div>
      </div>

      <div className="grid gap-4">
        <p className="flex items-baseline justify-between text-[0.9375rem]">
          <span className="flex items-center gap-2.5 text-white">
            <CrownIcon className="h-3.5 shrink-0 self-center" />
            CrownOS
            <span className="ml-3 text-white/70">
              {formatAmount(metric.crownos, metric.unit)}
            </span>
          </span>
          <span className="text-[1.0625rem] tracking-[-0.011em] text-sweep-sky">
            {savingShare(metric.crownos, competitor.value)}% less
          </span>
        </p>
        <div className="flex h-10 overflow-hidden rounded-md border border-white/10 bg-white/4">
          <div
            className={`${BAR_MOTION} h-full w-(--crownos-share) bg-[linear-gradient(to_right,var(--color-sweep-sky),var(--color-sweep-blue))]`}
          />
          <div
            className={`${BAR_MOTION} h-full w-[calc(var(--competitor-share)-var(--crownos-share))] bg-[linear-gradient(to_right,var(--color-sweep-pink),var(--color-sweep-red),var(--color-sweep-orange))] mask-[repeating-linear-gradient(-45deg,#000_0_1.5px,transparent_1.5px_7px)]`}
          />
        </div>
        <div
          className={`${BAR_MOTION} ml-(--crownos-share) h-2 w-[calc(var(--competitor-share)-var(--crownos-share))] border-x border-x-sweep-sky [background:linear-gradient(var(--color-sweep-sky),var(--color-sweep-sky))_center/100%_1px_no-repeat]`}
        />
        <p className="text-right text-[1.125rem] tracking-[-0.015em] text-white">
          Saves about{" "}
          <span className="text-sweep-sky">
            {formatAmount(saving, metric.unit)}
          </span>{" "}
          vs {competitor.name}
        </p>
      </div>
    </div>
  );
}
