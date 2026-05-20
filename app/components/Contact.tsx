"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAdminContent } from "../hooks/useAdminContent";

const CONTACT_DEFAULTS = {
  email: "404aarhal@gmail.com",
  github: "https://github.com/4nand1",
  linkedin: "https://linkedin.com/in/anand",
};

export default function Contact() {
  const c = useAdminContent(CONTACT_DEFAULTS, "contact");
  const socials = [
    { label: "Email",    value: c.email,                           href: `mailto:${c.email}` },
    { label: "GitHub",   value: c.github.replace("https://", ""), href: c.github },
    { label: "LinkedIn", value: c.linkedin.replace("https://", ""), href: c.linkedin },
  ];
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // wire to your API route / Resend / Formspree here
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="px-6 md:px-16 py-28 max-w-6xl mx-auto w-full">
      {/* section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-14 space-y-2"
      >
        <p className="font-mono text-lime-400/60 text-xs tracking-[0.18em]">// 04 CONTACT</p>
        <h2 className="text-4xl font-bold text-white tracking-tight">Let&apos;s work together.</h2>
        <p className="text-neutral-600 text-sm">
          Open to projects, collaborations, and full-time roles.{" "}
          <span className="text-lime-400/70">Usually responds within 24h.</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
        {/* ── Socials ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="space-y-4"
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 border border-white/[0.07] hover:border-lime-400/20 rounded-xl px-5 py-4 bg-white/[0.03] group transition-colors"
            >
              <span className="text-[10px] font-mono text-neutral-700 w-20 tracking-wider shrink-0">{s.label}</span>
              <span className="text-sm text-neutral-400 group-hover:text-lime-400 transition-colors">{s.value}</span>
            </motion.a>
          ))}

          <p className="text-neutral-800 text-xs font-mono italic pt-4 leading-relaxed">
            &ldquo;The best code is the code that solves a real problem.&rdquo;
          </p>
        </motion.div>

        {/* ── Contact form ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="relative border border-white/[0.07] rounded-2xl p-7 bg-white/[0.03] overflow-hidden"
        >
          <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-lime-400/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full py-12 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold">Message sent!</p>
              <p className="text-neutral-600 text-sm">I&apos;ll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-xs font-mono text-neutral-600 mb-1.5 tracking-wider">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-lime-400/30 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-mono text-neutral-600 mb-1.5 tracking-wider">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="What are you working on?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-lime-400/30 transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl bg-lime-400 text-black font-bold text-sm hover:bg-lime-300 transition-colors disabled:opacity-60 shadow-[0_0_24px_rgba(163,230,53,0.15)]"
              >
                {loading ? "Sending..." : "Send Message →"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
