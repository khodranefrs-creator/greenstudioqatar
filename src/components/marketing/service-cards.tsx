import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { Service } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardsProps {
  services: Service[];
  locale: Locale;
}

function Arrow({ locale }: { locale: Locale }) {
  const isRtl = locale === 'ar';
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default async function ServiceCards({ services, locale }: ServiceCardsProps) {
  const dict = await getDictionary(locale);
  const section = dict.services as Record<string, string>;

  return (
    <section className="relative overflow-hidden bg-charcoal text-offwhite py-section-xl sm:py-section-xl">
      <Image
        src="/services-architecture.jpg"
        alt=""
        fill
        className="object-cover opacity-15"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/60" />

      <div className="relative mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-offwhite/40">
                {locale === 'ar' ? 'الخدمات' : 'Services'}
              </p>
              <h2 className="mt-4 font-display text-4xl font-light tracking-[-0.02em] text-offwhite sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
                {section.heading}
              </h2>
              <p className="mt-6 max-w-md font-body text-base leading-[1.85] text-offwhite/50 sm:text-[1.05rem]">
                {section.description}
              </p>
              <div className="mt-10">
                <Link
                  href={`/${locale}/services`}
                  className="group inline-flex items-center gap-3 border-b border-offwhite/20 pb-1 font-body text-[0.9rem] font-medium tracking-wide text-offwhite transition-colors duration-300 hover:border-offwhite/60"
                >
                  {locale === 'ar' ? 'عرض كل الخدمات' : 'View all services'}
                  <Arrow locale={locale} />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {services.map((service, index) => {
              const number = String(index + 1).padStart(2, '0');
              const name = locale === 'ar' ? service.nameAr : service.nameEn;
              const tagline = locale === 'ar' ? service.taglineAr : service.taglineEn;

              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="group flex items-start gap-6 border-t border-offwhite/10 py-10 first:border-t-0 sm:gap-10 sm:py-14"
                >
                  <span className="shrink-0 font-display text-6xl font-light leading-none text-offwhite/[0.06] transition-colors duration-500 group-hover:text-accent-light/40 sm:text-7xl">
                    {number}
                  </span>
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-2xl font-normal tracking-[-0.01em] text-offwhite sm:text-[1.75rem] sm:leading-snug">
                      {name}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-[1.75] text-offwhite/45 sm:text-[0.95rem]">
                      {tagline}
                    </p>
                  </div>
                  <span className="shrink-0 hidden sm:block pt-2 text-offwhite/30 transition-colors duration-300 group-hover:text-offwhite">
                    <Arrow locale={locale} />
                  </span>
                </Link>
              );
            })}
            <div className="border-t border-offwhite/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
