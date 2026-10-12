import { SHADER_HEADER } from "./noise";

export const SILK_RIBBONS_RESOLUTION_SCALE = 0.5;

export const SILK_RIBBONS_SHADER = `${SHADER_HEADER}
const float SPEED = 0.5;
const float EDGE_SOFTNESS = 0.003;
const float CLOTH_SHEEN = 0.76;

const vec4 TOP_EDGE = vec4(0.13, 0.395, 0.765, -0.99);
const vec4 BOTTOM_EDGE = vec4(0.935, 0.123, -0.887, 0.479);

const vec4 TOP_RIM = vec4(0.015, 0.02, 0.025, -0.08);
const vec4 RIBBON_GLARE = vec4(0.12, 0.25, 0.05, 0.26);
const vec4 RIBBON_UNDERSIDE = vec4(0.26, 0.52, 0.05, -0.16);
const vec4 PALE_SHEET = vec4(0.42, 0.40, 0.09, 0.2);
const vec4 WAVE_GLINT = vec4(0.60, 0.67, 0.018, 0.24);
const vec4 FOLD_SHADOW = vec4(0.665, 0.79, 0.035, -0.18);
const vec4 FRONT_GLARE = vec4(0.82, 0.90, 0.06, 0.25);
const vec4 EDGE_GLOW = vec4(0.99, 0.99, 0.02, 0.15);

float cubic(vec4 coefficients, float x) {
  return coefficients.x + x * (coefficients.y + x * (coefficients.z + x * coefficients.w));
}

float fold(vec4 shape, vec2 point, float t) {
  float shimmer = 0.75 + 0.25 * sin(point.x * 4.0 + shape.x * 7.0 - t * 0.6);
  float strength = shape.w * mix(1.0, shimmer, step(0.0, shape.w));
  float offset = (point.y - mix(shape.x, shape.y, point.x)) / shape.z;
  return strength * exp(-offset * offset);
}

float silver(float sheen) {
  return 0.03 + 0.62 * pow(clamp((sheen - 0.55) / 0.45, 0.0, 1.0), 2.2);
}

void main() {
  vec2 point = vec2(gl_FragCoord.x / uResolution.x, 1.0 - gl_FragCoord.y / uResolution.y);
  float t = uTime * SPEED;
  float top = cubic(TOP_EDGE, point.x) + 0.012 * sin(point.x * 3.0 + t * 0.3);
  float bottom = cubic(BOTTOM_EDGE, point.x) + 0.012 * sin(point.x * 2.5 - t * 0.25 + 1.0);
  vec2 cloth = vec2(point.x, (point.y - top) / (bottom - top) + 0.012 * sin(point.x * 2.0 + t * 0.2));

  float sheen = CLOTH_SHEEN
    + fold(TOP_RIM, cloth, t) + fold(RIBBON_GLARE, cloth, t)
    + fold(RIBBON_UNDERSIDE, cloth, t) + fold(PALE_SHEET, cloth, t)
    + fold(WAVE_GLINT, cloth, t) + fold(FOLD_SHADOW, cloth, t)
    + fold(FRONT_GLARE, cloth, t) + fold(EDGE_GLOW, cloth, t);

  float backdrop = 0.075
    + 0.05 * exp(-max(top - point.y, 0.0) * 9.0)
    + 0.06 * exp(-max(point.y - bottom, 0.0) * 10.0);
  float coverage = smoothstep(top - EDGE_SOFTNESS, top + EDGE_SOFTNESS, point.y)
    * (1.0 - smoothstep(bottom - EDGE_SOFTNESS, bottom + EDGE_SOFTNESS, point.y));

  float tone = mix(backdrop, silver(sheen), coverage);
  gl_FragColor = vec4(vec3(tone + (hash(gl_FragCoord.xy) - 0.5) / 255.0), 1.0);
}
`;
