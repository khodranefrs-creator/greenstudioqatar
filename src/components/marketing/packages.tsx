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
  const enhanced = remaining.slice(2);

  const tierFoundation = locale === 'ar' ? 'الأساسيات' : 'Essentials';
  const tierEnhanced = locale === 'ar' ? 'المتقدمة' : 'Enhanced';

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

        {featured && (
          <div className="mt-24 relative overflow-hidden bg-charcoal text-offwhite">
            <Image
              src="/services-architecture.jpg"
              alt=""
              fill
              className="object-cover opacity-10"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/80" />
            <div className="relative px-8 sm:px-14 lg:px-20 py-20 sm:py-28">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="font-body text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent-light">
                    {section.mostPopular}
                  </p>
                  <p className="mt-3 font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase text-offwhite/35">
                    {locale === 'ar' ? featured.taglineAr : featured.taglineEn}
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-light leading-[1.1] text-offwhite sm:text-5xl lg:text-[3.5rem]">
                    {locale === 'ar' ? featured.nameAr : featured.nameEn}
                  </h3>

                  <div className="mt-12 border-t border-offwhite/10 pt-8">
                    <p className="font-body text-base font-light text-offwhite/50">
                      {locale === 'ar' ? featured.priceLabelAr : featured.priceLabelEn}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 flex-shrink-0 text-offwhite/25" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                      <span className="font-body text-[0.75rem] text-offwhite/30">
                        {section.timeline}: {locale === 'ar' ? featured.timelineAr : featured.timelineEn}
                      </span>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href={`/${locale}/contact`}
                      className="group/btn inline-flex items-center gap-3 border border-offwhite/20 px-10 py-3.5 font-body text-[0.8rem] font-medium tracking-[0.08em] text-offwhite transition-all duration-300 hover:border-offwhite/40 hover:bg-offwhite hover:text-charcoal"
                    >
                      {locale === 'ar' ? featured.ctaAr : featured.ctaEn}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${locale === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="border-t border-offwhite/10 pt-8 lg:pt-0 lg:border-t-0 lg:border-l lg:border-offwhite/10 lg:pl-12">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                      {(locale === 'ar' ? featured.featuresAr : featured.featuresEn).map((feature) => (
                        <li key={feature} className="font-body text-[0.85rem] leading-relaxed text-offwhite/55">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20">
          <TierHeading label={tierFoundation} />
          <div className="mt-8 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-0">
            {foundation.map((pkg) => (
              <PackageRow
                key={pkg.id}
                pkg={pkg}
                locale={locale}
                timelineLabel={section.timeline}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <TierHeading label={tierEnhanced} />
          <div className="mt-8 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-0">
            {enhanced.map((pkg) => (
              <PackageRow
                key={pkg.id}
                pkg={pkg}
                locale={locale}
                timelineLabel={section.timeline}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <p className="font-body text-sm text-muted">{section.customQuote}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-flex items-center gap-2 border-b border-charcoal/20 pb-0.5 font-body text-sm font-medium text-charcoal transition-colors duration-300 hover:border-charcoal"
          >
            {section.customQuoteCta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3.5 w-3.5 transition-transform duration-300 ${locale === 'ar' ? 'rotate-180' : ''}`}>
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
    <div className="border-t border-border pt-6">
      <h3 className="font-display text-[0.7rem] font-medium tracking-[0.25em] text-charcoal/30 uppercase">
        {label}
      </h3>
    </div>
  );
}

function PackageRow({
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
  const isRtl = locale === 'ar';

  return (
    <div className="group flex flex-col border-t border-border py-10 sm:flex-row sm:items-start sm:gap-10 sm:border-r sm:px-8 sm:py-12 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0">
      <div className="shrink-0 sm:w-48 lg:w-56">
        <h4 className="font-display text-xl font-normal leading-snug text-charcoal sm:text-[1.35rem]">
          {name}
        </h4>
        <p className="mt-2 font-body text-[0.8rem] leading-[1.7] text-muted/70">
          {tagline}
        </p>
        <div className="mt-5">
          <p className="font-body text-[0.8rem] font-light text-charcoal/45">
            {price}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5 flex-shrink-0 text-muted/30" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
              <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-body text-[0.65rem] text-muted/40">
              {timelineLabel}: {timeline}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex-1 sm:mt-0">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {features.map((feature, i) => (
            <span key={feature} className="font-body text-[0.8rem] leading-relaxed text-charcoal/55">
              {feature}{i < features.length - 1 && <span className="ml-4 text-border">·</span>}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href={`/${locale}/contact`}
            className="group/btn inline-flex items-center gap-2 border-b border-charcoal/15 pb-0.5 font-body text-[0.75rem] font-medium tracking-wide text-charcoal/40 transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
          >
            {cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
