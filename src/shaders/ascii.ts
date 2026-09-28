import { SHADER_HEADER } from "./noise";

export const ASCII_GLYPHS = " .:-=+*#%@";

export const ASCII_SHADER = `${SHADER_HEADER}
uniform sampler2D uAtlas;
uniform float uGlyphCount;
uniform float uCell;

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 local = fract(gl_FragCoord.xy / uCell);
  vec2 centre = (cell + 0.5) * uCell;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (centre - 0.5 * uResolution) / uResolution.y;
  float t = uTime * 0.08;

  float field = fbm(p * 2.2 + vec2(t, -t * 0.7) + fbm(p * 1.1 - t));
  float halo = exp(-pow(length(p * vec2(0.9, 1.0)) - 0.34, 2.0) * 30.0);
  vec2 pointer = uPointer * vec2(0.5 * aspect, 0.5);
  float spotlight = exp(-dot(p - pointer, p - pointer) * 8.0);
  float value = clamp(field * 0.9 + halo * 0.5 + spotlight * 0.5 - 0.3, 0.0, 0.999);

  float glyph = floor(value * uGlyphCount);
  vec2 atlasUv = vec2((glyph + local.x) / uGlyphCount, 1.0 - local.y);
  float ink = texture2D(uAtlas, atlasUv).a;

  vec2 uv = gl_FragCoord.xy / uResolution;
  float edges = smoothstep(0.0, 0.18, uv.y) * smoothstep(1.0, 0.82, uv.y);
  vec3 color = PAGE + vec3(ink * (0.1 + value * 0.55) * edges);
  gl_FragColor = vec4(color, 1.0);
}
`;
