"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { useAdminContent } from "../hooks/useAdminContent";

type AnyProject = {
  id: string; title: string; subtitle: string; year: string;
  description: string; tags: string | string[]; live?: string; repo?: string;
};

export default function Work() {
  const [selected, setSelected] = useState<number | null>(null);
  const adminData = useAdminContent({ projects: projects as AnyProject[] }, "projects") as { projects?: AnyProject[] };

  const items = (adminData?.projects ?? projects as AnyProject[]).map((p) => ({
    ...p,
    tags: typeof p.tags === "string" ? p.tags.split(",").map((t) => t.trim()).filter(Boolean) : p.tags as string[],
  }));

  const active = selected !== null ? items[selected] : null;

  return (
    <section id="work" className="px-6 md:px-16 py-28 max-w-6xl mx-auto w-full">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-10 space-y-2"
      >
        <p className="font-mono text-lime-400/60 text-xs tracking-[0.18em]">// 01 SELECTED WORK</p>
        <h2 className="text-4xl font-bold text-white tracking-tight">Case Studies</h2>
        <p className="text-neutral-600 text-sm">Real problems, real users, real outcomes.</p>
      </motion.div>

      {/* ── Single-row strip ── */}
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        {items.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`group relative flex-shrink-0 w-[200px] md:flex-1 md:w-auto text-left border rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
              selected === i
                ? "border-lime-400/30 bg-lime-400/[0.05]"
                : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.05]"
            }`}
          >
            {/* faded bg number */}
            <span className="absolute bottom-3 right-4 font-mono font-bold text-5xl text-white/[0.04] select-none leading-none">
              {p.id}
            </span>

            <div className="relative space-y-3">
              {/* year */}
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${selected === i ? "bg-lime-400" : "bg-neutral-700"}`} />
                <span className="text-[10px] font-mono text-neutral-700 tracking-wider">{p.year}</span>
              </div>

              {/* title */}
              <div>
                <p className={`font-semibold text-sm leading-tight transition-colors ${selected === i ? "text-lime-100" : "text-white group-hover:text-lime-50"}`}>
                  {p.title}
                </p>
                <p className="font-mono text-[10px] text-neutral-700 mt-0.5 tracking-wide truncate">{p.subtitle}</p>
              </div>

              {/* top 2 tags */}
              <div className="flex flex-wrap gap-1">
                {(p.tags as string[]).slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-neutral-600 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              {/* arrow */}
              <div className={`flex items-center justify-end transition-all duration-200 ${selected === i ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}>
                <motion.span
                  animate={{ rotate: selected === i ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-lime-400 text-xs"
                >
                  ↓
                </motion.span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* ── Expanded detail panel ── */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 border border-lime-400/15 rounded-2xl p-6 md:p-8 bg-lime-400/[0.03] grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* left */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                  <p className="font-mono text-xs text-neutral-600 mt-0.5">{active.subtitle}</p>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{active.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(active.tags as string[]).map((tag) => (
                    <span key={tag} className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-500 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* right: links + year */}
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  {active.live && (
                    <a href={active.live} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-lime-400 hover:text-lime-300 border border-lime-400/25 hover:border-lime-400/50 px-4 py-2 rounded-full transition-all">
                      Live ↗
                    </a>
                  )}
                  {active.repo && (
                    <a href={active.repo} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-500 hover:text-neutral-300 border border-white/[0.08] hover:border-white/[0.18] px-4 py-2 rounded-full transition-all">
                      GitHub ↗
                    </a>
                  )}
                </div>
                <p className="font-mono text-[80px] font-bold text-white/[0.04] leading-none select-none text-right">
                  {active.id}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
