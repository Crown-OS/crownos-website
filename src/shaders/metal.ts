import { SHADER_HEADER } from "./noise";

export const METAL_SHADER = `${SHADER_HEADER}
uniform sampler2D uMask;

const float BEVEL_STRENGTH = 1.5;
const float SAMPLE_SPREAD = 0.01;
const float HORIZON_SOFTNESS = 0.22;
const float SWEEP_SECONDS = 9.0;

float bevelHeight(vec2 uv) { return texture2D(uMask, uv).g; }

float studioReflection(float horizon) {
  float sky = mix(0.8, 0.95, smoothstep(0.0, 0.6, horizon));
  float ground = mix(0.66, 0.56, smoothstep(0.0, -0.6, horizon));
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
  float specular = pow(max(dot(normal, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 18.0);

  float aspect = uResolution.x / uResolution.y;
  float sweepPhase = fract(uTime / SWEEP_SECONDS) * 1.6;
  float sweepX = mix(-0.7, 0.7, sweepPhase) * aspect;
  float glint = exp(-pow((p.x + p.y * 0.6 - sweepX) * 4.0, 2.0)) * step(sweepPhase, 1.0);

  float shade = clamp(tone + specular * 0.16 + glint * 0.1, 0.0, 1.0);
  gl_FragColor = vec4(vec3(shade) * coverage, coverage);
}
`;
