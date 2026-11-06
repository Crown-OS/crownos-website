import type { CSSProperties } from "react";
import type { PocketFeature, PocketSize, PocketValue } from "@/data/pocket";
import { PocketReadout } from "./PocketReadout";
import { PocketSleeve } from "./PocketSleeve";

type PocketCardProps = Omit<PocketFeature, "readout"> & {
  readout: PocketValue;
  size?: PocketSize;
  delay?: number;
};

export function PocketCard({
  readout,
  description,
  action,
  size = "compact",
  delay = 0,
  ...sleeve
}: PocketCardProps) {
  return (
    <article
      data-reveal
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      className="beam-bezel squircle relative grid w-full"
    >
      <div className="mono-surface squircle rounded-card flex flex-col overflow-hidden">
        <PocketSleeve {...sleeve} size={size} />
        <PocketReadout {...readout} description={description} action={action} />
      </div>
    </article>
  );
}
