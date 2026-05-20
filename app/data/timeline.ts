export interface TimelineEvent {
  year: string;
  era: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
}

export const events: TimelineEvent[] = [
  {
    year: "2019",
    era: "The Beginning",
    title: "First Lines of Code",
    subtitle: "HTML & CSS",
    body: "Started tinkering out of curiosity. Built my first webpage — a disaster, but a start. Realized there was a whole world behind the screen.",
    tags: ["HTML", "CSS"],
  },
  {
    year: "2021",
    era: "The Arena",
    title: "Competitive Gaming",
    subtitle: "Diamond Rank",
    body: "Reached Diamond rank in competitive play. Learned to stay calm under pressure and make fast, precise decisions. Transferred this mindset to everything since.",
    tags: ["Strategy", "Focus", "Pressure"],
  },
  {
    year: "2023",
    era: "The Catalyst",
    title: "JavaScript Clicked",
    subtitle: "Logic over markup",
    body: "Discovered JavaScript and realized coding was more than just markup. Spent months learning through projects, not tutorials. Something changed.",
    tags: ["JavaScript", "Projects"],
  },
  {
    year: "2024",
    era: "Going Full-Stack",
    title: "First Production App",
    subtitle: "Next.js + PostgreSQL",
    body: "Learned Next.js, built my first full-stack app with a real database. Shipped to production for the first time. Addicting feeling.",
    tags: ["Next.js", "PostgreSQL", "Vercel"],
  },
  {
    year: "2025",
    era: "Structured Growth",
    title: "Enrolled in Academy",
    subtitle: "Algorithms & System Design",
    body: "Joined a structured program to sharpen fundamentals — algorithms, system design, and collaborative development.",
    tags: ["DSA", "System Design", "Teamwork"],
  },
  {
    year: "2026",
    era: "Building Independently",
    title: "Independent Products",
    subtitle: "Real problems, real users",
    body: "Launching products independently. Focused on solving real problems and building a client base. This is where it gets interesting.",
    tags: ["Freelance", "Products", "Clients"],
  },
];
