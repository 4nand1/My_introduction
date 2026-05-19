"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-16 py-24 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-12">
        <span className="text-lime-400 text-lg">◈</span>
        <h2 className="text-3xl font-bold text-white">Contact</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border border-[#1f1f1f] rounded-2xl p-8 md:p-12 space-y-8"
      >
        <div>
          <p className="text-neutral-400 text-lg max-w-lg leading-relaxed">
            Open to freelance projects, collaborations, and full-time opportunities.
            Reach out — I respond fast.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="mailto:your@email.com"
            className="flex items-center gap-3 text-white hover:text-lime-400 transition-colors group"
          >
            <span className="text-neutral-600 font-mono text-sm w-20">Email</span>
            <span className="group-hover:underline">your@email.com</span>
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-lime-400 transition-colors group"
          >
            <span className="text-neutral-600 font-mono text-sm w-20">GitHub</span>
            <span className="group-hover:underline">github.com/yourusername</span>
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-lime-400 transition-colors group"
          >
            <span className="text-neutral-600 font-mono text-sm w-20">Instagram</span>
            <span className="group-hover:underline">@yourusername</span>
          </a>
        </div>

        <a
          href="mailto:your@email.com"
          className="inline-flex px-8 py-3 rounded-full bg-lime-400 text-black font-semibold text-sm hover:bg-lime-300 transition-colors"
        >
          Send a Message
        </a>
      </motion.div>

      <p className="text-neutral-700 text-xs text-center mt-16 font-mono">
        Built with Next.js · Tailwind CSS · Framer Motion
      </p>
    </section>
  );
}
