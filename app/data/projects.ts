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

export const projects: Project[] = [];
