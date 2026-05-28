// Five interactive fragment-shader wallpapers.
// Uniforms (injected by ShaderCanvas): uTime, uResolution, uMouse, uClick, uClickTime.
// All coords are device pixels with y-up. Click ripples use (uTime - uClickTime).

export type Shader = { id: string; name: string; desc: string; frag: string };

const aurora = `
void main() {
  vec2 R = uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * R) / R.y;
  vec2 m = (uMouse - 0.5 * R) / R.y;
  float t = uTime * 0.25;

  float v = 0.0;
  v += sin(p.x * 2.5 + t * 1.3);
  v += sin(p.y * 2.5 + t * 1.7);
  v += sin((p.x + p.y) * 2.0 + t);

  float dm = length(p - m);
  v += 1.6 * sin(dm * 7.0 - uTime * 2.0) * exp(-dm * 1.2);
  v *= 0.3;

  float age = uTime - uClickTime;
  vec2 cp = (uClick - 0.5 * R) / R.y;
  float dc = length(p - cp);
  v += 1.3 * sin(dc * 24.0 - age * 13.0) * exp(-age * 2.5) * exp(-dc * 2.0);

  // Cool palette: stays in indigo / violet / soft-cyan to match the site.
  vec3 pal = 0.5 + 0.5 * cos(6.2831 * (v * vec3(0.5, 0.4, 0.3) + vec3(0.55, 0.5, 0.85)));
  vec3 col = pal * vec3(0.5, 0.42, 1.0);
  col *= 0.2 + 0.8 * smoothstep(-1.0, 1.2, v);
  col = mix(vec3(0.012, 0.012, 0.035), col, 0.9);
  gl_FragColor = vec4(col, 1.0);
}
`;

const liquid = `
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
void main() {
  vec2 R = uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * R) / R.y;
  vec2 m = (uMouse - 0.5 * R) / R.y;
  float t = uTime * 0.6;

  float d = 1e5;
  for (int i = 0; i < 6; i++) {
    float f = float(i);
    vec2 c = 0.55 * vec2(sin(t + f * 1.7), cos(t * 1.1 + f * 2.3));
    d = smin(d, length(p - c) - 0.10, 0.25);
  }
  d = smin(d, length(p - m) - 0.15, 0.30);

  float age = uTime - uClickTime;
  vec2 cp = (uClick - 0.5 * R) / R.y;
  float rr = max(0.0, 0.5 - age * 0.5);
  d = smin(d, length(p - cp) - rr, 0.35);

  float fill = smoothstep(0.01, -0.01, d);
  vec3 col = mix(vec3(0.015, 0.015, 0.05), vec3(0.45, 0.40, 1.05), fill);
  col += exp(-abs(d) * 7.0) * vec3(0.35, 0.28, 0.8) * 0.7;
  gl_FragColor = vec4(col, 1.0);
}
`;

const grid = `
void main() {
  vec2 R = uResolution;
  vec2 uv = (gl_FragCoord.xy - 0.5 * R) / R.y;
  vec2 m = (uMouse - 0.5 * R) / R.y;
  vec3 col = vec3(0.015, 0.015, 0.04);

  uv.x += m.x * 0.5;
  float yy = abs(uv.y) + 0.06;
  vec2 plane = vec2(uv.x / yy, 1.0 / yy);
  plane.y += uTime * 1.5;
  plane += m * 1.5;

  vec2 cell = abs(fract(plane) - 0.5);
  float line = smoothstep(0.045, 0.0, min(cell.x, cell.y));
  float fade = exp(-yy * 1.2);
  col += line * fade * vec3(0.45, 0.4, 1.1);

  col += exp(-abs(uv.y) * 9.0) * vec3(0.3, 0.25, 0.9) * 0.6;

  float age = uTime - uClickTime;
  col += exp(-age * 3.5) * vec3(0.4, 0.3, 1.0) * 0.6;
  gl_FragColor = vec4(col, 1.0);
}
`;

const swarm = `
float hash(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  vec2 R = uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * R) / R.y;
  vec2 m = (uMouse - 0.5 * R) / R.y;
  vec3 col = vec3(0.015, 0.015, 0.04);
  float aspect = R.x / R.y;

  for (int i = 0; i < 70; i++) {
    float f = float(i);
    vec2 sp = vec2(hash(f) * 2.0 - 1.0, hash(f + 11.0) * 2.0 - 1.0);
    sp.x *= aspect;
    sp += 0.25 * vec2(sin(uTime * 0.5 + f * 1.3), cos(uTime * 0.45 + f * 1.7));
    vec2 toM = m - sp;
    sp += toM * 0.30 * exp(-dot(toM, toM) * 2.0);
    float d = length(p - sp);
    col += vec3(0.5, 0.45, 1.1) * 0.0026 / (d + 0.001);
  }

  float age = uTime - uClickTime;
  vec2 cp = (uClick - 0.5 * R) / R.y;
  float dc = length(p - cp);
  col += exp(-abs(dc - age * 0.9) * 12.0) * exp(-age * 1.5) * vec3(0.5, 0.4, 1.1);
  gl_FragColor = vec4(col, 1.0);
}
`;

const crystal = `
vec2 hash2(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
void main() {
  vec2 R = uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * R) / R.y;
  vec2 m = (uMouse - 0.5 * R) / R.y;
  vec2 uv = p * 3.5 + m * 2.0;

  vec2 g = floor(uv);
  vec2 f = fract(uv);
  float md = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 o = vec2(float(i), float(j));
      vec2 rnd = hash2(g + o);
      vec2 r = o + (0.5 + 0.5 * sin(uTime + 6.2831 * rnd)) - f;
      md = min(md, dot(r, r));
    }
  }
  md = sqrt(md);

  vec3 col = mix(vec3(0.45, 0.40, 1.05), vec3(0.015, 0.015, 0.05), md);
  col += smoothstep(0.07, 0.0, md) * vec3(0.6, 0.5, 1.2);

  float age = uTime - uClickTime;
  col += exp(-age * 4.0) * vec3(0.4, 0.3, 1.0) * 0.7;
  gl_FragColor = vec4(col, 1.0);
}
`;

export const SHADERS: Shader[] = [
  { id: "aurora",  name: "Aurora",  desc: "plasma waves bend around your cursor", frag: aurora },
  { id: "liquid",  name: "Liquid",  desc: "metaballs melt toward the mouse",      frag: liquid },
  { id: "grid",    name: "Grid",    desc: "neon tunnel you steer by moving",       frag: grid },
  { id: "swarm",   name: "Swarm",   desc: "particles drawn to the pointer",        frag: swarm },
  { id: "crystal", name: "Crystal", desc: "voronoi cells shift as you move",       frag: crystal },
];
