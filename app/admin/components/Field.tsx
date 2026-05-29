export function Field({ label, value, onChange, textarea = false, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string;
}) {
  const base = "w-full bg-white/[0.02] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-[#eceae3] placeholder:text-[#2e2c38] focus:outline-none focus:border-[#6d63ff]/40 transition-colors font-mono";
  return (
    <div>
      <label className="block text-[10px] font-mono text-[#56545e] mb-2 tracking-[0.18em] uppercase">{label}</label>
      {textarea
        ? <textarea rows={3} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className={`${base} resize-none leading-relaxed`} />
        : <input value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className={base} />}
    </div>
  );
}
