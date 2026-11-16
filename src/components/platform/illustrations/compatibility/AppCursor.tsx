export function AppCursor() {
  return (
    <span
      aria-hidden="true"
      className="app-cursor-motion pointer-events-none absolute top-0 left-0 z-10 origin-top-left"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 14 19"
        className="block h-[calc(var(--u)*18)] w-auto stroke-ink/70 drop-shadow-[0_2px_3px_rgb(0_0_0/0.5)] fill-white"
      >
        <path
          d="M1 1v15.5l4.2-4 2.9 6.2 2.6-1.2-2.8-6H13.5Z"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
