import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";
import ProjectGrid from "@/components/portfolio/project-grid";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const proj = dict.projects as Record<string, string>;

  return {
    title: proj.title ?? "Our Projects",
    description: proj.subtitle ?? "A curated selection of our work across the MENA region.",
    openGraph: { title: proj.title ?? "Our Projects", description: proj.subtitle ?? "" },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const proj = dict.projects as Record<string, string>;

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-32 sm:py-40">
        <div className="hero-bg absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={proj.title ?? ""}
            title={locale === "ar" ? "أعمالنا" : "Our Projects"}
            description={proj.subtitle ?? ""}
            align="center"
            className="mx-auto [&_h2]:text-offwhite [&_p]:text-offwhite/60"
          />
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <ProjectGrid projects={projects} locale={locale} />
        </Container>
      </section>
    </>
  );
}
