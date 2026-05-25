"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function EasterEggs() {
  const [konamiOn, setKonamiOn] = useState(false);

  // Console message — every dev opens devtools
  useEffect(() => {
    const css1 = "color:#6d63ff;font-size:14px;font-weight:bold;font-family:monospace;";
    const css2 = "color:#56545e;font-size:11px;font-family:monospace;";
    const css3 = "color:#67e8f9;font-size:11px;font-family:monospace;";
    console.log("%c⌘  hello.", css1);
    console.log("%ccontact: 404aarhal@gmail.com", css2);
    console.log("%c\nshortcuts on this site:", css3);
    console.log("%c  ⌘K            command palette", css3);
    console.log("%c  ↑↑↓↓←→←→ba    try it", css3);
  }, []);

  // Konami code
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf.push(e.key);
      if (buf.length > KONAMI.length) buf = buf.slice(-KONAMI.length);
      if (buf.length === KONAMI.length && buf.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        setKonamiOn(true);
        buf = [];
        setTimeout(() => setKonamiOn(false), 4000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {konamiOn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[2000] pointer-events-none flex items-center justify-center"
        >
          {/* Invert flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0.06, 0.12, 0] }}
            transition={{ duration: 2.5, times: [0, 0.1, 0.4, 0.7, 1] }}
            className="absolute inset-0 bg-[#6d63ff] mix-blend-difference"
          />
          {/* Floating diamonds */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                x: (Math.random() - 0.5) * 800,
                y: 400,
                rotate: 0,
                scale: 0.5 + Math.random(),
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: -500 - Math.random() * 300,
                rotate: (Math.random() - 0.5) * 360,
              }}
              transition={{ duration: 3, delay: i * 0.04, ease: "easeOut" }}
              className="absolute text-2xl"
              style={{
                color: ["#6d63ff", "#a09cff", "#67e8f9", "#eceae3"][i % 4],
              }}
            >
              ◆
            </motion.span>
          ))}
          {/* Center text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative px-8 py-6 rounded-2xl border border-[#6d63ff]/40 bg-[#0d0d17]/95 backdrop-blur-md text-center"
          >
            <p className="font-mono text-[10px] text-[#67e8f9] tracking-[0.3em] uppercase mb-2">cheat code accepted</p>
            <p className="text-xl font-bold text-[#eceae3] mb-1">↑ ↑ ↓ ↓ ← → ← → b a</p>
            <p className="font-mono text-[11px] text-[#56545e]">konami, 1986.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
