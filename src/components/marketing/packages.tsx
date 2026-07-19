import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { Package } from '@/types';
import { packages } from '@/data/packages';
import Link from 'next/link';

interface PackagesProps {
  locale: Locale;
}

export default async function Packages({ locale }: PackagesProps) {
  const dict = await getDictionary(locale);
  const section = dict.packages as Record<string, string>;

  const consultationPkg = packages.find((p) => p.id === 'consultation');
  const mainPackages = packages.filter((p) => p.id !== 'consultation');

  return (
    <section className="bg-surface py-section-lg sm:py-section-xl">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
            {locale === 'ar' ? 'الاستثمار' : 'Investment'}
          </p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-5xl">
            {section.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted">
            {section.subtitle}
          </p>
        </div>

        {consultationPkg && (
          <div className="mt-14">
            <ConsultationBar
              pkg={consultationPkg}
              locale={locale}
              label={section.notSure}
              ctaLabel={section.notSureCta}
            />
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mainPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              locale={locale}
              timelineLabel={section.timeline}
              popularLabel={section.mostPopular}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-body text-sm text-muted">{section.customQuote}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-block border-b border-charcoal/30 font-body text-sm font-medium text-charcoal transition-colors duration-300 hover:border-charcoal"
          >
            {section.customQuoteCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
  locale,
  timelineLabel,
  popularLabel,
}: {
  pkg: Package;
  locale: Locale;
  timelineLabel: string;
  popularLabel: string;
}) {
  const isFeatured = pkg.featured;
  const isPopular = pkg.popular;
  const name = locale === 'ar' ? pkg.nameAr : pkg.nameEn;
  const tagline = locale === 'ar' ? pkg.taglineAr : pkg.taglineEn;
  const price = locale === 'ar' ? pkg.priceLabelAr : pkg.priceLabelEn;
  const timeline = locale === 'ar' ? pkg.timelineAr : pkg.timelineEn;
  const features = locale === 'ar' ? pkg.featuresAr : pkg.featuresEn;
  const cta = locale === 'ar' ? pkg.ctaAr : pkg.ctaEn;

  return (
    <div
      className={`group relative flex flex-col ${
        isFeatured
          ? 'bg-charcoal text-offwhite border border-charcoal'
          : 'bg-surface border border-border hover:border-charcoal/20 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]'
      }`}
    >
      {isFeatured && (
        <div className="absolute top-0 left-0 h-[2px] w-full bg-accent-light" />
      )}

      {isPopular && (
        <div className="absolute -top-3 left-7 z-10">
          <span className="inline-block bg-accent px-3 py-1 font-body text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-offwhite">
            {popularLabel}
          </span>
        </div>
      )}

      <div className="p-7 pb-0">
        <p
          className={`font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase ${
            isFeatured ? 'text-offwhite/70' : 'text-muted'
          }`}
        >
          {tagline}
        </p>
        <h3
          className={`mt-2 font-display text-xl font-normal leading-snug ${
            isFeatured ? 'text-offwhite' : 'text-charcoal'
          }`}
        >
          {name}
        </h3>
      </div>

      <div className="px-7 pt-5 pb-0">
        <p
          className={`font-display text-2xl font-light tracking-[-0.01em] ${
            isFeatured ? 'text-offwhite' : 'text-charcoal'
          }`}
        >
          {price}
        </p>
      </div>

      <div className="px-7 pt-3 pb-0">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className={`h-3.5 w-3.5 flex-shrink-0 ${
              isFeatured ? 'text-offwhite/50' : 'text-muted'
            }`}
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
            <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span
            className={`font-body text-[0.75rem] ${
              isFeatured ? 'text-offwhite/60' : 'text-muted'
            }`}
          >
            {timelineLabel}: {timeline}
          </span>
        </div>
      </div>

      <div
        className={`my-5 mx-7 h-px w-auto ${
          isFeatured ? 'bg-offwhite/10' : 'bg-border'
        }`}
      />

      <ul className="flex-1 space-y-3 px-7">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${
                isFeatured ? 'text-accent-light' : 'text-accent'
              }`}
              aria-hidden="true"
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-body text-[0.8rem] leading-relaxed ${
                isFeatured ? 'text-offwhite/80' : 'text-charcoal/70'
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="p-7 pt-7">
        <Link
          href={`/${locale}/contact`}
          className={`block w-full text-center font-body text-[0.75rem] font-medium tracking-[0.08em] py-3.5 px-6 transition-all duration-300 ${
            isFeatured
              ? 'bg-offwhite text-charcoal hover:bg-offwhite/90'
              : 'border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-offwhite'
          }`}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

function ConsultationBar({
  pkg,
  locale,
  label,
  ctaLabel,
}: {
  pkg: Package;
  locale: Locale;
  label: string;
  ctaLabel: string;
}) {
  const name = locale === 'ar' ? pkg.nameAr : pkg.nameEn;
  const tagline = locale === 'ar' ? pkg.taglineAr : pkg.taglineEn;
  const price = locale === 'ar' ? pkg.priceLabelAr : pkg.priceLabelEn;
  const timeline = locale === 'ar' ? pkg.timelineAr : pkg.timelineEn;
  const features = locale === 'ar' ? pkg.featuresAr : pkg.featuresEn;

  return (
    <div className="flex flex-col gap-6 border border-border bg-surface-secondary p-7 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <p className="font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase text-muted">
          {tagline}
        </p>
        <h3 className="mt-2 font-display text-lg font-normal text-charcoal">
          {name}
        </h3>
        <p className="mt-1 font-body text-[0.8rem] text-muted">
          {price} &middot; {timeline}
        </p>
        <p className="mt-2 font-body text-[0.75rem] text-muted/80">{label}</p>
      </div>

      <div className="hidden sm:block w-px h-10 bg-border" aria-hidden="true" />

      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-3 w-3 flex-shrink-0 text-accent"
              aria-hidden="true"
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-body text-[0.75rem] text-charcoal/70">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={`/${locale}/contact`}
        className="shrink-0 border border-charcoal/20 px-6 py-3 text-center font-body text-[0.75rem] font-medium tracking-[0.08em] text-charcoal transition-all duration-300 hover:border-charcoal hover:bg-charcoal hover:text-offwhite"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
