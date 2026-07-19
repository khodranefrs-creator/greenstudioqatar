import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { packages } from '@/data/packages';
import Link from 'next/link';
import Image from 'next/image';

interface PackagesProps {
  locale: Locale;
}

export default async function Packages({ locale }: PackagesProps) {
  const dict = await getDictionary(locale);
  const section = dict.packages as Record<string, string>;
  const isRtl = locale === 'ar';

  const featured = packages.find((p) => p.featured);
  const others = packages.filter((p) => !p.featured);

  return (
    <section className="bg-surface-secondary py-section-lg sm:py-section-xl">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        {/* Header */}
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

        {/* Featured — the one dark panel */}
        {featured && (
          <div className="mt-20 relative overflow-hidden bg-charcoal text-offwhite">
            <Image
              src="/services-architecture.jpg"
              alt=""
              fill
              className="object-cover opacity-[0.07]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/80" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12">
              <div className="p-8 sm:p-12 lg:col-span-5 lg:p-16">
                <p className="font-body text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent-light">
                  {section.mostPopular}
                </p>
                <p className="mt-3 font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase text-offwhite/30">
                  {locale === 'ar' ? featured.taglineAr : featured.taglineEn}
                </p>
                <h3 className="mt-5 font-display text-4xl font-light leading-[1.1] text-offwhite sm:text-5xl">
                  {locale === 'ar' ? featured.nameAr : featured.nameEn}
                </h3>
                <div className="mt-12 border-t border-offwhite/10 pt-8">
                  <p className="font-body text-lg font-light text-offwhite/50">
                    {locale === 'ar' ? featured.priceLabelAr : featured.priceLabelEn}
                  </p>
                  <p className="mt-2 font-body text-[0.75rem] text-offwhite/25">
                    {section.timeline}: {locale === 'ar' ? featured.timelineAr : featured.timelineEn}
                  </p>
                </div>
                <div className="mt-10">
                  <Link
                    href={`/${locale}/contact`}
                    className="group/f inline-flex items-center gap-3 border border-offwhite/20 px-10 py-3.5 font-body text-[0.8rem] font-medium tracking-[0.08em] text-offwhite transition-all duration-300 hover:border-offwhite/50 hover:bg-offwhite hover:text-charcoal"
                  >
                    {locale === 'ar' ? featured.ctaAr : featured.ctaEn}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-300 group-hover/f:translate-x-1 ${isRtl ? 'rotate-180 group-hover/f:-translate-x-1' : ''}`}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7 lg:border-l lg:border-offwhite/[0.06] lg:p-16">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {(locale === 'ar' ? featured.featuresAr : featured.featuresEn).map((f) => (
                    <li key={f} className="font-body text-[0.85rem] leading-[1.7] text-offwhite/50">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Others — unified grid, same design language */}
        <div className="mt-12 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 bg-border">
          {others.map((pkg) => {
            const name = locale === 'ar' ? pkg.nameAr : pkg.nameEn;
            const tagline = locale === 'ar' ? pkg.taglineAr : pkg.taglineEn;
            const price = locale === 'ar' ? pkg.priceLabelAr : pkg.priceLabelEn;
            const timeline = locale === 'ar' ? pkg.timelineAr : pkg.timelineEn;
            const features = locale === 'ar' ? pkg.featuresAr : pkg.featuresEn;
            const cta = locale === 'ar' ? pkg.ctaAr : pkg.ctaEn;

            return (
              <div key={pkg.id} className="group bg-surface-secondary p-8 sm:p-10">
                <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-muted/50">
                  {tagline}
                </p>
                <h4 className="mt-3 font-display text-2xl font-light leading-snug text-charcoal">
                  {name}
                </h4>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="font-body text-sm font-light text-charcoal/40">
                    {price}
                  </p>
                  <p className="mt-1.5 font-body text-[0.7rem] text-charcoal/25">
                    {section.timeline}: {timeline}
                  </p>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="font-body text-[0.8rem] leading-[1.65] text-charcoal/50">
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href={`/${locale}/contact`}
                    className="group/c inline-flex items-center gap-2 border-b border-charcoal/15 pb-0.5 font-body text-[0.75rem] font-medium tracking-wide text-charcoal/40 transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
                  >
                    {cta}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3 w-3 transition-transform duration-300 group-hover/c:translate-x-1 ${isRtl ? 'rotate-180 group-hover/c:-translate-x-1' : ''}`}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom quote */}
        <div className="mt-16">
          <p className="font-body text-sm text-muted">{section.customQuote}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-flex items-center gap-2 border-b border-charcoal/20 pb-0.5 font-body text-sm font-medium text-charcoal transition-colors duration-300 hover:border-charcoal"
          >
            {section.customQuoteCta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3.5 w-3.5 transition-transform duration-300 ${isRtl ? 'rotate-180' : ''}`}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
