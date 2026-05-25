"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useAdminContent } from "../hooks/useAdminContent";

function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

const BIRTH = new Date("2007-07-31T00:00:00");

function useRealTimeAge() {
  const calc = () => (Date.now() - BIRTH.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const [age, setAge] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setAge(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return age;
}

function useUBClock() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Ulaanbaatar",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const HERO_DEFAULTS = {
  name: "", cyrillic: "", title: "", bio: "", tagline: "",
  location: "", coords: "",
  stat1Value: "", stat1Label: "", stat2Value: "", stat2Label: "",
};

const MARQUEE_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "Prisma", "Tailwind CSS", "Framer Motion", "Cloudflare D1",
  "Vercel", "Google Gemini", "Clerk", "Auth.js", "Figma", "REST APIs",
];

const LETTER_COLORS = ["#6d63ff", "#a09cff", "#8b81ff", "#7c72ff", "#6d63ff"];

export default function Hero() {
  const h = useAdminContent(HERO_DEFAULTS, "hero");
  const age = useRealTimeAge();
  const ubTime = useUBClock();
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const letters = (h.name || "ANAND").split("");

  // Easter egg: click name 5 times to scatter letters
  const [clickCount, setClickCount] = useState(0);
  const [scattered, setScattered] = useState(false);
  const onNameClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setScattered(true);
      setTimeout(() => { setScattered(false); setClickCount(0); }, 2200);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-15%] left-[5%] w-[65vw] h-[65vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,99,255,0.08) 0%, transparent 60%)" }} />
        <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,99,255,0.05) 0%, transparent 65%)" }} />
      </div>

      <div className="relative flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-28 pb-0">

        {/* Top status bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-[#6d63ff] pulse-dot" />
              <span className="w-2 h-2 rounded-full bg-[#6d63ff]" />
            </span>
            <span className="font-mono text-[11px] text-[#56545e] tracking-[0.18em] uppercase">
              Open to opportunities
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#67e8f9]/20 bg-[#67e8f9]/[0.04]">
            <span className="text-[#67e8f9] text-[9px] leading-none">◆</span>
            <span className="font-mono text-[10px] text-[#67e8f9] tracking-[0.18em] uppercase">Diamond</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-[#1e1c28]">🇲🇳</span>
              <span className="tabular-nums text-[#3a3848]">{ubTime}</span>
              <span className="text-[#1e1c28]">UB</span>
            </div>
            <kbd className="font-mono text-[9px] text-[#2e2c38] border border-white/[0.06] rounded px-1.5 py-0.5 tracking-wider">⌘K</kbd>
          </div>
        </motion.div>

        {/* Cyrillic byline above name — Mongolian identity */}
        {h.cyrillic && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-mono text-[11px] text-[#56545e] tracking-[0.35em] mb-3 uppercase"
          >
            <span className="text-[#6d63ff]">◆</span>&nbsp;&nbsp;{h.cyrillic} · {h.coords || "47.9°N 106.9°E"}
          </motion.p>
        )}

        {/* Giant interactive name */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-bold tracking-tighter leading-[0.85] flex flex-wrap cursor-pointer select-none"
            style={{ fontSize: "clamp(5rem, 16vw, 19rem)" }}
            onClick={onNameClick}
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={scattered ? {
                  y: (Math.random() - 0.5) * 220,
                  x: (Math.random() - 0.5) * 180,
                  rotate: (Math.random() - 0.5) * 90,
                  color: LETTER_COLORS[i % LETTER_COLORS.length],
                } : {
                  y: 0, x: 0, rotate: 0, color: "#eceae3",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                whileHover={scattered ? {} : {
                  y: -12,
                  color: LETTER_COLORS[i % LETTER_COLORS.length],
                  transition: { type: "spring", stiffness: 600, damping: 18 },
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.h1>
          <AnimatePresence>
            {scattered && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[10px] text-[#6d63ff] tracking-[0.3em] uppercase mt-4"
              >
                ⚠ you found it. nice.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Tagline — punchy hot take */}
        {h.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lg md:text-xl text-[#a09cff] italic mb-8 max-w-[40ch]"
            style={{ fontFamily: "serif" }}
          >
            &ldquo;{h.tagline}&rdquo;
          </motion.p>
        )}

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-8 md:gap-14 items-start border-t border-white/[0.06] pt-8 mb-16"
        >
          <div className="space-y-4">
            <p className="text-[15px] text-[#a8a5ad] leading-[1.75] max-w-[44ch]">{h.bio}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 items-center">
              <span className="font-mono text-xs text-[#eceae3]">{h.title}</span>
              <span className="text-[#2e2c38] text-xs">·</span>
              <span className="font-mono text-xs text-[#56545e]">{h.location || "Улаанбаатар"}, MN</span>
              <span className="text-[#2e2c38] text-xs">·</span>
              <span className="font-mono text-xs text-[#56545e] tabular-nums">
                {age.toFixed(1)} yrs
              </span>
            </div>
          </div>

          <div className="flex md:flex-col gap-8 md:gap-6 items-start">
            {[
              { val: h.stat1Value, label: h.stat1Label },
              { val: h.stat2Value, label: h.stat2Label },
            ].filter(s => s.val).map(s => (
              <div key={s.label} className="text-center md:text-right">
                <p className="text-3xl font-bold text-[#eceae3] leading-none">{s.val}</p>
                <p className="font-mono text-[10px] text-[#56545e] mt-1 tracking-wider uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex md:flex-col gap-3 items-start md:items-end">
            <MagneticLink
              href="#work"
              className="font-mono text-xs text-white bg-[#6d63ff] rounded-full px-7 py-3.5 font-semibold shadow-[0_0_30px_rgba(109,99,255,0.4)] hover:shadow-[0_0_40px_rgba(109,99,255,0.6)] transition-shadow duration-300"
            >
              View Work →
            </MagneticLink>
            <MagneticLink
              href="#contact"
              className="font-mono text-xs text-[#56545e] border border-white/[0.08] rounded-full px-7 py-3.5 hover:text-[#eceae3] hover:border-white/[0.18] transition-all duration-200"
            >
              Let&apos;s Talk
            </MagneticLink>
          </div>
        </motion.div>
      </div>

      {/* Skill marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative overflow-hidden border-t border-white/[0.05] py-4 bg-white/[0.01]"
      >
        <div className="flex marquee-track">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0 px-6">
              <span className="font-mono text-xs text-[#2e2c38] whitespace-nowrap hover:text-[#6d63ff] transition-colors duration-300 cursor-default">
                {item}
              </span>
              <span className="text-[#1a1828] text-[8px]">◆</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
