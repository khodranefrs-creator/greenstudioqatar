import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { Service } from '@/types';
import Link from 'next/link';

interface ServiceCardsProps {
  services: Service[];
  locale: Locale;
}

function Arrow({ locale }: { locale: Locale }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:-rotate-180 rtl:group-hover:translate-x-[-4px] ${locale === 'ar' ? 'rtl' : ''}`}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default async function ServiceCards({ services, locale }: ServiceCardsProps) {
  const dict = await getDictionary(locale);
  const section = dict.services as Record<string, string>;

  return (
    <section className="bg-surface-secondary py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
            {locale === 'ar' ? 'الخدمات' : 'Services'}
          </p>
          <h2 className="mt-4 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {section.heading}
          </h2>
          <p className="mt-6 font-body text-sm leading-[1.85] text-muted max-w-xl">
            {section.description}
          </p>

          <div className="mt-16">
            {services.map((service, index) => {
              const number = String(index + 1).padStart(2, '0');
              const name = locale === 'ar' ? service.nameAr : service.nameEn;
              const tagline = locale === 'ar' ? service.taglineAr : service.taglineEn;

              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="group flex items-start gap-6 border-t border-border py-10 first:border-t-0 sm:gap-10 sm:py-12"
                >
                  <span className="shrink-0 pt-1 font-body text-[0.7rem] font-medium tracking-[0.15em] text-muted transition-colors duration-300 group-hover:text-charcoal">
                    {number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-normal tracking-[-0.01em] text-charcoal sm:text-2xl">
                      {name}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-[1.75] text-muted sm:text-[0.95rem]">
                      {tagline}
                    </p>
                  </div>
                  <span className="shrink-0 hidden sm:block pt-1.5 text-muted transition-colors duration-300 group-hover:text-charcoal">
                    <Arrow locale={locale} />
                  </span>
                </Link>
              );
            })}
            <div className="border-t border-border" />
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href={`/${locale}/services`}
              className="group inline-flex items-center gap-2 font-body text-sm font-medium tracking-wide text-charcoal/60 transition-colors duration-300 hover:text-charcoal"
            >
              {locale === 'ar' ? 'عرض كل الخدمات' : 'View all services'}
              <Arrow locale={locale} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
