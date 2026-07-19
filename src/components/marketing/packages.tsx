import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { packages } from '@/data/packages';
import Link from 'next/link';
import Image from 'next/image';
import PackageIndex from './package-index';

interface PackagesProps {
  locale: Locale;
}

export default async function Packages({ locale }: PackagesProps) {
  const dict = await getDictionary(locale);
  const s = dict.packages as Record<string, string>;
  const isRtl = locale === 'ar';

  const featured = packages.find((p) => p.featured);
  const others = packages.filter((p) => !p.featured);
  const ordered = featured ? [featured, ...others] : others;

  return (
    <section id="packages">
      <PackageIndex
        items={ordered.map((p) => ({ id: p.id, name: locale === 'ar' ? p.nameAr : p.nameEn }))}
      />

      {/* ── FEATURED: Sanad ── */}
      {featured && (
        <SanadHero
          pkg={featured}
          locale={locale}
          popularLabel={s.mostPopular}
          timelineLabel={s.timeline}
          startLabel={s.startingInvestment}
        />
      )}

      {/* ── OTHERS: alternating catalogue bands ── */}
      {others.map((pkg, i) => (
        <CatalogueBand
          key={pkg.id}
          pkg={pkg}
          locale={locale}
          index={i}
          timelineLabel={s.timeline}
          startLabel={s.startingInvestment}
        />
      ))}

      {/* ── CLOSING ── */}
      <div className="py-14 sm:py-16">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
          <p className="font-body text-[0.85rem] text-muted/60">{s.customQuote}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-3 inline-flex items-center gap-2 border-b border-charcoal/15 pb-0.5 font-body text-[0.8rem] font-medium text-charcoal/50 transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
          >
            {s.customQuoteCta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3 w-3 transition-transform duration-300 ${isRtl ? 'rotate-180' : ''}`}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SANAD HERO — the ONE dark moment
   ═══════════════════════════════════════════════════════════ */

function SanadHero({
  pkg,
  locale,
  popularLabel,
  timelineLabel,
  startLabel,
}: {
  pkg: (typeof packages)[number];
  locale: Locale;
  popularLabel: string;
  timelineLabel: string;
  startLabel: string;
}) {
  const isRtl = locale === 'ar';
  const name = isRtl ? pkg.nameAr : pkg.nameEn;
  const tagline = isRtl ? pkg.taglineAr : pkg.taglineEn;
  const price = isRtl ? pkg.priceLabelAr : pkg.priceLabelEn;
  const timeline = isRtl ? pkg.timelineAr : pkg.timelineEn;
  const features = isRtl ? pkg.featuresAr : pkg.featuresEn;
  const cta = isRtl ? pkg.ctaAr : pkg.ctaEn;

  return (
    <div className="relative overflow-hidden bg-charcoal text-offwhite py-28 sm:py-36 lg:py-44">
      <Image
        src="/services-architecture.jpg"
        alt=""
        fill
        className="object-cover opacity-[0.06]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/75" />

      <div className="relative mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Identity */}
          <div className="lg:col-span-5">
            <p className="font-body text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent-light">
              {popularLabel}
            </p>
            <p className="mt-3 font-body text-[0.6rem] font-medium tracking-[0.3em] uppercase text-offwhite/25">
              {tagline}
            </p>
            <h3 className="mt-5 font-display text-5xl font-light leading-[1.05] text-offwhite sm:text-6xl lg:text-[4.5rem]">
              {name}
            </h3>

            <div className="mt-16 border-t border-offwhite/[0.08] pt-8">
              <p className="font-body text-[0.65rem] font-medium uppercase tracking-[0.15em] text-offwhite/20">
                {startLabel}
              </p>
              <p className="mt-2 font-body text-lg font-light text-offwhite/50">
                {price}
              </p>
              <p className="mt-1 font-body text-[0.7rem] text-offwhite/20">
                {timelineLabel}: {timeline}
              </p>
            </div>

            <div className="mt-10">
              <Link
                href={`/${locale}/contact`}
                className="group/s inline-flex items-center gap-3 border border-offwhite/20 px-10 py-3.5 font-body text-[0.8rem] font-medium tracking-[0.06em] text-offwhite transition-all duration-300 hover:border-offwhite/50 hover:bg-offwhite hover:text-charcoal"
              >
                {cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-300 group-hover/s:translate-x-1 ${isRtl ? 'rotate-180 group-hover/s:-translate-x-1' : ''}`}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Deliverables */}
          <div className="lg:col-span-7 lg:border-l lg:border-offwhite/[0.05] lg:pl-16">
            <div className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3 border-b border-offwhite/[0.06] py-3.5">
                  <span className="mt-2 h-[2px] w-[2px] shrink-0 rounded-full bg-offwhite/15" />
                  <span className="font-body text-[0.8rem] leading-[1.65] text-offwhite/45">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CATALOGUE BAND — one row per package
   ═══════════════════════════════════════════════════════════ */

function CatalogueBand({
  pkg,
  locale,
  index,
  timelineLabel,
  startLabel,
}: {
  pkg: (typeof packages)[number];
  locale: Locale;
  index: number;
  timelineLabel: string;
  startLabel: string;
}) {
  const isRtl = locale === 'ar';
  const name = isRtl ? pkg.nameAr : pkg.nameEn;
  const tagline = isRtl ? pkg.taglineAr : pkg.taglineEn;
  const price = isRtl ? pkg.priceLabelAr : pkg.priceLabelEn;
  const timeline = isRtl ? pkg.timelineAr : pkg.timelineEn;
  const features = isRtl ? pkg.featuresAr : pkg.featuresEn;
  const cta = isRtl ? pkg.ctaAr : pkg.ctaEn;
  const isWarm = index % 2 === 0;
  const useTwoCols = features.length > 4;

  return (
    <div className={isWarm ? 'bg-surface-secondary' : 'bg-surface'}>
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          {/* Identity */}
          <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-center">
            <h3 className="font-display text-3xl font-light leading-[1.15] text-charcoal sm:text-4xl lg:text-[2.5rem]">
              {name}
            </h3>
            <p className="mt-3 font-body text-[0.85rem] leading-[1.7] text-muted/60">
              {tagline}
            </p>

            <div className="mt-8 border-t border-border pt-6">
              <p className="font-body text-[0.65rem] font-medium uppercase tracking-[0.15em] text-charcoal/20">
                {startLabel}
              </p>
              <p className="mt-1.5 font-body text-[0.95rem] font-light text-charcoal/45">
                {price}
              </p>
              <p className="mt-1 font-body text-[0.65rem] text-charcoal/18">
                {timelineLabel}: {timeline}
              </p>
            </div>

            <div className="mt-7">
              <Link
                href={`/${locale}/contact`}
                className="group/b inline-flex items-center gap-2 border-b border-charcoal/12 pb-0.5 font-body text-[0.75rem] font-medium tracking-wide text-charcoal/35 transition-colors duration-300 hover:border-charcoal/35 hover:text-charcoal"
              >
                {cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-3 w-3 transition-transform duration-300 group-hover/b:translate-x-1 ${isRtl ? 'rotate-180 group-hover/b:-translate-x-1' : ''}`}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Deliverables */}
          <div className="lg:col-span-8 lg:border-l lg:border-border lg:pl-16">
            {useTwoCols ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 border-b border-border py-3">
                    <span className="mt-2 h-[2px] w-[2px] shrink-0 rounded-full bg-charcoal/12" />
                    <span className="font-body text-[0.8rem] leading-[1.65] text-charcoal/42">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 border-b border-border py-3.5 last:border-b-0">
                    <span className="mt-2 h-[2px] w-[2px] shrink-0 rounded-full bg-charcoal/12" />
                    <span className="font-body text-[0.8rem] leading-[1.65] text-charcoal/42">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
