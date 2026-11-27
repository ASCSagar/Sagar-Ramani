export type EmployerKey = "ETD" | "Anant Soft Computing" | "La Net Team";

export type ProjectKind = "platform" | "module" | "service" | "application";

export type ProjectCategory =
  | "Enterprise SaaS Platform"
  | "Platform Module"
  | "AI & Automation"
  | "EdTech Web Application"
  | "ERP & CRM Application"
  | "Healthcare SaaS"
  | "E-Commerce Web Application"
  | "Client Web Application";

export type PublicationStatus = "published" | "draft";

export type CaseStudyStatus = "overview" | "pending-details" | "draft";

export interface ProjectImageAsset {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectArchitecture {
  summary: string;
  layers: { name: string; detail: string }[];
}

export interface ProjectEntry {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailedOverview?: string;
  employer: EmployerKey;
  category: ProjectCategory;
  kind: ProjectKind;
  industry?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  technologies: string[];
  businessProblem?: string;
  solutionSummary?: string;
  solutionType?: "implemented" | "proposed";
  businessObjectives?: string[];
  keyFeatures?: string[];
  moduleSlugs?: string[];
  parentPlatformSlug?: string;
  responsibilities?: string[];
  responsibilitiesNote: string;
  technicalChallenges?: string[];
  engineeringSolutions?: string[];
  architecture?: ProjectArchitecture;
  thirdPartyIntegrations?: string[];
  verifiedAchievements?: string[];
  coverImage?: ProjectImageAsset;
  gallery?: ProjectImageAsset[];
  liveUrl?: string;
  repositoryUrl?: string;
  relatedProjectSlugs?: string[];
  featured: boolean;
  displayOrder: number;
  publicationStatus: PublicationStatus;
  caseStudyStatus: CaseStudyStatus;
  seo?: {
    title?: string;
    description?: string;
  };
}

export const projectsData: ProjectEntry[] = [
  // =========================================================================
  // ETD: TrueValue Platform & Grouped Modules (1–7)
  // =========================================================================
  {
    id: "proj-truevalue-platform",
    slug: "truevalue-platform",
    title: "TrueValue Platform",
    shortDescription:
      "Multi-module enterprise SaaS ecosystem encompassing CRM, Appointments, Marketing, WhatsApp Automation, PBX, and SiteFlow.",
    detailedOverview:
      "TrueValue Platform is a unified enterprise SaaS suite built to connect customer relationship management, scheduling, outbound campaigns, automated WhatsApp communication, telephony (PBX), and web workflow modules under one platform.",
    employer: "ETD",
    category: "Enterprise SaaS Platform",
    kind: "platform",
    industry: "Enterprise SaaS & Business Operations",
    role: "Full Stack Developer",
    technologies: ["Full Stack", "Enterprise SaaS", "API Integration", "REST APIs"],
    moduleSlugs: [
      "truevalue-crm",
      "truevalue-appointments",
      "truevalue-marketing",
      "whatsapp-automation",
      "truevalue-pbx",
      "truevalue-siteflow",
    ],
    keyFeatures: [
      "Modular architecture uniting CRM, scheduling, marketing, telephony, and messaging workflows",
      "Centralized API integrations connecting communication and customer lifecycle tools",
    ],
    responsibilitiesNote:
      "Contributed across multiple TrueValue Platform modules during tenure at ETD. Detailed module-level architecture diagrams, individual metrics, and screenshots are pending confirmation.",
    relatedProjectSlugs: ["flyoverseas-ai", "tube-master"],
    featured: true,
    displayOrder: 1,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-truevalue-crm",
    slug: "truevalue-crm",
    title: "TrueValue CRM",
    shortDescription: "Customer relationship management module within the TrueValue Platform suite.",
    employer: "ETD",
    category: "Platform Module",
    kind: "module",
    parentPlatformSlug: "truevalue-platform",
    industry: "Enterprise SaaS & Business Operations",
    role: "Full Stack Developer",
    technologies: ["Enterprise SaaS", "Full Stack", "CRM"],
    responsibilitiesNote:
      "Module within the TrueValue Platform ecosystem. Detailed scope and verified case study specifics are pending confirmation.",
    relatedProjectSlugs: ["truevalue-appointments", "truevalue-marketing"],
    featured: false,
    displayOrder: 2,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-truevalue-appointments",
    slug: "truevalue-appointments",
    title: "TrueValue Appointments",
    shortDescription: "Scheduling and appointment management module within the TrueValue Platform.",
    employer: "ETD",
    category: "Platform Module",
    kind: "module",
    parentPlatformSlug: "truevalue-platform",
    industry: "Enterprise SaaS & Business Operations",
    role: "Full Stack Developer",
    technologies: ["Enterprise SaaS", "Full Stack", "Scheduling"],
    responsibilitiesNote:
      "Module within the TrueValue Platform ecosystem. Detailed scope and verified case study specifics are pending confirmation.",
    relatedProjectSlugs: ["truevalue-crm", "truevalue-pbx"],
    featured: false,
    displayOrder: 3,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-truevalue-marketing",
    slug: "truevalue-marketing",
    title: "TrueValue Marketing",
    shortDescription: "Campaign and marketing workflow module within the TrueValue Platform.",
    employer: "ETD",
    category: "Platform Module",
    kind: "module",
    parentPlatformSlug: "truevalue-platform",
    industry: "Enterprise SaaS & Business Operations",
    role: "Full Stack Developer",
    technologies: ["Enterprise SaaS", "Full Stack", "Workflow Automation"],
    responsibilitiesNote:
      "Module within the TrueValue Platform ecosystem. Detailed scope and verified case study specifics are pending confirmation.",
    relatedProjectSlugs: ["truevalue-crm", "whatsapp-automation"],
    featured: false,
    displayOrder: 4,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-whatsapp-automation",
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    shortDescription: "Automated messaging integration module within the TrueValue ecosystem.",
    employer: "ETD",
    category: "Platform Module",
    kind: "module",
    parentPlatformSlug: "truevalue-platform",
    industry: "Business Messaging & Automation",
    role: "Full Stack Developer",
    technologies: ["API Integration", "Webhooks", "Automation"],
    responsibilitiesNote:
      "Automated messaging module within the TrueValue Platform ecosystem. Detailed integration notes are pending confirmation.",
    relatedProjectSlugs: ["truevalue-marketing", "truevalue-crm"],
    featured: false,
    displayOrder: 5,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-truevalue-pbx",
    slug: "truevalue-pbx",
    title: "TrueValue PBX",
    shortDescription: "Telephony and PBX communication module within the TrueValue Platform.",
    employer: "ETD",
    category: "Platform Module",
    kind: "module",
    parentPlatformSlug: "truevalue-platform",
    industry: "Cloud Telephony & SaaS",
    role: "Full Stack Developer",
    technologies: ["Enterprise SaaS", "API Integration", "Telephony"],
    responsibilitiesNote:
      "Telephony module within the TrueValue Platform ecosystem. Detailed scope and verified case study specifics are pending confirmation.",
    relatedProjectSlugs: ["truevalue-crm", "truevalue-appointments"],
    featured: false,
    displayOrder: 6,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-truevalue-siteflow",
    slug: "truevalue-siteflow",
    title: "TrueValue SiteFlow",
    shortDescription: "Web site and workflow module within the TrueValue Platform.",
    employer: "ETD",
    category: "Platform Module",
    kind: "module",
    parentPlatformSlug: "truevalue-platform",
    industry: "Enterprise SaaS & Web Workflows",
    role: "Full Stack Developer",
    technologies: ["Full Stack", "Enterprise SaaS", "Web Workflows"],
    responsibilitiesNote:
      "Site and workflow module within the TrueValue Platform ecosystem. Detailed scope and verified case study specifics are pending confirmation.",
    relatedProjectSlugs: ["truevalue-platform", "truevalue-marketing"],
    featured: false,
    displayOrder: 7,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },

  // =========================================================================
  // ETD: AI Products & Supporting Services (8–10)
  // =========================================================================
  {
    id: "proj-flyoverseas-ai",
    slug: "flyoverseas-ai",
    title: "FlyOverseas.ai",
    shortDescription: "AI-enabled web platform developed during tenure at ETD.",
    employer: "ETD",
    category: "AI & Automation",
    kind: "application",
    industry: "Overseas Guidance & AI Platforms",
    role: "Full Stack Developer",
    technologies: ["Full Stack", "AI Integration", "OpenAI API"],
    responsibilitiesNote:
      "Contributed to the FlyOverseas.ai web platform at ETD. Detailed architecture, responsibilities, and visuals are pending confirmation.",
    relatedProjectSlugs: ["flyoverseas-intelligent-chatbot", "automated-job-aggregation"],
    featured: true,
    displayOrder: 8,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-flyoverseas-chatbot",
    slug: "flyoverseas-intelligent-chatbot",
    title: "FlyOverseas Intelligent Chatbot",
    shortDescription: "Conversational AI assistant module supporting the FlyOverseas platform.",
    employer: "ETD",
    category: "AI & Automation",
    kind: "module",
    industry: "Conversational AI",
    role: "Full Stack Developer",
    technologies: ["AI Integration", "OpenAI API", "REST APIs", "Automation"],
    responsibilitiesNote:
      "Conversational assistant supporting FlyOverseas workflows. Detailed architecture, responsibilities, and visuals are pending confirmation.",
    relatedProjectSlugs: ["flyoverseas-ai", "whatsapp-automation"],
    featured: false,
    displayOrder: 9,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },
  {
    id: "proj-automated-job-aggregation",
    slug: "automated-job-aggregation",
    title: "Automated Job Aggregation",
    shortDescription: "Automated job data collection and aggregation service pipeline.",
    employer: "ETD",
    category: "AI & Automation",
    kind: "service",
    industry: "Data Aggregation & Automation",
    role: "Full Stack Developer",
    technologies: ["Python", "Playwright", "Web Automation", "Backend Engineering"],
    responsibilitiesNote:
      "Supporting backend automation pipeline for collecting and normalizing job listings. Detailed architecture and metrics are pending confirmation.",
    relatedProjectSlugs: ["flyoverseas-ai", "flyoverseas-intelligent-chatbot"],
    featured: false,
    displayOrder: 10,
    publicationStatus: "published",
    caseStudyStatus: "pending-details",
  },

  // =========================================================================
  // Anant Soft Computing: Published Applications (11, 20)
  // =========================================================================
  {
    id: "proj-study-streak",
    slug: "study-streak",
    title: "Study Streak",
    shortDescription:
      "Online test preparation platform supporting mock, practice, and full-length exams across IELTS, TOEFL, PTE, GRE, Duolingo, and GMAT.",
    detailedOverview:
      "Study Streak is an online test-preparation web platform built to deliver interactive mock tests, practice sets, and full-length examinations across multiple international standardized exams including IELTS, TOEFL, PTE, GRE, Duolingo, and GMAT.",
    employer: "Anant Soft Computing",
    category: "EdTech Web Application",
    kind: "application",
    industry: "EdTech & Online Assessment",
    role: "React Developer",
    technologies: ["React", "Redux", "React Hooks", "Bootstrap"],
    businessProblem:
      "Learners preparing for multi-section international proficiency exams need structured, exam-accurate web interfaces covering Reading, Writing, Listening, and Speaking workflows across mock and full-length tests.",
    solutionSummary:
      "Implemented responsive React exam interfaces with structured client-side state management handling section transitions, practice modes, and full-length assessment flows.",
    solutionType: "implemented",
    keyFeatures: [
      "Support for IELTS, TOEFL, PTE, GRE, Duolingo, and GMAT preparation workflows",
      "Mock, practice, and full-length test modes",
      "Dedicated Reading, Writing, Listening, and Speaking assessment modules",
    ],
    responsibilities: [
      "Developed frontend user interfaces for exam-taking modules and student dashboards.",
      "Implemented predictable state management across Reading, Writing, Listening, and Speaking test sessions.",
      "Maintained responsive Bootstrap layouts across desktop and tablet screen sizes.",
    ],
    responsibilitiesNote:
      "Developed user interfaces and exam workflow state management for Reading, Writing, Listening, and Speaking modules.",
    liveUrl: "https://studystreak.in",
    relatedProjectSlugs: ["tube-master", "pabau"],
    featured: true,
    displayOrder: 11,
    publicationStatus: "published",
    caseStudyStatus: "overview",
  },
  {
    id: "proj-tube-master",
    slug: "tube-master",
    title: "Tube Master",
    shortDescription:
      "Business ERP and CRM application covering financial management, inventory control, production planning, and reporting analytics.",
    detailedOverview:
      "Tube Master is a comprehensive business ERP and CRM platform designed to coordinate operational workflows across finance, inventory tracking, production scheduling, and management reporting.",
    employer: "Anant Soft Computing",
    category: "ERP & CRM Application",
    kind: "application",
    industry: "Manufacturing & Enterprise Operations",
    role: "React Developer",
    technologies: ["React", "Redux", "Bootstrap", "REST APIs"],
    businessProblem:
      "Operational teams needed unified web interfaces to manage financial entries, inventory stock levels, production plans, and analytical reports without switching between disconnected spreadsheets.",
    solutionSummary:
      "Built modular React frontend screens for financial management, inventory control, production planning, and reporting views integrated with backend operational APIs.",
    solutionType: "implemented",
    keyFeatures: [
      "Financial management views and operational records",
      "Inventory control and stock tracking interfaces",
      "Production planning workflows and reporting analytics views",
    ],
    responsibilities: [
      "Built frontend modules across financial management, inventory control, production planning, and reporting views.",
      "Structured reusable React data-entry and reporting components using Bootstrap.",
    ],
    responsibilitiesNote:
      "Built frontend modules across financial management, inventory control, production planning, and reporting views.",
    liveUrl: "https://tubemastercrm.com",
    relatedProjectSlugs: ["truevalue-platform", "study-streak"],
    featured: true,
    displayOrder: 12,
    publicationStatus: "published",
    caseStudyStatus: "overview",
  },

  // =========================================================================
  // La Net Team: Published Applications (23, 24)
  // =========================================================================
  {
    id: "proj-pabau",
    slug: "pabau",
    title: "Pabau",
    shortDescription:
      "Medical practice management software supporting digital patient records, online forms, third-party integrations, and inventory workflows.",
    detailedOverview:
      "Pabau is a cloud-based practice management SaaS platform for healthcare and aesthetic clinics, providing digital patient records, configurable online intake forms, inventory management, and third-party service integrations.",
    employer: "La Net Team",
    category: "Healthcare SaaS",
    kind: "application",
    industry: "Healthcare & Clinic Management",
    role: "Software Developer",
    technologies: ["React", "GraphQL", "REST APIs", "Third-Party APIs"],
    businessProblem:
      "Medical practices require responsive, data-consistent web interfaces to manage patient records, forms, inventory, and external integrations without sluggish page transitions.",
    solutionSummary:
      "Implemented reusable React UI components, integrated third-party APIs, and leveraged GraphQL caching to keep clinic workflows responsive and synchronized.",
    solutionType: "implemented",
    keyFeatures: [
      "Digital patient records and online intake form workflows",
      "Clinic inventory management views",
      "Third-party API integrations and GraphQL client caching",
    ],
    responsibilities: [
      "Developed reusable user interface components in React.",
      "Integrated third-party APIs into practice management workflows.",
      "Worked with GraphQL queries, mutations, and client-side caching.",
    ],
    responsibilitiesNote:
      "Developed user interface components, integrated third-party APIs, and worked with GraphQL caching.",
    thirdPartyIntegrations: ["External Healthcare & Practice APIs", "GraphQL Data Layer"],
    liveUrl: "https://www.pabau.com/",
    relatedProjectSlugs: ["jofo-salami-slicing", "truevalue-platform"],
    featured: true,
    displayOrder: 13,
    publicationStatus: "published",
    caseStudyStatus: "overview",
  },
  {
    id: "proj-jofo-salami-slicing",
    slug: "jofo-salami-slicing",
    title: "JO~FO Salami Slicing",
    shortDescription:
      "Online grocery storefront built with Next.js, Tailwind CSS, GraphQL caching, and interactive product image enhancement.",
    detailedOverview:
      "JO~FO Salami Slicing is an online grocery e-commerce storefront engineered with Next.js and Tailwind CSS, backed by GraphQL caching and custom product image highlight/brighten visual interactions.",
    employer: "La Net Team",
    category: "E-Commerce Web Application",
    kind: "application",
    industry: "Food & Specialty Grocery E-Commerce",
    role: "Software Developer",
    technologies: ["Next.js", "Tailwind CSS", "GraphQL", "React"],
    businessProblem:
      "An online specialty grocery storefront needed fast page rendering, responsive Tailwind CSS styling, cached GraphQL catalog queries, and clear product presentation.",
    solutionSummary:
      "Built Next.js storefront pages with Tailwind CSS, connected GraphQL caching for catalog browsing, and implemented interactive product image highlight and brighten controls.",
    solutionType: "implemented",
    keyFeatures: [
      "Responsive Next.js storefront pages styled with Tailwind CSS",
      "GraphQL caching integration for product catalog responsiveness",
      "Interactive product image highlight and brighten enhancement",
    ],
    responsibilities: [
      "Developed Tailwind CSS user interfaces and Next.js storefront pages.",
      "Integrated GraphQL caching across product browsing views.",
      "Implemented product image highlight and brighten UI features.",
    ],
    responsibilitiesNote:
      "Developed Tailwind CSS user interfaces, Next.js pages, GraphQL caching integration, and product image highlight/brighten features.",
    liveUrl: "https://salamislicing.in",
    relatedProjectSlugs: ["pabau", "study-streak"],
    featured: false,
    displayOrder: 14,
    publicationStatus: "published",
    caseStudyStatus: "overview",
  },

  // =========================================================================
  // Draft Records: Unverified Details Excluded from Public Routes & Sitemap
  // =========================================================================
  {
    id: "proj-pawppy",
    slug: "pawppy",
    title: "Pawppy",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 15,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-makemyforte",
    slug: "makemyforte",
    title: "MakeMyForte",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 16,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-baa",
    slug: "baa",
    title: "BAA",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 17,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-gazra",
    slug: "gazra",
    title: "Gazra",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 18,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-unplugwell",
    slug: "unplugwell",
    title: "UnplugWell",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 19,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-breatheoffline",
    slug: "breatheoffline",
    title: "BreatheOffline",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 20,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-theveganvibrance",
    slug: "theveganvibrance",
    title: "TheVeganVibrance",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 21,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-techsnostalgia",
    slug: "techsnostalgia",
    title: "TechsNostalgia",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 22,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-fly-your-dreams",
    slug: "fly-your-dreams",
    title: "Fly Your Dreams",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 23,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-smhri",
    slug: "smhri",
    title: "SMHRI",
    shortDescription: "Client web application record awaiting verified project details.",
    employer: "Anant Soft Computing",
    category: "Client Web Application",
    kind: "application",
    role: "React Developer",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: detailed project description, technologies, and screenshots awaiting verification.",
    featured: false,
    displayOrder: 24,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
  {
    id: "proj-real-e-state",
    slug: "real-e-state",
    title: "Real E State",
    shortDescription: "Legacy portfolio entry requiring verification prior to publication.",
    employer: "La Net Team",
    category: "Client Web Application",
    kind: "application",
    technologies: ["React"],
    responsibilitiesNote: "Draft record: carried over from legacy portfolio and held in draft pending verification.",
    featured: false,
    displayOrder: 25,
    publicationStatus: "draft",
    caseStudyStatus: "draft",
  },
];

export const getPublishedProjects = (): ProjectEntry[] =>
  projectsData
    .filter((project) => project.publicationStatus === "published")
    .sort((a, b) => a.displayOrder - b.displayOrder);

export const getDraftProjects = (): ProjectEntry[] =>
  projectsData
    .filter((project) => project.publicationStatus === "draft")
    .sort((a, b) => a.displayOrder - b.displayOrder);

export const getTopLevelProjects = (): ProjectEntry[] =>
  getPublishedProjects().filter((project) => !project.parentPlatformSlug);

export const getPlatformModules = (platformSlug: string): ProjectEntry[] =>
  getPublishedProjects().filter((project) => project.parentPlatformSlug === platformSlug);

export const getProjectBySlug = (slug: string): ProjectEntry | undefined =>
  projectsData.find(
    (project) => project.publicationStatus === "published" && project.slug === slug
  );

export const getAdjacentProjects = (
  slug: string
): { previous: ProjectEntry | null; next: ProjectEntry | null } => {
  const published = getPublishedProjects();
  const index = published.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }
  return {
    previous: index > 0 ? (published[index - 1] ?? null) : null,
    next: index < published.length - 1 ? (published[index + 1] ?? null) : null,
  };
};

export const getRelatedProjects = (project: ProjectEntry): ProjectEntry[] => {
  const relatedFromSlugs = (project.relatedProjectSlugs ?? [])
    .map((slug) => getProjectBySlug(slug))
    .filter((item): item is ProjectEntry => Boolean(item && item.slug !== project.slug));

  if (relatedFromSlugs.length > 0) {
    return relatedFromSlugs;
  }

  return getPublishedProjects()
    .filter((item) => item.slug !== project.slug && item.employer === project.employer)
    .slice(0, 3);
};

export const projectKindLabels: Record<ProjectKind, string> = {
  platform: "Enterprise Platform",
  application: "Standalone Product",
  module: "Platform Module",
  service: "Supporting Service",
};
