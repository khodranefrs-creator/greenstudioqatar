import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { alternates } from "@/lib/seo/metadata";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const legal = dict.legal as Record<string, Record<string, string>>;
  const privacy = legal?.privacy;

  return {
    title: privacy?.title ?? "Privacy Policy",
    description: privacy?.intro ?? "Green Studio Qatar privacy policy.",
    alternates: alternates(locale, "privacy"),
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const legal = dict.legal as Record<string, Record<string, string>>;
  const privacy = legal?.privacy ?? {};

  const sections = [
    { title: privacy.section1Title, body: privacy.section1Body },
    { title: privacy.section2Title, body: privacy.section2Body },
    { title: privacy.section3Title, body: privacy.section3Body },
    { title: privacy.section4Title, body: privacy.section4Body },
  ];

  return (
    <section className="py-section-lg sm:py-section-lg">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
            {privacy.title ?? "Privacy Policy"}
          </h1>
          <p className="mt-3 font-body text-xs text-muted">
            {privacy.lastUpdated ?? ""}
          </p>

          <p className="mt-8 font-body text-base leading-relaxed text-charcoal/80">
            {privacy.intro ?? ""}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="font-display text-xl font-normal text-charcoal">
                  {section.title}
                </h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
