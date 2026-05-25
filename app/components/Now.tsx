"use client";

import { motion } from "framer-motion";
import { useAdminContent } from "../hooks/useAdminContent";

const DEFAULTS = {
  building: "",
  playing: "",
  learning: "",
  reading: "",
  updated: "",
};

const ROWS = [
  { key: "building", label: "Building",  symbol: "→" },
  { key: "playing",  label: "Playing",   symbol: "◇" },
  { key: "learning", label: "Learning",  symbol: "∴" },
  { key: "reading",  label: "Reading",   symbol: "§" },
] as const;

export default function Now() {
  const n = useAdminContent(DEFAULTS, "now");
  const hasAny = ROWS.some(r => (n as Record<string, string>)[r.key]);
  if (!hasAny) return null;

  return (
    <section id="now" className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-[#6d63ff] font-mono text-[11px] tracking-[0.2em] uppercase">/now</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#6d63ff]/30 to-transparent" />
          {n.updated && (
            <span className="font-mono text-[10px] text-[#2e2c38] tracking-wider">
              updated {n.updated}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.06]"
        >
          {ROWS.map((r, i) => {
            const val = (n as Record<string, string>)[r.key];
            if (!val) return null;
            return (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative px-7 py-7 bg-[#0a0a14] hover:bg-[#0d0d17] transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase shrink-0 w-20 mt-1">
                    {r.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-[#eceae3] leading-[1.55]">{val}</p>
                  </div>
                  <span className="font-mono text-sm text-[#1e1c28] group-hover:text-[#6d63ff] transition-colors duration-300 shrink-0">
                    {r.symbol}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="font-mono text-[10px] text-[#2e2c38] mt-5 tracking-wide">
          Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#56545e] underline-offset-2 hover:underline transition-colors">nownownow.com</a> — a snapshot of what I&apos;m actually doing, right now.
        </p>
      </div>
    </section>
  );
}
