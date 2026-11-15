import { ChipActivity } from "./ChipActivity";
import { ChipPackage } from "./ChipPackage";

export function ProcessorChip() {
  return (
    <div className="relative size-full">
      <ChipPackage />
      <ChipActivity />
    </div>
  );
}
