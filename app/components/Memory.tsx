"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PHOTO_COUNT = 20;

function PhotoCard({ src, index, caption }: { src: string; index: number; caption?: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.035 }}
      className="break-inside-avoid mb-2 rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.03] cursor-zoom-in group"
    >
      <div className="relative">
        <Image
          src={src}
          alt={caption || `Memory ${index + 1}`}
          width={280}
          height={200}
          className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
          onError={() => setVisible(false)}
        />
      </div>
      {caption && (
        <div className="px-3 py-2.5 border-t border-white/[0.06]">
          <div className="flex items-start gap-2">
            <span className="text-lime-400/70 text-[14px] leading-tight mt-0.5 shrink-0">"</span>
            <p className="text-[12px] text-white/80 leading-snug italic">{caption}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Memory() {
  const [open, setOpen] = useState(false);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => i + 1);

  // Load captions from admin-content.json
  useEffect(() => {
    fetch("/admin-content.json", { cache: "no-store" })
      .then(r => r.json())
      .then(data => { if (data.memoryCaptions) setCaptions(data.memoryCaptions); })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ── Trigger button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 border border-white/[0.1] bg-[#0c0c0f]/80 backdrop-blur-xl rounded-full pl-3 pr-4 py-2 text-xs font-mono text-neutral-500 hover:text-white hover:border-white/20 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      >
        <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
        Memories
      </motion.button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0c0c0f]/96 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-14 py-5 border-b border-white/[0.07] bg-[#0c0c0f]/90 backdrop-blur-2xl">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
                <p className="font-mono text-lime-400/60 text-xs tracking-[0.18em]">// MEMORIES</p>
                <h2 className="text-xl font-bold text-white mt-0.5">Life in frames.</h2>
              </motion.div>
              <motion.button
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.15 }}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-full border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/[0.2] transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="px-6 md:px-14 py-8">
              <div style={{ columns: "3 140px", columnGap: "8px" }}>
                {photos.map((n, i) => (
                  <PhotoCard
                    key={n}
                    src={`/memories/${n}.jpg`}
                    index={i}
                    caption={captions[`${n}.jpg`]}
                  />
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-center text-neutral-800 text-xs font-mono mt-6 tracking-wider"
              >
                Add photos to /public/memories/ named 1.jpg, 2.jpg ...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
