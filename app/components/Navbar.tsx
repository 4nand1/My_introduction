"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-white/[0.1] bg-[#0c0c0f]/90 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "border-white/[0.06] bg-white/[0.02] backdrop-blur-xl"
        }`}
      >
        <a
          href="#"
          className="text-sm font-bold text-white px-3 py-1.5 hover:text-lime-400 transition-colors mr-1"
        >
          Anand
        </a>

        <div className="w-px h-4 bg-[#2a2a2a]" />

        <ul className="flex items-center gap-0.5 ml-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-xs px-3 py-1.5 rounded-full transition-colors font-mono tracking-wide ${
                  active === link.href.slice(1)
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-200"
                }`}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-[#181818]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="w-px h-4 bg-[#2a2a2a] ml-1" />

        <a
          href="#contact"
          className="ml-1 flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-full bg-lime-400 text-black font-bold hover:bg-lime-300 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black/40 glow-dot" />
          Let&apos;s Talk
        </a>
      </nav>
    </motion.div>
  );
}
