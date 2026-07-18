import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import ConsultationStepper from "@/components/forms/consultation-stepper";

interface ConsultationPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ConsultationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const consult = dict.consultation as Record<string, string>;

  return {
    title: consult.title ?? "Book a Consultation",
    description: consult.subtitle ?? "Tell us about your project.",
    openGraph: { title: consult.title ?? "Book a Consultation", description: consult.subtitle ?? "" },
  };
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const consult = dict.consultation as Record<string, string>;

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-32 sm:py-40">
        <div className="hero-bg absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={consult.title ?? ""}
            title={locale === "ar" ? "ابدأ مشروعك" : "Start Your Project"}
            description={consult.subtitle ?? ""}
            align="center"
            className="mx-auto [&_h2]:text-offwhite [&_p]:text-offwhite/60"
          />
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ConsultationStepper />
          </div>
        </Container>
      </section>

      <section className="bg-surface-secondary py-section-sm sm:py-section-sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-charcoal mb-6">
              {locale === "ar" ? "ماذا تتوقع" : "What to Expect"}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  num: "1",
                  titleEn: "We Review",
                  titleAr: "نراجع طلبك",
                  descEn: "Our team reviews your project details within 48 hours.",
                  descAr: "يراجع فريقنا تفاصيل مشروعك خلال 48 ساعة.",
                },
                {
                  num: "2",
                  titleEn: "We Connect",
                  titleAr: "نتواصل معك",
                  descEn: "A senior architect contacts you to discuss your vision.",
                  descAr: "يتواصل معك مهندس معماري أول لمناقشة رؤيتك.",
                },
                {
                  num: "3",
                  titleEn: "We Propose",
                  titleAr: "نقدم عرضاً",
                  descEn: "You receive a tailored proposal with scope and timeline.",
                  descAr: "تتلقى عرضاً مخصصاً بالنطاق والجدول الزمني.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <span className="font-display text-3xl font-light text-charcoal/10 shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-normal text-charcoal">
                      {locale === "ar" ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="mt-2 font-body text-sm text-muted">
                      {locale === "ar" ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
