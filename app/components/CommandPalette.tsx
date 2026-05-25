"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
  { id: "now",     label: "What I'm doing now", hint: "Currently building/playing/learning", category: "Navigate", symbol: "→", action: () => document.querySelector("#now")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "work",    label: "View Work",          hint: "Selected projects",                   category: "Navigate", symbol: "→", action: () => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "stack",   label: "Tech Stack",         hint: "Languages & tools",                   category: "Navigate", symbol: "→", action: () => document.querySelector("#stack")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "journey", label: "My Journey",         hint: "Timeline",                            category: "Navigate", symbol: "→", action: () => document.querySelector("#journey")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "contact", label: "Contact",            hint: "Send me a message",                   category: "Navigate", symbol: "→", action: () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "github",  label: "GitHub",             hint: "github.com/4nand1",                   category: "Links",    symbol: "↗", action: () => window.open("https://github.com/4nand1", "_blank") },
  { id: "linkedin",label: "LinkedIn",           hint: "linkedin.com/in/anand",               category: "Links",    symbol: "↗", action: () => window.open("https://linkedin.com/in/anand", "_blank") },
  { id: "email",   label: "Send Email",         hint: "404aarhal@gmail.com",                 category: "Links",    symbol: "✉", action: () => { window.location.href = "mailto:404aarhal@gmail.com"; } },
  { id: "konami",  label: "Try the Konami code", hint: "↑↑↓↓←→←→ba",                         category: "Secret",   symbol: "✦", action: () => { /* user must type it themselves */ } },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
        setQuery("");
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.hint.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const run = (cmd: typeof COMMANDS[0]) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === "Enter" && filtered[active]) run(filtered[active]);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[1001] w-full max-w-lg px-4"
          >
            <div className="rounded-2xl border border-white/[0.1] bg-[#0d0d17] shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                <span className="font-mono text-[13px] text-[#3a3848]">⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setActive(0); }}
                  onKeyDown={onKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent font-mono text-sm text-[#eceae3] placeholder:text-[#2e2c38] outline-none"
                />
                <kbd className="font-mono text-[10px] text-[#2e2c38] border border-white/[0.07] rounded px-1.5 py-0.5">ESC</kbd>
              </div>

              {/* Results */}
              <div className="py-2 max-h-72 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="font-mono text-xs text-[#2e2c38] px-5 py-4">No commands found.</p>
                ) : filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full text-left flex items-center justify-between px-5 py-3 transition-colors duration-100 ${
                      active === i ? "bg-[#6d63ff]/[0.1]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`font-mono text-[9px] tracking-[0.2em] uppercase w-14 shrink-0 ${
                        active === i ? "text-[#6d63ff]" : "text-[#2e2c38]"
                      }`}>
                        {cmd.category}
                      </span>
                      <span className={`text-sm font-medium transition-colors ${
                        active === i ? "text-[#eceae3]" : "text-[#56545e]"
                      }`}>
                        {cmd.label}
                      </span>
                      <span className="font-mono text-[11px] text-[#2e2c38] truncate hidden sm:block">{cmd.hint}</span>
                    </div>
                    <span className={`font-mono text-xs shrink-0 ml-3 transition-colors ${
                      active === i ? "text-[#6d63ff]" : "text-[#2e2c38]"
                    }`}>
                      {cmd.symbol}
                    </span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/[0.06] px-5 py-2.5 flex items-center gap-5">
                <span className="font-mono text-[10px] text-[#1e1c28]">↑↓ navigate</span>
                <span className="font-mono text-[10px] text-[#1e1c28]">↵ select</span>
                <span className="font-mono text-[10px] text-[#1e1c28]">esc close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
