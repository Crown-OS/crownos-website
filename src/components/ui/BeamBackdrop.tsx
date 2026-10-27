export function BeamBackdrop() {
  return (
    <>
      <span aria-hidden className="beam-rays absolute inset-x-0 top-0 h-64" />
      <span
        aria-hidden
        className="beam-dust absolute inset-x-0 bottom-0 h-24"
      />
    </>
  );
}
