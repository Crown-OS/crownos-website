import Link from "next/link";
import type { ReactNode } from "react";
import { DocIcon } from "../DocIcon";

type CardProps = {
  title: string;
  icon?: string;
  href?: string;
  children?: ReactNode;
};

const COLUMNS = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function Card({ title, icon, href, children }: CardProps) {
  const body = (
    <>
      {icon && (
        <span className="squircle grid size-10 place-items-center rounded-lg border border-border-strong bg-white/[0.04] text-foreground">
          <DocIcon name={icon} className="size-5" />
        </span>
      )}
      <span className="grid gap-2">
        <span className="flex items-center gap-2 font-medium text-foreground">
          {title}
          {href && (
            <DocIcon
              name="chevron"
              className="size-4 text-faint transition-transform duration-300 ease-out-expo group-hover/card:translate-x-0.5 group-hover/card:text-foreground"
            />
          )}
        </span>
        {children && (
          <span className="text-muted text-ui leading-relaxed">{children}</span>
        )}
      </span>
    </>
  );
  const className =
    "group/card squircle grid content-start gap-5 rounded-tile border border-border bg-white/[0.02] p-5 transition-colors duration-300";

  return href ? (
    <Link
      href={href}
      className={`${className} hover:border-white/25 hover:bg-white/[0.04]`}
    >
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

type CardGroupProps = { cols?: keyof typeof COLUMNS; children: ReactNode };

export function CardGroup({ cols = 2, children }: CardGroupProps) {
  return <div className={`grid gap-4 ${COLUMNS[cols]}`}>{children}</div>;
}
