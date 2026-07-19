import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import RelatedProjects from "@/components/ui/related-projects";
import { services, getServiceBySlug } from "@/data/services";
import { projects } from "@/data/projects";
import { teamMap } from "@/data/team";
import { alternates } from "@/lib/seo/metadata";

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return services.flatMap((service) =>
    ["en", "ar"].map((locale) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  const name = locale === "ar" ? service.nameAr : service.nameEn;
  const summary = locale === "ar" ? service.summaryAr : service.summaryEn;

  return {
    title: name,
    description: summary,
    alternates: alternates(locale, `services/${slug}`),
    openGraph: {
      title: name,
      description: summary,
      images: [{ url: service.heroImage, width: 1920, height: 1080 }],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <Container className="py-40 text-center">
        <h1 className="font-display text-3xl text-charcoal">Service not found</h1>
        <Link href={`/${locale}/services`} className="mt-4 inline-block text-sm text-muted underline">
          Back to Services
        </Link>
      </Container>
    );
  }

  const name = locale === "ar" ? service.nameAr : service.nameEn;
  const summary = locale === "ar" ? service.summaryAr : service.summaryEn;
  const body = locale === "ar" ? service.bodyAr : service.bodyEn;

  const deliverables = service.deliverables;
  const faqs = service.faqs;
  const leadId = service.leadArchitectId;
  const lead = leadId ? teamMap.get(leadId) : undefined;

  const relatedProjects = projects.filter((p) => {
    return p.services?.includes(slug);
  }).slice(0, 3);

  const allFaqs = faqs ?? [];

  return (
    <>
      <section className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh]">
        <Image
          src={service.heroImage}
          alt={name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-12 sm:pb-16">
          <Link
            href={`/${locale}/services`}
            className="mb-6 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-offwhite/60 hover:text-offwhite transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {locale === "ar" ? "العودة للخدمات" : "Back to Services"}
          </Link>
          <h1 className="font-display text-4xl font-light tracking-tight text-offwhite sm:text-5xl md:text-6xl">
            {name}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-sm text-offwhite/60 sm:text-base">
            {summary}
          </p>
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {body}
            </p>
          </div>
        </Container>
      </section>

      {deliverables && deliverables.length > 0 && (
        <section className="bg-surface-secondary py-section-sm sm:py-section-sm">
          <Container>
            <h2 className="font-display text-2xl text-charcoal mb-8">
              {locale === "ar" ? "ماذا نقدم" : "What It Includes"}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {deliverables.map((d) => (
                <div key={d.nameEn} className="border border-border p-6">
                  <h3 className="font-display text-lg font-normal text-charcoal">
                    {locale === "ar" ? d.nameAr : d.nameEn}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    {locale === "ar" ? d.descriptionAr : d.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-section-sm sm:py-section-sm">
        <Container>
          <h2 className="font-display text-2xl text-charcoal mb-8">
            {locale === "ar" ? "منهجيتنا" : "Our Approach"}
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-base leading-relaxed text-charcoal/80">
              {locale === "ar"
                ? "نتبع منهجية منظمة وتعاونية تضمن تحقيق أعلى معايير الجودة في كل مرحلة. نعمل عن كثب مع عملائنا لفهم احتياجاتهم وتحويل رؤيتهم إلى واقع."
                : "We follow a structured, collaborative methodology that ensures the highest quality standards at every stage. We work closely with our clients to understand their needs and transform their vision into reality."}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface-secondary py-section-sm sm:py-section-sm">
        <Container>
          <h2 className="font-display text-2xl text-charcoal mb-8">
            {locale === "ar" ? "مراحل العمل" : "Our Process"}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", titleEn: "Discovery", titleAr: "الاستكشاف", descEn: "Understanding your vision, constraints, and goals.", descAr: "فهم رؤيتك وقيودك وأهدافك." },
              { num: "02", titleEn: "Design", titleAr: "التصميم", descEn: "Iterative design development with your feedback.", descAr: "تطوير تصميم تكراري مع ملاحظاتك." },
              { num: "03", titleEn: "Delivery", titleAr: "التسليم", descEn: "Technical documentation and coordination.", descAr: "التوثيق الفني والتنسيق." },
              { num: "04", titleEn: "Support", titleAr: "الدعم", descEn: "Ongoing support through construction and beyond.", descAr: "دعم مستمر خلال البناء وما بعده." },
            ].map((step) => (
              <div key={step.num} className="border border-border p-6">
                <span className="font-display text-3xl font-light text-charcoal/10">{step.num}</span>
                <h3 className="mt-3 font-display text-lg font-normal text-charcoal">
                  {locale === "ar" ? step.titleAr : step.titleEn}
                </h3>
                <p className="mt-2 font-body text-sm text-muted">
                  {locale === "ar" ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {relatedProjects.length > 0 && (
        <section className="py-section-sm sm:py-section-sm">
          <Container>
            <RelatedProjects
              projects={relatedProjects}
              title="Related Projects"
              titleAr="مشاريع ذات صلة"
              locale={locale}
            />
          </Container>
        </section>
      )}

      {lead && (
        <section className="py-section-sm sm:py-section-sm">
          <Container>
            <h2 className="font-display text-2xl text-charcoal mb-8">
              {locale === "ar" ? "المسؤول عن هذا القسم" : "Service Lead"}
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-charcoal/[0.04]">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-xl font-light tracking-wider text-charcoal/15">
                    {lead.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg text-charcoal">{lead.name}</h3>
                <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted">
                  {locale === "ar" ? lead.roleAr : lead.roleEn}
                </p>
                {lead.bioEn && (
                  <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70 max-w-xl">
                    {locale === "ar" ? lead.bioAr : lead.bioEn}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {allFaqs.length > 0 && (
        <section className="bg-surface-secondary py-section-sm sm:py-section-sm">
          <Container>
            <h2 className="font-display text-2xl text-charcoal mb-8">
              {locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-6 max-w-3xl">
              {allFaqs.map((faq, index) => (
                <div key={index} className="border-b border-border pb-6">
                  <h3 className="font-display text-base font-normal text-charcoal">
                    {locale === "ar" ? faq.questionAr : faq.questionEn}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                    {locale === "ar" ? faq.answerAr : faq.answerEn}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-charcoal py-section-lg sm:py-section-lg">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-offwhite sm:text-4xl">
            {locale === "ar" ? "ابدأ مشروعك معنا" : "Start Your Project With Us"}
          </h2>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex h-12 items-center justify-center bg-offwhite px-8 font-body text-sm font-medium tracking-wide text-charcoal transition-colors hover:bg-white"
            >
              {locale === "ar" ? "احجز استشارة" : "Book a Consultation"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center justify-center border border-offwhite/30 px-8 font-body text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10"
            >
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
