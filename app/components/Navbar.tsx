"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-md"
    >
      <a href="#" className="font-semibold text-sm tracking-wide text-white">
        Your Name
      </a>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <span className="text-xs px-3 py-1 rounded-full border border-lime-400/40 text-lime-400 font-medium">
        Available
      </span>
    </motion.nav>
  );
}
