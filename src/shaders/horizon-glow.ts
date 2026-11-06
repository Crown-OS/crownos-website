import { glslVec3 } from "@/util/webgl";

export type HorizonGlowGeometry = {
  span: number;
  above: number;
  below: number;
};

const RAMP = [
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

export function horizonGlowShader({ span, above, below }: HorizonGlowGeometry) {
  return `#version 300 es
precision highp float;

uniform vec2 uResolution;
out vec4 fragColor;

const float SPAN = ${span.toFixed(4)};
const float HORIZON = ${(below / (above + below)).toFixed(4)};
const float RISE = 3.0;
const float BELL_RADIUS = 0.22;
const float BELL_SHARPNESS = 3.0;
const float SHOULDER_DROP = 0.12;
const float SHOULDER_STRETCH = 0.5;
const int STOP_COUNT = ${RAMP.length};
const float STOP_AT[STOP_COUNT] = float[](${RAMP.map(([at]) => at.toFixed(3)).join(", ")});
const vec3 STOP_COLOR[STOP_COUNT] = vec3[](${RAMP.map(([, hex]) => glslVec3(hex)).join(", ")});

vec3 ramp(float t) {
  vec3 color = STOP_COLOR[0];
  for (int i = 1; i < STOP_COUNT; i++) {
    float width = STOP_AT[i] - STOP_AT[i - 1];
    color = mix(color, STOP_COLOR[i], clamp((t - STOP_AT[i - 1]) / width, 0.0, 1.0));
  }
  return color;
}

float dither(vec2 pixel) {
  return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715)))) - 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float frameWidth = uResolution.x / SPAN;
  vec2 point = vec2((uv.x - 0.5) * SPAN, (gl_FragCoord.y - HORIZON * uResolution.y) / frameWidth);
  float height = point.y * RISE;
  float shoulder = 1.0 - exp(-pow(abs(point.x) / BELL_RADIUS, BELL_SHARPNESS));
  float t = height + shoulder * (SHOULDER_DROP + SHOULDER_STRETCH * height);
  fragColor = vec4(ramp(t) + dither(gl_FragCoord.xy) / 255.0, 1.0);
}
`;
}
