import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { Magnetic, RollText } from "@/components/motion";

export type PillTone = "outline" | "solid";

type PillLinkProps = {
  href: string;
  label: string;
  tone?: PillTone;
  cursorLabel?: string;
};

const TONES: Record<PillTone, string> = {
  outline:
    "border-border-strong text-foreground group-hover:border-foreground group-hover:bg-foreground group-hover:text-background",
  solid:
    "border-foreground bg-foreground text-background group-hover:bg-transparent group-hover:text-foreground",
};

const SURFACE =
  "border transition-[background-color,color,border-color] duration-500 ease-out-expo";

export function PillLink({
  href,
  label,
  tone = "outline",
  cursorLabel = "Go",
}: PillLinkProps) {
  const surface = `${SURFACE} ${TONES[tone]}`;
  return (
    <Magnetic>
      <Link
        href={href}
        data-cursor={cursorLabel}
        className="group inline-flex items-center gap-1"
      >
        <span
          className={`inline-flex h-11 items-center rounded-full px-5 text-ui uppercase ${surface}`}
        >
          <RollText text={label} />
        </span>
        <span
          className={`grid size-11 place-items-center rounded-full ${surface}`}
        >
          <ArrowUpRightIcon className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
        </span>
      </Link>
    </Magnetic>
  );
}
