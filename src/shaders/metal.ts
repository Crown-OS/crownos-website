import { SHADER_HEADER } from "./noise";

export const METAL_SHADER = `${SHADER_HEADER}
uniform sampler2D uMask;

const float BEVEL_STRENGTH = 3.2;
const float SAMPLE_SPREAD = 0.006;
const float SWEEP_SECONDS = 7.0;

float bevelHeight(vec2 uv) { return texture2D(uMask, uv).g; }

float studioReflection(float horizon) {
  float sky = mix(0.62, 1.0, smoothstep(0.0, 0.35, horizon)) - 0.22 * smoothstep(0.35, 0.9, horizon);
  float ground = mix(0.06, 0.4, smoothstep(0.0, -0.6, horizon));
  return mix(ground, sky, smoothstep(-0.012, 0.012, horizon));
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
  float flow = noise(p * vec2(1.6, 2.4) + vec2(uTime * 0.12, -uTime * 0.07)) - 0.5;
  float horizon = p.y * 1.3 + normal.y * 0.9 + flow * 0.18 + uPointer.y * 0.12
    + 0.04 * sin(p.x * 2.2 + uTime * 0.4);
  float tone = studioReflection(horizon);

  vec3 light = normalize(vec3(uPointer.x * 0.7 - 0.35, uPointer.y * 0.5 + 0.6, 0.75));
  float specular = pow(max(dot(normal, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 48.0);

  float aspect = uResolution.x / uResolution.y;
  float sweepPhase = fract(uTime / SWEEP_SECONDS) * 1.6;
  float sweepX = mix(-0.7, 0.7, sweepPhase) * aspect;
  float glint = exp(-pow((p.x + p.y * 0.6 - sweepX) * 9.0, 2.0)) * step(sweepPhase, 1.0);

  float brushed = noise(vec2(p.x * 2.0, p.y * 180.0)) * 0.05;
  float shade = clamp(tone + specular * 0.9 + glint * 0.45 + brushed, 0.0, 1.0);
  gl_FragColor = vec4(vec3(shade) * coverage, coverage);
}
`;
