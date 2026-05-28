"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SHADERS } from "../lib/shaders";

type Ctx = { active: number; setActive: (n: number) => void };
const WallpaperCtx = createContext<Ctx>({ active: 0, setActive: () => {} });

const STORAGE_KEY = "wallpaper-index";

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  // -1 = off, 0..N-1 = a shader
  const [active, setActiveState] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const n = parseInt(saved, 10);
      if (!Number.isNaN(n) && n >= -1 && n < SHADERS.length) setActiveState(n);
    }
  }, []);

  const setActive = (n: number) => {
    setActiveState(n);
    try { localStorage.setItem(STORAGE_KEY, String(n)); } catch {}
  };

  return <WallpaperCtx.Provider value={{ active, setActive }}>{children}</WallpaperCtx.Provider>;
}

export const useWallpaper = () => useContext(WallpaperCtx);
