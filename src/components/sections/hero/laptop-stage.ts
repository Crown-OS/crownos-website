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
  LAPTOP_BREAKPOINT,
  LAPTOP_CAMERA,
  LAPTOP_POSES,
  type LaptopPose,
} from "@/data/laptop";
import { loadLaptop } from "./laptop-model";

export type LaptopStage = {
  poses(): { from: LaptopPose; to: LaptopPose };
  setPose(pose: LaptopPose): void;
  dispose(): void;
};

const MAX_PIXEL_RATIO = { wide: 1.5, compact: 1.25 } as const;

export async function mountLaptopStage(
  host: HTMLElement,
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

  const wide = window.matchMedia(LAPTOP_BREAKPOINT);
  const layout = () => (wide.matches ? "wide" : "compact");

  let pose: LaptopPose = LAPTOP_POSES[layout()].from;
  let frame = 0;

  const render = () => {
    frame = 0;
    renderer.render(scene, camera);
  };

  const invalidate = () => {
    frame ||= requestAnimationFrame(render);
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
    apply();
    // Resizing clears the WebGL buffer; redraw before this frame paints, not on the next one.
    cancelAnimationFrame(frame);
    render();
  };

  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(host);
  resize();
  await renderer.compileAsync(scene, camera);
  render();

  return {
    poses: () => LAPTOP_POSES[layout()],
    setPose(next) {
      pose = next;
      renderer.domElement.style.opacity = "1";
      apply();
    },
    dispose() {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      laptop.dispose();
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
