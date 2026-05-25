"use client";

import { motion } from "framer-motion";
import { useAdminContent } from "../hooks/useAdminContent";
import { skillCategories } from "../data/skills";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  label: string;
  skills: Skill[];
}

export default function Stack() {
  const s = useAdminContent<{ categories: SkillCategory[] }>({ categories: skillCategories }, "skills");
  const cats = s.categories ?? [];

  return (
    <section id="stack" className="py-32 bg-[#09091280]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[#6d63ff] font-mono text-[11px] tracking-[0.2em] uppercase">Tech Stack</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#6d63ff]/30 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cats.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group rounded-2xl border border-white/[0.06] bg-[#0d0d17] p-7 overflow-hidden hover:border-[#6d63ff]/30 transition-all duration-400"
            >
              {/* Corner glow on hover */}
              <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 rounded-full bg-[#6d63ff]/[0.05] blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <p className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase mb-2">
                {cat.label}
              </p>
              <p className="text-sm font-semibold text-[#eceae3] mb-8">{cat.name}</p>

              <ul className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: ci * 0.1 + si * 0.06 }}
                    className="flex items-center gap-3 group/item"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e1c28] group-hover/item:bg-[#6d63ff] transition-colors duration-300 shrink-0" />
                    <span className="font-mono text-xs text-[#56545e] group-hover/item:text-[#eceae3] transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
