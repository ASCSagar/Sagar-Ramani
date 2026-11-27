export interface EngineeringStrength {
  id: string;
  title: string;
  description: string;
}

export interface ResumeVersion {
  id: string;
  title: string;
  targetRole: string;
  focusSummary: string;
  keyTechnologies: string[];
  relevantProjectSlugs: string[];
  expectedFilename: string;
  pdfAvailable: boolean;
  pdfPath: string | null;
}

export interface AboutNarrative {
  careerOverview: string;
  fullStackExpertise: string;
  frontendExpertise: string;
  backendExpertise: string;
  enterpriseExperience: string;
  aiAutomationExperience: string;
  developmentPhilosophy: string;
}

export interface ProfileData {
  name: string;
  designation: string;
  experience: string;
  location: string;
  headline: string;
  summary: string;
  expertise: string[];
  strengths: EngineeringStrength[];
  aboutNarrative: AboutNarrative;
  resumeVersions: ResumeVersion[];
  portraitImage: string;
  aboutImage: string;
  resumePdfAvailable: boolean;
  resumePdfPath: string | null;
}

export const profileData: ProfileData = {
  name: "Sagar Ramani",
  designation: "Full Stack Software Developer",
  experience: "4+ years",
  location: "Vadodara, Gujarat, India",
  headline:
    "Building scalable enterprise applications, modern web experiences and intelligent software solutions.",
  summary:
    "Full Stack Software Developer with 4+ years of professional experience across enterprise SaaS applications, MERN stack architectures, Python and Django systems, REST and GraphQL APIs, third-party integrations, and AI automation.",
  expertise: [
    "Full Stack Software Development",
    "Frontend Engineering",
    "Backend Engineering",
    "Enterprise SaaS Applications",
    "MERN Stack Development",
    "Python and Django Development",
    "REST API Development",
    "Third-party API Integrations",
    "Database-driven Applications",
    "AI Integration and Automation",
  ],
  strengths: [
    {
      id: "fullstack-ownership",
      title: "End-to-End Full Stack Delivery",
      description:
        "Experience spanning frontend component architecture, backend REST/GraphQL services, and relational or document database schemas.",
    },
    {
      id: "enterprise-modularity",
      title: "Enterprise SaaS & ERP Systems",
      description:
        "Built and maintained multi-module business platforms covering CRM, appointments, telephony, inventory, production, and practice management.",
    },
    {
      id: "api-integrations",
      title: "Third-Party API & Webhook Integration",
      description:
        "Connected web applications to external SaaS services, messaging workflows, GraphQL caching layers, and authentication pipelines.",
    },
    {
      id: "ai-automation",
      title: "Practical AI & Workflow Automation",
      description:
        "Applied OpenAI APIs, conversational assistants, and Playwright-based web automation to reduce manual operational effort.",
    },
  ],
  aboutNarrative: {
    careerOverview:
      "Over 4+ years in software engineering across La Net Team (Surat), Anant Soft Computing (Vadodara), and ETD, I have progressed from Software Developer Trainee to Full Stack Developer Grade 2, delivering production web applications, multi-module SaaS ecosystems, and automated data workflows.",
    fullStackExpertise:
      "I work across the full application lifecycle using TypeScript, JavaScript, React, Next.js, Node.js, Express.js, Python, and Django, aligning UI architecture with reliable backend services and structured database persistence in PostgreSQL, MongoDB, and MySQL.",
    frontendExpertise:
      "My frontend engineering background centers on React, Next.js, Redux, Redux Toolkit, React Hooks, Tailwind CSS, Material UI, and Bootstrap, translating complex workflows such as multi-section assessments, ERP dashboards, and responsive storefronts into maintainable component trees.",
    backendExpertise:
      "On the backend, I build REST APIs, Django REST Framework services, Node.js/Express endpoints, GraphQL/Hasura integrations, webhooks, and role-based access control (JWT, OAuth, RBAC) backed by relational and NoSQL databases.",
    enterpriseExperience:
      "I have contributed to multi-module business platforms including the TrueValue Platform suite (CRM, Appointments, Marketing, WhatsApp Automation, PBX, SiteFlow), Tube Master ERP & CRM, and Pabau medical practice management software.",
    aiAutomationExperience:
      "My work at ETD includes AI-enabled web experiences (FlyOverseas.ai), conversational chatbot workflows (FlyOverseas Intelligent Chatbot), and automated job data aggregation pipelines using Python, OpenAI API integrations, and Playwright automation.",
    developmentPhilosophy:
      "I prioritize readable, modular code, strict type boundaries, predictable data flow, and honest engineering documentation, preferring clean architecture and accessible interfaces over unnecessary complexity.",
  },
  resumeVersions: [
    {
      id: "full-stack-developer",
      title: "Full Stack Developer",
      targetRole: "Full Stack Software Developer",
      focusSummary:
        "Balanced profile highlighting end-to-end ownership across React/Next.js frontends, Node.js and Python/Django APIs, databases, and enterprise SaaS modules.",
      keyTechnologies: ["TypeScript", "React", "Next.js", "Node.js", "Python", "Django", "PostgreSQL", "MongoDB"],
      relevantProjectSlugs: ["truevalue-platform", "flyoverseas-ai", "pabau", "study-streak"],
      expectedFilename: "Sagar_Ramani_Full_Stack_Developer.pdf",
      pdfAvailable: false,
      pdfPath: null,
    },
    {
      id: "mern-stack-developer",
      title: "MERN Stack Developer",
      targetRole: "MERN Stack Developer",
      focusSummary:
        "Focused on JavaScript/TypeScript full-stack delivery with MongoDB, Express.js, React, Next.js, Node.js, Redux Toolkit, and REST/GraphQL APIs.",
      keyTechnologies: ["MongoDB", "Express.js", "React", "Node.js", "Next.js", "Redux Toolkit", "GraphQL", "JWT"],
      relevantProjectSlugs: ["truevalue-platform", "study-streak", "tube-master", "jofo-salami-slicing"],
      expectedFilename: "Sagar_Ramani_MERN_Stack_Developer.pdf",
      pdfAvailable: false,
      pdfPath: null,
    },
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      targetRole: "Frontend / React & Next.js Developer",
      focusSummary:
        "Emphasizes UI architecture, state management, responsive design systems, and complex web workflows built with React, Next.js, Tailwind CSS, Material UI, and Bootstrap.",
      keyTechnologies: ["React", "Next.js", "TypeScript", "Redux Toolkit", "React Hooks", "Tailwind CSS", "Material UI", "GraphQL"],
      relevantProjectSlugs: ["study-streak", "tube-master", "pabau", "jofo-salami-slicing"],
      expectedFilename: "Sagar_Ramani_Frontend_Developer.pdf",
      pdfAvailable: false,
      pdfPath: null,
    },
    {
      id: "backend-developer",
      title: "Backend Developer",
      targetRole: "Backend & API Software Developer",
      focusSummary:
        "Highlights REST API design, Python/Django & Node.js services, webhooks, OAuth/JWT/RBAC security, GraphQL/Hasura, and relational/document databases.",
      keyTechnologies: ["Python", "Django", "Django REST Framework", "Node.js", "Express.js", "PostgreSQL", "MySQL", "REST APIs"],
      relevantProjectSlugs: ["truevalue-platform", "automated-job-aggregation", "whatsapp-automation", "pabau"],
      expectedFilename: "Sagar_Ramani_Backend_Developer.pdf",
      pdfAvailable: false,
      pdfPath: null,
    },
    {
      id: "ai-developer",
      title: "AI Developer",
      targetRole: "AI Integration & Automation Developer",
      focusSummary:
        "Spotlights OpenAI API integrations, conversational chatbot systems, web automation with Playwright, automated data aggregation pipelines, and RAG concepts.",
      keyTechnologies: ["Python", "OpenAI API", "AI Integration", "Playwright", "Web Automation", "Next.js", "REST APIs"],
      relevantProjectSlugs: ["flyoverseas-ai", "flyoverseas-intelligent-chatbot", "automated-job-aggregation", "whatsapp-automation"],
      expectedFilename: "Sagar_Ramani_AI_Developer.pdf",
      pdfAvailable: false,
      pdfPath: null,
    },
    {
      id: "software-developer",
      title: "Software Developer",
      targetRole: "Software Developer",
      focusSummary:
        "Generalist software engineering résumé covering 4+ years of production experience across SaaS platforms, client applications, API integrations, and quality engineering.",
      keyTechnologies: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "Django", "SQL", "Git"],
      relevantProjectSlugs: ["truevalue-platform", "study-streak", "tube-master", "pabau"],
      expectedFilename: "Sagar_Ramani_Software_Developer.pdf",
      pdfAvailable: false,
      pdfPath: null,
    },
  ],
  portraitImage: "/images/profile.jpeg",
  aboutImage: "/images/about.jpeg",
  resumePdfAvailable: false,
  resumePdfPath: null,
};
