export const TOPOGRAPHY_SHADER = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
out vec4 fragColor;

const vec3 PAGE = vec3(0.0157);
const float LEVELS = 16.0;
const float DRIFT = 0.018;
const float HILL = 0.22;
const float MINOR_INK = 0.055;
const float MAJOR_INK = 0.15;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(cell), hash(cell + vec2(1.0, 0.0)), u.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float terrain(vec2 p) {
  float height = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 4; octave++) {
    height += amplitude * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }
  return height;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = gl_FragCoord.xy / uResolution.y;
  float t = uTime * DRIFT;

  float height = terrain(uv * 1.4 + vec2(t, -t * 0.6))
    + 0.4 * terrain(uv * 0.6 - vec2(t * 0.4, 0.0));
  float reach = distance(uv, uPointer * vec2(aspect, 1.0));
  height += HILL * exp(-reach * reach * 10.0);

  float level = height * LEVELS;
  float distanceToLine = abs(fract(level - 0.5) - 0.5) / fwidth(level);
  float line = 1.0 - smoothstep(0.0, 1.1, distanceToLine);
  bool major = mod(floor(level + 0.5), 5.0) == 0.0;

  fragColor = vec4(PAGE + line * (major ? MAJOR_INK : MINOR_INK), 1.0);
}
`;
