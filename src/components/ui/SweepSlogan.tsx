import type { HTMLAttributes } from "react";

export type SweepSloganCopy = {
  lead: string;
  emphasis: string;
  trail: string;
};

type SweepSloganProps = HTMLAttributes<HTMLParagraphElement> & {
  copy: SweepSloganCopy;
};

export function SweepSlogan({
  copy: { lead, emphasis, trail },
  className = "",
  ...paragraphProps
}: SweepSloganProps) {
  return (
    <p
      {...paragraphProps}
      className={`text-trim font-inter font-normal text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.1)] text-tagline tracking-[-0.03em] [font-kerning:normal] ${className}`}
    >
      {lead}{" "}
      <span
        data-text={emphasis}
        className="pr-[0.03em] font-normal font-serif text-[1.16em] leading-none text-sweep italic [text-shadow:none] tracking-[-0.005em] [word-spacing:0.06em]"
      >
        {emphasis}
      </span>{" "}
      {trail}
    </p>
  );
}
