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
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="break-inside-avoid mb-2 overflow-hidden border border-[#1c1c1c] bg-[#0e0e0e]"
    >
      <div className="relative">
        <Image
          src={src}
          alt={caption || `Memory ${index + 1}`}
          width={280}
          height={200}
          className="w-full h-auto object-cover"
          onError={() => setVisible(false)}
        />
      </div>
      {caption && (
        <div className="px-3 py-2.5 border-t border-[#1c1c1c]">
          <p className="font-mono text-[11px] text-[#505050] leading-snug italic">&ldquo;{caption}&rdquo;</p>
        </div>
      )}
    </motion.div>
  );
}

export default function Memory() {
  const [open, setOpen] = useState(false);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => i + 1);

  useEffect(() => {
    fetch("/api/admin", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (data.memoryCaptions) setCaptions(data.memoryCaptions); })
      .catch(() => {});
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed top-4 right-[140px] z-50 font-mono text-[11px] text-[#505050] hover:text-[#e8e8e6] transition-colors tracking-wider"
      >
        Memories ↗
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/98 overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-14 py-5 border-b border-[#1c1c1c] bg-[#0a0a0a]">
              <div>
                <p className="font-mono text-[11px] text-[#505050] tracking-widest uppercase">Memories</p>
                <h2 className="text-xl font-bold text-[#e8e8e6] mt-0.5">Life in frames.</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-[#505050] hover:text-[#e8e8e6] transition-colors border border-[#1c1c1c] px-4 py-2"
              >
                Close ×
              </button>
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
              <p className="text-center font-mono text-[11px] text-[#2a2a2a] mt-8 tracking-wider">
                Add photos to /public/memories/ named 1.jpg, 2.jpg ...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
