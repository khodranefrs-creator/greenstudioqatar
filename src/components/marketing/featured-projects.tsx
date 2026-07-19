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
      <section className="py-section-lg sm:py-section-lg">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
          <div className="text-center">
            <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
              {locale === 'ar' ? 'أعمالنا' : 'Our Work'}
            </p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-5xl">
              {section.title}
            </h2>
            <p className="mt-4 font-body text-sm text-muted max-w-xl mx-auto">
              {locale === 'ar'
                ? 'قريبًا سنعرض مشاريعنا المتحقق منها. كل مشروع يروي قصة حقيقية.'
                : 'Coming soon — showcasing our verified project portfolio. Every project tells a real story.'}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 border border-border px-6 py-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-muted">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-body text-xs text-muted">
                {locale === 'ar' ? 'قيد الإعداد' : 'Portfolio Under Preparation'}
              </span>
            </div>
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
      </div>
    </section>
  );
}
