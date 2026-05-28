"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const PREAMBLE = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uClick;
uniform float uClickTime;
`;

export default function ShaderCanvas({ fragmentShader, className }: { fragmentShader: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const click = useRef({ x: 0, y: 0, t: -100 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, PREAMBLE + fragmentShader));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uResolution");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uClick = gl.getUniformLocation(prog, "uClick");
    const uClickTime = gl.getUniformLocation(prog, "uClickTime");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let inited = false;

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (!inited) {
        mouse.current.x = mouse.current.tx = canvas.width / 2;
        mouse.current.y = mouse.current.ty = canvas.height / 2;
        inited = true;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.tx = (e.clientX - r.left) * dpr;
      mouse.current.ty = (r.height - (e.clientY - r.top)) * dpr;
    };
    const onDown = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      click.current.x = (e.clientX - r.left) * dpr;
      click.current.y = (r.height - (e.clientY - r.top)) * dpr;
      click.current.t = (performance.now() - start) / 1000;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);

    const start = performance.now();
    let raf = 0;
    const render = () => {
      const t = (performance.now() - start) / 1000;
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.08;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.uniform2f(uClick, click.current.x, click.current.y);
      gl.uniform1f(uClickTime, click.current.t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [fragmentShader]);

  return <canvas ref={ref} className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
}
