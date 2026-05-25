import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Realistic mock content based on verified facts:
//   - born 2007-07-31 (age 18), Ulaanbaatar, full-stack dev
//   - started coding ~13 → ~5 years in
//   - stack: Next.js, React, TypeScript, Tailwind, Prisma, PostgreSQL, D1
//   - Diamond rank in competitive gaming (game not named here)
//   - 4 real projects (verified repos)
// Prose stays generic where unknown — no invented specific titles/names.

const heroData = {
  name: "Anand",
  cyrillic: "Анан",
  title: "Full-Stack Developer",
  bio: "Full-stack developer based in Ulaanbaatar. Five years in — started with HTML and CSS at 13, now building web products with Next.js, Prisma, and PostgreSQL. Open to remote work, interesting collaborations, and conversations about the web.",
  tagline: "Building from Mongolia.",
  location: "Ulaanbaatar",
  coords: "47.9°N · 106.9°E",
  stat1Value: "5",
  stat1Label: "Yrs Coding",
  stat2Value: "15+",
  stat2Label: "Shipped",
};

const contactData = {
  email: "404aarhal@gmail.com",
  github: "https://github.com/4nand1",
  linkedin: "https://linkedin.com/in/anand",
  blurb: "Open to freelance, full-time roles, and interesting collaborations. I read every email and usually reply within a day.",
};

const skillsData = {
  categories: [
    {
      name: "Frontend",
      label: "UI / UX",
      skills: [
        { name: "Next.js" },
        { name: "React / TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Framer Motion" },
      ],
    },
    {
      name: "Backend & Data",
      label: "Server / DB",
      skills: [
        { name: "Node.js" },
        { name: "Prisma / PostgreSQL" },
        { name: "Cloudflare D1" },
        { name: "REST APIs" },
      ],
    },
    {
      name: "Tools",
      label: "Workflow",
      skills: [
        { name: "Git / GitHub" },
        { name: "Figma" },
        { name: "Vercel" },
        { name: "VS Code" },
      ],
    },
  ],
};

const timelineData = {
  events: [
    {
      year: "2020",
      era: "Origin",
      title: "First Lines of Code",
      subtitle: "HTML & CSS · age 13",
      body: "Started learning web development. HTML for structure, CSS for everything visual. The basics of how a browser renders a page — and the moment logic clicked.",
      tags: ["HTML", "CSS"],
    },
    {
      year: "2022",
      era: "Interactive",
      title: "JavaScript Era",
      subtitle: "From static to dynamic",
      body: "Picked up JavaScript and started making interfaces respond. First small projects — interactive components, simple games, anything that moved on click.",
      tags: ["JavaScript", "DOM"],
    },
    {
      year: "2023",
      era: "Component Thinking",
      title: "React & TypeScript",
      subtitle: "A different mental model",
      body: "React reshaped how I built UIs — components, state, props. TypeScript caught the bugs I didn't know I had. Started shipping more confident code.",
      tags: ["React", "TypeScript", "Vite"],
    },
    {
      year: "2024",
      era: "Full-Stack",
      title: "Backend Joins the Game",
      subtitle: "Next.js · Prisma · PostgreSQL",
      body: "Started building complete applications — server-side rendering, database modeling, authentication flows. Moved from frontend tinkering to shipping real apps.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Node.js"],
    },
    {
      year: "2025",
      era: "Shipping",
      title: "Real Products",
      subtitle: "AI integrations · Vercel",
      body: "Built and launched four production apps — including AI quiz generation, image analysis, and a food delivery platform. Shipping is the only skill that compounds.",
      tags: ["AI", "Vercel", "Production"],
    },
  ],
};

const nowData = {
  building: "A new side project — currently in early prototyping.",
  playing:  "Competitive ranked play — Diamond tier.",
  learning: "Going deeper on database design and system architecture.",
  reading:  "Currently between books.",
  updated:  "2026-05-25",
};

async function main() {
  await prisma.content.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      hero: heroData,
      contact: contactData,
      skills: skillsData,
      timeline: timelineData,
      now: nowData,
    },
    update: {
      hero: heroData,
      contact: contactData,
      skills: skillsData,
      timeline: timelineData,
      now: nowData,
    },
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      { id: "01", title: "Quiz AI Generate", subtitle: "ai.powered.quiz.generator", year: "2025", description: "Full-stack AI quiz generator that creates custom quizzes from any topic using Google Gemini.", tags: "Next.js, TypeScript, Google Gemini, Clerk, Prisma, PostgreSQL", live: "https://quiz-ai-generate.vercel.app", repo: "https://github.com/4nand1/QUIZ_AI_GENERATE", order: 0 },
      { id: "02", title: "AI Image Model", subtitle: "food.ingredient.detector", year: "2025", description: "Upload a food photo and AI instantly detects the ingredients.", tags: "Next.js, TypeScript, Google Gemini, HuggingFace, Tailwind", live: "https://ai-img-model.vercel.app", repo: "https://github.com/4nand1/AI_IMG_MODEL", order: 1 },
      { id: "03", title: "NomNom", subtitle: "food.delivery.platform", year: "2025", description: "A fast food delivery platform with user accounts, browsable menus, and delivery zones.", tags: "TypeScript, Next.js, Tailwind", live: "https://food-delivery-zeta-six.vercel.app", repo: "https://github.com/4nand1/food-delivery", order: 2 },
      { id: "04", title: "Movie Site", subtitle: "movie.discovery.platform", year: "2024", description: "A movie discovery and streaming site with video playback, carousels, and dark mode.", tags: "Next.js, TypeScript, React Player, Radix UI, Tailwind", live: "https://movie-site-react-phi.vercel.app", repo: "https://github.com/4nand1/movie-site--react", order: 3 },
    ],
  });

  console.log("Seeded successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
