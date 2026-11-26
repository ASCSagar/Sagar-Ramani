import { calculateDateRangeDuration, calculateTotalExperience } from "@/lib/date";

export interface ExperienceRole {
  id: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string;
  highlightsPending?: boolean;
  highlights: string[];
}

export interface EmployerExperience {
  id: string;
  company: string;
  location?: string;
  isCurrentEmployer: false;
  startDate: string;
  endDate: string;
  totalPeriod: string;
  progressionNote?: string;
  technologies: string[];
  roles: ExperienceRole[];
  relatedProjectSlugs: string[];
}

export const experienceData: EmployerExperience[] = [
  {
    id: "etd",
    company: "ETD",
    isCurrentEmployer: false,
    startDate: "2025-08-01",
    endDate: "2026-10-31",
    totalPeriod: "01 August 2025 – 31 October 2026",
    progressionNote: "Promoted from Full Stack Developer Grade 1 to Grade 2",
    technologies: [
      "Full Stack",
      "Enterprise SaaS",
      "Python",
      "AI Integration",
      "API Integration",
      "Web Automation",
    ],
    roles: [
      {
        id: "etd-fsd-2",
        title: "Full Stack Developer Grade 2",
        period: "01 September 2026 – 31 October 2026",
        startDate: "2026-09-01",
        endDate: "2026-10-31",
        highlightsPending: true,
        highlights: [
          "Progressed to Full Stack Developer Grade 2; detailed bullet points from the approved résumé are pending confirmation.",
        ],
      },
      {
        id: "etd-fsd-1",
        title: "Full Stack Developer Grade 1",
        period: "01 August 2025 – 31 August 2026",
        startDate: "2025-08-01",
        endDate: "2026-08-31",
        highlightsPending: true,
        highlights: [
          "Contributed across the TrueValue Platform modules (CRM, Appointments, Marketing, WhatsApp Automation, PBX, SiteFlow), FlyOverseas.ai, FlyOverseas Intelligent Chatbot, and Automated Job Aggregation.",
          "Detailed individual role achievements and metrics are pending final résumé verification.",
        ],
      },
    ],
    relatedProjectSlugs: [
      "truevalue-platform",
      "flyoverseas-ai",
      "flyoverseas-intelligent-chatbot",
      "automated-job-aggregation",
    ],
  },
  {
    id: "anant-soft-computing",
    company: "Anant Soft Computing",
    location: "Vadodara, Gujarat, India",
    isCurrentEmployer: false,
    startDate: "2023-09-18",
    endDate: "2025-07-28",
    totalPeriod: "18 September 2023 – 28 July 2025",
    technologies: ["React", "Redux", "Bootstrap", "Frontend Engineering", "State Management"],
    roles: [
      {
        id: "anant-react-dev",
        title: "React Developer",
        period: "18 September 2023 – 28 July 2025",
        startDate: "2023-09-18",
        endDate: "2025-07-28",
        highlightsPending: true,
        highlights: [
          "Built frontend user interfaces and exam workflow state management for Study Streak across Reading, Writing, Listening, and Speaking test modules.",
          "Developed ERP and CRM frontend modules for Tube Master covering financial management, inventory control, production planning, and reporting views.",
          "Contributed to additional client web applications (including Pawppy, MakeMyForte, BAA, Gazra, UnplugWell, BreatheOffline, TheVeganVibrance, TechsNostalgia, Fly Your Dreams, and SMHRI), with detailed descriptions pending verification.",
        ],
      },
    ],
    relatedProjectSlugs: ["study-streak", "tube-master"],
  },
  {
    id: "la-net-team",
    company: "La Net Team",
    location: "Surat, Gujarat, India",
    isCurrentEmployer: false,
    startDate: "2022-01-03",
    endDate: "2023-09-15",
    totalPeriod: "03 January 2022 – 15 September 2023",
    progressionNote: "Transitioned from Software Developer Trainee to Software Developer",
    technologies: ["React", "Next.js", "Tailwind CSS", "GraphQL", "Third-Party APIs"],
    roles: [
      {
        id: "lanet-software-dev",
        title: "Software Developer",
        period: "10 July 2022 – 15 September 2023",
        startDate: "2022-07-10",
        endDate: "2023-09-15",
        highlightsPending: false,
        highlights: [
          "Developed UI components, integrated third-party APIs, and worked with GraphQL caching on Pabau medical practice management software.",
          "Built Next.js pages, Tailwind CSS user interfaces, GraphQL caching integration, and product image highlight/brighten features for JO~FO Salami Slicing.",
        ],
      },
      {
        id: "lanet-trainee",
        title: "Software Developer Trainee",
        period: "03 January 2022 – 09 July 2022",
        startDate: "2022-01-03",
        endDate: "2022-07-09",
        highlightsPending: true,
        highlights: [
          "Completed software development training and transitioned into full-time web application engineering.",
        ],
      },
    ],
    relatedProjectSlugs: ["pabau", "jofo-salami-slicing"],
  },
];

export function getRoleDurationFormatted(role: ExperienceRole): string {
  return calculateDateRangeDuration(role.startDate, role.endDate).formatted;
}

export function getEmployerDurationFormatted(employer: EmployerExperience): string {
  return calculateDateRangeDuration(employer.startDate, employer.endDate).formatted;
}

export function getTotalCareerDurationFormatted(): string {
  return calculateTotalExperience(experienceData).formatted;
}
