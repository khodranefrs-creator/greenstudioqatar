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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-8 w-8">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
    engineering: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-8 w-8">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    interiors: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-8 w-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    supervision: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-8 w-8">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    planning: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-8 w-8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  };

  return <>{icons[icon ?? "architecture"] ?? icons.architecture}</>;
};

export default async function ServiceCards({ services, locale }: ServiceCardsProps) {
  const dict = await getDictionary(locale);
  const section = dict.services as Record<string, string>;

  return (
    <section className="py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16">
        <h2 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl md:text-5xl">
          {section.title}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <div key={service.id} className="group">
              <div className="text-muted transition-colors group-hover:text-charcoal">
                <ServiceIcon icon={service.icon} />
              </div>
              <h3 className="mt-4 font-display text-lg font-normal text-charcoal">
                {locale === 'ar' ? service.nameAr : service.nameEn}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                {locale === 'ar' ? service.summaryAr : service.summaryEn}
              </p>
              <Link
                href={`/${locale}/services/${service.slug}`}
                className="mt-4 inline-flex items-center font-body text-sm text-charcoal underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              >
                {section.learnMore} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
