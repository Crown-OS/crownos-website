import { type MonitorCard, monitor } from "@/data/system-apps/monitor";
import { seededSeries, smoothAreaPath } from "@/util/chart-path";
import { CrownWindow } from "../kit/CrownWindow";
import { GhostButton } from "../kit/controls";
import { Icon } from "../kit/Icon";
import { SidebarItem, SidebarSection } from "../kit/Sidebar";

const SPARK = { width: 200, height: 44, samples: 60 } as const;

function Sparkline({ card }: { card: MonitorCard }) {
  const { line, area } = smoothAreaPath(
    seededSeries(card.trend, SPARK.samples),
    SPARK.width,
    SPARK.height,
  );
  const fillId = `cu-spark-${card.trend.seed}`;
  return (
    <svg
      viewBox={`0 0 ${SPARK.width} ${SPARK.height}`}
      preserveAspectRatio="none"
      className="block h-11 w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={card.tint} stopOpacity={0.35} />
          <stop offset="1" stopColor={card.tint} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${fillId})`} />
      <path
        d={line}
        fill="none"
        stroke={card.tint}
        strokeWidth={1.75}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StatCard({ card }: { card: MonitorCard }) {
  return (
    <article className="crownui-card flex flex-col gap-2.5 p-3.5">
      <header className="flex items-center gap-1.5 font-medium text-(--cu-muted) text-[13px]">
        <span style={{ color: card.tint }}>
          <Icon name={card.icon} size={16} />
        </span>
        {card.title}
      </header>
      <p className="truncate font-semibold text-(--cu-primary) text-[26px] leading-none tracking-[-0.01em]">
        {card.headline}
        {card.detail && (
          <span className="ml-1.5 font-medium text-(--cu-muted) text-[13px] tracking-normal">
            {card.detail}
          </span>
        )}
      </p>
      <dl className="flex gap-3.75">
        {card.figures.map((figure) => (
          <div key={figure.label} className="grid min-w-0 gap-0.5">
            <dt className="truncate text-(--cu-muted) text-[12px]">
              {figure.label}
            </dt>
            <dd className="truncate font-semibold text-(--cu-primary) text-[14px]">
              {figure.value}
            </dd>
          </div>
        ))}
      </dl>
      <Sparkline card={card} />
    </article>
  );
}

export function MonitorApp() {
  return (
    <CrownWindow
      sidebar={
        <SidebarSection caption={monitor.caption}>
          {monitor.navigation.map((item, index) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              current={index === 0}
              trailing={item.value}
            />
          ))}
        </SidebarSection>
      }
      toolbar={
        <>
          <span className="flex-1" />
          <GhostButton icon="settings" />
        </>
      }
    >
      <div className="flex flex-col gap-5 p-7">
        <h2 className="font-semibold text-(--cu-primary) text-[24px] leading-tight">
          {monitor.title}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {monitor.cards.map((card) => (
            <StatCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </CrownWindow>
  );
}
