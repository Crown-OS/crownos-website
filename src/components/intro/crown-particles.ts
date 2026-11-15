import { CROWN_PATH, CROWN_VIEWBOX } from "@/data/brand";

export type CrownParticle = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  delay: number;
  size: number;
  alpha: number;
};

type Box = { left: number; top: number; width: number; height: number };

const SAMPLE_WIDTH = 480;
const PARTICLE_COUNT = 2600;
const SPREAD = 1.05;
const MAX_DELAY = 0.65;

const [VIEW_X, VIEW_Y, VIEW_WIDTH, VIEW_HEIGHT] =
  CROWN_VIEWBOX.split(" ").map(Number);

function sampleCrownMask() {
  const scale = SAMPLE_WIDTH / VIEW_WIDTH;
  const height = Math.round(VIEW_HEIGHT * scale);
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_WIDTH;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return { inside: () => false, height };
  context.setTransform(scale, 0, 0, scale, -VIEW_X * scale, -VIEW_Y * scale);
  context.fill(new Path2D(CROWN_PATH));
  const { data } = context.getImageData(0, 0, SAMPLE_WIDTH, height);
  const inside = (x: number, y: number) =>
    data[(Math.floor(y) * SAMPLE_WIDTH + Math.floor(x)) * 4 + 3] > 128;
  return { inside, height };
}

export function createCrownParticles(
  crown: Box,
  viewport: Box,
): CrownParticle[] {
  const mask = sampleCrownMask();
  const particles: CrownParticle[] = [];
  while (particles.length < PARTICLE_COUNT) {
    const sampleX = Math.random() * SAMPLE_WIDTH;
    const sampleY = Math.random() * mask.height;
    if (!mask.inside(sampleX, sampleY)) continue;
    particles.push({
      startX: viewport.width * (0.5 + (Math.random() - 0.5) * SPREAD),
      startY: viewport.height * (0.5 + (Math.random() - 0.5) * SPREAD),
      targetX: crown.left + (sampleX / SAMPLE_WIDTH) * crown.width,
      targetY: crown.top + (sampleY / mask.height) * crown.height,
      delay: Math.random() * MAX_DELAY,
      size: 1 + Math.random() * 1.2,
      alpha: 0.45 + Math.random() * 0.55,
    });
  }
  return particles;
}

function easeOutQuart(value: number) {
  return 1 - (1 - value) ** 4;
}

export function drawCrownParticles(
  context: CanvasRenderingContext2D,
  particles: readonly CrownParticle[],
  progress: number,
  opacity: number,
) {
  const { width, height } = context.canvas;
  const pixelRatio = width / context.canvas.clientWidth;
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);
  if (opacity <= 0) return;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.fillStyle = "#fff";

  for (const particle of particles) {
    const local = Math.min(
      1,
      Math.max(0, (progress - particle.delay) / (1 - MAX_DELAY)),
    );
    const eased = easeOutQuart(local);
    const x = particle.startX + (particle.targetX - particle.startX) * eased;
    const y = particle.startY + (particle.targetY - particle.startY) * eased;
    const size = particle.size * (1 - 0.4 * eased);
    context.globalAlpha = opacity * particle.alpha * (0.6 + 0.4 * eased);
    context.fillRect(x - size / 2, y - size / 2, size, size);
  }
  context.globalAlpha = 1;
}
