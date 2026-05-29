"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../data/projects";

function TiltRow({ children, disabled }: { children: React.ReactNode; disabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 25 });
  const sry = useSpring(ry, { stiffness: 200, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={disabled ? {} : { rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      onMouseMove={disabled ? undefined : (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rx.set(((e.clientY - r.top) / r.height - 0.5) * -6);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

type AnyProject = {
  id: string; title: string; subtitle: string; year: string;
  description: string; tags: string | string[]; live?: string; repo?: string;
};

export default function Work() {
  const [selected, setSelected] = useState<number | null>(null);
  const [dbProjects, setDbProjects] = useState<AnyProject[] | null>(null);

  useEffect(() => {
    fetch("/api/admin", { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setDbProjects(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  const items = (dbProjects ?? projects as AnyProject[]).map((p) => ({
    ...p,
    tags: typeof p.tags === "string"
      ? p.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : (p.tags as string[]),
  }));

  return (
    <section id="work" className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[#6d63ff] font-mono text-[11px] tracking-[0.2em] uppercase">Selected Work</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#6d63ff]/30 to-transparent" />
        </motion.div>

        {/* Projects */}
        <div className="space-y-4">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltRow disabled={selected === i}>
              <button
                onClick={() => setSelected(selected === i ? null : i)}
                className={`relative w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden group ${
                  selected === i
                    ? "border-[#6d63ff]/40 bg-[#0d0d17]"
                    : "border-white/[0.06] bg-[#0a0a14]/60 hover:border-white/[0.1] hover:bg-[#0d0d17]"
                }`}
              >
                {/* Faded bg number */}
                <span
                  className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-bold text-[#eceae3] select-none leading-none transition-all duration-500"
                  style={{ fontSize: "clamp(4rem, 8vw, 9rem)", opacity: selected === i ? 0.04 : 0.025 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#6d63ff]/[0.04] to-transparent transition-opacity duration-300 ${
                  selected === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`} />

                <div className="relative px-7 py-6 grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto_auto] gap-4 md:gap-8 items-center">
                  {/* Number */}
                  <span className="hidden md:block font-mono text-[11px] text-[#2e2c38] w-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title + subtitle */}
                  <div className="min-w-0">
                    <span className={`block font-semibold text-base md:text-lg transition-colors duration-300 ${
                      selected === i ? "text-[#6d63ff]" : "text-[#eceae3] group-hover:text-[#a09cff]"
                    }`}>
                      {p.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#56545e]">{p.subtitle}</span>
                  </div>

                  {/* Tags — desktop */}
                  <div className="hidden md:flex gap-2 flex-wrap">
                    {(p.tags as string[]).slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-[#56545e] border border-white/[0.07] rounded-full px-3 py-1 bg-white/[0.02]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Year + toggle */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-[#56545e] hidden md:block">{p.year}</span>
                    <motion.span
                      animate={{ rotate: selected === i ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`text-lg leading-none font-light transition-colors duration-300 ${
                        selected === i ? "text-[#6d63ff]" : "text-[#2e2c38] group-hover:text-[#56545e]"
                      }`}
                    >
                      +
                    </motion.span>
                  </div>
                </div>
              </button>

              </TiltRow>
              <AnimatePresence>
                {selected === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 rounded-2xl border border-[#6d63ff]/20 bg-[#0d0d17] px-8 py-7 grid grid-cols-1 md:grid-cols-[1fr_160px] gap-8">
                      <div>
                        <p className="text-sm text-[#56545e] leading-[1.8] mb-6 max-w-xl">
                          {p.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(p.tags as string[]).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[11px] text-[#56545e] border border-white/[0.07] rounded-full px-3 py-1.5 bg-white/[0.02]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-4 items-start md:items-end justify-end">
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[#6d63ff] border border-[#6d63ff]/30 rounded-full px-5 py-2 hover:bg-[#6d63ff]/10 transition-all duration-200"
                          >
                            Live ↗
                          </a>
                        )}
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[#56545e] border border-white/[0.07] rounded-full px-5 py-2 hover:text-[#eceae3] hover:border-white/[0.15] transition-all duration-200"
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
