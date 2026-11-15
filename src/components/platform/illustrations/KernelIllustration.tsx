import { BoardTraces } from "./chip/BoardTraces";
import { ProcessorChip } from "./chip/ProcessorChip";

export function KernelIllustration() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(42%_36%_at_44%_40%,color-mix(in_oklab,var(--color-sweep-blue)_14%,transparent),transparent),radial-gradient(40%_34%_at_57%_50%,color-mix(in_oklab,var(--color-sweep-pink)_10%,transparent),transparent)]"
      />
      <BoardTraces />
      <div
        aria-hidden="true"
        className="absolute top-[44%] left-1/2 size-64 -translate-1/2 rounded-[50%] bg-[conic-gradient(from_200deg,var(--color-sweep-sky),var(--color-sweep-blue),var(--color-sweep-pink),var(--color-sweep-red),var(--color-sweep-orange),var(--color-sweep-sky))] opacity-24 [filter:blur(2.5rem)]"
      />
      <div className="absolute top-[44%] left-1/2 size-60 -translate-1/2">
        <ProcessorChip />
      </div>
    </>
  );
}
