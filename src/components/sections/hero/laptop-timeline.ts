import { animate } from "motion";
import type { LaptopPose } from "@/data/laptop";
import {
  asTransition,
  SPRING_MORPH,
  SPRING_TIGHT,
  stretch,
} from "@/data/springs";
import type { LaptopStage } from "./laptop-stage";

const TRAVEL_CHANNELS = [
  "ndcX",
  "ndcY",
  "depth",
  "width",
] as const satisfies readonly (keyof LaptopPose)[];

/** Travel is one overdamped spring so position and scale glide along a single, wobble-free path. */
const TRAVEL = asTransition(stretch(SPRING_TIGHT, 3.6));
const SPIN = asTransition(stretch(SPRING_TIGHT, 3.8), 0.1);
const LID = asTransition(stretch(SPRING_MORPH, 2.6), 1.1);

/**
 * motion snaps the last 0.5 units of large-range springs in a single frame
 * (a visible 0.5° twist on the 360° spin). Settle every channel to a fraction
 * of its own range instead, so the final step stays sub-pixel.
 */
const REST_PRECISION = 1e-4;

const settle = (start: number, end: number) => {
  const tolerance = Math.abs(end - start) * REST_PRECISION;
  return { restDelta: tolerance, restSpeed: tolerance * 10 };
};

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export function playEntrance(stage: LaptopStage, delay: number): () => void {
  const { from, to } = stage.poses();
  const pose = { ...from };
  let stopped = false;

  const channel = (
    start: number,
    end: number,
    transition: ReturnType<typeof asTransition>,
    write: (value: number) => void,
  ) =>
    animate(start, end, {
      ...transition,
      ...settle(start, end),
      delay: transition.delay + delay,
      onUpdate: (value) => {
        write(value);
        stage.setPose(pose);
      },
    });

  const controls = [
    channel(0, 1, TRAVEL, (t) => {
      for (const key of TRAVEL_CHANNELS)
        pose[key] = lerp(from[key], to[key], t);
    }),
    channel(from.yawDeg, to.yawDeg, SPIN, (yaw) => {
      pose.yawDeg = yaw;
    }),
    channel(from.lidDeg, to.lidDeg, LID, (lid) => {
      pose.lidDeg = lid;
    }),
  ];

  Promise.all(controls).then(() => {
    if (!stopped) stage.startIdle();
  });

  return () => {
    stopped = true;
    for (const control of controls) control.stop();
  };
}

export function holdFinalPose(stage: LaptopStage) {
  stage.setPose({ ...stage.poses().to });
}
