"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Memory({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    fetch("/api/admin", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (data.memoryCaptions) setCaptions(data.memoryCaptions); })
      .catch(() => {});
    fetch("/api/admin/photos", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (data.files) setPhotos(data.files); })
      .catch(() => {});
  }, []);

  return (
    <>
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
                onClick={onClose}
                className="font-mono text-xs text-[#505050] hover:text-[#e8e8e6] transition-colors border border-[#1c1c1c] px-4 py-2"
              >
                Close ×
              </button>
            </div>

            <div className="px-6 md:px-14 py-8">
              <div style={{ columns: "3 140px", columnGap: "8px" }}>
                {photos.length === 0 && (
                  <p className="text-center font-mono text-[11px] text-[#2a2a2a] col-span-full py-16 tracking-wider">
                    No photos yet — upload them in /admin
                  </p>
                )}
                {photos.map((p, i) => (
                  <PhotoCard
                    key={p.url}
                    src={p.url}
                    index={i}
                    caption={captions[p.name]}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
