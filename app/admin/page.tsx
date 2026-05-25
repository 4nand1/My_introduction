"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type TimelineEvent = { year: string; era: string; title: string; subtitle: string; body: string; tags: string };
type Project = { id: string; title: string; subtitle: string; year: string; description: string; tags: string; live: string; repo: string };
type Message = { id: string; name: string; email: string; body: string; createdAt: string; read: boolean };

const DEFAULTS = {
  hero: {
    name: "", cyrillic: "", title: "",
    bio: "", tagline: "", location: "", coords: "",
    stat1Value: "", stat1Label: "",
    stat2Value: "", stat2Label: "",
  },
  contact: { email: "", github: "", linkedin: "", blurb: "" },
  now: { building: "", playing: "", learning: "", reading: "", updated: "" },
  projects: [] as Project[],
  timeline: [] as TimelineEvent[],
};

type SectionKey = "hero" | "now" | "contact" | "projects" | "timeline" | "memory" | "inbox";

const NAV_GROUPS: { label: string; items: { key: SectionKey; label: string; hint?: string }[] }[] = [
  {
    label: "Page",
    items: [
      { key: "hero",    label: "Hero",    hint: "name · bio · tagline" },
      { key: "now",     label: "/now",    hint: "current snapshot" },
      { key: "contact", label: "Contact", hint: "links + blurb" },
    ],
  },
  {
    label: "Lists",
    items: [
      { key: "projects", label: "Projects", hint: "selected work" },
      { key: "timeline", label: "Timeline", hint: "journey events" },
      { key: "memory",   label: "Memory",   hint: "photo grid" },
    ],
  },
  {
    label: "Inbox",
    items: [
      { key: "inbox", label: "Messages", hint: "received via form" },
    ],
  },
];

const SECTION_TITLES: Record<SectionKey, { tag: string; subtitle: string }> = {
  hero:     { tag: "/hero",     subtitle: "edit the top of your page" },
  now:      { tag: "/now",      subtitle: "what you're doing right now" },
  contact:  { tag: "/contact",  subtitle: "links + blurb" },
  projects: { tag: "/work",     subtitle: "selected projects" },
  timeline: { tag: "/journey",  subtitle: "your story, in events" },
  memory:   { tag: "/memory",   subtitle: "photos + captions" },
  inbox:    { tag: "/inbox",    subtitle: "messages from the contact form" },
};

function Field({ label, value, onChange, textarea = false, placeholder }: {
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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [section, setSection] = useState<SectionKey>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hero, setHero] = useState(DEFAULTS.hero);
  const [contact, setContact] = useState(DEFAULTS.contact);
  const [now, setNow] = useState(DEFAULTS.now);
  const [projects, setProjects] = useState<Project[]>(DEFAULTS.projects);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(DEFAULTS.timeline);
  const [messages, setMessages] = useState<Message[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/admin").then(r => r.json()).then(data => {
      if (data.hero)     setHero(h => ({ ...h, ...data.hero }));
      if (data.contact)  setContact(c => ({ ...c, ...data.contact }));
      if (data.now)      setNow(n => ({ ...n, ...data.now }));
      if (data.projects) setProjects(data.projects);
      if (data.timeline?.events) {
        setTimeline(data.timeline.events.map((e: { tags?: string | string[] } & TimelineEvent) => ({
          ...e,
          tags: Array.isArray(e.tags) ? e.tags.join(", ") : (e.tags || ""),
        })));
      }
      if (data.memoryCaptions) setCaptions(data.memoryCaptions);
    }).catch(() => {});
    loadPhotos();
    loadMessages();
  }, [authed]);

  const loadPhotos = () => {
    fetch("/api/admin/photos").then(r => r.json()).then(d => setPhotos(d.files || []));
  };

  const loadMessages = () => {
    fetch("/api/admin/messages", { headers: { "x-admin-password": password } })
      .then(r => r.ok ? r.json() : { messages: [] })
      .then(d => setMessages(d.messages || []))
      .catch(() => {});
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
    const timelineForSave = {
      events: timeline.map(t => ({
        ...t,
        tags: t.tags.split(",").map(s => s.trim()).filter(Boolean),
      })),
    };
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, content: { hero, contact, now, projects, timeline: timelineForSave, memoryCaptions: captions } }),
    });
    const data = await res.json();
    setSaving(false);
    setSaveMsg(res.ok ? "✓ Saved" : `✗ ${data.error}`);
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

  const updateEvent = (i: number, key: keyof TimelineEvent, val: string) =>
    setTimeline(prev => prev.map((e, idx) => idx === i ? { ...e, [key]: val } : e));

  const addEvent = () =>
    setTimeline(prev => [...prev, { year: "", era: "", title: "", subtitle: "", body: "", tags: "" }]);

  const deleteEvent = (i: number) =>
    setTimeline(prev => prev.filter((_, idx) => idx !== i));

  const deleteMessage = async (id: string) => {
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE", headers: { "x-admin-password": password } });
    loadMessages();
  };

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

  // ── Login screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#06060b] text-[#eceae3] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(109,99,255,0.08) 0%, transparent 65%)" }} />
        </div>
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleLogin}
          className="relative w-full max-w-sm space-y-5 border border-white/[0.07] rounded-3xl p-9 bg-[#0d0d17] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6d63ff]/50 to-transparent rounded-t-3xl" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute w-2 h-2 rounded-full bg-[#6d63ff] pulse-dot" />
                <span className="w-2 h-2 rounded-full bg-[#6d63ff]" />
              </span>
              <p className="font-mono text-[#6d63ff] text-[10px] tracking-[0.25em] uppercase">/admin</p>
            </div>
            <h1 className="text-2xl font-bold text-[#eceae3] tracking-tight">Dashboard</h1>
            <p className="text-[#56545e] text-xs mt-2 font-mono">Enter your password to continue.</p>
          </div>
          <div>
            <input
              type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-[#eceae3] placeholder:text-[#2e2c38] focus:outline-none focus:border-[#6d63ff]/40 transition-colors font-mono"
            />
            {authError && <p className="text-rose-400/80 text-xs mt-2 font-mono">✗ {authError}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-full font-mono text-xs text-white bg-[#6d63ff] font-semibold hover:bg-[#5d54e6] shadow-[0_0_30px_rgba(109,99,255,0.4)] hover:shadow-[0_0_40px_rgba(109,99,255,0.6)] transition-all duration-300"
          >
            Enter →
          </button>
          <a href="/" className="block text-center font-mono text-[10px] text-[#2e2c38] hover:text-[#56545e] transition-colors tracking-widest uppercase pt-1">
            ← Back to site
          </a>
        </motion.form>
      </div>
    );
  }

  const handleNav = (key: SectionKey) => {
    setSection(key);
    setSidebarOpen(false);
    if (key === "inbox") loadMessages();
  };

  const currentTitle = SECTION_TITLES[section];

  // Sidebar — shared between desktop (fixed) and mobile (drawer)
  const Sidebar = (
    <div className="h-full flex flex-col">
      {/* Brand */}
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

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto space-y-7">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-2 font-mono text-[10px] text-[#2e2c38] tracking-[0.22em] uppercase">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = section === item.key;
                const inboxCount = item.key === "inbox" ? messages.length : 0;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNav(item.key)}
                    className={`relative w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      active
                        ? "bg-[#6d63ff]/[0.1] text-[#eceae3]"
                        : "text-[#56545e] hover:text-[#eceae3] hover:bg-white/[0.02]"
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

      {/* Footer */}
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

  return (
    <div className="min-h-screen bg-[#06060b] text-[#eceae3] relative">
      {/* Background orb */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[10%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,99,255,0.05) 0%, transparent 60%)" }} />
      </div>

      <div className="relative flex min-h-screen">

        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-[240px] shrink-0 border-r border-white/[0.05] bg-[#08080e]/60 backdrop-blur-sm sticky top-0 h-screen">
          {Sidebar}
        </aside>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="md:hidden fixed left-0 top-0 bottom-0 z-40 w-[260px] bg-[#08080e] border-r border-white/[0.05]"
              >
                {Sidebar}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <main className="flex-1 min-w-0">

          {/* Sticky top bar */}
          <div className="sticky top-0 z-10 border-b border-white/[0.05] bg-[#06060b]/85 backdrop-blur-xl px-5 md:px-10 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden font-mono text-[#56545e] hover:text-[#eceae3] border border-white/[0.07] rounded-lg px-3 py-1.5 text-lg leading-none"
                aria-label="Open menu"
              >
                ≡
              </button>
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase">{currentTitle.tag}</p>
                <p className="font-mono text-[11px] text-[#56545e] truncate">{currentTitle.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <AnimatePresence>
                {saveMsg && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`font-mono text-xs ${saveMsg.startsWith("✓") ? "text-[#67e8f9]" : "text-rose-400"}`}
                  >
                    {saveMsg}
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.button
                onClick={handleSave}
                disabled={saving}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="font-mono text-xs text-white bg-[#6d63ff] rounded-full px-5 py-2.5 font-semibold shadow-[0_0_25px_rgba(109,99,255,0.35)] hover:shadow-[0_0_35px_rgba(109,99,255,0.55)] transition-all duration-300 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save →"}
              </motion.button>
            </div>
          </div>

          {/* Section content */}
          <div className="px-5 md:px-10 py-10 max-w-[900px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >

                {/* Hero */}
                {section === "hero" && (
                  <div className="space-y-4">
                    <Field label="Name (Latin)" value={hero.name} onChange={v => setHero(h => ({ ...h, name: v }))} placeholder="Anand" />
                    <Field label="Name (Cyrillic — Mongolian)" value={hero.cyrillic} onChange={v => setHero(h => ({ ...h, cyrillic: v }))} placeholder="Анан · leave empty to hide" />
                    <Field label="Title" value={hero.title} onChange={v => setHero(h => ({ ...h, title: v }))} placeholder="Full-Stack Developer" />
                    <Field label="Bio (your own words)" value={hero.bio} onChange={v => setHero(h => ({ ...h, bio: v }))} textarea placeholder="Empty = hidden" />
                    <Field label="Tagline / quote" value={hero.tagline} onChange={v => setHero(h => ({ ...h, tagline: v }))} placeholder="Empty = hidden" />
                    <Field label="Location" value={hero.location} onChange={v => setHero(h => ({ ...h, location: v }))} placeholder="Ulaanbaatar" />
                    <Field label="Coordinates" value={hero.coords} onChange={v => setHero(h => ({ ...h, coords: v }))} placeholder="47.9°N · 106.9°E" />
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <Field label="Stat 1 value" value={hero.stat1Value} onChange={v => setHero(h => ({ ...h, stat1Value: v }))} />
                      <Field label="Stat 1 label" value={hero.stat1Label} onChange={v => setHero(h => ({ ...h, stat1Label: v }))} />
                      <Field label="Stat 2 value" value={hero.stat2Value} onChange={v => setHero(h => ({ ...h, stat2Value: v }))} />
                      <Field label="Stat 2 label" value={hero.stat2Label} onChange={v => setHero(h => ({ ...h, stat2Label: v }))} />
                    </div>
                  </div>
                )}

                {/* /now */}
                {section === "now" && (
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
                )}

                {/* Contact */}
                {section === "contact" && (
                  <div className="space-y-4">
                    <Field label="Email" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} />
                    <Field label="GitHub URL" value={contact.github} onChange={v => setContact(c => ({ ...c, github: v }))} />
                    <Field label="LinkedIn URL" value={contact.linkedin} onChange={v => setContact(c => ({ ...c, linkedin: v }))} />
                    <Field label="Contact blurb (your voice — empty = hidden)" value={contact.blurb} onChange={v => setContact(c => ({ ...c, blurb: v }))} textarea />
                  </div>
                )}

                {/* Projects */}
                {section === "projects" && (
                  <div className="space-y-5">
                    {projects.map((p, i) => (
                      <div key={p.id} className="relative rounded-2xl border border-white/[0.07] bg-[#0d0d17] p-7 space-y-4 overflow-hidden group hover:border-white/[0.12] transition-colors">
                        <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 rounded-full bg-[#6d63ff]/[0.05] blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex items-center justify-between relative">
                          <p className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase">project {p.id}</p>
                          <button onClick={() => deleteProject(i)}
                            className="font-mono text-[10px] text-rose-400/60 hover:text-rose-400 border border-rose-400/20 hover:border-rose-400/40 px-3 py-1 rounded-full transition-colors tracking-wider">
                            delete ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 relative">
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
                      className="w-full py-4 border border-dashed border-white/[0.1] hover:border-[#6d63ff]/40 hover:bg-[#6d63ff]/[0.03] rounded-2xl font-mono text-xs text-[#56545e] hover:text-[#a09cff] transition-all duration-300 tracking-wider">
                      + add project
                    </button>
                  </div>
                )}

                {/* Timeline */}
                {section === "timeline" && (
                  <div className="space-y-5">
                    <p className="text-[13px] text-[#56545e] leading-relaxed mb-2 max-w-xl">
                      Each event becomes one card in the Journey section. Empty list → section hides.
                    </p>
                    {timeline.map((e, i) => (
                      <div key={i} className="relative rounded-2xl border border-white/[0.07] bg-[#0d0d17] p-7 space-y-4 overflow-hidden group hover:border-white/[0.12] transition-colors">
                        <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 rounded-full bg-[#6d63ff]/[0.05] blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex items-center justify-between relative">
                          <p className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase">event {i + 1}</p>
                          <button onClick={() => deleteEvent(i)}
                            className="font-mono text-[10px] text-rose-400/60 hover:text-rose-400 border border-rose-400/20 hover:border-rose-400/40 px-3 py-1 rounded-full transition-colors tracking-wider">
                            delete ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Year" value={e.year} onChange={v => updateEvent(i, "year", v)} placeholder="2020" />
                          <Field label="Era (short label)" value={e.era} onChange={v => updateEvent(i, "era", v)} placeholder="Origin" />
                        </div>
                        <Field label="Title" value={e.title} onChange={v => updateEvent(i, "title", v)} placeholder="What happened" />
                        <Field label="Subtitle" value={e.subtitle} onChange={v => updateEvent(i, "subtitle", v)} />
                        <Field label="Body (in your voice)" value={e.body} onChange={v => updateEvent(i, "body", v)} textarea />
                        <Field label="Tags (comma separated)" value={e.tags} onChange={v => updateEvent(i, "tags", v)} placeholder="HTML, CSS" />
                      </div>
                    ))}
                    <button onClick={addEvent}
                      className="w-full py-4 border border-dashed border-white/[0.1] hover:border-[#6d63ff]/40 hover:bg-[#6d63ff]/[0.03] rounded-2xl font-mono text-xs text-[#56545e] hover:text-[#a09cff] transition-all duration-300 tracking-wider">
                      + add event
                    </button>
                  </div>
                )}

                {/* Memory */}
                {section === "memory" && (
                  <div>
                    <div
                      className="border border-dashed border-white/[0.1] hover:border-[#6d63ff]/40 hover:bg-[#6d63ff]/[0.03] rounded-2xl p-10 text-center transition-colors cursor-pointer mb-8"
                      onClick={() => fileRef.current?.click()}
                    >
                      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-2xl text-[#6d63ff]/40">↑</span>
                        <p className="font-mono text-xs text-[#56545e] tracking-wider">
                          {uploading ? "uploading..." : "click to upload photos"}
                        </p>
                        <p className="font-mono text-[10px] text-[#2e2c38] tracking-wider">JPG · PNG · WEBP · multi-select</p>
                      </div>
                    </div>

                    {photos.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {photos.map((file) => (
                          <div key={file} className="group rounded-xl overflow-hidden border border-white/[0.07] bg-[#0d0d17]">
                            <div className="relative aspect-square">
                              <Image src={`/memories/${file}`} alt={file} fill className="object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button onClick={() => handleDeletePhoto(file)}
                                  className="font-mono text-[11px] text-rose-400 border border-rose-400/40 px-4 py-1.5 rounded-full hover:bg-rose-400/10 transition-colors tracking-wider">
                                  delete
                                </button>
                              </div>
                              <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#eceae3]/50 bg-black/50 px-1.5 py-0.5 rounded tracking-wider">{file}</span>
                            </div>
                            <div className="px-2 py-2">
                              <input
                                type="text"
                                placeholder="add a caption..."
                                value={captions[file] || ""}
                                onChange={e => setCaptions(prev => ({ ...prev, [file]: e.target.value }))}
                                className="w-full bg-transparent border border-white/[0.05] focus:border-[#6d63ff]/30 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-[#a8a5ad] placeholder:text-[#2e2c38] focus:outline-none transition-colors"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/[0.08] py-12 text-center">
                        <p className="font-mono text-[11px] text-[#56545e] tracking-wider">No photos yet — upload some above.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Inbox */}
                {section === "inbox" && (
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
                        <p className="font-mono text-[11px] text-[#2e2c38] tracking-widest uppercase mb-2">empty</p>
                        <p className="font-mono text-xs text-[#56545e]">No messages yet.</p>
                      </div>
                    ) : messages.map(m => (
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
                            <button onClick={() => deleteMessage(m.id)}
                              className="font-mono text-[10px] text-rose-400/60 hover:text-rose-400 border border-rose-400/20 hover:border-rose-400/40 px-2 py-0.5 rounded-full transition-colors">
                              ✕
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-[#a8a5ad] whitespace-pre-wrap leading-relaxed">{m.body}</p>
                      </div>
                    ))}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
