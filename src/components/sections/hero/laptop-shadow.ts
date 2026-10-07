import { CanvasTexture, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { LAPTOP_SHADOW } from "@/data/laptop";

/** Sits a hair below the base so it never z-fights with the feet. */
const GROUND_OFFSET = -0.002;

type Rect = { x: number; y: number; width: number; height: number };

const TONE_RGB = { light: "255, 255, 255", dark: "0, 0, 0" } as const;

/**
 * Paints only the blurred shadow of a rounded rect: the shape itself is drawn
 * far off-canvas and its shadow offset back into view.
 */
function paintSoftRect(
  context: CanvasRenderingContext2D,
  rect: Rect,
  radius: number,
  blur: number,
  color: string,
) {
  const away = context.canvas.width * 4;
  context.save();
  context.shadowColor = color;
  context.shadowBlur = blur;
  context.shadowOffsetX = away;
  context.beginPath();
  context.roundRect(rect.x - away, rect.y, rect.width, rect.height, radius);
  context.fill();
  context.restore();
}

function paintShadow(depth: number) {
  const { layers, cornerRadius, margin, resolution } = LAPTOP_SHADOW;
  const planeWidth = 1 + margin * 2;
  const planeDepth = depth + margin * 2;
  const canvas = document.createElement("canvas");
  canvas.width = resolution;
  canvas.height = Math.round((resolution * planeDepth) / planeWidth);
  const context = canvas.getContext("2d");
  if (!context) return { canvas, planeWidth, planeDepth };

  const px = resolution / planeWidth;
  for (const { tone, blur, opacity, inset } of layers) {
    paintSoftRect(
      context,
      {
        x: (margin + inset) * px,
        y: (margin + inset) * px,
        width: (1 - inset * 2) * px,
        height: (depth - inset * 2) * px,
      },
      cornerRadius * px,
      blur * px,
      `rgba(${TONE_RGB[tone]}, ${opacity})`,
    );
  }
  return { canvas, planeWidth, planeDepth };
}

/** A soft contact shadow for a unit-width laptop whose base is `depth` deep. */
export function createContactShadow(
  depth: number,
): Mesh<PlaneGeometry, MeshBasicMaterial> {
  const { canvas, planeWidth, planeDepth } = paintShadow(depth);
  const mesh = new Mesh(
    new PlaneGeometry(planeWidth, planeDepth),
    new MeshBasicMaterial({
      map: new CanvasTexture(canvas),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = GROUND_OFFSET;
  mesh.renderOrder = -1;
  return mesh;
}
