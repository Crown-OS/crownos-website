import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/feature-icons";
import type { PocketFeature, PocketValue } from "@/data/pocket";

type PocketReadoutProps = PocketValue &
  Pick<PocketFeature, "description" | "action">;

const DIM = "text-[0.62em] text-white/35";

export function PocketReadout({
  label,
  value,
  prefix,
  suffix,
  description,
  action,
}: PocketReadoutProps) {
  return (
    <div className="pocket-panel relative flex flex-1 flex-col items-center px-2 pt-5 pb-2 text-center">
      <div className="mb-6 flex flex-col items-center">
        <p className="flex flex-col items-center">
          <span className="text-[0.9375rem] text-white/60">{label}</span>
          <span className="mt-2 font-medium text-[2.75rem] leading-none tracking-[-0.045em]">
            {prefix && <span className={`mr-1 ${DIM}`}>{prefix}</span>}
            <span className="readout-value">{value}</span>
            {suffix && <span className={`ml-2 ${DIM}`}>{suffix}</span>}
          </span>
        </p>
        {description && (
          <p className="mt-5 max-w-xl text-pretty px-4 text-[0.9375rem] text-white/55 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <Link
        href={action.href}
        className="btn btn-secondary mt-auto h-11 w-full max-w-sm gap-1.5 text-ui"
      >
        {action.label}
        <ArrowUpRightIcon className="size-4.5" />
      </Link>
    </div>
  );
}
