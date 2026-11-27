import { CareerHighlights } from "@/components/home/career-highlights";
import { CinematicContactCTA } from "@/components/home/cinematic-contact-cta";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { ExpertiseShowcase } from "@/components/home/expertise-showcase";
import { FeaturedProjectSpotlight } from "@/components/home/featured-project-spotlight";
import { HeroSection } from "@/components/home/hero-section";
import { InteractiveTestimonials } from "@/components/home/interactive-testimonials";
import { SelectedWorkShowcase } from "@/components/home/selected-work-showcase";
import { TechStackPlayground } from "@/components/home/tech-stack-playground";
import { TextRevealSection } from "@/components/home/text-reveal-section";
import { TypographyMarquee } from "@/components/home/typography-marquee";
import { profileData } from "@/data/profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Home",
  description: profileData.summary,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TypographyMarquee />
      <TextRevealSection />
      <ExpertiseShowcase />
      <SelectedWorkShowcase />
      <ExperienceTimeline />
      <TechStackPlayground />
      <CareerHighlights />
      <FeaturedProjectSpotlight />
      <InteractiveTestimonials />
      <CinematicContactCTA />
    </>
  );
}
