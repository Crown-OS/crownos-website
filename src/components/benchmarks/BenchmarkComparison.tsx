"use client";

import { useState } from "react";
import { benchmarkMetrics, formatAmount } from "@/data/benchmarks";
import { ComparisonBars } from "./ComparisonBars";
import { CompetitorList } from "./CompetitorList";
import { MetricTabs } from "./MetricTabs";

const showsMetricTabs = benchmarkMetrics.length > 1;

export function BenchmarkComparison() {
  const [metricId, setMetricId] = useState(benchmarkMetrics[0].id);
  const [competitorId, setCompetitorId] = useState(
    benchmarkMetrics[0].competitors[0].id,
  );
  const metric =
    benchmarkMetrics.find(({ id }) => id === metricId) ?? benchmarkMetrics[0];
  const competitor =
    metric.competitors.find(({ id }) => id === competitorId) ??
    metric.competitors[0];

  return (
    <div className="grid gap-14 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] md:gap-x-24">
      <div className="grid content-between gap-14">
        <div className="grid gap-3">
          <span className="text-[1.0625rem] tracking-[-0.011em] text-muted">
            {metric.label}
          </span>
          <p className="flex items-baseline gap-2">
            <span className="text-5xl font-medium tracking-[-0.03em] text-white">
              {formatAmount(metric.crownos, metric.unit)}
            </span>
            <span className="text-lg text-white/55">{metric.summary}</span>
          </p>
          <span className="max-w-[26rem] text-[1.0625rem] tracking-[-0.011em] leading-[1.5] text-muted">
            {metric.note}
          </span>
        </div>
        <CompetitorList
          metric={metric}
          selectedId={competitor.id}
          onSelect={setCompetitorId}
        />
      </div>
      <div
        className={`grid gap-14 ${showsMetricTabs ? "content-between" : "content-end"}`}
      >
        {showsMetricTabs && (
          <MetricTabs
            metrics={benchmarkMetrics}
            selectedId={metric.id}
            onSelect={setMetricId}
          />
        )}
        <ComparisonBars metric={metric} competitor={competitor} />
      </div>
    </div>
  );
}
