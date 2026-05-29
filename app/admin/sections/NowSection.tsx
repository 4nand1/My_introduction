import { Field } from "../components/Field";
import { DEFAULTS } from "../types";

type Now = typeof DEFAULTS.now;

export function NowSection({ now, setNow }: { now: Now; setNow: React.Dispatch<React.SetStateAction<Now>> }) {
  return (
    <div className="space-y-4">
      <p className="text-[13px] text-[#56545e] leading-relaxed mb-4 max-w-xl">
        Snapshot of what you&apos;re doing. All fields empty → section hides itself.
      </p>
      <Field label="Building" value={now.building} onChange={v => setNow(n => ({ ...n, building: v }))} textarea placeholder="What project are you working on?" />
      <Field label="Playing"  value={now.playing}  onChange={v => setNow(n => ({ ...n, playing: v }))} placeholder="Game + rank (if any)" />
      <Field label="Learning" value={now.learning} onChange={v => setNow(n => ({ ...n, learning: v }))} placeholder="What are you studying?" />
      <Field label="Reading"  value={now.reading}  onChange={v => setNow(n => ({ ...n, reading: v }))} placeholder="Book / blog / paper" />
      <Field label="Updated"  value={now.updated}  onChange={v => setNow(n => ({ ...n, updated: v }))} placeholder="YYYY-MM-DD" />
    </div>
  );
}
