"use client";

import { motion } from "framer-motion";
import { NAV_GROUPS, SectionKey } from "../types";

export function AdminSidebar({ section, messages, onNav }: {
  section: SectionKey;
  messages: { id: string }[];
  onNav: (key: SectionKey) => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 border-b border-white/[0.05]">
        <a href="#" className="font-mono text-sm font-bold text-[#eceae3] hover:text-[#6d63ff] transition-colors duration-300 inline-block">
          anand<span className="text-[#6d63ff]">.</span>
        </a>
        <div className="flex items-center gap-2 mt-2">
          <span className="relative flex items-center justify-center w-1.5 h-1.5">
            <span className="absolute w-1.5 h-1.5 rounded-full bg-[#6d63ff] pulse-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#6d63ff]" />
          </span>
          <span className="font-mono text-[10px] text-[#56545e] tracking-[0.2em] uppercase">/admin</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 overflow-y-auto space-y-7">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-2 font-mono text-[10px] text-[#2e2c38] tracking-[0.22em] uppercase">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = section === item.key;
                const inboxCount = item.key === "inbox" ? messages.length : 0;
                return (
                  <button
                    key={item.key}
                    onClick={() => onNav(item.key)}
                    className={`relative w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      active ? "bg-[#6d63ff]/[0.1] text-[#eceae3]" : "text-[#56545e] hover:text-[#eceae3] hover:bg-white/[0.02]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-pin"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#6d63ff] rounded-full"
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[13px]">{item.label}</span>
                      {inboxCount > 0 && (
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                          active ? "bg-[#6d63ff]/30 text-[#a09cff]" : "bg-white/[0.05] text-[#56545e]"
                        }`}>
                          {inboxCount}
                        </span>
                      )}
                    </div>
                    {item.hint && (
                      <p className={`font-mono text-[10px] mt-0.5 transition-colors ${
                        active ? "text-[#56545e]" : "text-[#2e2c38] group-hover:text-[#56545e]"
                      }`}>
                        {item.hint}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-5 py-5 border-t border-white/[0.05] space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center font-mono text-[11px] text-[#56545e] border border-white/[0.07] rounded-full px-4 py-2 hover:text-[#eceae3] hover:border-white/[0.18] transition-all duration-200"
        >
          View site ↗
        </a>
        <p className="font-mono text-[9px] text-[#1e1c28] text-center tracking-widest">
          built in <span className="text-[#2e2c38]">Улаанбаатар</span>
        </p>
      </div>
    </div>
  );
}
