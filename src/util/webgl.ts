const FULLSCREEN_VERTEX = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const FULLSCREEN_TRIANGLE = new Float32Array([-1, -1, 3, -1, -1, 3]);

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

export function createFullscreenProgram(
  gl: WebGLRenderingContext,
  fragmentSource: string,
) {
  const vertex = compile(gl, gl.VERTEX_SHADER, FULLSCREEN_VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

  // biome-ignore lint/correctness/useHookAtTopLevel: WebGL API method, not a React hook
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, FULLSCREEN_TRIANGLE, gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  return (name: string) => gl.getUniformLocation(program, name);
}

export function uploadGlyphAtlas(
  gl: WebGLRenderingContext,
  glyphs: string,
  fontFamily: string,
) {
  const cell = 64;
  const canvas = document.createElement("canvas");
  canvas.width = cell * glyphs.length;
  canvas.height = cell;
  const context = canvas.getContext("2d");
  if (!context) return;

  context.fillStyle = "#fff";
  context.font = `${cell * 0.78}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  [...glyphs].forEach((glyph, index) => {
    context.fillText(glyph, index * cell + cell / 2, cell / 2);
  });

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}
