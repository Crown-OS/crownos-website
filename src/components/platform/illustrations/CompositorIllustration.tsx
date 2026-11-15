import { CompositorScene } from "./compositor/CompositorScene";
import { STAGE } from "./compositor/layout";

export function CompositorIllustration() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(42%_36%_at_44%_34%,color-mix(in_oklab,var(--color-sweep-blue)_14%,transparent),transparent),radial-gradient(40%_34%_at_57%_44%,color-mix(in_oklab,var(--color-sweep-pink)_10%,transparent),transparent)]"
      />
      <div
        className="absolute top-[3%] left-1/2 w-[min(88%,20rem)] -translate-x-1/2"
        style={{ aspectRatio: `${STAGE.width} / ${STAGE.height}` }}
      >
        <CompositorScene />
      </div>
    </>
  );
}
