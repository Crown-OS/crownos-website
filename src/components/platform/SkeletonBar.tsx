export function SkeletonBar({
  width,
  className = "bg-white/10",
}: {
  width: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block h-2 rounded-full ${className}`}
      style={{ width }}
    />
  );
}
