"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAdminContent } from "../hooks/useAdminContent";

const HERO_DEFAULTS = {
  name: "",
  title: "",
  bio: "",
  tagline: "",
  location: "",
  stat1Value: "", stat1Label: "",
  stat2Value: "", stat2Label: "",
  stat3Value: "", stat3Label: "",
};

const techTags = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"];

const charContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};

const charItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const [hasPhoto, setHasPhoto] = useState(true);
  const h = useAdminContent(HERO_DEFAULTS, "hero");
  const stats = [
    { value: h.stat1Value, label: h.stat1Label },
    { value: h.stat2Value, label: h.stat2Label },
    { value: h.stat3Value, label: h.stat3Label },
  ];
  const nameChars = h.name.split("");

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-20 max-w-6xl mx-auto w-full">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-lime-400/[0.05] blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-lime-300/[0.035] blur-[130px]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-center">
        {/* ── Left column ── */}
        <div className="space-y-8">
          {/* status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-lime-400/25 rounded-full px-4 py-1.5 text-xs font-mono text-lime-400 bg-lime-400/[0.07]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 glow-dot" />
            Open to opportunities
          </motion.div>

          {/* name */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-neutral-500 text-sm font-mono tracking-[0.15em] uppercase mb-3"
            >
              Hi, I&apos;m
            </motion.p>
            <motion.h1
              variants={charContainer}
              initial="hidden"
              animate="show"
              className="flex flex-wrap text-7xl md:text-8xl font-bold tracking-tight leading-none"
              aria-label={h.name}
            >
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charItem}
                  className="inline-block bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-1.5"
          >
            <p className="text-xl font-semibold text-neutral-200">{h.title}</p>
            <p className="font-mono text-sm text-lime-400/80 tracking-wide">{h.tagline}</p>
          </motion.div>

          {/* bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="max-w-lg text-neutral-400 text-sm leading-relaxed"
          >
            {h.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="flex flex-wrap gap-3"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-2.5 rounded-full bg-lime-400 text-black text-sm font-bold hover:bg-lime-300 transition-colors shadow-[0_0_30px_rgba(163,230,53,0.25)]"
            >
              View Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-sm text-neutral-300 hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.06]"
            >
              Let&apos;s Talk
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-sm text-neutral-500 hover:text-neutral-300 transition-all flex items-center gap-2 bg-white/[0.02] hover:bg-white/[0.05]"
            >
              Resume
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4 4m0 0l4-4m-4 4V4" />
              </svg>
            </motion.a>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15 }}
            className="flex flex-wrap gap-3"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="border border-white/[0.07] hover:border-lime-400/20 rounded-xl px-5 py-3.5 text-center bg-white/[0.03] hover:bg-white/[0.05] transition-all cursor-default backdrop-blur-sm"
              >
                <p className="text-white font-bold text-xl">{s.value}</p>
                <p className="text-neutral-500 text-xs mt-0.5 font-mono tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column — profile card ── */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden lg:block"
        >
          <div className="relative border border-white/[0.08] rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-sm p-6 space-y-5">
            <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-lime-400/[0.08] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            {/* photo */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.04]">
              {hasPhoto ? (
                <Image
                  src="/profile.jpg"
                  alt="Anand"
                  fill
                  className="object-cover"
                  onError={() => setHasPhoto(false)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 via-lime-400/5 to-transparent flex items-center justify-center">
                  <span className="text-6xl font-bold text-lime-400/20 select-none">{h.name[0]}</span>
                </div>
              )}
            </div>

            <div>
              <p className="text-white font-bold text-lg">{h.name}</p>
              <p className="text-neutral-400 text-sm font-mono">{h.title}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {h.location}
            </div>

            <div className="flex items-center gap-2 border border-lime-400/20 rounded-full px-3 py-1.5 text-xs font-mono text-lime-400 bg-lime-400/[0.06] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 glow-dot" />
              Available for work
            </div>

            <div className="flex flex-wrap gap-1.5">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-neutral-400 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-neutral-700 text-[10px] font-mono tracking-[0.2em]">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-neutral-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
