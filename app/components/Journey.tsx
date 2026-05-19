"use client";

import { motion } from "framer-motion";

const events = [
  {
    year: "2019",
    title: "First Lines of Code",
    body: "Started tinkering with HTML and CSS out of curiosity. Built my first webpage — a disaster, but a start.",
  },
  {
    year: "2021",
    title: "Competitive Gaming",
    body: "Reached Diamond rank in competitive play. Learned to stay calm under pressure and make fast, precise decisions.",
  },
  {
    year: "2023",
    title: "The Catalyst",
    body: "Discovered JavaScript and realized coding was more than just markup. Spent months learning through projects, not tutorials.",
  },
  {
    year: "2024",
    title: "Full-Stack Turn",
    body: "Learned Next.js, built my first full-stack app with a real database. Shipped to production for the first time.",
  },
  {
    year: "2025",
    title: "Enrolled in Academy",
    body: "Joined a structured program to sharpen fundamentals — algorithms, system design, and collaborative development.",
  },
  {
    year: "2026",
    title: "Independent Projects",
    body: "Launching products independently. Focused on solving real problems and building a client base.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="px-6 md:px-16 py-24 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-12">
        <span className="text-lime-400 text-lg">⬢</span>
        <h2 className="text-3xl font-bold text-white">Journey</h2>
      </div>

      <div className="relative pl-4">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1f1f1f]" />

        <div className="space-y-10">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-8"
            >
              <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-lime-400" />
              <p className="text-lime-400 text-xs font-mono mb-1">{event.year}</p>
              <p className="text-white font-semibold">{event.title}</p>
              <p className="text-neutral-500 text-sm mt-1 leading-relaxed max-w-lg">{event.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
