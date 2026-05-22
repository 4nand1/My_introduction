"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULTS = {
  hero: {
    name: "", title: "",
    bio: "", tagline: "", location: "",
    stat1Value: "", stat1Label: "",
    stat2Value: "", stat2Label: "",
    stat3Value: "", stat3Label: "",
  },
  contact: {
    email: "",
    github: "",
    linkedin: "",
  },
  projects: [] as { id: string; title: string; subtitle: string; year: string; description: string; tags: string; live: string; repo: string }[],
};

type Tab = "hero" | "projects" | "contact" | "memory";
type Project = typeof DEFAULTS.projects[number];

function Field({ label, value, onChange, textarea = false }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean;
}) {
  const base = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-lime-400/40 transition-colors font-mono";
  return (
    <div>
      <label className="block text-[10px] font-mono text-neutral-600 mb-1.5 tracking-[0.15em] uppercase">{label}</label>
      {textarea
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} className={`${base} resize-none`} />
        : <input value={value} onChange={e => onChange(e.target.value)} className={base} />}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("hero");
  const [hero, setHero] = useState(DEFAULTS.hero);
  const [contact, setContact] = useState(DEFAULTS.contact);
  const [projects, setProjects] = useState<Project[]>(DEFAULTS.projects);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/admin").then(r => r.json()).then(data => {
      if (data.hero)           setHero(h => ({ ...h, ...data.hero }));
      if (data.contact)        setContact(c => ({ ...c, ...data.contact }));
      if (data.projects)       setProjects(data.projects);
      if (data.memoryCaptions) setCaptions(data.memoryCaptions);
    }).catch(() => {});
    loadPhotos();
  }, [authed]);

  const loadPhotos = () => {
    fetch("/api/admin/photos").then(r => r.json()).then(d => setPhotos(d.files || []));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, content: {} }),
    });
    if (res.ok) { setAuthed(true); setAuthError(""); }
    else setAuthError("Wrong password.");
  };

  const handleSave = async () => {
    setSaving(true); setSaveMsg("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, content: { hero, contact, projects, memoryCaptions: captions } }),
    });
    const data = await res.json();
    setSaving(false);
    setSaveMsg(res.ok ? "✓ Saved — changes are live." : `✗ ${data.error}`);
    setTimeout(() => setSaveMsg(""), 4000);
  };

  const updateProject = (i: number, key: string, val: string) =>
    setProjects(prev => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));

  const addProject = () => {
    const id = String(projects.length + 1).padStart(2, "0");
    setProjects(prev => [...prev, { id, title: "New Project", subtitle: "project.slug", year: new Date().getFullYear().toString(), description: "", tags: "", live: "", repo: "" }]);
  };

  const deleteProject = (i: number) =>
    setProjects(prev => prev.filter((_, idx) => idx !== i).map((p, idx) => ({ ...p, id: String(idx + 1).padStart(2, "0") })));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      await fetch("/api/admin/photos", { method: "POST", headers: { "x-admin-password": password }, body: fd });
    }
    loadPhotos();
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDeletePhoto = async (filename: string) => {
    await fetch("/api/admin/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ filename }),
    });
    loadPhotos();
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 border border-white/[0.08] rounded-2xl p-8 bg-white/[0.02]"
        >
          <div>
            <p className="font-mono text-lime-400/60 text-xs tracking-[0.18em] mb-1">// ADMIN</p>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-neutral-600 text-xs mt-1 font-mono">Enter your password to continue.</p>
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-lime-400/40 transition-colors" />
            {authError && <p className="text-red-400/80 text-xs mt-1.5 font-mono">{authError}</p>}
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-lime-400 text-black font-bold text-sm hover:bg-lime-300 transition-colors">Enter →</button>
        </motion.form>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "hero", label: "Hero" },
    { key: "projects", label: "Projects" },
    { key: "contact", label: "Contact" },
    { key: "memory", label: "Memory" },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0f] text-neutral-200">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/[0.07] bg-[#0c0c0f]/95 backdrop-blur-2xl px-6 md:px-12 py-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-lime-400/60 text-xs tracking-[0.18em]">// ADMIN</p>
          <h1 className="text-lg font-bold text-white">Edit Portfolio</h1>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {saveMsg && (
              <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className={`text-xs font-mono ${saveMsg.startsWith("✓") ? "text-lime-400" : "text-red-400"}`}>
                {saveMsg}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button onClick={handleSave} disabled={saving} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-full bg-lime-400 text-black text-sm font-bold hover:bg-lime-300 transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
            {saving ? "Saving..." : "Save →"}
          </motion.button>
          <a href="/" className="text-xs font-mono text-neutral-600 hover:text-neutral-400 transition-colors border border-white/[0.07] px-3 py-2 rounded-lg">← Site</a>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 md:px-12 py-4 flex gap-2 border-b border-white/[0.05]">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all ${tab === t.key ? "bg-white/[0.08] text-white border border-white/[0.12]" : "text-neutral-600 hover:text-neutral-400"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-6 md:px-12 py-8 max-w-3xl">

        {/* ── Hero ── */}
        {tab === "hero" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Field label="Name" value={hero.name} onChange={v => setHero(h => ({ ...h, name: v }))} />
            <Field label="Title" value={hero.title} onChange={v => setHero(h => ({ ...h, title: v }))} />
            <Field label="Bio" value={hero.bio} onChange={v => setHero(h => ({ ...h, bio: v }))} textarea />
            <Field label="Tagline" value={hero.tagline} onChange={v => setHero(h => ({ ...h, tagline: v }))} />
            <Field label="Location" value={hero.location} onChange={v => setHero(h => ({ ...h, location: v }))} />
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Field label="Stat 1 value" value={hero.stat1Value} onChange={v => setHero(h => ({ ...h, stat1Value: v }))} />
              <Field label="Stat 1 label" value={hero.stat1Label} onChange={v => setHero(h => ({ ...h, stat1Label: v }))} />
              <Field label="Stat 2 value" value={hero.stat2Value} onChange={v => setHero(h => ({ ...h, stat2Value: v }))} />
              <Field label="Stat 2 label" value={hero.stat2Label} onChange={v => setHero(h => ({ ...h, stat2Label: v }))} />
              <Field label="Stat 3 value" value={hero.stat3Value} onChange={v => setHero(h => ({ ...h, stat3Value: v }))} />
              <Field label="Stat 3 label" value={hero.stat3Label} onChange={v => setHero(h => ({ ...h, stat3Label: v }))} />
            </div>
          </motion.div>
        )}

        {/* ── Projects ── */}
        {tab === "projects" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            {projects.map((p, i) => (
              <div key={p.id} className="border border-white/[0.07] rounded-2xl p-6 space-y-3 bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-mono text-lime-400/60 tracking-[0.15em]">PROJECT {p.id}</p>
                  <button onClick={() => deleteProject(i)}
                    className="text-xs font-mono text-red-400/60 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 px-3 py-1 rounded-lg transition-colors">
                    Delete ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Title" value={p.title} onChange={v => updateProject(i, "title", v)} />
                  <Field label="Year" value={p.year} onChange={v => updateProject(i, "year", v)} />
                </div>
                <Field label="Subtitle (slug)" value={p.subtitle} onChange={v => updateProject(i, "subtitle", v)} />
                <Field label="Description" value={p.description} onChange={v => updateProject(i, "description", v)} textarea />
                <Field label="Tags (comma separated)" value={p.tags} onChange={v => updateProject(i, "tags", v)} />
                <Field label="Live URL" value={p.live} onChange={v => updateProject(i, "live", v)} />
                <Field label="GitHub URL" value={p.repo} onChange={v => updateProject(i, "repo", v)} />
              </div>
            ))}
            <button onClick={addProject}
              className="w-full py-3 border border-dashed border-white/[0.1] hover:border-lime-400/30 rounded-2xl text-sm font-mono text-neutral-600 hover:text-lime-400 transition-colors">
              + Add Project
            </button>
          </motion.div>
        )}

        {/* ── Contact ── */}
        {tab === "contact" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Field label="Email" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} />
            <Field label="GitHub URL" value={contact.github} onChange={v => setContact(c => ({ ...c, github: v }))} />
            <Field label="LinkedIn URL" value={contact.linkedin} onChange={v => setContact(c => ({ ...c, linkedin: v }))} />
          </motion.div>
        )}

        {/* ── Memory ── */}
        {tab === "memory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Upload */}
            <div className="border border-dashed border-white/[0.1] hover:border-lime-400/30 rounded-2xl p-8 text-center transition-colors cursor-pointer"
              onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm font-mono text-neutral-600">
                  {uploading ? "Uploading..." : "Click to upload photos"}
                </p>
                <p className="text-xs font-mono text-neutral-800">JPG, PNG, WEBP — multiple allowed</p>
              </div>
            </div>

            {/* Photo grid */}
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((file) => (
                  <div key={file} className="group rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.03]">
                    {/* image with delete overlay */}
                    <div className="relative aspect-square">
                      <Image src={`/memories/${file}`} alt={file} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button onClick={() => handleDeletePhoto(file)}
                          className="text-xs font-mono text-red-400 border border-red-400/40 px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition-colors">
                          Delete
                        </button>
                      </div>
                      <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white/40 bg-black/40 px-1.5 py-0.5 rounded">{file}</span>
                    </div>
                    {/* caption input */}
                    <div className="px-2 py-2">
                      <input
                        type="text"
                        placeholder="Add a caption..."
                        value={captions[file] || ""}
                        onChange={e => setCaptions(prev => ({ ...prev, [file]: e.target.value }))}
                        className="w-full bg-transparent border border-white/[0.06] focus:border-lime-400/30 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-neutral-400 placeholder:text-neutral-700 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-700 text-xs font-mono py-8">No photos yet — upload some above.</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
