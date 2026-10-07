import {
  ACESFilmicToneMapping,
  DirectionalLight,
  Group,
  MathUtils,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  LAPTOP_CAMERA,
  LAPTOP_MOTION,
  LAPTOP_SCALE,
  LAPTOP_SPLIT_QUERY,
  type LaptopPose,
  type LaptopView,
} from "@/data/laptop";
import {
  type Footprint,
  type Framing,
  frame,
  measureFootprint,
} from "./laptop-framing";
import { type LaptopModel, loadLaptop } from "./laptop-model";
import { createContactShadow } from "./laptop-shadow";

export type LaptopStage = {
  poses(): Framing;
  setPose(pose: LaptopPose): void;
  /** Rest at the final pose and keep tracking the slot as the layout changes. */
  settle(): void;
  /** Effective view settings: defaults for the current layout plus any overrides. */
  view(): LaptopView;
  /** Replace the view overrides (`{}` restores the defaults). */
  tune(overrides: Partial<LaptopView>): void;
  dispose(): void;
};

type Layout = keyof typeof LAPTOP_MOTION.yawDeg;

const MAX_PIXEL_RATIO = { wide: 1.5, compact: 1.25 } as const;

/** The laptop stays on the camera axis; this moves its image to `ndc` without turning the camera. */
function shiftLens(camera: PerspectiveCamera, ndcX: number, ndcY: number) {
  camera.updateProjectionMatrix();
  camera.projectionMatrix.elements[8] = -ndcX;
  camera.projectionMatrix.elements[9] = -ndcY;
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}

/** Field of view that renders a unit-width laptop at `width` of the viewport from `distance`. */
const fovFor = (width: number, distance: number, aspect: number) =>
  MathUtils.radToDeg(2 * Math.atan(1 / (2 * width * distance * aspect)));

function footprintMeter(laptop: LaptopModel, rig: Group, spin: Group) {
  let cached: { key: string; footprint: Footprint } | undefined;
  return ({ pitchDeg, yawDeg, lidDeg, distance }: LaptopView) => {
    const key = `${pitchDeg}|${yawDeg}|${lidDeg}|${distance}`;
    if (cached?.key === key) return cached.footprint;
    rig.position.set(0, 0, 0);
    rig.rotation.x = MathUtils.degToRad(pitchDeg);
    spin.rotation.y = MathUtils.degToRad(yawDeg);
    laptop.setLid(lidDeg);
    rig.updateMatrixWorld(true);
    const footprint = measureFootprint(laptop.outline(), distance);
    cached = { key, footprint };
    return footprint;
  };
}

export async function mountLaptopStage(
  host: HTMLElement,
  slot: HTMLElement,
): Promise<LaptopStage> {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  Object.assign(renderer.domElement.style, {
    display: "block",
    width: "100%",
    height: "100%",
    opacity: "0",
    transition: "opacity 0.6s var(--ease-out-quart)",
  });
  host.append(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(-3, 5, 4);
  scene.add(key);

  const camera = new PerspectiveCamera(30, 1, 0.05, 100);

  const laptop = await loadLaptop();
  const rig = new Group();
  const spin = new Group();
  const shadow = createContactShadow(laptop.depth);
  spin.add(shadow, laptop.root);
  rig.add(spin);
  scene.add(rig);

  const wide = window.matchMedia(LAPTOP_SPLIT_QUERY);
  const layout = (): Layout => (wide.matches ? "wide" : "compact");

  let overrides: Partial<LaptopView> = {};
  const view = (): LaptopView => ({
    scale: LAPTOP_SCALE,
    pitchDeg: LAPTOP_CAMERA.pitchDeg,
    yawDeg: LAPTOP_MOTION.yawDeg[layout()],
    lidDeg: LAPTOP_MOTION.openDeg,
    distance: LAPTOP_CAMERA.distance,
    ...overrides,
  });

  const measure = footprintMeter(laptop, rig, spin);
  const poses = () => {
    const current = view();
    return frame(
      host.getBoundingClientRect(),
      slot.getBoundingClientRect(),
      measure(current),
      current,
    );
  };

  let pose = poses().from;
  let settled = false;
  let pending = 0;

  const render = () => {
    pending = 0;
    renderer.render(scene, camera);
  };

  const invalidate = () => {
    pending ||= requestAnimationFrame(render);
  };

  const apply = () => {
    const { distance, pitchDeg } = view();
    camera.position.set(0, 0, distance);
    camera.fov = fovFor(pose.width, distance, camera.aspect);
    shiftLens(camera, pose.ndcX, pose.ndcY);
    rig.position.set(0, 0, pose.depth * distance);
    rig.rotation.x = MathUtils.degToRad(pitchDeg);
    spin.rotation.y = MathUtils.degToRad(pose.yawDeg);
    laptop.setLid(pose.lidDeg);
    invalidate();
  };

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO[layout()]),
    );
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    if (settled) pose = poses().to;
    apply();
    // Resizing clears the WebGL buffer; redraw before this frame paints, not on the next one.
    cancelAnimationFrame(pending);
    render();
  };

  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(host);
  sizeObserver.observe(slot);
  resize();
  await renderer.compileAsync(scene, camera);
  // First draw of each shader program (uniform setup, texture upload) costs
  // ~50–90ms. The entrance starts off-screen and culled, so pay it now, hidden
  // behind the loader, by drawing the settled pose once.
  pose = poses().to;
  apply();
  render();
  pose = poses().from;
  apply();
  render();

  const show = (next: LaptopPose) => {
    pose = next;
    renderer.domElement.style.opacity = "1";
    apply();
  };

  return {
    poses,
    setPose(next) {
      settled = false;
      show(next);
    },
    settle() {
      settled = true;
      show(poses().to);
    },
    view,
    tune(next) {
      overrides = next;
      if (settled) pose = poses().to;
      apply();
    },
    dispose() {
      cancelAnimationFrame(pending);
      sizeObserver.disconnect();
      laptop.dispose();
      shadow.geometry.dispose();
      shadow.material.map?.dispose();
      shadow.material.dispose();
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
