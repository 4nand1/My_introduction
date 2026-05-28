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
  bio: "18, building from Ulaanbaatar. Nine months into writing code — and already shipped four production web apps with Next.js, Prisma, and PostgreSQL. Open to remote work and interesting collaborations.",
  tagline: "I started late. I move fast.",
  location: "Ulaanbaatar",
  coords: "47.9°N · 106.9°E",
  stat1Value: "9",
  stat1Label: "Mo Coding",
  stat2Value: "4",
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

// Timeline empty — 9-month journey is for Anand to write in /admin → Timeline.
// Suggested events for him to fill: Aug 2025 (first code), then per-project shipping milestones.
const timelineData = { events: [] };

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
