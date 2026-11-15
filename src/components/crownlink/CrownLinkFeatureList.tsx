import { crownLinkFeatures } from "@/data/crownlink";
import { CROWNLINK_FEATURE_ICONS } from "./featureIcons";

type CrownLinkFeatureListProps = {
  activeIndex: number;
  isRunning: boolean;
  onSelect: (index: number) => void;
  onAdvance: () => void;
};

export function CrownLinkFeatureList({
  activeIndex,
  isRunning,
  onSelect,
  onAdvance,
}: CrownLinkFeatureListProps) {
  return (
    <ul
      data-running={isRunning || undefined}
      className="crownlink-features border-b border-white/8"
    >
      {crownLinkFeatures.map((feature, index) => {
        const isActive = index === activeIndex;
        const Icon = CROWNLINK_FEATURE_ICONS[feature.id];
        const descriptionId = `crownlink-${feature.id}`;
        return (
          <li key={feature.id} className="relative border-t border-white/8">
            <button
              type="button"
              aria-expanded={isActive}
              aria-controls={descriptionId}
              onClick={() => onSelect(index)}
              className="group w-full py-5 pl-2 text-left"
            >
              <span
                className={`flex items-center gap-4 text-xl font-medium tracking-[-0.02em] transition-colors duration-300 ${isActive ? "text-white" : "text-white/35 group-hover:text-white/70"}`}
              >
                <Icon size={24} strokeWidth={1.5} className="shrink-0" />
                {feature.title}
              </span>
              <span
                id={descriptionId}
                data-open={isActive || undefined}
                className="block h-0 [transition:height_0.4s_var(--ease-out-quart)] data-open:h-[calc(2lh+0.75rem)] max-[22.5rem]:data-open:h-[calc(3lh+0.75rem)] motion-reduce:[transition:none] overflow-hidden text-[0.9375rem] leading-normal tracking-[-0.011em] text-white/55"
              >
                <span className="block pt-3 sm:pl-10">
                  {feature.description}
                </span>
              </span>
            </button>
            {isActive && (
              <span
                aria-hidden="true"
                onAnimationEnd={onAdvance}
                className="crownlink-progress absolute inset-x-0 -bottom-px z-1 h-px origin-left bg-white"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
