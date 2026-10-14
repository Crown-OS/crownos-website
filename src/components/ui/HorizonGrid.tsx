export function HorizonGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-clip"
    >
      <span className="horizon-pillar left-[12.5%]" />
      <span className="horizon-pillar right-[12.5%]" />
      <div className="horizon-floor">
        <div className="horizon-plane" />
        <div className="horizon-glow" />
      </div>
    </div>
  );
}
