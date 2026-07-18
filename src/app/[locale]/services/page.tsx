import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

const SERVICE_ICONS: Record<string, React.JSX.Element> = {
  architecture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  interiors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  supervision: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  planning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
};

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const svc = dict.services as Record<string, string>;

  return {
    title: svc.title ?? "Our Services",
    description: svc.subtitle ?? "Comprehensive architecture and engineering services.",
    openGraph: { title: svc.title ?? "Our Services", description: svc.subtitle ?? "" },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale) as Record<string, Record<string, unknown>>;
  const svc = dict.services as Record<string, string>;

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-32 sm:py-40">
        <div className="hero-bg absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={svc.title ?? ""}
            title={locale === "ar" ? "خدماتنا" : "Our Services"}
            description={svc.subtitle ?? ""}
            align="center"
            className="mx-auto [&_h2]:text-offwhite [&_p]:text-offwhite/60"
          />
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const name = locale === "ar" ? service.nameAr : service.nameEn;
              const summary = locale === "ar" ? service.summaryAr : service.summaryEn;
              const icon = service.icon ? SERVICE_ICONS[service.icon] ?? SERVICE_ICONS.architecture : SERVICE_ICONS.architecture;

              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="group block border border-border p-8 transition-all hover:border-charcoal hover:shadow-sm"
                >
                  <div className="text-muted transition-colors group-hover:text-charcoal">
                    {icon}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-normal text-charcoal">
                    {name}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                    {summary}
                  </p>
                  <span className="mt-6 inline-flex items-center font-body text-sm text-charcoal underline decoration-border underline-offset-4 transition-colors group-hover:text-accent">
                    {svc.viewDetails ?? (locale === "ar" ? "عرض التفاصيل" : "View Details")} →
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-section-lg sm:py-section-lg">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-offwhite sm:text-4xl md:text-5xl">
            {locale === "ar" ? "جاهز لبدء مشروعك؟" : "Ready to Start Your Project?"}
          </h2>
          <div className="mt-10">
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex h-12 items-center justify-center border border-offwhite/30 px-8 font-body text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10"
            >
              {locale === "ar" ? "احجز استشارة" : "Book a Consultation"}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
