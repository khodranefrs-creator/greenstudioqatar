import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { Service } from '@/types';
import Link from 'next/link';
import React from 'react';

interface ServiceCardsProps {
  services: Service[];
  locale: Locale;
}

const ServiceIcon = ({ icon }: { icon?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    architecture: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.75" className="h-10 w-10">
        <path d="M6 42h36M10 42V14l14-8 14 8v28M18 42v-12h12v12" />
      </svg>
    ),
    engineering: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.75" className="h-10 w-10">
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.86 9.86l4.24 4.24M33.9 33.9l4.24 4.24M9.86 38.14l4.24-4.24M33.9 14.1l4.24-4.24" />
      </svg>
    ),
    interiors: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.75" className="h-10 w-10">
        <rect x="6" y="6" width="36" height="36" rx="2" />
        <path d="M6 18h36M18 42V18" />
        <path d="M24 24v6m-3-3h6" />
      </svg>
    ),
    supervision: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.75" className="h-10 w-10">
        <path d="M4 24s8-16 20-16 20 16 20 16-8 16-20 16S4 24 4 24z" />
        <circle cx="24" cy="24" r="6" />
      </svg>
    ),
    planning: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.75" className="h-10 w-10">
        <rect x="6" y="8" width="36" height="34" rx="2" />
        <path d="M32 4v8M16 4v8M6 18h36" />
        <path d="M6 28h16M26 28h18" />
      </svg>
    ),
  };

  return <>{icons[icon ?? "architecture"] ?? icons.architecture}</>;
};

export default async function ServiceCards({ services, locale }: ServiceCardsProps) {
  const dict = await getDictionary(locale);
  const section = dict.services as Record<string, string>;

  return (
    <section className="bg-surface-secondary py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
            {locale === 'ar' ? 'خدماتنا' : 'Our Expertise'}
          </p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-4 font-body text-sm text-muted max-w-xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.slug}`}
              className="group relative bg-surface border border-border p-7 transition-all duration-500 hover:border-charcoal/20 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]"
            >
              <div className="text-muted transition-colors duration-300 group-hover:text-charcoal">
                <ServiceIcon icon={service.icon} />
              </div>
              <h3 className="mt-5 font-display text-lg font-normal text-charcoal leading-snug">
                {locale === 'ar' ? service.nameAr : service.nameEn}
              </h3>
              <p className="mt-3 font-body text-[0.8rem] leading-relaxed text-muted line-clamp-3">
                {locale === 'ar' ? service.summaryAr : service.summaryEn}
              </p>
              <div className="mt-6 flex items-center gap-2 font-body text-[0.75rem] font-medium tracking-[0.08em] text-charcoal/60 transition-all duration-300 group-hover:text-charcoal group-hover:gap-3">
                {section.viewDetails}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-charcoal transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
