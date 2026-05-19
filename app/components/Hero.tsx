"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2×", label: "Hackathons" },
  { value: "15+", label: "Projects" },
  { value: "2025", label: "Started" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-6"
      >
        <p className="text-neutral-500 text-sm tracking-widest uppercase font-mono">
          Full-Stack Developer
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none text-white">
          Your Name
        </h1>

        <p className="text-xl md:text-2xl text-lime-400 font-medium">
          Strategy → Logic → Scalable Code
        </p>

        <p className="max-w-xl text-neutral-400 text-base leading-relaxed">
          I build fast, purposeful products. My background in competitive gaming
          taught me to think under pressure — now I channel that into writing
          clean, efficient code that ships.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border border-[#262626] rounded-lg px-5 py-3 text-center"
            >
              <p className="text-white font-bold text-xl">{s.value}</p>
              <p className="text-neutral-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <a
            href="#work"
            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full border border-[#333] text-sm text-neutral-300 hover:border-neutral-500 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
