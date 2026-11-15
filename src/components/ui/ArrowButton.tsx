import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const VARIANT_STYLES = {
  primary: { button: "btn-primary", badge: "bg-ink text-white" },
  secondary: { button: "btn-secondary", badge: "bg-white text-ink" },
  dark: { button: "btn-dark", badge: "bg-white text-ink" },
} as const;

const ARROWS = {
  down: { path: "M12 5v14M6 13l6 6 6-6", hover: "group-hover:translate-y-0.5" },
  right: {
    path: "M5 12h14M13 6l6 6-6 6",
    hover: "group-hover:translate-x-0.5",
  },
  outward: {
    path: "M7 17 17 7M9 7h8v8",
    hover: "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  },
} as const;

type ArrowButtonProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof VARIANT_STYLES;
  arrow?: keyof typeof ARROWS;
  icon?: ReactNode;
  hasBeam?: boolean;
};

export function ArrowButton({
  children,
  className,
  variant = "primary",
  arrow = "down",
  icon,
  hasBeam = false,
  ...anchorProps
}: ArrowButtonProps) {
  const styles = VARIANT_STYLES[variant];
  const { path, hover } = ARROWS[arrow];
  return (
    <Link
      {...anchorProps}
      className={`btn ${styles.button} group h-12 gap-5 pr-1.5 ${icon ? "pl-3.5" : "pl-5"} text-[1.0625rem] font-medium tracking-[-0.02em] ${className ?? ""}`}
    >
      {hasBeam && <span aria-hidden="true" className="beam-rim" />}
      <span className="relative z-2 flex items-center gap-2.5">
        {icon}
        <span className="text-trim">{children}</span>
      </span>
      <span
        className={`relative z-2 grid size-9 place-items-center rounded-full ${styles.badge}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-[18px] transition-transform duration-300 ease-(--ease-out-expo) ${hover}`}
        >
          <path d={path} />
        </svg>
      </span>
    </Link>
  );
}
