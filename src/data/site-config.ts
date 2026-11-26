export const siteConfig = {
  name: "Sagar Ramani",
  shortName: "SR",
  designation: "Full Stack Software Developer",
  experienceYears: "4+ years",
  location: "Vadodara, Gujarat, India",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sagarramani.dev",
  legacyPortfolioUrl: "https://sagar-ramani.netlify.app/",
  email: "sagar.18beceg081@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/sagar-ramani/",
    github: "https://github.com/SagarIR",
  },
  features: {
    showTestimonials: false,
    showPhoneNumber: false,
    enablePreloader: true,
    enableCustomCursor: true,
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Education", href: "/education" },
    { label: "Résumé", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.navItems)[number];
