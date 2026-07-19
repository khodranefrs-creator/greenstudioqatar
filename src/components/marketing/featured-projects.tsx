import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { Project } from '@/types';
import Link from 'next/link';

interface FeaturedProjectsProps {
  projects: Project[];
  locale: Locale;
}

export default async function FeaturedProjects({ projects, locale }: FeaturedProjectsProps) {
  const dict = await getDictionary(locale);
  const section = dict.projects as Record<string, string>;

  if (projects.length === 0) {
    return (
      <section className="py-section sm:py-section">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
              {locale === 'ar' ? 'أعمالنا' : 'Our Work'}
            </p>
            <h2 className="mt-4 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-5xl">
              {section.title}
            </h2>
            <p className="mt-6 font-body text-sm leading-[1.85] text-muted sm:text-[0.95rem]">
              {locale === 'ar'
                ? 'قريبًا سنعرض مشاريعنا المتحقق منها. كل مشروع يروي قصة حقيقية.'
                : 'Coming soon — showcasing our verified project portfolio. Every project tells a real story.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
              {locale === 'ar' ? 'عرض الكل' : 'View All'}
            </p>
            <h2 className="mt-4 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-5xl">
              {section.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden sm:inline-flex items-center gap-2 font-body text-[0.8rem] font-medium tracking-[0.05em] text-charcoal/60 transition-colors duration-300 hover:text-charcoal"
          >
            {locale === 'ar' ? 'عرض الكل' : 'View All'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
