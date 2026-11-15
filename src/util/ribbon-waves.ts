const LINE_COUNT = 22;
const SAMPLE_COUNT = 96;
const RIBBON_HALF_WIDTH = 0.2;
const CENTRE_START = 0.62;
const CENTRE_RISE = 0.4;
const CENTRE_SWING = 0.07;
const GLINT_LENGTH = 0.08;

const GLINTS = [
  { line: 4, speed: 0.045, offset: 0.1 },
  { line: 15, speed: 0.035, offset: 0.55 },
  { line: 10, speed: 0.055, offset: 0.8 },
] as const;

export type RibbonWavesPalette = {
  stops: readonly string[];
};

function ribbonY(x: number, spread: number, seconds: number) {
  const centre =
    CENTRE_START -
    CENTRE_RISE * x +
    CENTRE_SWING * Math.sin(Math.PI * 1.6 * x + seconds * 0.35);
  const twist = Math.cos(Math.PI * 2.2 * x - seconds * 0.5 + 0.6);
  const ripple = 0.015 * Math.sin(Math.PI * 5 * x + spread * 3 + seconds * 0.8);
  return centre + spread * RIBBON_HALF_WIDTH * twist + ripple;
}

function traceLine(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  spread: number,
  seconds: number,
  [startX, endX]: readonly [number, number],
) {
  context.beginPath();
  for (let sample = 0; sample < SAMPLE_COUNT; sample++) {
    const x = startX + ((endX - startX) * sample) / (SAMPLE_COUNT - 1);
    context.lineTo(x * width, ribbonY(x, spread, seconds) * height);
  }
  context.stroke();
}

function lineSpread(line: number) {
  return (line / (LINE_COUNT - 1)) * 2 - 1;
}

function paletteColorAt({ stops }: RibbonWavesPalette, x: number) {
  return stops[Math.round(x * (stops.length - 1))];
}

export function drawRibbonWaves(
  context: CanvasRenderingContext2D,
  seconds: number,
  palette: RibbonWavesPalette,
  lineWidth: number,
) {
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, width, 0);
  palette.stops.forEach((color, index) => {
    gradient.addColorStop(index / (palette.stops.length - 1), color);
  });
  context.strokeStyle = gradient;
  context.lineWidth = lineWidth;

  for (let line = 0; line < LINE_COUNT; line++) {
    const spread = lineSpread(line);
    context.globalAlpha = 0.2 + 0.45 * (1 - Math.abs(spread));
    traceLine(context, width, height, spread, seconds, [0, 1]);
  }

  context.globalAlpha = 0.85;
  for (const { line, speed, offset } of GLINTS) {
    const spread = lineSpread(line);
    const head = (seconds * speed + offset) % 1;
    const tail = Math.max(head - GLINT_LENGTH, 0);
    const streak = context.createLinearGradient(
      tail * width,
      ribbonY(tail, spread, seconds) * height,
      head * width,
      ribbonY(head, spread, seconds) * height,
    );
    streak.addColorStop(0, "transparent");
    streak.addColorStop(1, paletteColorAt(palette, head));
    context.strokeStyle = streak;
    traceLine(context, width, height, spread, seconds, [tail, head]);
  }
  context.globalAlpha = 1;
}
