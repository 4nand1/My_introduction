import { Field } from "../components/Field";
import { Project } from "../types";

export function ProjectsSection({ projects, setProjects }: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
  const update = (i: number, key: string, val: string) =>
    setProjects(prev => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));

  const add = () => {
    const id = String(projects.length + 1).padStart(2, "0");
    setProjects(prev => [...prev, { id, title: "New Project", subtitle: "project.slug", year: new Date().getFullYear().toString(), description: "", tags: "", live: "", repo: "" }]);
  };

  const remove = (i: number) =>
    setProjects(prev => prev.filter((_, idx) => idx !== i).map((p, idx) => ({ ...p, id: String(idx + 1).padStart(2, "0") })));

  return (
    <div className="space-y-5">
      {projects.map((p, i) => (
        <div key={p.id} className="relative rounded-2xl border border-white/[0.07] bg-[#0d0d17] p-7 space-y-4 overflow-hidden group hover:border-white/[0.12] transition-colors">
          <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 rounded-full bg-[#6d63ff]/[0.05] blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center justify-between relative">
            <p className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase">project {p.id}</p>
            <button onClick={() => remove(i)} className="font-mono text-[10px] text-rose-400/60 hover:text-rose-400 border border-rose-400/20 hover:border-rose-400/40 px-3 py-1 rounded-full transition-colors tracking-wider">
              delete ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 relative">
            <Field label="Title" value={p.title} onChange={v => update(i, "title", v)} />
            <Field label="Year" value={p.year} onChange={v => update(i, "year", v)} />
          </div>
          <Field label="Subtitle (slug)" value={p.subtitle} onChange={v => update(i, "subtitle", v)} />
          <Field label="Description" value={p.description} onChange={v => update(i, "description", v)} textarea />
          <Field label="Tags (comma separated)" value={p.tags} onChange={v => update(i, "tags", v)} />
          <Field label="Live URL" value={p.live} onChange={v => update(i, "live", v)} />
          <Field label="GitHub URL" value={p.repo} onChange={v => update(i, "repo", v)} />
        </div>
      ))}
      <button onClick={add} className="w-full py-4 border border-dashed border-white/[0.1] hover:border-[#6d63ff]/40 hover:bg-[#6d63ff]/[0.03] rounded-2xl font-mono text-xs text-[#56545e] hover:text-[#a09cff] transition-all duration-300 tracking-wider">
        + add project
      </button>
    </div>
  );
}
