"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminContent } from "../hooks/useAdminContent";

const CONTACT_DEFAULTS = {
  email: "404aarhal@gmail.com",
  github: "https://github.com/4nand1",
  linkedin: "https://linkedin.com/in/anand",
  blurb: "I read every email. If it's interesting, I'll reply faster than you'd expect.",
};

type State = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const c = useAdminContent(CONTACT_DEFAULTS, "contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setErr(null);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, body }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to send.");
      setState("sent");
      setName(""); setEmail(""); setBody("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setErr(msg);
      setState("error");
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-20%] left-[30%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,99,255,0.06) 0%, transparent 65%)" }} />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-[#6d63ff] font-mono text-[11px] tracking-[0.2em] uppercase">Contact</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#6d63ff]/30 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-white/[0.07] overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0d0d17 0%, #0f0d1a 100%)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6d63ff]/50 to-transparent" />
          <div className="pointer-events-none absolute top-[-30%] right-[-10%] w-[50%] h-[200%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(109,99,255,0.06) 0%, transparent 65%)" }} />

          <div className="relative p-10 md:p-14 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 items-start">

            {/* Left — pitch + direct links */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-bold tracking-tighter leading-[1.05] text-[#eceae3] mb-5"
                style={{ fontSize: "clamp(2.25rem, 4.2vw, 4rem)" }}
              >
                Send me<br />
                <span style={{
                  background: "linear-gradient(120deg, #6d63ff, #a09cff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  a real message.
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-mono text-[13px] text-[#56545e] leading-relaxed mb-8 max-w-sm"
              >
                {c.blurb}
              </motion.p>

              <div className="space-y-3">
                <a href={`mailto:${c.email}`} className="block group">
                  <p className="font-mono text-[10px] text-[#2e2c38] tracking-widest uppercase mb-0.5">Email</p>
                  <p className="font-mono text-sm text-[#eceae3] group-hover:text-[#a09cff] transition-colors duration-300">
                    {c.email}
                  </p>
                </a>
                <div className="flex gap-5 pt-2">
                  <a href={c.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#56545e] hover:text-[#eceae3] transition-colors">
                    GitHub ↗
                  </a>
                  <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#56545e] hover:text-[#eceae3] transition-colors">
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right — real working form */}
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 relative"
            >
              <AnimatePresence>
                {state === "sent" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-[#0d0d17] border border-[#6d63ff]/30 p-8 text-center"
                  >
                    <span className="text-3xl mb-3">◆</span>
                    <p className="text-[#eceae3] text-base font-medium mb-1.5">Message sent.</p>
                    <p className="font-mono text-xs text-[#56545e] leading-relaxed max-w-xs">
                      I&apos;ll get back to you soon. Usually within a day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setState("idle")}
                      className="mt-5 font-mono text-[11px] text-[#6d63ff] border border-[#6d63ff]/30 rounded-full px-4 py-1.5 hover:bg-[#6d63ff]/10 transition"
                    >
                      Send another →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block font-mono text-[10px] text-[#2e2c38] tracking-widest uppercase mb-2">Your name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Anand Bayar"
                  className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-[#6d63ff]/40 rounded-xl px-4 py-3 text-sm text-[#eceae3] placeholder:text-[#2e2c38] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#2e2c38] tracking-widest uppercase mb-2">Your email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@somewhere.com"
                  className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-[#6d63ff]/40 rounded-xl px-4 py-3 text-sm text-[#eceae3] placeholder:text-[#2e2c38] outline-none transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#2e2c38] tracking-widest uppercase mb-2">Message</label>
                <textarea
                  required
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={5}
                  placeholder="Tell me what you're working on, or just say hi."
                  className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-[#6d63ff]/40 rounded-xl px-4 py-3 text-sm text-[#eceae3] placeholder:text-[#2e2c38] outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {err && (
                <p className="font-mono text-[11px] text-rose-400/80">{err}</p>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full font-mono text-xs text-white bg-[#6d63ff] hover:bg-[#5d54e6] disabled:opacity-50 rounded-xl px-7 py-3.5 font-semibold shadow-[0_0_30px_rgba(109,99,255,0.3)] hover:shadow-[0_0_40px_rgba(109,99,255,0.5)] transition-all duration-300"
              >
                {state === "sending" ? "Sending..." : "Send Message →"}
              </button>

              <p className="font-mono text-[10px] text-[#2e2c38] text-center">
                No spam tracking. Just an inbox.
              </p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
