"use client";

import { useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { events } from "../data/timeline";

function TimelineCard({
  event,
  index,
}: {
  event: (typeof events)[number];
  index: number;
}) {
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="relative group pl-10"
    >
      {/* connector dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.06 + 0.1 }}
        className="absolute left-0 top-2 w-3 h-3 rounded-full bg-[#0e0e0e] border-2 border-lime-400/50 group-hover:border-lime-400 transition-colors"
      />

      <div className="border border-white/[0.07] hover:border-white/[0.13] rounded-2xl p-5 bg-white/[0.03] transition-all duration-200 group-hover:translate-x-1 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono text-lime-400/60 tracking-[0.18em] uppercase mb-1">{event.era}</p>
            <h3 className="text-white font-semibold text-sm">{event.title}</h3>
            <p className="text-neutral-600 text-xs font-mono mt-0.5">{event.subtitle}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs font-mono text-neutral-700">{event.year}</span>
            {/* journey photo */}
            {hasPhoto && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#111] mt-2 ml-auto">
                <Image
                  src={`/journey/${event.year}.jpg`}
                  alt={event.title}
                  fill
                  className="object-cover"
                  onError={() => setHasPhoto(false)}
                />
              </div>
            )}
          </div>
        </div>

        <p className="text-neutral-600 text-xs leading-relaxed">{event.body}</p>

        <div className="flex flex-wrap gap-1.5">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-neutral-600 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 25%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="px-6 md:px-16 py-28 max-w-6xl mx-auto w-full">
      {/* section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-14 space-y-2"
      >
        <p className="font-mono text-lime-400/60 text-xs tracking-[0.18em]">// 03 JOURNEY</p>
        <h2 className="text-4xl font-bold text-white tracking-tight">From Curious to Builder</h2>
        <p className="text-neutral-600 text-sm">The path that brought me here.</p>
      </motion.div>

      {/* timeline */}
      <div ref={containerRef} className="relative max-w-2xl">
        {/* track */}
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-[#181818]" />
        {/* animated fill */}
        <motion.div
          className="absolute left-1.5 top-0 w-px origin-top"
          style={{
            height: lineHeight,
            background: "linear-gradient(to bottom, rgba(163,230,53,0.5), rgba(163,230,53,0.1))",
          }}
        />

        <div className="space-y-4">
          {events.map((event, i) => (
            <TimelineCard key={event.year} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
