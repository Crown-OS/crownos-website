const TONE_CLASSES = {
  solid: "bg-white text-ink",
  quiet: "bg-white/10 text-white",
} as const;

type OutwardArrowProps = {
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
};

export function OutwardArrow({
  tone = "solid",
  className = "size-10",
}: OutwardArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${TONE_CLASSES[tone]} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[45%]"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </span>
  );
}
