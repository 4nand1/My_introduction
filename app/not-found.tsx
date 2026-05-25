"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINES = [
  "$ navigate /unknown-route",
  "→ resolving...",
  "→ tracing...",
  "→ asking around in Ulaanbaatar...",
  "✗ route not found.",
  "",
  "the page you tried doesn't exist —",
  "either it never did, or it went somewhere quieter.",
  "",
  "$ suggest = [ /work, /stack, /contact ]",
];

export default function NotFound() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= LINES.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), 180);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background orb */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,99,255,0.08) 0%, transparent 65%)" }} />
      </div>

      <div className="relative max-w-2xl w-full">
        {/* Giant 404 */}
        <div className="relative mb-10">
          <p
            className="font-bold tracking-tighter leading-[0.85] text-[#0e0d18]"
            style={{ fontSize: "clamp(7rem, 22vw, 18rem)" }}
          >
            404
          </p>
          <p className="absolute top-1/2 left-0 -translate-y-1/2 font-mono text-[10px] text-[#6d63ff] tracking-[0.3em] uppercase">
            ◆ page not found
          </p>
        </div>

        {/* Terminal */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d17] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1e1c28]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1e1c28]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1e1c28]" />
            <span className="font-mono text-[10px] text-[#2e2c38] ml-3 tracking-wider">anand@ulaanbaatar — zsh</span>
          </div>
          <div className="px-5 py-5 font-mono text-[13px] leading-[1.9] min-h-[260px]">
            {LINES.slice(0, visible).map((line, i) => (
              <p
                key={i}
                className={
                  line.startsWith("$") ? "text-[#a09cff]"
                  : line.startsWith("→") ? "text-[#56545e]"
                  : line.startsWith("✗") ? "text-rose-400/80"
                  : "text-[#eceae3]"
                }
              >
                {line || " "}
              </p>
            ))}
            {visible < LINES.length && (
              <span className="inline-block w-2 h-4 bg-[#6d63ff] animate-pulse ml-0.5" />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="font-mono text-xs text-white bg-[#6d63ff] rounded-full px-7 py-3 font-semibold shadow-[0_0_30px_rgba(109,99,255,0.4)] hover:shadow-[0_0_40px_rgba(109,99,255,0.6)] transition-shadow duration-300"
          >
            ← Back home
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-xs text-[#56545e] border border-white/[0.08] rounded-full px-7 py-3 hover:text-[#eceae3] hover:border-white/[0.18] transition-all duration-200"
          >
            Tell me what broke →
          </Link>
        </div>
      </div>
    </main>
  );
}
