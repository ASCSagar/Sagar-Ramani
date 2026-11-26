export type SkillProficiency = "hands-on" | "working-knowledge" | "learning";

export interface SkillItem {
  name: string;
  proficiency: SkillProficiency;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: SkillItem[];
  skills: string[];
}

function makeCategory(
  id: string,
  title: string,
  description: string,
  items: SkillItem[]
): SkillCategory {
  return {
    id,
    title,
    description,
    items,
    skills: items.map((item) => item.name),
  };
}

export const skillProficiencyLabels: Record<SkillProficiency, string> = {
  "hands-on": "Hands-on Experience",
  "working-knowledge": "Working Knowledge",
  learning: "Currently Learning",
};

export const skillsData: SkillCategory[] = [
  makeCategory(
    "programming-languages",
    "Programming Languages",
    "Core languages used across frontend interfaces, backend services, and automation pipelines.",
    [
      { name: "JavaScript", proficiency: "hands-on" },
      { name: "TypeScript", proficiency: "hands-on" },
      { name: "Python", proficiency: "hands-on" },
      { name: "HTML", proficiency: "hands-on" },
      { name: "CSS", proficiency: "hands-on" },
    ]
  ),
  makeCategory(
    "frontend-development",
    "Frontend Development",
    "Component architectures, state management, and responsive user interfaces.",
    [
      { name: "React", proficiency: "hands-on" },
      { name: "Next.js", proficiency: "hands-on" },
      { name: "Redux", proficiency: "hands-on" },
      { name: "Redux Toolkit", proficiency: "hands-on" },
      { name: "React Hooks", proficiency: "hands-on" },
      { name: "Responsive Web Development", proficiency: "hands-on" },
    ]
  ),
  makeCategory(
    "backend-development",
    "Backend Development",
    "Server-side API design, business logic, and scalable web service frameworks.",
    [
      { name: "Node.js", proficiency: "hands-on" },
      { name: "Express.js", proficiency: "hands-on" },
      { name: "Django", proficiency: "hands-on" },
      { name: "Django REST Framework", proficiency: "hands-on" },
      { name: "FastAPI", proficiency: "working-knowledge" },
    ]
  ),
  makeCategory(
    "databases",
    "Databases",
    "Relational and document data modeling, querying, and caching patterns.",
    [
      { name: "MongoDB", proficiency: "hands-on" },
      { name: "PostgreSQL", proficiency: "hands-on" },
      { name: "MySQL", proficiency: "hands-on" },
      { name: "Redis", proficiency: "working-knowledge" },
    ]
  ),
  makeCategory(
    "ui-libraries",
    "UI Libraries",
    "Design system styling, utility CSS frameworks, and component suites.",
    [
      { name: "Tailwind CSS", proficiency: "hands-on" },
      { name: "Material UI", proficiency: "hands-on" },
      { name: "Bootstrap", proficiency: "hands-on" },
    ]
  ),
  makeCategory(
    "apis-integrations",
    "APIs and Integrations",
    "Data transport layers, authentication protocols, access control, and external integrations.",
    [
      { name: "REST APIs", proficiency: "hands-on" },
      { name: "GraphQL", proficiency: "hands-on" },
      { name: "Hasura", proficiency: "hands-on" },
      { name: "Webhooks", proficiency: "hands-on" },
      { name: "OAuth", proficiency: "hands-on" },
      { name: "JWT", proficiency: "hands-on" },
      { name: "RBAC", proficiency: "hands-on" },
    ]
  ),
  makeCategory(
    "ai-automation",
    "AI and Automation",
    "Applied LLM integrations, browser automation, and intelligent workflow pipelines.",
    [
      { name: "OpenAI API", proficiency: "hands-on" },
      { name: "AI Integration", proficiency: "hands-on" },
      { name: "Playwright", proficiency: "hands-on" },
      { name: "Web Automation", proficiency: "hands-on" },
      { name: "RAG concepts", proficiency: "working-knowledge" },
    ]
  ),
  makeCategory(
    "development-tools",
    "Development Tools",
    "Version control, API verification, containerization, and asynchronous task tooling.",
    [
      { name: "Git", proficiency: "hands-on" },
      { name: "GitHub", proficiency: "hands-on" },
      { name: "Postman", proficiency: "hands-on" },
      { name: "VS Code", proficiency: "hands-on" },
      { name: "Docker", proficiency: "working-knowledge" },
      { name: "Celery", proficiency: "working-knowledge" },
      { name: "Kafka", proficiency: "learning" },
    ]
  ),
  makeCategory(
    "ai-assisted-tools",
    "AI-Assisted Development Tools",
    "Modern AI coding environments and developer productivity tools.",
    [
      { name: "Google Antigravity", proficiency: "hands-on" },
      { name: "Cursor", proficiency: "hands-on" },
      { name: "OpenAI Codex", proficiency: "hands-on" },
      { name: "Claude", proficiency: "hands-on" },
      { name: "Gemini", proficiency: "hands-on" },
    ]
  ),
];
