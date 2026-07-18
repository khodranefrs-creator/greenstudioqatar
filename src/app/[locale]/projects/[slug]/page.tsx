import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import TechnicalInfo from "@/components/ui/technical-info";
import RelatedProjects from "@/components/ui/related-projects";
import ProjectMap from "@/components/portfolio/project-map";
import { projects, getProjectBySlug } from "@/data/projects";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return projects.flatMap((project) =>
    ["en", "ar"].map((locale) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const title = locale === "ar" ? project.titleAr : project.titleEn;
  const description = locale === "ar" ? project.bodyAr : project.bodyEn;

  return {
    title,
    description: description?.slice(0, 160),
    openGraph: {
      title,
      description: description?.slice(0, 160),
      images: [{ url: project.heroImage, width: 1920, height: 1080 }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug, locale } = await params;
  const typedLocale = locale as Locale;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Container className="py-40 text-center">
        <h1 className="font-display text-3xl text-charcoal">Project not found</h1>
        <Link href={`/${locale}/projects`} className="mt-4 inline-block text-sm text-muted underline">
          Back to Projects
        </Link>
      </Container>
    );
  }

  const dict = await getDictionary(typedLocale) as Record<string, Record<string, unknown>>;
  const projDict = dict.projects as Record<string, string>;

  const title = locale === "ar" ? project.titleAr : project.titleEn;
  const body = locale === "ar" ? project.bodyAr : project.bodyEn;
  const city = locale === "ar" ? project.locationCityAr : project.locationCity;
  const country = locale === "ar" ? project.locationCountryAr : project.locationCountry;

  const galleryImages = project.galleryImages;
  const technicalSpecs = project.technicalSpecs;
  const clientType = project.clientType;
  const status = project.status;

  const specs = (technicalSpecs ?? []).map((s) => ({
    label: s.label,
    labelAr: s.labelAr,
    value: s.value,
    valueAr: s.valueAr,
  }));

  const related = projects
    .filter((p) => p.slug !== project.slug && p.typology === project.typology)
    .slice(0, 3);

  return (
    <>
      <section className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh]">
        <Image
          src={project.heroImage}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-12 sm:pb-16">
          <Link
            href={`/${locale}/projects`}
            className="mb-6 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-offwhite/60 hover:text-offwhite transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {projDict.backToProjects ?? "Back to Projects"}
          </Link>
          <h1 className="font-display text-4xl font-light tracking-tight text-offwhite sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Container>
      </section>

      <section className="border-b border-border py-6">
        <Container>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: projDict.type ?? "Typology", value: project.typology },
              { label: projDict.location ?? "Location", value: `${city}, ${country}` },
              { label: projDict.year ?? "Year", value: String(project.year) },
              { label: projDict.size ?? "Size", value: `${project.sizeSqm.toLocaleString()} sqm` },
              ...(clientType ? [{ label: projDict.client ?? "Client", value: clientType }] : []),
              ...(status ? [{ label: projDict.status ?? "Status", value: projDict[status] ?? status }] : []),
            ].map((item) => (
              <div key={item.label}>
                <span className="text-[10px] uppercase tracking-widest text-muted">{item.label}</span>
                <p className="mt-0.5 text-sm font-medium text-charcoal capitalize">{item.value}</p>
              </div>
            ))}
          </div>
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

      {galleryImages && galleryImages.length > 0 && (
        <section className="py-section-sm sm:py-section-sm">
          <Container>
            <h2 className="font-display text-2xl text-charcoal mb-8">
              {projDict.gallery ?? "Project Gallery"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {galleryImages.map((src, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden ${
                    index === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {specs.length > 0 && (
        <section className="bg-surface-secondary py-section-sm sm:py-section-sm">
          <Container>
            <TechnicalInfo
              specs={specs}
              title="Technical Information"
              titleAr="المعلومات التقنية"
              locale={locale}
            />
          </Container>
        </section>
      )}

      <section className="py-section-sm sm:py-section-sm">
        <Container>
          <ProjectMap
            location={`${city}, ${country}`}
            locationAr={`${city}, ${country}`}
            city={project.locationCity}
            cityAr={project.locationCityAr}
            locale={locale}
          />
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-section-sm sm:py-section-sm">
          <Container>
            <RelatedProjects
              projects={related}
              title="Related Projects"
              titleAr="مشاريع ذات صلة"
              locale={locale}
            />
          </Container>
        </section>
      )}

      <section className="bg-charcoal py-section-lg sm:py-section-lg">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-offwhite sm:text-4xl">
            {locale === "ar" ? "ناقش مشروعاً مشابهاً" : "Discuss a Similar Project"}
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
