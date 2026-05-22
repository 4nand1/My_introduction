import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.content.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      hero: {
        name: "Anand",
        title: "Full-Stack Developer",
        bio: "I build fast, purposeful products. My background in competitive gaming taught me to think under pressure — now I channel that into writing clean, efficient code that ships.",
        tagline: "Strategy → Logic → Scalable Code.",
        location: "Mongolia",
        stat1Value: "2×",
        stat1Label: "Hackathons",
        stat2Value: "15+",
        stat2Label: "Projects",
        stat3Value: "18.8",
        stat3Label: "Years Old",
      },
      contact: {
        email: "404aarhal@gmail.com",
        github: "https://github.com/4nand1",
        linkedin: "https://linkedin.com/in/anand",
      },
    },
    update: {
      hero: {
        name: "Anand",
        title: "Full-Stack Developer",
        bio: "I build fast, purposeful products. My background in competitive gaming taught me to think under pressure — now I channel that into writing clean, efficient code that ships.",
        tagline: "Strategy → Logic → Scalable Code.",
        location: "Mongolia",
        stat1Value: "0",
        stat1Label: "Hackathons",
        stat2Value: "15+",
        stat2Label: "Projects",
        stat3Value: "18.8",
        stat3Label: "Years Old",
      },
      contact: {
        email: "404aarhal@gmail.com",
        github: "https://github.com/4nand1",
        linkedin: "https://linkedin.com/in/anand",
      },
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
