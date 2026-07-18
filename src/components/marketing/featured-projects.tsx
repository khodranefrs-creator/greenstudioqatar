import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedProjectsProps {
  projects: Project[];
  locale: Locale;
}

export default async function FeaturedProjects({ projects, locale }: FeaturedProjectsProps) {
  const dict = await getDictionary(locale);
  const section = dict.projects as Record<string, string>;

  return (
    <section className="py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
              {locale === 'ar' ? '精选' : 'Selected Work'}
            </p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-5xl">
              {section.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden sm:inline-flex items-center gap-2 font-body text-[0.8rem] font-medium tracking-[0.05em] text-charcoal/60 hover:text-charcoal transition-colors"
          >
            {locale === 'ar' ? 'عرض الكل' : 'View All'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {projects.slice(0, 5).map((project, index) => {
            const isLarge = index < 2;
            const title = locale === 'ar' ? project.titleAr : project.titleEn;
            const typology = project.typology;
            const location = locale === 'ar' ? `${project.locationCityAr}, ${project.locationCountryAr}` : `${project.locationCity}, ${project.locationCountry}`;

            return (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.slug}`}
                className={`group relative overflow-hidden ${
                  isLarge
                    ? 'sm:col-span-1 lg:col-span-6 aspect-[4/3] sm:aspect-[3/2]'
                    : 'sm:col-span-1 lg:col-span-4 aspect-[4/3]'
                }`}
              >
                <Image
                  src={project.heroImage}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes={isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="font-body text-[0.65rem] font-medium tracking-[0.25em] uppercase text-offwhite/50">
                    {typology}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-light text-offwhite sm:text-2xl leading-tight">
                    {title}
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-body text-xs text-offwhite/40">
                      {location}
                    </span>
                    {project.year && (
                      <>
                        <span className="text-offwhite/20">·</span>
                        <span className="font-body text-xs text-offwhite/40">
                          {project.year}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mt-5 overflow-hidden">
                    <span className="inline-flex items-center gap-2 font-body text-[0.7rem] font-medium tracking-[0.1em] text-offwhite/60 transition-all duration-300 group-hover:text-offwhite group-hover:translate-x-1">
                      {locale === 'ar' ? 'عرض المشروع' : 'View Project'}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-charcoal/60 hover:text-charcoal transition-colors"
          >
            {locale === 'ar' ? 'عرض الكل' : 'View All Projects'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
