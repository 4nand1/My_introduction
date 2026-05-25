"use client";

import { motion } from "framer-motion";
import { useAdminContent } from "../hooks/useAdminContent";

interface TimelineEvent {
  year: string;
  era: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
}

export default function Journey() {
  const j = useAdminContent<{ events: TimelineEvent[] }>({ events: [] }, "timeline");
  const evts = j.events ?? [];

  if (evts.length === 0) return null;

  return (
    <section id="journey" className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[#6d63ff] font-mono text-[11px] tracking-[0.2em] uppercase">Journey</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#6d63ff]/30 to-transparent" />
        </motion.div>

        <div className="relative max-w-2xl">
          {/* Timeline track */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[#1a1828]" />

          <div className="space-y-2 pl-8">
            {evts.map((event, i) => (
              <motion.div
                key={event.year + i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Dot */}
                <div className="absolute -left-8 top-[22px] w-2.5 h-2.5 rounded-full border-2 border-[#1a1828] bg-[#06060b] group-hover:border-[#6d63ff] transition-colors duration-300" />

                <div className="rounded-xl border border-white/[0.05] bg-[#0a0a14]/60 px-6 py-5 hover:border-[#6d63ff]/25 hover:bg-[#0d0d17] transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="font-mono text-[10px] text-[#6d63ff] tracking-widest uppercase">
                        {event.era}
                      </span>
                      <h3 className="text-sm font-semibold text-[#eceae3] mt-0.5 group-hover:text-white transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="font-mono text-[11px] text-[#56545e] mt-0.5">{event.subtitle}</p>
                    </div>
                    <span className="font-mono text-xs text-[#2e2c38] shrink-0">{event.year}</span>
                  </div>
                  <p className="text-xs text-[#56545e] leading-relaxed">{event.body}</p>
                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-[#2e2c38] border border-white/[0.05] rounded-full px-2.5 py-0.5 bg-white/[0.02]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
