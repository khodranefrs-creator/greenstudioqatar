import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { alternates } from "@/lib/seo/metadata";
import { packageOffersSchema } from "@/lib/seo/json-ld";
import Hero from "@/components/marketing/hero";
import TrustBar from "@/components/marketing/trust-bar";
import FeaturedProjects from "@/components/marketing/featured-projects";
import ServiceCards from "@/components/marketing/service-cards";
import Philosophy from "@/components/marketing/philosophy";
import ProcessTimeline from "@/components/marketing/process-timeline";
import AwardsBar from "@/components/marketing/awards-bar";
import TestimonialCarousel from "@/components/marketing/testimonial-carousel";
import CtaSection from "@/components/marketing/cta-section";
import Packages from "@/components/marketing/packages";
import { getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, string>>;
  const seo = dict.seo;

  return {
    title: locale === "ar" ? seo.defaultTitleAr : seo.defaultTitle,
    description: locale === "ar" ? seo.defaultDescriptionAr : seo.defaultDescription,
    alternates: alternates(locale, ""),
    openGraph: {
      title: locale === "ar" ? seo.defaultTitleAr : seo.defaultTitle,
      description: locale === "ar" ? seo.defaultDescriptionAr : seo.defaultDescription,
      locale: locale === "ar" ? "ar_QA" : "en_US",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const featuredProjects = getFeaturedProjects(5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageOffersSchema()) }}
      />
      <Hero locale={typedLocale} />
      <TrustBar locale={typedLocale} />
      <FeaturedProjects projects={featuredProjects} locale={typedLocale} />
      <ServiceCards services={services} locale={typedLocale} />
      <Packages locale={typedLocale} />
      <Philosophy locale={typedLocale} />
      <ProcessTimeline locale={typedLocale} />
      <AwardsBar locale={typedLocale} />
      <TestimonialCarousel testimonials={testimonials} locale={locale} />
      <CtaSection locale={typedLocale} />
    </>
  );
}
