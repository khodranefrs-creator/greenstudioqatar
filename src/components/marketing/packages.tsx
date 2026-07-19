import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { packages } from '@/data/packages';
import Link from 'next/link';
import PackageIndex from './package-index';

interface PackagesProps {
  locale: Locale;
}

export default async function Packages({ locale }: PackagesProps) {
  const dict = await getDictionary(locale);
  const section = dict.packages as Record<string, string>;
  const isRtl = locale === 'ar';

  const featured = packages.find((p) => p.featured);
  const others = packages.filter((p) => !p.featured);
  const ordered = featured ? [featured, ...others] : others;

  const indexItems = ordered.map((pkg) => ({
    id: pkg.id,
    name: locale === 'ar' ? pkg.nameAr : pkg.nameEn,
  }));

  return (
    <section className="bg-surface-secondary" id="packages">
      <PackageIndex items={indexItems} />

      {ordered.map((pkg, index) => {
        const isFeatured = !!pkg.featured;
        const name = locale === 'ar' ? pkg.nameAr : pkg.nameEn;
        const tagline = locale === 'ar' ? pkg.taglineAr : pkg.taglineEn;
        const price = locale === 'ar' ? pkg.priceLabelAr : pkg.priceLabelEn;
        const timeline = locale === 'ar' ? pkg.timelineAr : pkg.timelineEn;
        const features = locale === 'ar' ? pkg.featuresAr : pkg.featuresEn;
        const cta = locale === 'ar' ? pkg.ctaAr : pkg.ctaEn;
        const useTwoCols = features.length > 4;
        const isEven = index % 2 === 0;

        return (
          <div
            key={pkg.id}
            id={pkg.id}
            className={
              isFeatured
                ? 'bg-charcoal text-offwhite py-24 sm:py-32 lg:py-40'
                : 'py-20 sm:py-28'
            }
          >
            <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
                <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
                  <ChapterContent
                    locale={locale}
                    name={name}
                    tagline={tagline}
                    price={price}
                    timeline={timeline}
                    cta={cta}
                    isRtl={isRtl}
                    timelineLabel={section.timeline}
                    startingLabel={section.startingInvestment}
                    isFeatured={isFeatured}
                  />
                </div>
                <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-1'}`}>
                  <div
                    className={
                      isFeatured
                        ? 'border-t border-offwhite/[0.06] pt-10 lg:border-t-0 lg:border-l lg:border-offwhite/[0.06] lg:pl-16 lg:pt-0'
                        : 'border-t border-border pt-10 lg:border-t-0 lg:border-l lg:border-border lg:pl-16 lg:pt-0'
                    }
                  >
                    {useTwoCols ? (
                      <div className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
                        {features.map((f) => (
                          <li
                            key={f}
                            className={`flex items-start gap-4 border-b py-4 list-none ${
                              isFeatured ? 'border-offwhite/[0.06]' : 'border-border'
                            }`}
                          >
                            <span
                              className={`mt-1.5 h-[3px] w-[3px] shrink-0 rounded-full ${
                                isFeatured ? 'bg-offwhite/20' : 'bg-charcoal/15'
                              }`}
                            />
                            <span
                              className={`font-body text-[0.85rem] leading-[1.7] ${
                                isFeatured ? 'text-offwhite/50' : 'text-charcoal/50'
                              }`}
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-0">
                        {features.map((f) => (
                          <li
                            key={f}
                            className={`flex items-start gap-4 border-b py-4 last:border-b-0 ${
                              isFeatured ? 'border-offwhite/[0.06]' : 'border-border'
                            }`}
                          >
                            <span
                              className={`mt-1.5 h-[3px] w-[3px] shrink-0 rounded-full ${
                                isFeatured ? 'bg-offwhite/20' : 'bg-charcoal/15'
                              }`}
                            />
                            <span
                              className={`font-body text-[0.85rem] leading-[1.7] ${
                                isFeatured ? 'text-offwhite/50' : 'text-charcoal/50'
                              }`}
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
          <p className="font-body text-sm text-muted">{section.customQuote}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-flex items-center gap-2 border-b border-charcoal/20 pb-0.5 font-body text-sm font-medium text-charcoal transition-colors duration-300 hover:border-charcoal"
          >
            {section.customQuoteCta}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`h-3.5 w-3.5 transition-transform duration-300 ${isRtl ? 'rotate-180' : ''}`}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ChapterContent({
  locale,
  name,
  tagline,
  price,
  timeline,
  cta,
  isRtl,
  timelineLabel,
  startingLabel,
  isFeatured,
}: {
  locale: Locale;
  name: string;
  tagline: string;
  price: string;
  timeline: string;
  cta: string;
  isRtl: boolean;
  timelineLabel: string;
  startingLabel: string;
  isFeatured: boolean;
}) {
  const textPrimary = isFeatured ? 'text-offwhite' : 'text-charcoal';
  const textSecondary = isFeatured ? 'text-offwhite/60' : 'text-charcoal/60';
  const textMuted = isFeatured ? 'text-offwhite/35' : 'text-muted';
  const textSubtle = isFeatured ? 'text-offwhite/20' : 'text-charcoal/25';
  const borderColor = isFeatured ? 'border-offwhite/10' : 'border-border';
  const linkClasses = isFeatured
    ? 'text-offwhite/35 hover:text-offwhite border-offwhite/15 hover:border-offwhite/40'
    : 'text-charcoal/40 hover:text-charcoal border-charcoal/15 hover:border-charcoal/40';

  return (
    <div>
      <h3
        className={`font-display text-4xl font-light leading-[1.1] sm:text-5xl lg:text-[3.5rem] ${textPrimary}`}
      >
        {name}
      </h3>
      <p
        className={`mt-4 max-w-md font-body text-[1rem] leading-[1.7] font-light ${textMuted}`}
      >
        {tagline}
      </p>

      <div className={`mt-12 border-t ${borderColor} pt-8`}>
        <p
          className={`font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] ${textSubtle}`}
        >
          {startingLabel}
        </p>
        <p className={`mt-2 font-body text-[1.1rem] font-light ${textSecondary}`}>
          {price}
        </p>
        <p className={`mt-1.5 font-body text-[0.75rem] ${textSubtle}`}>
          {timelineLabel}: {timeline}
        </p>
      </div>

      <div className="mt-8">
        <Link
          href={`/${locale}/contact`}
          className={`group/c inline-flex items-center gap-2 border-b ${linkClasses} pb-0.5 font-body text-[0.8rem] font-medium tracking-wide transition-colors duration-300`}
        >
          {cta}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`h-3.5 w-3.5 transition-transform duration-300 group-hover/c:translate-x-1 ${isRtl ? 'rotate-180 group-hover/c:-translate-x-1' : ''}`}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
