import { BentoOverview } from "@/components/home/bento-overview";
import { HeroSection } from "@/components/home/hero-section";
import { HomeSections } from "@/components/home/home-sections";
import { profileData } from "@/data/profile";
import { buildPageMetadata, buildPersonJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Home",
  description: profileData.summary,
  path: "/",
});

export default function HomePage() {
  const personJsonLd = buildPersonJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroSection />
      <BentoOverview />
      <HomeSections />
    </>
  );
}
