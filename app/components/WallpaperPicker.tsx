"use client";

import { SHADERS } from "../lib/shaders";
import { useWallpaper } from "./WallpaperContext";

const TINTS = ["#6d63ff", "#8b81ff", "#a09cff", "#67e8f9", "#7c72ff"];

export default function WallpaperPicker() {
  const { active, setActive } = useWallpaper();

  return (
    <div className="hidden md:flex items-center gap-2.5">
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
                className="text-[10px] leading-none transition-all duration-200 group-hover:scale-125"
                style={{
                  color: on ? TINTS[i] : "#2e2c38",
                  transform: on ? "scale(1.25)" : "scale(1)",
                  textShadow: on ? `0 0 10px ${TINTS[i]}` : "none",
                }}
              >
                ◆
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
