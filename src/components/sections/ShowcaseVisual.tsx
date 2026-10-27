import { Parallax } from "@/components/motion";
import { Visual } from "@/components/visuals";
import type { VisualKey } from "@/data/feature";

export function ShowcaseVisual({ name }: { name: VisualKey }) {
  return (
    <Parallax distance={20} className="relative">
      <div className="transition-[scale] duration-700 ease-out-expo group-hover:scale-[1.03]">
        <Visual name={name} />
      </div>
    </Parallax>
  );
}
