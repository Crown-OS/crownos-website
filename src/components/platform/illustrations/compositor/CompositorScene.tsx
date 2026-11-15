import { type CSSProperties, useId } from "react";
import { CROWN_PATH } from "@/data/brand";
import { SweepGradient } from "../chip/SweepGradient";
import { FloorTraces } from "./FloorTraces";
import { FLAT_TO_UPRIGHT } from "./isometric";
import {
  BASE,
  LANDING_INTERVAL_SECONDS,
  SATELLITE,
  SATELLITE_FLOOR_POSITIONS,
  STAGE,
  satelliteTopCenter,
  WINDOW_COUNT,
  windowBox,
} from "./layout";
import { Slab } from "./Slab";
import { WindowPlane } from "./WindowPlane";

const CROWN_CENTER = { x: 152, y: 124.5 };
const CROWN_SCALE = 0.13;

const FALL_DELAYS = Array.from(
  { length: WINDOW_COUNT },
  (_, index) => `${-index * LANDING_INTERVAL_SECONDS}s`,
);

export function CompositorScene() {
  const sceneId = useId();
  const faceSweepId = `${sceneId}-face-sweep`;
  const floorSweepId = `${sceneId}-floor-sweep`;
  const faceSweep = `url(#${faceSweepId})`;
  const half = BASE.side / 2;
  const box = windowBox();
  const [baseX, baseY] = BASE.center;

  return (
    <div
      className="relative size-full"
      style={
        {
          "--fall-cycle": `${WINDOW_COUNT * LANDING_INTERVAL_SECONDS}s`,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="absolute size-[52%] -translate-1/2 animate-[compositor-base-pulse_var(--pulse-interval)_var(--ease-out-quart)_infinite] rounded-[50%] bg-[conic-gradient(from_200deg,var(--color-sweep-sky),var(--color-sweep-blue),var(--color-sweep-pink),var(--color-sweep-red),var(--color-sweep-orange),var(--color-sweep-sky))] opacity-24 [filter:blur(2.5rem)] motion-reduce:animate-none"
        style={
          {
            left: `${(baseX / STAGE.width) * 100}%`,
            top: `${(baseY / STAGE.height) * 100}%`,
            "--pulse-interval": `${LANDING_INTERVAL_SECONDS}s`,
          } as CSSProperties
        }
      />
      <svg
        viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
        role="img"
        aria-label="App windows composited onto the Crownpositor surface, wired to the rest of the CrownOS shell"
        className="absolute inset-0 size-full overflow-visible select-none"
      >
        <defs>
          <SweepGradient
            id={faceSweepId}
            from={[-half, -half]}
            to={[half, half]}
          />
          <SweepGradient
            id={floorSweepId}
            from={[-130, -130]}
            to={[130, 130]}
          />
        </defs>
        <FloorTraces idPrefix={sceneId} sweep={`url(#${floorSweepId})`} />
        {SATELLITE_FLOOR_POSITIONS.map((position) => (
          <Slab
            key={position.join()}
            center={satelliteTopCenter(position)}
            {...SATELLITE}
            rimStroke="rgb(255 255 255 / 0.55)"
          >
            <circle
              cx={-SATELLITE.side / 2 + 6}
              cy={-SATELLITE.side / 2 + 6}
              r={1.6}
              className="fill-white/45"
            />
          </Slab>
        ))}
        <Slab {...BASE} rimStroke={faceSweep}>
          <path
            d={CROWN_PATH}
            className="fill-white"
            transform={`${FLAT_TO_UPRIGHT} scale(${CROWN_SCALE}) translate(${-CROWN_CENTER.x} ${-CROWN_CENTER.y})`}
          />
        </Slab>
      </svg>
      {FALL_DELAYS.map((fallDelay) => (
        <WindowPlane
          key={fallDelay}
          viewBox={box.viewBox}
          tintStroke={faceSweep}
          style={
            {
              left: box.left,
              top: box.top,
              width: box.width,
              height: box.height,
              "--plane-rise": box.rise,
              "--fall-delay": fallDelay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
