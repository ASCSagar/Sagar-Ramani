import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { TechnologyOrbitLazy } from "@/components/effects/technology-orbit-lazy";
import { PageHeader } from "@/components/shared/page-header";
import { SkillsMatrix } from "@/components/skills/skills-matrix";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Skills",
  description:
    "Categorized technical skills across programming languages, React/Next.js frontend, Node.js and Django backend, databases, APIs, AI automation, and developer tooling.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHeader
        eyebrow="Capabilities"
        title="Technical Skills"
        description="Structured capability matrix distinguishing production hands-on experience, working knowledge, and technologies currently being explored—without arbitrary percentage bars."
      />

      <div className="space-y-10">
        <ScrollReveal>
          <TechnologyOrbitLazy />
        </ScrollReveal>

        <SkillsMatrix />
      </div>
    </div>
  );
}
