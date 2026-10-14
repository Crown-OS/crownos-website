import { SplitWords } from "@/components/motion";

type HorizonGridProps = { label: string };

export function HorizonGrid({ label }: HorizonGridProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-clip"
    >
      <span className="horizon-pillar left-[12.5%]" />
      <span className="horizon-pillar right-[12.5%]" />
      <div className="horizon-floor">
        <div className="horizon-plane">
          <SplitWords
            as="p"
            lines={[label]}
            className="horizon-label select-none font-display text-foreground/15 text-mega"
          />
        </div>
        <div className="horizon-glow" />
      </div>
    </div>
  );
}
