"use client";

import ShaderCanvas from "./ShaderCanvas";
import { SHADERS } from "../lib/shaders";
import { useWallpaper } from "./WallpaperContext";

export default function WallpaperBackground() {
  const { active } = useWallpaper();
  if (active < 0 || active >= SHADERS.length) return null;
  const s = SHADERS[active];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <ShaderCanvas key={s.id} fragmentShader={s.frag} className="absolute inset-0" />
      {/* Dim layers so portfolio text stays readable over the moving shader */}
      <div className="absolute inset-0 bg-[#06060b]/62" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 95% 70% at 50% 38%, rgba(6,6,11,0.45) 0%, transparent 72%)" }}
      />
    </div>
  );
}
