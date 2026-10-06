import {
  Box3,
  Group,
  type Material,
  MathUtils,
  type Mesh,
  type MeshStandardMaterial,
  type Object3D,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { LAPTOP_ASSET, LAPTOP_HINGE } from "@/data/laptop";

export type LaptopModel = {
  /** Unit-width laptop, centered on its base, hinge at the back. */
  root: Group;
  setLid(openDeg: number): void;
  /** A sparse sample of vertices in world space; call after updating world matrices. */
  outline(): Vector3[];
  dispose(): void;
};

/** Every Nth vertex is plenty to trace the silhouette (~6k of ~145k points). */
const OUTLINE_STRIDE = 24;

type Sample = { mesh: Mesh; local: Vector3[] };

function sampleVertices(root: Object3D): Sample[] {
  const samples: Sample[] = [];
  root.traverse((node) => {
    const mesh = node as Mesh;
    const position = mesh.isMesh && mesh.geometry.getAttribute("position");
    if (!position) return;
    const local: Vector3[] = [];
    for (let i = 0; i < position.count; i += OUTLINE_STRIDE) {
      local.push(new Vector3().fromBufferAttribute(position, i));
    }
    samples.push({ mesh, local });
  });
  return samples;
}

function tracer(samples: Sample[]) {
  const points = samples.flatMap(({ local }) => local.map(() => new Vector3()));
  return () => {
    let i = 0;
    for (const { mesh, local } of samples) {
      for (const point of local) {
        points[i++].copy(point).applyMatrix4(mesh.matrixWorld);
      }
    }
    return points;
  };
}

/** The lid ships open with no hinge pivot: re-parent it onto one. */
function hingeLid(lid: Object3D) {
  const hinge = new Vector3(0, LAPTOP_HINGE.y, LAPTOP_HINGE.z);
  const pivot = new Group();
  pivot.position.copy(hinge);
  lid.parent?.add(pivot);
  pivot.add(lid);
  lid.position.sub(hinge);

  return (openDeg: number) => {
    pivot.rotation.x = MathUtils.degToRad(
      LAPTOP_HINGE.modeledOpenDeg - openDeg,
    );
  };
}

function normalize(model: Object3D): Group {
  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());
  model.position.sub(center.setY(box.min.y));
  const root = new Group();
  root.add(model);
  root.scale.setScalar(1 / size.x);
  return root;
}

function swapScreen(model: Object3D, url: string) {
  model.traverse((node) => {
    const material = (node as Mesh).material as
      | MeshStandardMaterial
      | undefined;
    if (material?.name !== LAPTOP_ASSET.screenMaterial) return;
    new TextureLoader().load(url, (texture) => {
      texture.flipY = false;
      texture.colorSpace = SRGBColorSpace;
      material.emissiveMap?.dispose();
      material.emissiveMap = texture;
      material.needsUpdate = true;
    });
  });
}

function disposeTree(root: Object3D) {
  root.traverse((node) => {
    const mesh = node as Mesh;
    mesh.geometry?.dispose();
    const materials = ([] as Material[]).concat(mesh.material ?? []);
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value?.isTexture) value.dispose();
      }
      material.dispose();
    }
  });
}

export async function loadLaptop(): Promise<LaptopModel> {
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const { scene } = await loader.loadAsync(LAPTOP_ASSET.model);

  const lid = scene.getObjectByName(LAPTOP_ASSET.lidNode);
  const setLid = lid ? hingeLid(lid) : () => {};
  if (LAPTOP_ASSET.screen) swapScreen(scene, LAPTOP_ASSET.screen);

  setLid(0);
  const root = normalize(scene);

  return {
    root,
    setLid,
    outline: tracer(sampleVertices(root)),
    dispose: () => disposeTree(root),
  };
}
