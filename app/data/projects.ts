export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tags: string[];
  live?: string;
  repo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Quiz AI Generate",
    subtitle: "ai.powered.quiz.generator",
    year: "2025",
    description:
      "Full-stack AI quiz generator that creates custom quizzes from any topic using Google Gemini. Features user authentication with Clerk, quiz history stored in PostgreSQL via Prisma, and a clean ShadCN UI.",
    tags: ["Next.js", "TypeScript", "Google Gemini", "Clerk", "Prisma", "PostgreSQL"],
    live: "https://quiz-ai-generate.vercel.app",
    repo: "https://github.com/4nand1/QUIZ_AI_GENERATE",
    featured: true,
  },
  {
    id: "02",
    title: "AI Image Model",
    subtitle: "food.ingredient.detector",
    year: "2025",
    description:
      "Upload a food photo and AI instantly detects the ingredients. Powered by Google Gemini and HuggingFace Transformers for multimodal image analysis. Includes image creation tools.",
    tags: ["Next.js", "TypeScript", "Google Gemini", "HuggingFace", "Tailwind"],
    live: "https://ai-img-model.vercel.app",
    repo: "https://github.com/4nand1/AI_IMG_MODEL",
  },
  {
    id: "03",
    title: "NomNom",
    subtitle: "food.delivery.platform",
    year: "2025",
    description:
      "A fast food delivery platform with user accounts, browsable menus, delivery zones, and order management. Built around speed and a smooth ordering experience.",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    live: "https://food-delivery-zeta-six.vercel.app",
    repo: "https://github.com/4nand1/food-delivery",
  },
  {
    id: "04",
    title: "Movie Site",
    subtitle: "movie.discovery.platform",
    year: "2024",
    description:
      "A movie discovery and streaming site with video playback, carousels, dark mode, and a responsive UI. Built with React Player for embedded video and Embla Carousel for smooth browsing.",
    tags: ["Next.js", "TypeScript", "React Player", "Radix UI", "Tailwind"],
    live: "https://movie-site-react-phi.vercel.app",
    repo: "https://github.com/4nand1/movie-site--react",
    featured: true,
  },
];
