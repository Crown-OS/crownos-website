import { CROWN_BOUNDS, CROWN_PATH } from "@/data/brand";

const PAD_EM = 0.12;
const BEVEL_BLUR_EM = 0.07;

export type TextMaskFrame = { pad: number; width: number; height: number };

export function measureTextMask(host: HTMLElement): TextMaskFrame {
  const pad = Math.ceil(
    Number.parseFloat(getComputedStyle(host).fontSize) * PAD_EM,
  );
  return {
    pad,
    width: host.offsetWidth + pad * 2,
    height: host.offsetHeight + pad * 2,
  };
}

function crownPath(x: number, y: number, height: number) {
  const scale = height / CROWN_BOUNDS.height;
  const placement = new DOMMatrix()
    .translate(x, y)
    .scale(scale)
    .translate(-CROWN_BOUNDS.x, -CROWN_BOUNDS.y);
  const path = new Path2D();
  path.addPath(new Path2D(CROWN_PATH), placement);
  return path;
}

export function paintTextMask(
  mask: HTMLCanvasElement,
  host: HTMLElement,
  frame: TextMaskFrame,
  pixelRatio: number,
) {
  mask.width = Math.round(frame.width * pixelRatio);
  mask.height = Math.round(frame.height * pixelRatio);
  const context = mask.getContext("2d");
  if (!context) return;

  const style = getComputedStyle(host);
  const fontSize = Number.parseFloat(style.fontSize) * pixelRatio;
  context.font = `${style.fontStyle} ${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  context.letterSpacing = `${(Number.parseFloat(style.letterSpacing) || 0) * pixelRatio}px`;

  const { fontBoundingBoxAscent: ascent, fontBoundingBoxDescent: descent } =
    context.measureText(host.textContent ?? "");
  const inset = frame.pad * pixelRatio;
  const lineBox = host.offsetHeight * pixelRatio;
  const baseline = inset + (lineBox - ascent - descent) / 2 + ascent;
  const parts = [...host.querySelectorAll<HTMLElement>("[data-mask]")];

  const paintParts = () => {
    for (const part of parts) {
      const x = inset + part.offsetLeft * pixelRatio;
      if (part.dataset.mask === "crown") {
        const y = inset + part.offsetTop * pixelRatio;
        context.fill(crownPath(x, y, part.offsetHeight * pixelRatio));
      } else {
        context.fillText(part.textContent ?? "", x, baseline);
      }
    }
  };

  context.fillStyle = "#000";
  context.fillRect(0, 0, mask.width, mask.height);
  context.globalCompositeOperation = "lighter";
  context.filter = `blur(${fontSize * BEVEL_BLUR_EM}px)`;
  context.fillStyle = "#0f0";
  paintParts();
  context.filter = "none";
  context.fillStyle = "#f00";
  paintParts();
}
