const PAD_EM = 0.12;
const BEVEL_BLUR_EM = 0.045;

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

export function paintTextMask(
  mask: HTMLCanvasElement,
  host: HTMLElement,
  text: string,
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
    context.measureText(text);
  const inset = frame.pad * pixelRatio;
  const lineBox = host.offsetHeight * pixelRatio;
  const baseline = inset + (lineBox - ascent - descent) / 2 + ascent;

  context.fillStyle = "#000";
  context.fillRect(0, 0, mask.width, mask.height);
  context.globalCompositeOperation = "lighter";
  context.filter = `blur(${fontSize * BEVEL_BLUR_EM}px)`;
  context.fillStyle = "#0f0";
  context.fillText(text, inset, baseline);
  context.filter = "none";
  context.fillStyle = "#f00";
  context.fillText(text, inset, baseline);
}
