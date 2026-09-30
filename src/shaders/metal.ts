import { SHIMMER } from "@/data/shimmer";
import { SHADER_HEADER } from "./noise";

const seconds = (ms: number) => (ms / 1000).toFixed(3);

export const METAL_SHADER = `${SHADER_HEADER}
uniform sampler2D uMask;
uniform float uSweep;

const float BEVEL_STRENGTH = 2.6;
const float SAMPLE_SPREAD = 0.01;
const float HORIZON_SOFTNESS = 0.12;
const float SWEEP_DURATION = ${seconds(SHIMMER.brandSweepMs)};
const float SWEEP_OVERSHOOT = 0.7;
const float SWEEP_SHARPNESS = 3.0;
const float SWEEP_STRENGTH = 0.9;
const float PI = 3.14159265;

float bevelHeight(vec2 uv) { return texture2D(uMask, uv).g; }

float studioReflection(float horizon) {
  float sky = mix(0.88, 1.0, smoothstep(0.0, 0.5, horizon));
  float ground = mix(0.46, 0.16, smoothstep(0.0, -0.5, horizon));
  return mix(ground, sky, smoothstep(-HORIZON_SOFTNESS, HORIZON_SOFTNESS, horizon));
}

void main() {
  vec2 uv = vec2(gl_FragCoord.x / uResolution.x, 1.0 - gl_FragCoord.y / uResolution.y);
  float coverage = texture2D(uMask, uv).r;
  if (coverage < 0.003) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 spread = vec2(uResolution.y / uResolution.x, 1.0) * SAMPLE_SPREAD;
  vec2 slope = vec2(
    bevelHeight(uv + vec2(spread.x, 0.0)) - bevelHeight(uv - vec2(spread.x, 0.0)),
    bevelHeight(uv - vec2(0.0, spread.y)) - bevelHeight(uv + vec2(0.0, spread.y))
  );
  vec3 normal = normalize(vec3(-slope * BEVEL_STRENGTH, 1.0));

  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float flow = noise(p * vec2(1.2, 1.8) + vec2(uTime * 0.08, -uTime * 0.05)) - 0.5;
  float horizon = p.y * 1.1 + normal.y * 0.6 + flow * 0.12 + uPointer.y * 0.08;
  float tone = studioReflection(horizon);

  vec3 light = normalize(vec3(uPointer.x * 0.5 - 0.3, uPointer.y * 0.4 + 0.6, 0.8));
  float specular = pow(max(dot(normal, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 42.0);

  float aspect = uResolution.x / uResolution.y;
  float progress = uSweep / SWEEP_DURATION;
  float eased = 0.5 - 0.5 * cos(PI * clamp(progress, 0.0, 1.0));
  float reach = 0.5 * aspect + SWEEP_OVERSHOOT;
  float sweepX = mix(-reach, reach, eased);
  float glint = exp(-pow((p.x + p.y * 0.6 - sweepX) * SWEEP_SHARPNESS, 2.0))
    * step(0.0, progress) * step(progress, 1.0);

  float lit = clamp(tone + specular * 0.45, 0.0, 1.0);
  float shade = mix(lit, 1.0, glint * SWEEP_STRENGTH);
  gl_FragColor = vec4(vec3(shade) * coverage, coverage);
}
`;
