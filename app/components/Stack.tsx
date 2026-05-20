"use client";

import { motion } from "framer-motion";
import { skillCategories, marqueeItems } from "../data/skills";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-neutral-300">{name}</span>
        <span className="text-xs text-neutral-700 font-mono">{level}%</span>
      </div>
      <div className="h-[2px] bg-[#161616] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, rgba(163,230,53,0.7), rgba(163,230,53,1))",
            boxShadow: "0 0 6px rgba(163,230,53,0.5)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Stack() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section id="stack" className="py-28">
      <div className="px-6 md:px-16 max-w-6xl mx-auto w-full">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14 space-y-2"
        >
          <p className="font-mono text-lime-400/60 text-xs tracking-[0.18em]">// 02 THE STACK</p>
          <h2 className="text-4xl font-bold text-white tracking-tight">Tools of the Trade</h2>
          <p className="text-neutral-600 text-sm">Every tool chosen deliberately.</p>
        </motion.div>

        {/* category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1, ease: "easeOut" }}
              className="border border-white/[0.07] hover:border-white/[0.13] rounded-2xl p-6 bg-white/[0.03] space-y-5 transition-colors"
            >
              <div>
                <p className="text-[10px] font-mono text-lime-400/50 tracking-[0.2em] uppercase mb-0.5">{cat.label}</p>
                <p className="text-sm font-semibold text-neutral-300">{cat.name}</p>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={ci * 0.1 + si * 0.06}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Infinite marquee ── */}
      <div className="relative overflow-hidden border-y border-white/[0.06] py-4">
        <div className="flex gap-0 marquee-track">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 shrink-0 px-6"
            >
              <span className="text-neutral-700 font-mono text-sm tracking-wide whitespace-nowrap hover:text-lime-400/60 transition-colors cursor-default">
                {item}
              </span>
              <span className="text-lime-400/20 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
