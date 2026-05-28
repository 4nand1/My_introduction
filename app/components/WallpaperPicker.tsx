"use client";

import { SHADERS } from "../lib/shaders";
import { useWallpaper } from "./WallpaperContext";

const TINTS = ["#6d63ff", "#8b81ff", "#a09cff", "#67e8f9", "#7c72ff"];

export default function WallpaperPicker() {
  const { active, setActive } = useWallpaper();

  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[9px] text-[#2e2c38] tracking-[0.22em] uppercase">bg</span>
      <div className="flex items-center gap-1.5">
        {SHADERS.map((s, i) => {
          const on = active === i;
          return (
            <button
              key={s.id}
              onClick={() => setActive(on ? -1 : i)}
              title={`${s.name} — ${s.desc}${on ? " (click to turn off)" : ""}`}
              aria-label={`Wallpaper: ${s.name}`}
              className="relative w-5 h-5 flex items-center justify-center group"
            >
              <span
                className="block w-3 h-3 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: TINTS[i],
                  opacity: on ? 1 : 0.3,
                  transform: on ? "scale(1.3)" : "scale(1)",
                  boxShadow: on ? `0 0 8px ${TINTS[i]}` : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
