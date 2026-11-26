export interface EducationEntry {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  shortInstitution: string;
  location?: string;
  period: string;
  scoreLabel: string;
  grade: string;
  summary: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialUrl?: string;
}

export const educationData: EducationEntry[] = [
  {
    id: "be-computer-engineering",
    degree: "Bachelor of Engineering",
    specialization: "Computer Engineering",
    institution: "Sardar Vallabhbhai Patel Institute of Technology (SVIT), Vasad",
    shortInstitution: "SVIT, Vasad",
    location: "Vasad, Gujarat, India",
    period: "2018 – 2022",
    scoreLabel: "CGPA",
    grade: "8.4 / 10",
    summary:
      "Four-year undergraduate engineering degree focused on computer science fundamentals, algorithms, database management, and software engineering.",
  },
  {
    id: "hsc-science",
    degree: "Higher Secondary Education",
    specialization: "Science Stream",
    institution: "Nutan Vidyalaya",
    shortInstitution: "Nutan Vidyalaya",
    period: "2016 – 2018",
    scoreLabel: "Percentage",
    grade: "84%",
    summary:
      "Higher secondary academic track in Science and Mathematics prior to undergraduate Computer Engineering studies.",
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "Nutan Vidyalaya",
    shortInstitution: "Nutan Vidyalaya",
    period: "2015 – 2016",
    scoreLabel: "Percentage",
    grade: "83%",
    summary: "Completed secondary school education with distinction.",
  },
];

// Kept empty until verified certification records are supplied.
export const certificationsData: CertificationEntry[] = [];
