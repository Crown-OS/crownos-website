import { SHADER_HEADER } from "./noise";

export const TERRAIN_SHADER = `${SHADER_HEADER}
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float t = uTime * 0.03;
  vec2 drift = uPointer * vec2(0.05, 0.03);

  float ridge = -0.2 + 0.26 * fbm(vec2(p.x * 1.2 + t + drift.x, 3.1)) + 0.06 * sin(p.x * 1.9 + 0.8);
  vec2 q = p * vec2(2.4, 4.6) + vec2(t * 2.2, 0.0) + drift;
  float warp = fbm(q + fbm(q * 1.6 - t));
  float surface = p.y + (warp - 0.5) * 0.1;
  float body = smoothstep(ridge + 0.012, ridge - 0.05, surface);

  float grit = fbm(p * 26.0 + warp * 3.0);
  float depth = clamp((ridge - p.y) * 2.0, 0.0, 1.0);
  float light = body * (0.04 + 0.26 * warp * (1.0 - depth * 0.7) + 0.1 * grit * (1.0 - depth));
  float rim = body * exp(-abs(surface - ridge) * 55.0) * 0.16;
  float mist = (1.0 - body) * 0.035 * fbm(p * 2.5 + vec2(t * 4.0, 0.0));

  vec2 starCell = floor(gl_FragCoord.xy / 2.0);
  float twinkle = 0.5 + 0.5 * sin(uTime * 1.3 + hash(starCell + 7.0) * 60.0);
  float star = step(0.9985, hash(starCell)) * twinkle * (1.0 - body) * smoothstep(0.0, 0.25, p.y - ridge);

  vec3 color = PAGE + vec3(light + rim + mist + star * 0.45);
  float vignette = smoothstep(1.3, 0.2, length((uv - vec2(0.55, 0.55)) * vec2(1.1, 1.3)));
  color = mix(PAGE, color, vignette);
  color = mix(PAGE, color, smoothstep(0.0, 0.22, uv.y));
  gl_FragColor = vec4(color, 1.0);
}
`;
