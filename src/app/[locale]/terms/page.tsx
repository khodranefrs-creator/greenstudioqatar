import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { alternates } from "@/lib/seo/metadata";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const legal = dict.legal as Record<string, Record<string, string>>;
  const terms = legal?.terms;

  return {
    title: terms?.title ?? "Terms of Service",
    description: terms?.intro ?? "Green Studio Qatar terms of service.",
    alternates: alternates(locale, "terms"),
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const legal = dict.legal as Record<string, Record<string, string>>;
  const terms = legal?.terms ?? {};

  const sections = [
    { title: terms.section1Title, body: terms.section1Body },
    { title: terms.section2Title, body: terms.section2Body },
    { title: terms.section3Title, body: terms.section3Body },
    { title: terms.section4Title, body: terms.section4Body },
  ];

  return (
    <section className="py-section-lg sm:py-section-lg">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
            {terms.title ?? "Terms of Service"}
          </h1>
          <p className="mt-3 font-body text-xs text-muted">
            {terms.lastUpdated ?? ""}
          </p>

          <p className="mt-8 font-body text-base leading-relaxed text-charcoal/80">
            {terms.intro ?? ""}
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
