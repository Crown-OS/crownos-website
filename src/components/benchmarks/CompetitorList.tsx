import { OperatingSystemIcon } from "@/components/icons/OperatingSystemIcon";
import type { BenchmarkMetric } from "@/data/benchmarks";
import { savingShare } from "@/data/benchmarks";

type CompetitorListProps = {
  metric: BenchmarkMetric;
  selectedId: string;
  onSelect: (competitorId: string) => void;
};

export function CompetitorList({
  metric,
  selectedId,
  onSelect,
}: CompetitorListProps) {
  return (
    <ul className="grid">
      {metric.competitors.map((competitor) => {
        const isSelected = competitor.id === selectedId;
        return (
          <li key={competitor.id}>
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(competitor.id)}
              className={`flex w-full cursor-pointer items-center justify-between border-b py-3.5 text-left transition-colors duration-300 ${isSelected ? "border-white text-white" : "border-white/10 text-white/50 hover:text-white/80"}`}
            >
              <span className="flex items-center gap-3 text-[1.0625rem] tracking-[-0.011em]">
                <OperatingSystemIcon
                  system={competitor.id}
                  className="size-5 shrink-0"
                />
                vs {competitor.name}
              </span>
              <span
                className={`text-[1.0625rem] tracking-[-0.011em] ${isSelected ? "text-sweep-sky" : ""}`}
              >
                {savingShare(metric.crownos, competitor.value)}% less
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
