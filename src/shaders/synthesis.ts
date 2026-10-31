export const SYNTHESIS_SHADER = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
out vec4 fragColor;

const float TAU = 6.28318530718;
const vec3 BASE = vec3(0.0012);
const float GRAIN_STRENGTH = 0.07;
const float GRAIN_BIAS = 2.0;
const float GLOW_RELIEF = 0.8;
const float BEVEL_STRENGTH = 0.6;
const float HORIZON_SOFTNESS = 0.45;
const float REFLECTION_SHADOW = 0.45;
const float REFLECTION_HIGHLIGHT = 1.55;
const float SPECULAR_STRENGTH = 1.0;
const float SPECULAR_SHININESS = 32.0;
const float SLOPE_STEP = 0.004;
const float CREST_ROUNDING = 0.06;
const vec3 HALF_VECTOR = normalize(normalize(vec3(-0.35, 0.6, 0.72)) + vec3(0.0, 0.0, 1.0));

struct SineWave {
  vec3 color;
  vec2 position;
  float angle;
  float frequency;
  float amplitude;
  float thickness;
  float softness;
  float speed;
};

struct WaveDistortion {
  float angle;
  float frequency;
  float strength;
  float speed;
};

const SineWave GLOW = SineWave(vec3(0.012), vec2(0.45, 0.95), 28.0, 0.25, 0.1, 0.75, 0.55, 0.1);
const SineWave BAND = SineWave(vec3(0.24), vec2(0.5, 0.68), 12.0, 0.25, 0.06, 0.22, 0.54, 0.1);
const WaveDistortion DISTORTION = WaveDistortion(299.0, 0.4, 0.18, 0.15);

mat2 rotation(float degrees) {
  float c = cos(radians(degrees));
  float s = sin(radians(degrees));
  return mat2(c, s, -s, c);
}

vec3 toOklab(vec3 linear) {
  vec3 lms = mat3(
    0.4122214708, 0.2119034982, 0.0883024619,
    0.5363325363, 0.6806995451, 0.2817188376,
    0.0514459929, 0.1073969566, 0.6299787005
  ) * linear;
  return mat3(
    0.2104542553, 1.9779984951, 0.0259040371,
    0.7936177850, -2.4285922050, 0.7827717662,
    -0.0040720468, 0.4505937099, -0.8086757660
  ) * pow(lms, vec3(1.0 / 3.0));
}

vec3 fromOklab(vec3 lab) {
  vec3 lms = mat3(
    1.0, 1.0, 1.0,
    0.3963377774, -0.1055613458, -0.0894841775,
    0.2158037573, -0.0638541728, -1.2914855480
  ) * lab;
  return mat3(
    4.0767416621, -1.2684380046, -0.0041960863,
    -3.3077115913, 2.6097574011, -0.7034186147,
    0.2309699292, -0.3413193965, 1.7076147010
  ) * (lms * lms * lms);
}

vec3 toSrgb(vec3 linear) {
  vec3 clamped = clamp(linear, 0.0, 1.0);
  return mix(clamped * 12.92, 1.055 * pow(clamped, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, clamped));
}

vec2 distort(vec2 uv, float aspect, float time) {
  vec2 direction = vec2(cos(radians(DISTORTION.angle)), sin(radians(DISTORTION.angle)));
  vec2 centered = (uv - 0.5) * vec2(aspect, 1.0);
  float across = dot(centered, direction.yx);
  float phase = (across + 0.5) * DISTORTION.frequency * TAU + time * DISTORTION.speed * 0.5;
  float displacement = sin(phase) * DISTORTION.strength * 0.5;
  return clamp(uv + displacement * direction / vec2(aspect, 1.0), 0.0, 1.0);
}

float roundedAbs(float x) {
  return sqrt(x * x + CREST_ROUNDING * CREST_ROUNDING);
}

float waveMask(vec2 uv, float aspect, float time, SineWave wave) {
  vec2 centered = vec2((uv.x - wave.position.x) * aspect, uv.y - (1.0 - wave.position.y));
  vec2 rotated = rotation(wave.angle) * centered;
  float crest = sin(rotated.x * wave.frequency * TAU + time * wave.speed) * wave.amplitude;
  float halfThickness = wave.thickness * 0.5;
  float halfSoftness = wave.softness * 0.5;
  return 1.0 - smoothstep(halfThickness - halfSoftness, halfThickness + halfSoftness, roundedAbs(rotated.y - crest));
}

vec2 waveMasks(vec2 fragUv, float aspect) {
  vec2 uv = distort(fragUv, aspect, uTime);
  return vec2(waveMask(uv, aspect, uTime, GLOW), waveMask(uv, aspect, uTime, BAND));
}

float relief(vec2 masks) {
  return masks.x * GLOW_RELIEF + masks.y;
}

float slopeAlong(vec2 fragUv, float aspect, vec2 step) {
  return relief(waveMasks(fragUv + step, aspect)) - relief(waveMasks(fragUv - step, aspect));
}

vec3 surfaceNormal(vec2 fragUv, float aspect) {
  vec2 slope = vec2(
    slopeAlong(fragUv, aspect, vec2(SLOPE_STEP, 0.0)) / aspect,
    slopeAlong(fragUv, aspect, vec2(0.0, SLOPE_STEP))
  ) / (2.0 * SLOPE_STEP);
  return normalize(vec3(-slope * BEVEL_STRENGTH, 1.0));
}

vec3 metallic(vec3 albedo, vec3 normal, float bandMask) {
  float horizon = smoothstep(-HORIZON_SOFTNESS, HORIZON_SOFTNESS, normal.y);
  float reflection = mix(REFLECTION_SHADOW, REFLECTION_HIGHLIGHT, horizon);
  float specular = pow(max(dot(normal, HALF_VECTOR), 0.0), SPECULAR_SHININESS) * SPECULAR_STRENGTH * bandMask;
  return albedo * reflection + specular;
}

float grainNoise(vec2 pixel) {
  return fract(sin(dot(pixel, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 fragUv = gl_FragCoord.xy / uResolution;
  vec2 masks = waveMasks(fragUv, aspect);

  vec3 lab = toOklab(BASE);
  lab = mix(lab, toOklab(GLOW.color), masks.x);
  lab = mix(lab, toOklab(BAND.color), masks.y);
  vec3 normal = surfaceNormal(fragUv, aspect);
  vec3 color = toSrgb(metallic(fromOklab(lab), normal, masks.y));

  float darkness = 1.0 - dot(color, vec3(0.2126, 0.7152, 0.0722));
  float grain = (grainNoise(gl_FragCoord.xy) * 2.0 - 1.0) * pow(darkness, GRAIN_BIAS) * GRAIN_STRENGTH * 0.1;
  fragColor = vec4(color + grain, 1.0);
}
`;
