"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#141414] px-6 md:px-16 py-10 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <a href="#" className="text-sm font-bold text-white hover:text-lime-400 transition-colors">
            Anand
          </a>
          <span className="flex items-center gap-1.5 text-xs font-mono text-lime-400/70">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 glow-dot" />
            Available
          </span>
        </div>

        <ul className="flex gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-mono text-neutral-700 hover:text-neutral-400 transition-colors tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs font-mono text-neutral-800 tracking-wide">
          © 2026 Anand — Built with Next.js
        </p>
      </motion.div>
    </footer>
  );
}
