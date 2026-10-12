import { SHADER_HEADER } from "./noise";

export const METAL_BANDS_CELL_SIZE = 2;

export const METAL_BANDS_SHADER = `${SHADER_HEADER}
uniform float uCell;

const float SPEED = 0.5;
const float BAND_DENSITY = 6.0;
const float DRIFT = 0.06;
const vec2 SWEEP_ORIGIN_OFFSET = vec2(0.45, -0.75);
const vec2 SWEEP_STRETCH = vec2(0.85, 1.15);
const float DITHER_LEVELS = 12.0;

float bayer2(vec2 cell) {
  cell = floor(cell);
  return fract(cell.x * 0.5 + cell.y * cell.y * 0.75);
}

float bayer4(vec2 cell) {
  return bayer2(cell * 0.5) * 0.25 + bayer2(cell);
}

float bandHeight(vec2 uv, float t) {
  vec2 origin = vec2(0.5 * uResolution.x / uResolution.y, -0.5) + SWEEP_ORIGIN_OFFSET;
  float distanceFromOrigin = length((uv - origin) * SWEEP_STRETCH);
  float warp = 0.04 * sin(uv.x * 1.7 + t * 0.35) + 0.03 * sin(uv.y * 2.3 - t * 0.25);
  float phase = fract(BAND_DENSITY * sqrt(distanceFromOrigin + warp) - t * DRIFT);
  return smoothstep(0.0, 0.95, phase) * (1.0 - smoothstep(0.96, 1.0, phase));
}

float metalTone(float height) {
  float body = 0.03 + 0.22 * pow(height, 1.6);
  float specular = exp(-pow((height - 0.94) * 9.0, 2.0));
  return body + 0.14 * specular;
}

float orderedDither(float tone) {
  float threshold = bayer4(gl_FragCoord.xy / uCell);
  return floor(tone * DITHER_LEVELS + threshold) / DITHER_LEVELS;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float tone = metalTone(bandHeight(uv, uTime * SPEED));
  gl_FragColor = vec4(vec3(orderedDither(tone)), 1.0);
}
`;
