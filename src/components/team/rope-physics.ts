export type Point = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
};

type Link = { from: number; to: number; length: number; isRigid: boolean };

const GRAVITY = 2600;
const DAMPING = 0.994;
const ITERATIONS = 28;
const STEP = 1 / 120;
const MAX_STEPS_PER_FRAME = 4;
const REST_SPEED = 0.02;

export class RopeSystem {
  readonly points: Point[] = [];
  private readonly links: Link[] = [];
  private readonly inverseMasses: number[] = [];
  private accumulator = 0;
  private grabbed: { index: number; x: number; y: number } | null = null;

  addPoint(x: number, y: number, inverseMass = 1) {
    this.points.push({ x, y, previousX: x, previousY: y });
    this.inverseMasses.push(inverseMass);
    return this.points.length - 1;
  }

  connect(from: number, to: number, length: number, isRigid = false) {
    this.links.push({ from, to, length, isRigid });
  }

  chain(from: number, toX: number, toY: number, segments: number) {
    const start = this.points[from];
    const length =
      Math.hypot(toX - start.x, toY - start.y) / Math.max(1, segments);
    const indices = [from];
    for (let step = 1; step <= segments; step++) {
      const share = step / segments;
      const index = this.addPoint(
        start.x + (toX - start.x) * share,
        start.y + (toY - start.y) * share,
      );
      this.connect(indices[indices.length - 1], index, length);
      indices.push(index);
    }
    return indices;
  }

  grab(index: number, x: number, y: number) {
    this.grabbed = { index, x, y };
  }

  release() {
    this.grabbed = null;
  }

  isGrabbing() {
    return this.grabbed !== null;
  }

  nudge(index: number, velocityX: number) {
    this.points[index].previousX -= velocityX * STEP;
  }

  velocityX(index: number) {
    const point = this.points[index];
    return (point.x - point.previousX) / STEP;
  }

  advance(elapsedSeconds: number) {
    this.accumulator = Math.min(
      this.accumulator + elapsedSeconds,
      STEP * MAX_STEPS_PER_FRAME,
    );
    while (this.accumulator >= STEP) {
      this.integrate();
      this.solve();
      this.accumulator -= STEP;
    }
  }

  isResting() {
    if (this.grabbed) return false;
    return this.points.every(
      (point) =>
        Math.abs(point.x - point.previousX) < REST_SPEED &&
        Math.abs(point.y - point.previousY) < REST_SPEED,
    );
  }

  private weightOf(index: number) {
    return this.grabbed?.index === index ? 0 : this.inverseMasses[index];
  }

  private integrate() {
    this.points.forEach((point, index) => {
      if (this.inverseMasses[index] === 0) return;
      const velocityX = (point.x - point.previousX) * DAMPING;
      const velocityY = (point.y - point.previousY) * DAMPING;
      point.previousX = point.x;
      point.previousY = point.y;
      point.x += velocityX;
      point.y += velocityY + GRAVITY * STEP * STEP;
    });
    if (this.grabbed) {
      const point = this.points[this.grabbed.index];
      point.x = this.grabbed.x;
      point.y = this.grabbed.y;
    }
  }

  private solve() {
    for (let iteration = 0; iteration < ITERATIONS; iteration++) {
      for (const link of this.links) {
        const from = this.points[link.from];
        const to = this.points[link.to];
        const fromWeight = this.weightOf(link.from);
        const toWeight = this.weightOf(link.to);
        const totalWeight = fromWeight + toWeight;
        if (totalWeight === 0) continue;
        const deltaX = to.x - from.x;
        const deltaY = to.y - from.y;
        const distance = Math.hypot(deltaX, deltaY) || 1;
        if (!link.isRigid && distance < link.length) continue;
        const correction = (distance - link.length) / distance / totalWeight;
        from.x += deltaX * correction * fromWeight;
        from.y += deltaY * correction * fromWeight;
        to.x -= deltaX * correction * toWeight;
        to.y -= deltaY * correction * toWeight;
      }
    }
  }
}
