import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { alternates } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import ContactForm from "@/components/forms/contact-form";
import ProjectMap from "@/components/portfolio/project-map";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const contact = dict.contact as Record<string, string>;

  return {
    title: contact.title ?? "Contact Us",
    description: contact.subtitle ?? "Get in touch with Green Studio Qatar.",
    alternates: alternates(locale, "contact"),
    openGraph: { title: contact.title ?? "Contact Us", description: contact.subtitle ?? "" },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const contact = dict.contact as Record<string, string>;

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-32 sm:py-40">
        <div className="hero-bg absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={contact.title ?? ""}
            title={locale === "ar" ? "تواصل معنا" : "Get in Touch"}
            description={contact.subtitle ?? ""}
            align="center"
            className="mx-auto [&_h2]:text-offwhite [&_p]:text-offwhite/60"
          />
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-normal text-charcoal">
                {contact.formTitle ?? "Send us a message"}
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="font-display text-xl font-normal text-charcoal">
                  {contact.officeTitle ?? "Our Office"}
                </h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">
                      {locale === "ar" ? "العنوان" : "Address"}
                    </p>
                    <p className="font-body text-sm text-charcoal">
                      {contact.address ?? "West Bay, Doha, Qatar"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">
                      {contact.phoneLabel ?? "Phone"}
                    </p>
                    <a
                      href="tel:+97444123456"
                      className="font-body text-sm text-charcoal hover:text-accent transition-colors"
                    >
                      +974 4412 3456
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">
                      {contact.emailLabel ?? "Email"}
                    </p>
                    <a
                      href="mailto:hello@greenstudio.qa"
                      className="font-body text-sm text-charcoal hover:text-accent transition-colors"
                    >
                      hello@greenstudio.qa
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">
                      {locale === "ar" ? "ساعات العمل" : "Working Hours"}
                    </p>
                    <p className="font-body text-sm text-charcoal">
                      {locale === "ar" ? "الأحد \u2013 الخميس: 8:00 صباحاً \u2013 5:00 مساءً" : "Sunday \u2013 Thursday: 8:00 AM \u2013 5:00 PM"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-normal text-charcoal mb-4">
                  {contact.mapTitle ?? "Find Us"}
                </h3>
                <ProjectMap
                  location="West Bay, Doha"
                  locationAr="الخليج الغربي، الدوحة"
                  city="Qatar"
                  cityAr="قطر"
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
