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

  const featured = packages.find((p) => p.featured);
  const remaining = packages.filter((p) => !p.featured);
  const foundation = remaining.slice(0, 2);
  const upgrades = remaining.slice(2);

  const tierFoundation = locale === 'ar' ? 'الأساسيات' : 'Foundation';
  const tierProfessional = locale === 'ar' ? 'الاحترافية' : 'Professional';
  const tierComplete = locale === 'ar' ? 'الشامل' : 'Complete';

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

        <div className="mt-16">
          <TierHeading label={tierFoundation} />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {foundation.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              locale={locale}
              timelineLabel={section.timeline}
            />
          ))}
        </div>
      </div>

      <div className="my-12 h-px w-full bg-border" />

      <div>
          <TierHeading label={tierProfessional} />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upgrades.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              locale={locale}
              timelineLabel={section.timeline}
            />
            ))}
          </div>
        </div>

        <div className="my-12 h-px w-full bg-border" />

        <div>
          <TierHeading label={tierComplete} />
          {featured && (
            <div className="mt-8">
              <FeaturedCard
                pkg={featured}
                locale={locale}
                timelineLabel={section.timeline}
                popularLabel={section.mostPopular}
              />
            </div>
          )}
        </div>

        <div className="mt-14 text-center">
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

function TierHeading({ label }: { label: string }) {
  return (
    <h3 className="font-display text-sm font-normal tracking-[0.15em] text-charcoal/40 uppercase">
      {label}
    </h3>
  );
}

function FeaturedCard({
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
  const name = locale === 'ar' ? pkg.nameAr : pkg.nameEn;
  const tagline = locale === 'ar' ? pkg.taglineAr : pkg.taglineEn;
  const price = locale === 'ar' ? pkg.priceLabelAr : pkg.priceLabelEn;
  const timeline = locale === 'ar' ? pkg.timelineAr : pkg.timelineEn;
  const features = locale === 'ar' ? pkg.featuresAr : pkg.featuresEn;
  const cta = locale === 'ar' ? pkg.ctaAr : pkg.ctaEn;
  const isPopular = pkg.popular;

  const midpoint = Math.ceil(features.length / 2);
  const leftFeatures = features.slice(0, midpoint);
  const rightFeatures = features.slice(midpoint);

  return (
    <div className="group relative flex flex-col bg-charcoal text-offwhite border border-charcoal lg:flex-row">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-accent-light" />

      {isPopular && (
        <div className="absolute -top-px left-0 z-10 h-[2px] w-24 bg-accent" />
      )}

      <div className="flex flex-col justify-between p-8 sm:p-10 lg:w-[40%] lg:border-r lg:border-offwhite/10">
        <div>
          {isPopular && (
            <p className="mb-4 font-body text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent-light">
              {popularLabel}
            </p>
          )}
          <p className="font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase text-offwhite/50">
            {tagline}
          </p>
          <h4 className="mt-3 font-display text-2xl font-normal leading-snug text-offwhite sm:text-3xl">
            {name}
          </h4>
        </div>

        <div className="mt-8 lg:mt-0">
          <p className="font-body text-base font-light text-offwhite/60">
            {price}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-3 w-3 flex-shrink-0 text-offwhite/30"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
              <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-body text-[0.7rem] text-offwhite/40">
              {timelineLabel}: {timeline}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <div className="flex-1 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <ul className="space-y-3">
            {leftFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent-light/70"
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
                <span className="font-body text-[0.8rem] leading-relaxed text-offwhite/70">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {rightFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent-light/70"
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
                <span className="font-body text-[0.8rem] leading-relaxed text-offwhite/70">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 lg:mt-6 lg:flex lg:justify-end">
          <Link
            href={`/${locale}/contact`}
            className="inline-block border border-offwhite/20 px-10 py-3.5 text-center font-body text-[0.75rem] font-medium tracking-[0.08em] text-offwhite transition-all duration-300 hover:border-offwhite/40 hover:bg-offwhite hover:text-charcoal"
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

function PackageCard({
  pkg,
  locale,
  timelineLabel,
}: {
  pkg: Package;
  locale: Locale;
  timelineLabel: string;
}) {
  const isPopular = pkg.popular;
  const name = locale === 'ar' ? pkg.nameAr : pkg.nameEn;
  const tagline = locale === 'ar' ? pkg.taglineAr : pkg.taglineEn;
  const price = locale === 'ar' ? pkg.priceLabelAr : pkg.priceLabelEn;
  const timeline = locale === 'ar' ? pkg.timelineAr : pkg.timelineEn;
  const features = locale === 'ar' ? pkg.featuresAr : pkg.featuresEn;
  const cta = locale === 'ar' ? pkg.ctaAr : pkg.ctaEn;

  return (
    <div className="group relative flex flex-col border border-border bg-surface p-8 transition-all duration-300 hover:border-charcoal/15">
      {isPopular && (
        <div className="absolute -top-px left-0 z-10 h-[2px] w-20 bg-accent" />
      )}

      <div>
        <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-muted/60">
          {tagline}
        </p>
        <h4 className="mt-2.5 font-display text-lg font-normal leading-snug text-charcoal">
          {name}
        </h4>
      </div>

      <div className="mt-5">
        <p className="font-body text-sm font-light text-charcoal/50">
          {price}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3 w-3 flex-shrink-0 text-muted/40"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
            <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="font-body text-[0.65rem] text-muted/50">
            {timelineLabel}: {timeline}
          </span>
        </div>
      </div>

      <div className="my-6 h-px w-full bg-border/60" />

      <ul className="flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-charcoal/20"
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
            <span className="font-body text-[0.8rem] leading-relaxed text-charcoal/60">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href={`/${locale}/contact`}
          className="block w-full text-center border border-charcoal/15 py-3 px-6 font-body text-[0.7rem] font-medium tracking-[0.08em] text-charcoal/70 transition-all duration-300 hover:border-charcoal/40 hover:text-charcoal"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
