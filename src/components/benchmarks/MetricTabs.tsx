import type { BenchmarkMetric } from "@/data/benchmarks";

type MetricTabsProps = {
  metrics: readonly BenchmarkMetric[];
  selectedId: string;
  onSelect: (metricId: string) => void;
};

export function MetricTabs({ metrics, selectedId, onSelect }: MetricTabsProps) {
  return (
    <div className="flex justify-center border-white/15 border-b">
      {metrics.map((metric) => {
        const isSelected = metric.id === selectedId;
        return (
          <button
            key={metric.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(metric.id)}
            className={`-mb-px cursor-pointer border-b-2 px-6 pb-3 text-[1.0625rem] tracking-[-0.011em] transition-colors duration-300 ${isSelected ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/75"}`}
          >
            {metric.label}
          </button>
        );
      })}
    </div>
  );
}
