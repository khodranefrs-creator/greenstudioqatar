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
  const section = dict.featuredProjects as Record<string, string>;

  return (
    <section className="py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16">
        <h2 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl md:text-5xl">
          {section.title}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                    ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9] sm:aspect-[2/1]'
                    : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={project.heroImage}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-offwhite opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="font-body text-xs tracking-widest uppercase text-offwhite/70">
                    {typology}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-light sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-1 font-body text-xs text-offwhite/60">
                    {location}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
