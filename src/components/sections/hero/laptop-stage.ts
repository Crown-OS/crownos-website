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
  LAPTOP_FOOTPRINT,
  LAPTOP_MOTION,
  LAPTOP_SPLIT_QUERY,
  type LaptopPose,
} from "@/data/laptop";
import { loadLaptop } from "./laptop-model";

type Framing = { from: LaptopPose; to: LaptopPose };

export type LaptopStage = {
  poses(): Framing;
  setPose(pose: LaptopPose): void;
  /** Rest at the final pose and keep tracking the slot as the layout changes. */
  settle(): void;
  dispose(): void;
};

const MAX_PIXEL_RATIO = { wide: 1.5, compact: 1.25 } as const;

/** Fits the settled laptop inside `slot`; the entrance starts off-screen left at the same height. */
function frame(host: DOMRect, slot: DOMRect, layout: Layout): Framing {
  const size = Math.min(
    slot.width / LAPTOP_FOOTPRINT.width,
    slot.height / LAPTOP_FOOTPRINT.height,
  );
  const originX =
    slot.left - host.left + slot.width / 2 + LAPTOP_FOOTPRINT.originX * size;
  const originY =
    slot.top - host.top + slot.height / 2 + LAPTOP_FOOTPRINT.originY * size;
  const width = size / host.width;
  const ndcY = 1 - (originY / host.height) * 2;
  const yawDeg = LAPTOP_MOTION.yawDeg[layout];

  return {
    from: {
      ndcX: -1 - LAPTOP_MOTION.offscreen * width,
      ndcY,
      depth: LAPTOP_MOTION.startDepth,
      width,
      yawDeg: yawDeg - LAPTOP_MOTION.turnDeg,
      lidDeg: 0,
    },
    to: {
      ndcX: (originX / host.width) * 2 - 1,
      ndcY,
      depth: 0,
      width,
      yawDeg,
      lidDeg: LAPTOP_MOTION.openDeg,
    },
  };
}

type Layout = keyof typeof LAPTOP_MOTION.yawDeg;

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

  const camera = new PerspectiveCamera(LAPTOP_CAMERA.fov, 1, 0.1, 100);
  camera.position.set(0, 0, LAPTOP_CAMERA.distance);

  const laptop = await loadLaptop();
  const rig = new Group();
  rig.rotation.x = MathUtils.degToRad(LAPTOP_CAMERA.pitchDeg);
  const spin = new Group();
  spin.add(laptop.root);
  rig.add(spin);
  scene.add(rig);

  const wide = window.matchMedia(LAPTOP_SPLIT_QUERY);
  const layout = (): Layout => (wide.matches ? "wide" : "compact");
  const poses = () =>
    frame(host.getBoundingClientRect(), slot.getBoundingClientRect(), layout());

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

  const halfHeightAt = (depth: number) =>
    Math.tan(MathUtils.degToRad(LAPTOP_CAMERA.fov / 2)) *
    (LAPTOP_CAMERA.distance - depth);

  const apply = () => {
    const halfHeight = halfHeightAt(pose.depth);
    const halfWidth = halfHeight * camera.aspect;
    const focalHalfWidth = halfHeightAt(0) * camera.aspect;
    rig.position.set(pose.ndcX * halfWidth, pose.ndcY * halfHeight, pose.depth);
    rig.scale.setScalar(pose.width * 2 * focalHalfWidth);
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
    camera.updateProjectionMatrix();
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
    setPose: show,
    settle() {
      settled = true;
      show(poses().to);
    },
    dispose() {
      cancelAnimationFrame(pending);
      sizeObserver.disconnect();
      laptop.dispose();
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
