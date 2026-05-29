"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULTS, SECTION_TITLES, SectionKey, Project, TimelineEvent, Message, Photo } from "./types";
import { AdminSidebar } from "./components/AdminSidebar";
import { HeroSection } from "./sections/HeroSection";
import { NowSection } from "./sections/NowSection";
import { ContactSection } from "./sections/ContactSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TimelineSection } from "./sections/TimelineSection";
import { MemorySection } from "./sections/MemorySection";
import { InboxSection } from "./sections/InboxSection";

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
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const loadPhotos = () =>
    fetch("/api/admin/photos").then(r => r.json()).then(d => setPhotos(d.files || []));

  const loadMessages = () =>
    fetch("/api/admin/messages", { headers: { "x-admin-password": password } })
      .then(r => r.ok ? r.json() : { messages: [] })
      .then(d => setMessages(d.messages || []))
      .catch(() => {});

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
      events: timeline.map(t => ({ ...t, tags: t.tags.split(",").map(s => s.trim()).filter(Boolean) })),
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
  };

  const handleDeletePhoto = async (url: string) => {
    await fetch("/api/admin/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ url }),
    });
    loadPhotos();
  };

  const handleDeleteMessage = async (id: string) => {
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE", headers: { "x-admin-password": password } });
    loadMessages();
  };

  const handleNav = (key: SectionKey) => {
    setSection(key);
    setSidebarOpen(false);
    if (key === "inbox") loadMessages();
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
          <button type="submit" className="w-full py-3.5 rounded-full font-mono text-xs text-white bg-[#6d63ff] font-semibold hover:bg-[#5d54e6] shadow-[0_0_30px_rgba(109,99,255,0.4)] hover:shadow-[0_0_40px_rgba(109,99,255,0.6)] transition-all duration-300">
            Enter →
          </button>
          <a href="/" className="block text-center font-mono text-[10px] text-[#2e2c38] hover:text-[#56545e] transition-colors tracking-widest uppercase pt-1">
            ← Back to site
          </a>
        </motion.form>
      </div>
    );
  }

  const currentTitle = SECTION_TITLES[section];
  const sidebar = <AdminSidebar section={section} messages={messages} onNav={handleNav} />;

  return (
    <div className="min-h-screen bg-[#06060b] text-[#eceae3] relative">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[10%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(109,99,255,0.05) 0%, transparent 60%)" }} />
      </div>

      <div className="relative flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-[240px] shrink-0 border-r border-white/[0.05] bg-[#08080e]/60 backdrop-blur-sm sticky top-0 h-screen">
          {sidebar}
        </aside>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)} />
              <motion.aside
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="md:hidden fixed left-0 top-0 bottom-0 z-40 w-[260px] bg-[#08080e] border-r border-white/[0.05]"
              >
                {sidebar}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="sticky top-0 z-10 border-b border-white/[0.05] bg-[#06060b]/85 backdrop-blur-xl px-5 md:px-10 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)}
                className="md:hidden font-mono text-[#56545e] hover:text-[#eceae3] border border-white/[0.07] rounded-lg px-3 py-1.5 text-lg leading-none"
                aria-label="Open menu">≡</button>
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-[#6d63ff] tracking-[0.2em] uppercase">{currentTitle.tag}</p>
                <p className="font-mono text-[11px] text-[#56545e] truncate">{currentTitle.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <AnimatePresence>
                {saveMsg && (
                  <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    className={`font-mono text-xs ${saveMsg.startsWith("✓") ? "text-[#67e8f9]" : "text-rose-400"}`}>
                    {saveMsg}
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.button onClick={handleSave} disabled={saving} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                className="font-mono text-xs text-white bg-[#6d63ff] rounded-full px-5 py-2.5 font-semibold shadow-[0_0_25px_rgba(109,99,255,0.35)] hover:shadow-[0_0_35px_rgba(109,99,255,0.55)] transition-all duration-300 disabled:opacity-50">
                {saving ? "Saving..." : "Save →"}
              </motion.button>
            </div>
          </div>

          {/* Section content */}
          <div className="px-5 md:px-10 py-10 max-w-[900px]">
            <AnimatePresence mode="wait">
              <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}>
                {section === "hero"     && <HeroSection hero={hero} setHero={setHero} />}
                {section === "now"      && <NowSection now={now} setNow={setNow} />}
                {section === "contact"  && <ContactSection contact={contact} setContact={setContact} />}
                {section === "projects" && <ProjectsSection projects={projects} setProjects={setProjects} />}
                {section === "timeline" && <TimelineSection timeline={timeline} setTimeline={setTimeline} />}
                {section === "memory"   && (
                  <MemorySection
                    photos={photos} captions={captions} uploading={uploading}
                    onUpload={handleUpload} onDelete={handleDeletePhoto}
                    onCaption={(name, val) => setCaptions(prev => ({ ...prev, [name]: val }))}
                  />
                )}
                {section === "inbox"    && <InboxSection messages={messages} onDelete={handleDeleteMessage} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
