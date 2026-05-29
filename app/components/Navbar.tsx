"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WallpaperPicker from "./WallpaperPicker";
import Memory from "./Memory";

const links = [
  { label: "Now", href: "#now" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#06060b]/85 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_0_60px_rgba(109,99,255,0.05)]"
          : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm font-bold text-[#eceae3] tracking-tight hover:text-[#6d63ff] transition-colors duration-300"
        >
          anand<span className="text-[#6d63ff]">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] text-[#56545e] hover:text-[#eceae3] transition-colors duration-300 tracking-widest uppercase"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <WallpaperPicker />
          <button
            onClick={() => setMemoryOpen(true)}
            className="font-mono text-[11px] text-[#56545e] hover:text-[#eceae3] transition-colors duration-300 tracking-wider hidden md:block"
          >
            Memories ↗
          </button>
          <a
            href="/admin"
            className="font-mono text-[11px] text-[#56545e] hover:text-[#eceae3] transition-colors duration-300 tracking-wider hidden md:block"
          >
            Admin
          </a>
          <a
            href="#contact"
            className="relative font-mono text-xs text-[#6d63ff] border border-[#6d63ff]/40 rounded-full px-5 py-2.5 overflow-hidden group transition-all duration-300 hover:border-[#6d63ff] hover:shadow-[0_0_20px_rgba(109,99,255,0.25)]"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Hire me →</span>
            <span className="absolute inset-0 bg-[#6d63ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          </a>
        </div>
      </div>
    </motion.header>

    <Memory open={memoryOpen} onClose={() => setMemoryOpen(false)} />
    </>
  );
}
