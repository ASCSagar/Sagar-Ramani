import { Info, Mail, MapPin } from "lucide-react";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/shared/page-header";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/social-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} (${profileData.designation}) via the validated enquiry form, email, LinkedIn, or GitHub.`,
  path: "/contact",
});

export default function ContactPage() {
  const emailDeliveryConfigured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.CONTACT_TO_EMAIL
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 xl:px-12">
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        description={`Reach out to ${profileData.name} regarding software engineering opportunities, full-stack architecture, or project collaborations.`}
      />

      <ScrollReveal className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Card className="border-border/80 bg-card/60 lg:col-span-7">
          <CardHeader>
            <CardTitle className="text-lg">Send a Message</CardTitle>
            <CardDescription>
              Validated client-side and server-side with rate limiting and honeypot spam protection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {!emailDeliveryConfigured ? (
              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-background/70 p-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <p>
                  Live email dispatch via Resend is pending production environment credentials in this deployment preview. Validation and abuse checks remain active; you may also email directly at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </div>
            ) : null}

            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-5 lg:col-span-5">
          <SpotlightCard>
            <div className="py-5">
              <CardHeader>
                <CardTitle className="text-lg">Direct Channels</CardTitle>
                <CardDescription>Approved professional contact links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-3 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/60 p-3 transition-colors outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="truncate font-medium text-foreground">{siteConfig.email}</p>
                  </div>
                </a>

                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/60 p-3 transition-colors outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <LinkedInIcon className="size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">LinkedIn</p>
                    <p className="font-medium text-foreground">linkedin.com/in/sagar-ramani</p>
                  </div>
                </a>

                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/60 p-3 transition-colors outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <GitHubIcon className="size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">GitHub</p>
                    <p className="font-medium text-foreground">github.com/SagarIR</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/60 p-3">
                  <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{siteConfig.location}</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </SpotlightCard>

          <Card className="border-border/80 bg-card/60">
            <CardHeader>
              <CardTitle className="text-base">Privacy & Contact Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-muted-foreground">
              Personal phone numbers are omitted by default, and visitor phone numbers are never required.
            </CardContent>
          </Card>
        </div>
      </ScrollReveal>
    </div>
  );
}
