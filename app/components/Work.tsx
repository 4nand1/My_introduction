"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Project Alpha",
    year: "2025",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    summary: "A real-time web app built during a 24-hour hackathon.",
    description:
      "Built end-to-end in 24 hours. Handles real-time data sync with WebSockets, deployed to Vercel with a Neon PostgreSQL backend. Focused on fast delivery without sacrificing code quality.",
  },
  {
    title: "Project Beta",
    year: "2025",
    tags: ["React", "Node.js", "Prisma"],
    summary: "A platform connecting users with services in their area.",
    description:
      "Full-stack CRUD application with authentication via Auth.js, relational data modeled with Prisma, and a clean responsive UI built with Tailwind CSS.",
  },
  {
    title: "Project Gamma",
    year: "2026",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    summary: "Gamified productivity app with streak tracking.",
    description:
      "Designed and built a gamified habit tracker. Users set goals, earn points, and compete on leaderboards. Animations powered by Framer Motion for a polished feel.",
  },
  {
    title: "Project Delta",
    year: "2026",
    tags: ["Next.js", "AI", "OpenAI"],
    summary: "AI-enhanced management tool for institutions.",
    description:
      "Integrated OpenAI APIs for smart document summarization and scheduling suggestions. Built with a multi-tenant architecture supporting different user roles.",
  },
];

export default function Work() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="work" className="px-6 md:px-16 py-24 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-12">
        <span className="text-lime-400 text-lg">◈</span>
        <h2 className="text-3xl font-bold text-white">Work</h2>
      </div>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            layout
            className="border border-[#1f1f1f] rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex items-center justify-between px-6 py-5 hover:bg-[#111] transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-neutral-600 font-mono text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-white font-semibold">{project.title}</p>
                  <p className="text-neutral-500 text-sm mt-0.5">{project.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neutral-600 text-sm font-mono">{project.year}</span>
                <span className="text-neutral-400 text-lg">{open === i ? "−" : "+"}</span>
              </div>
            </div>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 border-t border-[#1f1f1f]"
                >
                  <p className="text-neutral-400 text-sm leading-relaxed mt-4 max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
