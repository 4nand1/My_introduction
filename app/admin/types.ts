export type TimelineEvent = { year: string; era: string; title: string; subtitle: string; body: string; tags: string };
export type Project = { id: string; title: string; subtitle: string; year: string; description: string; tags: string; live: string; repo: string };
export type Message = { id: string; name: string; email: string; body: string; createdAt: string; read: boolean };
export type Photo = { name: string; url: string };
export type SectionKey = "hero" | "now" | "contact" | "projects" | "timeline" | "memory" | "inbox";

export const DEFAULTS = {
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

export const NAV_GROUPS: { label: string; items: { key: SectionKey; label: string; hint?: string }[] }[] = [
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

export const SECTION_TITLES: Record<SectionKey, { tag: string; subtitle: string }> = {
  hero:     { tag: "/hero",     subtitle: "edit the top of your page" },
  now:      { tag: "/now",      subtitle: "what you're doing right now" },
  contact:  { tag: "/contact",  subtitle: "links + blurb" },
  projects: { tag: "/work",     subtitle: "selected projects" },
  timeline: { tag: "/journey",  subtitle: "your story, in events" },
  memory:   { tag: "/memory",   subtitle: "photos + captions" },
  inbox:    { tag: "/inbox",    subtitle: "messages from the contact form" },
};
