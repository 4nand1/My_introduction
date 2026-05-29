import { Field } from "../components/Field";
import { TimelineEvent } from "../types";

export function TimelineSection({ timeline, setTimeline }: {
  timeline: TimelineEvent[];
  setTimeline: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;
}) {
  const update = (i: number, key: keyof TimelineEvent, val: string) =>
    setTimeline(prev => prev.map((e, idx) => idx === i ? { ...e, [key]: val } : e));

  const add = () =>
    setTimeline(prev => [...prev, { year: "", era: "", title: "", subtitle: "", body: "", tags: "" }]);

  const remove = (i: number) =>
    setTimeline(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <p className="text-[13px] text-[#56545e] leading-relaxed mb-2 max-w-xl">
        Each event becomes one card in the Journey section. Empty list → section hides.
      </p>
      {timeline.map((e, i) => (
        <div key={i} className="relative rounded-2xl border border-white/[0.07] bg-[#0d0d17] p-7 space-y-4 overflow-hidden group hover:border-white/[0.12] transition-colors">
          <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 rounded-full bg-[#6d63ff]/[0.05] blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center justify-between relative">
            <p className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase">event {i + 1}</p>
            <button onClick={() => remove(i)} className="font-mono text-[10px] text-rose-400/60 hover:text-rose-400 border border-rose-400/20 hover:border-rose-400/40 px-3 py-1 rounded-full transition-colors tracking-wider">
              delete ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Year" value={e.year} onChange={v => update(i, "year", v)} placeholder="2025" />
            <Field label="Era (short label)" value={e.era} onChange={v => update(i, "era", v)} placeholder="Origin" />
          </div>
          <Field label="Title" value={e.title} onChange={v => update(i, "title", v)} placeholder="What happened" />
          <Field label="Subtitle" value={e.subtitle} onChange={v => update(i, "subtitle", v)} />
          <Field label="Body (in your voice)" value={e.body} onChange={v => update(i, "body", v)} textarea />
          <Field label="Tags (comma separated)" value={e.tags} onChange={v => update(i, "tags", v)} placeholder="HTML, CSS" />
        </div>
      ))}
      <button onClick={add} className="w-full py-4 border border-dashed border-white/[0.1] hover:border-[#6d63ff]/40 hover:bg-[#6d63ff]/[0.03] rounded-2xl font-mono text-xs text-[#56545e] hover:text-[#a09cff] transition-all duration-300 tracking-wider">
        + add event
      </button>
    </div>
  );
}
