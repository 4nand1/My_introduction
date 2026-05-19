"use client";

import { motion } from "framer-motion";

const categories = [
  {
    name: "Frontend",
    skills: [
      { name: "Next.js", level: 92 },
      { name: "React / TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 94 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Prisma / Neon", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "Auth.js", level: 78 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Figma", level: 82 },
      { name: "Vercel", level: 88 },
      { name: "VS Code", level: 95 },
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="px-6 md:px-16 py-24 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-12">
        <span className="text-lime-400 text-lg">⬡</span>
        <h2 className="text-3xl font-bold text-white">Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, ci) => (
          <div key={cat.name} className="space-y-5">
            <p className="text-neutral-500 text-xs uppercase tracking-widest font-mono">
              {cat.name}
            </p>
            {cat.skills.map((skill, si) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-neutral-300">{skill.name}</span>
                  <span className="text-xs text-neutral-600 font-mono">{skill.level}%</span>
                </div>
                <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-lime-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: ci * 0.1 + si * 0.05, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
