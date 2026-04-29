import type { ComponentType, SVGProps } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  eyebrowIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle?: string;
};

export function SectionHeader({
  eyebrow,
  eyebrowIcon: Icon,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 grid max-w-[56rem] gap-[0.95rem]">
      <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-[color-mix(in_srgb,var(--color-foreground)_3%,transparent)] px-[0.7rem] py-[0.3rem] text-[0.78rem] font-medium uppercase tracking-[0.18em] text-muted-strong">
        {Icon ? <Icon className="size-[0.85rem]" /> : null}
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.04em] text-balance text-gradient">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-[64ch] text-[1.025rem] leading-[1.6] text-muted-strong">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
