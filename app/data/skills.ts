export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Engineering",
    label: "UI / UX",
    skills: [
      { name: "Next.js", level: 92 },
      { name: "React / TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 94 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    name: "Backend & DevOps",
    label: "Server / DB",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Prisma / Neon", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "Auth.js", level: 78 },
    ],
  },
  {
    name: "Tools & Ecosystem",
    label: "Workflow",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Figma", level: 82 },
      { name: "Vercel", level: 88 },
      { name: "VS Code", level: 95 },
    ],
  },
];

export const marqueeItems = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
  "PostgreSQL", "Prisma", "Framer Motion", "Git", "Figma",
  "Vercel", "Auth.js", "WebSockets", "OpenAI", "Neon",
];
