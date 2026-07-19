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
  const remaining = packages.filter((p) => !p.featured);
  const design = remaining[0];
  const supervision = remaining[1];
  const wasil = remaining[2];
  const tasahil = remaining[3];
  const absher = remaining[4];

  const arrow = (cls?: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 ${cls ?? ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );

  return (
    <section>
      {/* ── HEADER ── */}
      <div className="bg-surface-secondary py-section-lg sm:py-section-xl">
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
        </div>
      </div>

      {/* ── SANAD: Cinematic hero ── */}
      {featured && (
        <div className="relative overflow-hidden bg-charcoal text-offwhite">
          <Image
            src="/services-architecture.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/70" />
          <div className="relative mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-40">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-body text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent-light">
                  {section.mostPopular}
                </p>
                <p className="mt-3 font-body text-[0.65rem] font-medium tracking-[0.3em] uppercase text-offwhite/30">
                  {locale === 'ar' ? featured.taglineAr : featured.taglineEn}
                </p>
                <h3 className="mt-5 font-display text-5xl font-light leading-[1.05] text-offwhite sm:text-6xl lg:text-[4.5rem]">
                  {locale === 'ar' ? featured.nameAr : featured.nameEn}
                </h3>
                <div className="mt-16 border-t border-offwhite/10 pt-8">
                  <p className="font-body text-lg font-light text-offwhite/45">
                    {locale === 'ar' ? featured.priceLabelAr : featured.priceLabelEn}
                  </p>
                  <p className="mt-2 font-body text-[0.75rem] text-offwhite/25">
                    {section.timeline}: {locale === 'ar' ? featured.timelineAr : featured.timelineEn}
                  </p>
                </div>
                <div className="mt-10">
                  <Link
                    href={`/${locale}/contact`}
                    className="group/s inline-flex items-center gap-3 border border-offwhite/20 px-12 py-4 font-body text-[0.8rem] font-medium tracking-[0.08em] text-offwhite transition-all duration-300 hover:border-offwhite/50 hover:bg-offwhite hover:text-charcoal"
                  >
                    {locale === 'ar' ? featured.ctaAr : featured.ctaEn}
                    <span className={`transition-transform duration-300 group-hover/s:translate-x-1 ${isRtl ? 'rotate-180 group-hover/s:-translate-x-1' : ''}`}>{arrow()}</span>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7 lg:pl-16 lg:border-l lg:border-offwhite/[0.06]">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  {(locale === 'ar' ? featured.featuresAr : featured.featuresEn).map((f) => (
                    <li key={f} className="font-body text-[0.85rem] leading-[1.7] text-offwhite/50">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DESIGN: Light editorial panel ── */}
      {design && (
        <div className="bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-charcoal/25">
                  {locale === 'ar' ? 'الأساسيات' : 'Essentials'}
                </p>
                <h3 className="mt-4 font-display text-4xl font-light leading-[1.1] text-charcoal sm:text-5xl lg:text-[3.5rem]">
                  {locale === 'ar' ? design.nameAr : design.nameEn}
                </h3>
                <p className="mt-4 max-w-sm font-body text-[0.95rem] leading-[1.75] text-muted">
                  {locale === 'ar' ? design.taglineAr : design.taglineEn}
                </p>
                <div className="mt-12 border-t border-border pt-8">
                  <p className="font-body text-base font-light text-charcoal/45">
                    {locale === 'ar' ? design.priceLabelAr : design.priceLabelEn}
                  </p>
                  <p className="mt-2 font-body text-[0.75rem] text-charcoal/25">
                    {section.timeline}: {locale === 'ar' ? design.timelineAr : design.timelineEn}
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href={`/${locale}/contact`}
                    className="group/d inline-flex items-center gap-2 border-b border-charcoal/15 pb-0.5 font-body text-[0.8rem] font-medium tracking-wide text-charcoal/50 transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
                  >
                    {locale === 'ar' ? design.ctaAr : design.ctaEn}
                    <span className={`transition-transform duration-300 group-hover/d:translate-x-1 ${isRtl ? 'rotate-180 group-hover/d:-translate-x-1' : ''}`}>{arrow('h-3.5 w-3.5')}</span>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="border-t border-border pt-10 lg:border-t-0 lg:border-l lg:border-border lg:pl-16 lg:pt-0">
                  <ul className="space-y-4">
                    {locale === 'ar' ? design.featuresAr : design.featuresEn.map((f) => (
                      <li key={f} className="flex items-start gap-4">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-charcoal/15" />
                        <span className="font-body text-[0.9rem] leading-[1.7] text-charcoal/55">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SUPERVISION: Dark panel ── */}
      {supervision && (
        <div className="bg-charcoal text-offwhite py-24 sm:py-32">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7 lg:order-2">
                <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-offwhite/25">
                  {locale === 'ar' ? 'الأساسيات' : 'Essentials'}
                </p>
                <h3 className="mt-4 font-display text-4xl font-light leading-[1.1] text-offwhite sm:text-5xl lg:text-[3.5rem]">
                  {locale === 'ar' ? supervision.nameAr : supervision.nameEn}
                </h3>
                <p className="mt-4 max-w-sm font-body text-[0.95rem] leading-[1.75] text-offwhite/40">
                  {locale === 'ar' ? supervision.taglineAr : supervision.taglineEn}
                </p>
                <div className="mt-12 border-t border-offwhite/10 pt-8">
                  <p className="font-body text-base font-light text-offwhite/45">
                    {locale === 'ar' ? supervision.priceLabelAr : supervision.priceLabelEn}
                  </p>
                  <p className="mt-2 font-body text-[0.75rem] text-offwhite/25">
                    {section.timeline}: {locale === 'ar' ? supervision.timelineAr : supervision.timelineEn}
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href={`/${locale}/contact`}
                    className="group/sv inline-flex items-center gap-2 border-b border-offwhite/15 pb-0.5 font-body text-[0.8rem] font-medium tracking-wide text-offwhite/40 transition-colors duration-300 hover:border-offwhite/40 hover:text-offwhite"
                  >
                    {locale === 'ar' ? supervision.ctaAr : supervision.ctaEn}
                    <span className={`transition-transform duration-300 group-hover/sv:translate-x-1 ${isRtl ? 'rotate-180 group-hover/sv:-translate-x-1' : ''}`}>{arrow('h-3.5 w-3.5')}</span>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 lg:order-1">
                <div className="border-t border-offwhite/10 pt-10 lg:border-t-0 lg:border-r lg:border-offwhite/[0.06] lg:pr-16 lg:pt-0">
                  <ul className="space-y-4">
                    {(locale === 'ar' ? supervision.featuresAr : supervision.featuresEn).map((f) => (
                      <li key={f} className="flex items-start gap-4">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-offwhite/15" />
                        <span className="font-body text-[0.9rem] leading-[1.7] text-offwhite/50">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── WASIL + TASAHIL: Split-screen ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {wasil && (
          <div className="bg-surface-secondary py-24 sm:py-32 sm:pr-10 lg:pr-16">
            <div className="px-6 sm:px-0 lg:pl-16">
              <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-charcoal/25">
                {locale === 'ar' ? 'المتقدمة' : 'Enhanced'}
              </p>
              <h3 className="mt-4 font-display text-3xl font-light leading-[1.15] text-charcoal sm:text-4xl lg:text-[2.75rem]">
                {locale === 'ar' ? wasil.nameAr : wasil.nameEn}
              </h3>
              <p className="mt-3 max-w-xs font-body text-[0.9rem] leading-[1.7] text-muted">
                {locale === 'ar' ? wasil.taglineAr : wasil.taglineEn}
              </p>
              <div className="mt-10 border-t border-border pt-6">
                <p className="font-body text-sm font-light text-charcoal/40">
                  {locale === 'ar' ? wasil.priceLabelAr : wasil.priceLabelEn}
                </p>
                <p className="mt-1.5 font-body text-[0.7rem] text-charcoal/20">
                  {section.timeline}: {locale === 'ar' ? wasil.timelineAr : wasil.timelineEn}
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {(locale === 'ar' ? wasil.featuresAr : wasil.featuresEn).map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-charcoal/15" />
                    <span className="font-body text-[0.8rem] leading-[1.7] text-charcoal/50">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={`/${locale}/contact`}
                  className="group/w inline-flex items-center gap-2 border-b border-charcoal/15 pb-0.5 font-body text-[0.75rem] font-medium tracking-wide text-charcoal/40 transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
                >
                  {locale === 'ar' ? wasil.ctaAr : wasil.ctaEn}
                  <span className={`transition-transform duration-300 group-hover/w:translate-x-1 ${isRtl ? 'rotate-180 group-hover/w:-translate-x-1' : ''}`}>{arrow('h-3 w-3')}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
        {tasahil && (
          <div className="bg-charcoal text-offwhite py-24 sm:py-32 sm:pl-10 lg:pl-16">
            <div className="px-6 sm:px-0 lg:pr-16">
              <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-offwhite/25">
                {locale === 'ar' ? 'المتقدمة' : 'Enhanced'}
              </p>
              <h3 className="mt-4 font-display text-3xl font-light leading-[1.15] text-offwhite sm:text-4xl lg:text-[2.75rem]">
                {locale === 'ar' ? tasahil.nameAr : tasahil.nameEn}
              </h3>
              <p className="mt-3 max-w-xs font-body text-[0.9rem] leading-[1.7] text-offwhite/40">
                {locale === 'ar' ? tasahil.taglineAr : tasahil.taglineEn}
              </p>
              <div className="mt-10 border-t border-offwhite/10 pt-6">
                <p className="font-body text-sm font-light text-offwhite/40">
                  {locale === 'ar' ? tasahil.priceLabelAr : tasahil.priceLabelEn}
                </p>
                <p className="mt-1.5 font-body text-[0.7rem] text-offwhite/20">
                  {section.timeline}: {locale === 'ar' ? tasahil.timelineAr : tasahil.timelineEn}
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {(locale === 'ar' ? tasahil.featuresAr : tasahil.featuresEn).map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-offwhite/15" />
                    <span className="font-body text-[0.8rem] leading-[1.7] text-offwhite/45">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={`/${locale}/contact`}
                  className="group/t inline-flex items-center gap-2 border-b border-offwhite/15 pb-0.5 font-body text-[0.75rem] font-medium tracking-wide text-offwhite/35 transition-colors duration-300 hover:border-offwhite/40 hover:text-offwhite"
                >
                  {locale === 'ar' ? tasahil.ctaAr : tasahil.ctaEn}
                  <span className={`transition-transform duration-300 group-hover/t:translate-x-1 ${isRtl ? 'rotate-180 group-hover/t:-translate-x-1' : ''}`}>{arrow('h-3 w-3')}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── ABSHER: Warm panel with accent ── */}
      {absher && (
        <div className="border-y border-charcoal/[0.06] bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="border-l-2 border-accent/30 pl-8">
                  <p className="font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-charcoal/25">
                    {locale === 'ar' ? 'المتقدمة' : 'Enhanced'}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-light leading-[1.15] text-charcoal sm:text-4xl">
                    {locale === 'ar' ? absher.nameAr : absher.nameEn}
                  </h3>
                  <p className="mt-3 font-body text-[0.9rem] leading-[1.7] text-muted">
                    {locale === 'ar' ? absher.taglineAr : absher.taglineEn}
                  </p>
                  <div className="mt-8 border-t border-border pt-6">
                    <p className="font-body text-sm font-light text-charcoal/40">
                      {locale === 'ar' ? absher.priceLabelAr : absher.priceLabelEn}
                    </p>
                    <p className="mt-1.5 font-body text-[0.7rem] text-charcoal/20">
                      {section.timeline}: {locale === 'ar' ? absher.timelineAr : absher.timelineEn}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <ul className="space-y-4 pt-2 lg:pt-0">
                  {(locale === 'ar' ? absher.featuresAr : absher.featuresEn).map((f) => (
                    <li key={f} className="flex items-start gap-4">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-charcoal/15" />
                      <span className="font-body text-[0.9rem] leading-[1.7] text-charcoal/55">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-3 flex items-end lg:justify-end">
                <Link
                  href={`/${locale}/contact`}
                  className="group/a inline-flex items-center gap-2 border-b border-charcoal/15 pb-0.5 font-body text-[0.8rem] font-medium tracking-wide text-charcoal/50 transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
                >
                  {locale === 'ar' ? absher.ctaAr : absher.ctaEn}
                  <span className={`transition-transform duration-300 group-hover/a:translate-x-1 ${isRtl ? 'rotate-180 group-hover/a:-translate-x-1' : ''}`}>{arrow('h-3.5 w-3.5')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CUSTOM QUOTE ── */}
      <div className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
          <p className="font-body text-sm text-muted">{section.customQuote}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-flex items-center gap-2 border-b border-charcoal/20 pb-0.5 font-body text-sm font-medium text-charcoal transition-colors duration-300 hover:border-charcoal"
          >
            {section.customQuoteCta}
            <span className={`transition-transform duration-300 ${isRtl ? 'rotate-180' : ''}`}>{arrow('h-3.5 w-3.5')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
