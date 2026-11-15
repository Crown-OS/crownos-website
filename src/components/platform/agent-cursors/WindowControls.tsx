import { Minus } from "@untitledui/icons/Minus";
import { Square } from "@untitledui/icons/Square";
import { XClose } from "@untitledui/icons/XClose";

const CONTROL_ICONS = [Square, Minus, XClose] as const;

export function WindowControls() {
  return (
    <span className="flex shrink-0">
      {CONTROL_ICONS.map((Icon) => (
        <span key={Icon.displayName} className="grid size-7 place-items-center">
          <span className="grid size-4 place-items-center rounded-full bg-white/16 text-white/82">
            <Icon className="size-2.5" strokeWidth={2.5} />
          </span>
        </span>
      ))}
    </span>
  );
}
