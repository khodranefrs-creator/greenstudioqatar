import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { Package } from '@/types';
import { packages } from '@/data/packages';
import Link from 'next/link';
import Image from 'next/image';

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

  const tierFoundation = locale === 'ar' ? 'الأساسيات' : 'Essentials';
  const tierProfessional = locale === 'ar' ? 'الشاملة' : 'Comprehensive';
  const tierComplete = locale === 'ar' ? 'الكاملة' : 'Full Service';

  return (
    <section className="py-section-lg sm:py-section-xl">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
            {locale === 'ar' ? 'التعاون' : 'Engagement'}
          </p>
          <h2 className="mt-4 font-display text-4xl font-light tracking-[-0.02em] text-charcoal sm:text-5xl md:text-6xl">
            {section.title}
          </h2>
          <p className="mt-6 max-w-xl font-body text-[1.05rem] leading-[1.8] text-muted">
            {section.subtitle}
          </p>
        </div>

        <div className="mt-20">
          <TierHeading label={tierFoundation} />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      <div className="my-16 h-px w-full bg-border" />

      <div>
          <TierHeading label={tierProfessional} />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-20">
          <TierHeading label={tierComplete} />
          {featured && (
            <div className="mt-8 relative overflow-hidden bg-charcoal text-offwhite">
              <Image
                src="/services-architecture.jpg"
                alt=""
                fill
                className="object-cover opacity-10"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/80" />
              <div className="relative flex flex-col lg:flex-row">
                <div className="flex flex-col justify-between p-8 sm:p-12 lg:w-[45%] lg:border-r lg:border-offwhite/10">
                  <div>
                    {featured.popular && (
                      <p className="mb-4 font-body text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent-light">
                        {section.mostPopular}
                      </p>
                    )}
                    <p className="font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase text-offwhite/40">
                      {locale === 'ar' ? featured.taglineAr : featured.taglineEn}
                    </p>
                    <h4 className="mt-4 font-display text-3xl font-normal leading-snug text-offwhite sm:text-4xl lg:text-[2.5rem]">
                      {locale === 'ar' ? featured.nameAr : featured.nameEn}
                    </h4>
                  </div>
                  <div className="mt-10 lg:mt-0">
                    <p className="font-body text-lg font-light text-offwhite/60">
                      {locale === 'ar' ? featured.priceLabelAr : featured.priceLabelEn}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 flex-shrink-0 text-offwhite/30" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                      <span className="font-body text-[0.75rem] text-offwhite/35">
                        {section.timeline}: {locale === 'ar' ? featured.timelineAr : featured.timelineEn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8 sm:p-12">
                  <div className="flex-1 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {(locale === 'ar' ? featured.featuresAr : featured.featuresEn).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent-light/70" aria-hidden="true">
                          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-body text-[0.85rem] leading-relaxed text-offwhite/65">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </div>
                  <div className="mt-10 lg:mt-8 lg:flex lg:justify-end">
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center gap-3 border border-offwhite/20 px-12 py-4 text-center font-body text-[0.8rem] font-medium tracking-[0.08em] text-offwhite transition-all duration-300 hover:border-offwhite/40 hover:bg-offwhite hover:text-charcoal"
                    >
                      {locale === 'ar' ? featured.ctaAr : featured.ctaEn}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-14">
          <p className="font-body text-sm text-muted">{section.customQuote}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-flex items-center gap-2 border-b border-charcoal/20 pb-0.5 font-body text-sm font-medium text-charcoal transition-colors duration-300 hover:border-charcoal"
          >
            {section.customQuoteCta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3.5 w-3.5 ${locale === 'ar' ? 'rotate-180' : ''}`}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TierHeading({ label }: { label: string }) {
  return (
    <h3 className="font-display text-[0.75rem] font-medium tracking-[0.2em] text-charcoal/40 uppercase">
      {label}
    </h3>
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
  const name = locale === 'ar' ? pkg.nameAr : pkg.nameEn;
  const tagline = locale === 'ar' ? pkg.taglineAr : pkg.taglineEn;
  const price = locale === 'ar' ? pkg.priceLabelAr : pkg.priceLabelEn;
  const timeline = locale === 'ar' ? pkg.timelineAr : pkg.timelineEn;
  const features = locale === 'ar' ? pkg.featuresAr : pkg.featuresEn;
  const cta = locale === 'ar' ? pkg.ctaAr : pkg.ctaEn;

  return (
    <div className="group relative flex flex-col bg-surface p-8 transition-all duration-300 hover:bg-surface-secondary sm:p-10">
      <div>
        <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-muted/60">
          {tagline}
        </p>
        <h4 className="mt-2.5 font-display text-xl font-normal leading-snug text-charcoal">
          {name}
        </h4>
      </div>

      <div className="mt-5">
        <p className="font-body text-sm font-light text-charcoal/50">
          {price}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 flex-shrink-0 text-muted/40" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
            <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="font-body text-[0.65rem] text-muted/50">
            {timelineLabel}: {timeline}
          </span>
        </div>
      </div>

      <div className="my-6 h-px w-full bg-border/40" />

      <ul className="flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-charcoal/20" aria-hidden="true">
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          className="group/btn flex w-full items-center justify-center gap-2 border-b border-charcoal/15 py-3 font-body text-[0.7rem] font-medium tracking-[0.08em] text-charcoal/50 transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
        >
          {cta}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1 ${locale === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
