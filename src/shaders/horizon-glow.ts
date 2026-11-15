import { glslVec3 } from "@/util/webgl";

export type HorizonGlowGeometry = {
  span: number;
  above: number;
  below: number;
};

export const HORIZON_GLOW_RAMP = [
  [-0.26, "#040404"],
  [-0.17, "#2a0619"],
  [-0.09, "#6b0a3f"],
  [0, "#df004d"],
  [0.066, "#ec005b"],
  [0.086, "#f32462"],
  [0.129, "#fe4e72"],
  [0.243, "#fb9aac"],
  [0.32, "#cdb8c6"],
  [0.409, "#6cb8d0"],
  [0.442, "#3cafcf"],
  [0.469, "#00a2ca"],
  [0.543, "#0076b2"],
  [0.631, "#003a7f"],
  [0.692, "#111e5e"],
  [0.773, "#0f063c"],
  [0.841, "#0a0721"],
  [0.93, "#040404"],
] as const;

export const HORIZON_GLOW_SHAPE = {
  rise: 2,
  bellRadius: 0.28,
  bellSharpness: 3,
  shoulderDrop: 0.12,
  shoulderStretch: 0.5,
  columnWidth: 0.075,
} as const;

const glslFloat = (value: number) => value.toFixed(4);

export function horizonGlowShader({ span, above, below }: HorizonGlowGeometry) {
  return `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uProgress;
out vec4 fragColor;

const float SPAN = ${span.toFixed(4)};
const float HORIZON = ${(below / (above + below)).toFixed(4)};
const float RISE = ${glslFloat(HORIZON_GLOW_SHAPE.rise)};
const float BELL_RADIUS = ${glslFloat(HORIZON_GLOW_SHAPE.bellRadius)};
const float BELL_SHARPNESS = ${glslFloat(HORIZON_GLOW_SHAPE.bellSharpness)};
const float SHOULDER_DROP = ${glslFloat(HORIZON_GLOW_SHAPE.shoulderDrop)};
const float SHOULDER_STRETCH = ${glslFloat(HORIZON_GLOW_SHAPE.shoulderStretch)};
const float COLUMN_WIDTH = ${glslFloat(HORIZON_GLOW_SHAPE.columnWidth)};
const float RISE_STAGGER_SHARE = 0.55;
const float COLUMN_SEAM_PIXELS = 1.5;
const float COLUMN_SEAM_SHADE = 0.82;
const float GRAIN_SCATTER = 0.12;
const float GRAIN_SPECKLE = 0.08;
const float GRAIN_DARK_SHARE = 0.3;
const float GRAIN_DENSITY = 0.75;
const float FADE_START = -0.12;
const float FADE_END = -0.26;
const float FADE_GRAIN = 0.05;
const int STOP_COUNT = ${HORIZON_GLOW_RAMP.length};
const float STOP_AT[STOP_COUNT] = float[](${HORIZON_GLOW_RAMP.map(([at]) => at.toFixed(3)).join(", ")});
const vec3 STOP_COLOR[STOP_COUNT] = vec3[](${HORIZON_GLOW_RAMP.map(([, hex]) => glslVec3(hex)).join(", ")});

vec3 ramp(float t) {
  vec3 color = STOP_COLOR[0];
  for (int i = 1; i < STOP_COUNT; i++) {
    float width = STOP_AT[i] - STOP_AT[i - 1];
    color = mix(color, STOP_COLOR[i], clamp((t - STOP_AT[i - 1]) / width, 0.0, 1.0));
  }
  return color;
}

float grain(vec2 pixel, float channel) {
  vec3 state = fract(vec3(pixel.xyx + channel * 17.31) * 0.1031);
  state += dot(state, state.yzx + 33.33);
  return fract((state.x + state.y) * state.z) - 0.5;
}

float rampPosition(vec2 point) {
  float columnIndex = floor(point.x / COLUMN_WIDTH + 0.5);
  float shoulder = 1.0 - exp(-pow(abs(columnIndex * COLUMN_WIDTH) / BELL_RADIUS, BELL_SHARPNESS));
  float outwardOrder = abs(columnIndex) / (0.5 * SPAN / COLUMN_WIDTH);
  float riseStart = clamp(outwardOrder, 0.0, 1.0) * RISE_STAGGER_SHARE;
  float riseLinear = clamp((uProgress - riseStart) / (1.0 - RISE_STAGGER_SHARE), 0.0, 1.0);
  float rise = max(1.0 - pow(1.0 - riseLinear, 3.0), 0.001);
  float height = point.y * RISE;
  return (height + shoulder * (SHOULDER_DROP + SHOULDER_STRETCH * height)) / rise;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float frameWidth = uResolution.x / SPAN;
  vec2 point = vec2((uv.x - 0.5) * SPAN, (gl_FragCoord.y - HORIZON * uResolution.y) / frameWidth);
  float acrossColumn = fract(point.x / COLUMN_WIDTH + 0.5);
  vec2 pixel = floor(gl_FragCoord.xy * GRAIN_DENSITY);
  float columnPixels = COLUMN_WIDTH / SPAN * uResolution.x;
  float edgePixels = min(acrossColumn, 1.0 - acrossColumn) * columnPixels;
  float seam = mix(COLUMN_SEAM_SHADE, 1.0, step(0.5 * COLUMN_SEAM_PIXELS, edgePixels));
  float t = rampPosition(point);
  vec3 base = ramp(t) * seam;
  base *= 1.0 + grain(pixel, 0.0) * GRAIN_SCATTER;
  float lightness = dot(base, vec3(0.2126, 0.7152, 0.0722));
  vec3 color = base + grain(pixel, 1.0) * GRAIN_SPECKLE * mix(GRAIN_DARK_SHARE, 1.0, sqrt(lightness));
  float alpha = smoothstep(FADE_END, FADE_START, t + grain(pixel, 2.0) * FADE_GRAIN);
  fragColor = vec4(clamp(color, 0.0, 1.0) * alpha, alpha);
}
`;
}
