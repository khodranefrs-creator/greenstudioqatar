import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/data/team";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const about = dict.about as Record<string, string>;

  return {
    title: about.title ?? "About Us",
    description: about.subtitle ?? "Learn about Green Studio Qatar.",
    openGraph: { title: about.title ?? "About Us", description: about.subtitle ?? "" },
  };
}

const VALUE_ICONS = [
  <svg key="excellence" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-7 w-7"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  <svg key="sustainability" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-7 w-7"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" /></svg>,
  <svg key="culture" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-7 w-7"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  <svg key="collaboration" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-7 w-7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="innovation" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-7 w-7"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>,
];

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale) as Record<string, Record<string, unknown>>;
  const about = dict.about as Record<string, unknown>;
  const values = (about.values ?? []) as { title: string; description: string }[];
  const leadership = teamMembers.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-32 sm:py-40">
        <div className="hero-bg absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={String(about.title ?? "")}
            title={locale === "ar" ? "نبذة عنا" : "About Us"}
            description={String(about.subtitle ?? "")}
            align="center"
            className="mx-auto [&_h2]:text-offwhite [&_p]:text-offwhite/60"
          />
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {String(about.story ?? "")}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface-secondary py-section-lg sm:py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-normal text-charcoal">
                {String(about.missionTitle ?? "")}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                {String(about.mission ?? "")}
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-normal text-charcoal">
                {String(about.visionTitle ?? "")}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                {String(about.vision ?? "")}
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-normal text-charcoal">
                {String(about.valuesTitle ?? "")}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                {locale === "ar"
                  ? "التميز والاستدامة والاحترام الثقافي والتعاون والابتكار"
                  : "Excellence, sustainability, cultural resonance, collaboration, and innovation."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <h2 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
            {String(about.valuesTitle ?? "")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div key={value.title} className="group border border-border p-8 transition-colors hover:border-charcoal">
                <div className="text-muted transition-colors group-hover:text-charcoal">
                  {VALUE_ICONS[index] ?? VALUE_ICONS[0]}
                </div>
                <h3 className="mt-5 font-display text-lg font-normal text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-section-lg sm:py-section-lg">
        <Container>
          <h2 className="font-display text-3xl font-light tracking-tight text-offwhite sm:text-4xl">
            {locale === "ar" ? "القيادة" : "Leadership"}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member) => (
              <div key={member.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/50">
                  {member.photo && (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg text-offwhite">{member.name}</h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-widest text-offwhite/50">
                    {locale === "ar" ? member.roleAr : member.roleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
              {locale === "ar" ? "الأرقام تتحدث" : "By the Numbers"}
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: "20+", label: locale === "ar" ? "سنة خبرة" : "Years Experience" },
                { value: "120+", label: locale === "ar" ? "مشروع" : "Projects" },
                { value: "12", label: locale === "ar" ? "دولة" : "Countries" },
                { value: "50+", label: locale === "ar" ? "عضو فريق" : "Team Members" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="font-display text-3xl font-light text-charcoal sm:text-4xl">
                    {stat.value}
                  </span>
                  <p className="mt-2 font-body text-xs uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-section-lg sm:py-section-lg">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-offwhite sm:text-4xl md:text-5xl">
            {locale === "ar" ? "دعنا نبني المستقبل معاً" : "Let\u2019s Build Something Remarkable Together"}
          </h2>
          <div className="mt-10">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center justify-center border border-offwhite/30 px-8 font-body text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10"
            >
              {locale === "ar" ? "تواصل معنا" : "Get in Touch"}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
