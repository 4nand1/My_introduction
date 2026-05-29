import { Message } from "../types";

export function InboxSection({ messages, onDelete }: {
  messages: Message[];
  onDelete: (id: string) => void;
}) {
  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
        <p className="font-mono text-[11px] text-[#2e2c38] tracking-widest uppercase mb-2">empty</p>
        <p className="font-mono text-xs text-[#56545e]">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map(m => (
        <div key={m.id} className="relative rounded-2xl border border-white/[0.07] bg-[#0d0d17] p-6 hover:border-white/[0.12] transition-colors overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6d63ff]/30 to-transparent" />
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-[#eceae3]">{m.name}</p>
              <a href={`mailto:${m.email}`} className="font-mono text-xs text-[#6d63ff]/80 hover:text-[#a09cff] transition-colors">
                {m.email}
              </a>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-[10px] text-[#2e2c38] tracking-wider">
                {new Date(m.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => onDelete(m.id)}
                className="font-mono text-[10px] text-rose-400/60 hover:text-rose-400 border border-rose-400/20 hover:border-rose-400/40 px-2 py-0.5 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="text-sm text-[#a8a5ad] whitespace-pre-wrap leading-relaxed">{m.body}</p>
        </div>
      ))}
    </div>
  );
}
