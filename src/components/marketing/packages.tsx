import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import { packages } from '@/data/packages';
import { Package } from '@/types';
import Link from 'next/link';
import PackageIndex from './package-index';

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

interface PackagesProps {
  locale: Locale;
}

export default async function Packages({ locale }: PackagesProps) {
  const dict = await getDictionary(locale);
  const s = dict.packages as Record<string, string>;
  const isRtl = locale === 'ar';
  const rot = isRtl ? 'rotate-180' : '';
  const sep = isRtl ? '، ' : ', ';

  const n = (p: Package) => (isRtl ? p.nameAr : p.nameEn);
  const tg = (p: Package) => (isRtl ? p.taglineAr : p.taglineEn);
  const pr = (p: Package) => (isRtl ? p.priceLabelAr : p.priceLabelEn);
  const tl = (p: Package) => (isRtl ? p.timelineAr : p.timelineEn);
  const ft = (p: Package) => (isRtl ? p.featuresAr : p.featuresEn);
  const ct = (p: Package) => (isRtl ? p.ctaAr : p.ctaEn);

  const sanad = packages.find((p) => p.featured);
  const design = packages.find((p) => p.id === 'design-package');
  const wasil = packages.find((p) => p.id === 'wasil-package');
  const tasahil = packages.find((p) => p.id === 'tasahil-package');
  const absher = packages.find((p) => p.id === 'absher-package');
  const supervision = packages.find((p) => p.id === 'supervision-package');

  return (
    <section id="packages" className="bg-surface-secondary">
      <PackageIndex
        items={packages.map((p) => ({ id: p.id, name: n(p) }))}
      />

      {/* ─── SANAD: Monumental opening ─── */}
      {sanad && (
        <div
          id={sanad.id}
          className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 pt-28 sm:pt-40 lg:pt-52"
        >
          <p className="font-body text-[0.6rem] font-medium tracking-[0.25em] uppercase text-accent-light/70">
            {s.mostPopular}
          </p>
          <p className="mt-2 font-body text-[0.6rem] tracking-[0.18em] uppercase text-charcoal/18">
            {tg(sanad)}
          </p>
          <h3 className="mt-6 font-display text-[4.5rem] font-light leading-[0.92] tracking-[-0.03em] text-charcoal sm:text-[5.5rem] lg:text-[7rem]">
            {n(sanad)}
          </h3>
          <div className="mt-10 w-1/5 h-px bg-charcoal/[0.08]" />
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <p className="font-body text-[0.875rem] leading-[1.7] text-charcoal/40">
                {tl(sanad)}
              </p>
              <p className="mt-5 font-body text-[0.8125rem] leading-[1.85] text-charcoal/28">
                {ft(sanad).join(sep)}
              </p>
            </div>
            <div className="shrink-0 sm:text-right">
              <p className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-charcoal/15">
                {s.startingInvestment}
              </p>
              <p className="mt-2 font-body text-[0.8125rem] font-light uppercase tracking-[0.06em] text-charcoal/28">
                {pr(sanad)}
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href={`/${locale}/contact`}
              className="group/s inline-flex items-center gap-2 border-b border-charcoal/8 pb-0.5 font-body text-[0.7rem] font-medium text-charcoal/25 transition-colors duration-300 hover:border-charcoal/25 hover:text-charcoal"
            >
              {ct(sanad)}
              <Arrow className={`h-3 w-3 transition-transform duration-300 group-hover/s:translate-x-1 ${rot}`} />
            </Link>
          </div>
        </div>
      )}

      {/* ─── DESIGN + WASIL: Middle dialogue ─── */}
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 lg:pt-40">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          {design && (
            <div id={design.id} className="lg:w-[48%]">
              <h3 className="font-display text-[2.25rem] font-light leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-[2.75rem] lg:text-[3rem]">
                {n(design)}
              </h3>
              <p className="mt-4 font-body text-[0.875rem] leading-[1.7] text-charcoal/40">
                {tg(design)}
              </p>
              <div className="mt-6 w-[15%] h-px bg-charcoal/[0.06]" />
              <p className="mt-5 font-body text-[0.75rem] leading-[1.7] text-charcoal/35">
                {tl(design)}
              </p>
              <p className="mt-4 font-body text-[0.8125rem] leading-[1.85] text-charcoal/28">
                {ft(design).join(sep)}
              </p>
              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-charcoal/15">
                  {s.startingInvestment}
                </span>
                <span className="font-body text-[0.8125rem] font-light uppercase tracking-[0.06em] text-charcoal/28">
                  {pr(design)}
                </span>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="group/d mt-5 inline-flex items-center gap-2 border-b border-charcoal/8 pb-0.5 font-body text-[0.7rem] font-medium text-charcoal/25 transition-colors duration-300 hover:border-charcoal/25 hover:text-charcoal"
              >
                {ct(design)}
                <Arrow className={`h-3 w-3 transition-transform duration-300 group-hover/d:translate-x-1 ${rot}`} />
              </Link>
            </div>
          )}

          {wasil && (
            <div id={wasil.id} className="lg:w-[48%] lg:ml-auto">
              <h3 className="font-display text-[1.75rem] font-light leading-[1.08] tracking-[-0.015em] text-charcoal sm:text-[2rem] lg:text-[2.25rem]">
                {n(wasil)}
              </h3>
              <p className="mt-4 font-body text-[0.875rem] leading-[1.7] text-charcoal/40">
                {tg(wasil)}
              </p>
              <div className="mt-6 w-[15%] h-px bg-charcoal/[0.06] lg:ml-auto" />
              <p className="mt-5 font-body text-[0.75rem] leading-[1.7] text-charcoal/35">
                {tl(wasil)}
              </p>
              <p className="mt-4 font-body text-[0.8125rem] leading-[1.85] text-charcoal/28">
                {ft(wasil).join(sep)}
              </p>
              <div className="mt-5 flex items-baseline gap-4 lg:justify-end">
                <span className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-charcoal/15">
                  {s.startingInvestment}
                </span>
                <span className="font-body text-[0.8125rem] font-light uppercase tracking-[0.06em] text-charcoal/28">
                  {pr(wasil)}
                </span>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="group/w mt-5 inline-flex items-center gap-2 border-b border-charcoal/8 pb-0.5 font-body text-[0.7rem] font-medium text-charcoal/25 transition-colors duration-300 hover:border-charcoal/25 hover:text-charcoal"
              >
                {ct(wasil)}
                <Arrow className={`h-3 w-3 transition-transform duration-300 group-hover/w:translate-x-1 ${rot}`} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ─── TASAHIL + ABSHER + SUPERVISION: Closing cascade ─── */}
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-36">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end">
          {tasahil && (
            <div id={tasahil.id} className="lg:w-[38%]">
              <h3 className="font-display text-[1.5rem] font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-[1.625rem] lg:text-[1.75rem]">
                {n(tasahil)}
              </h3>
              <p className="mt-3 font-body text-[0.8125rem] leading-[1.7] text-charcoal/35">
                {tg(tasahil)}
              </p>
              <p className="mt-3 font-body text-[0.75rem] text-charcoal/25">
                {tl(tasahil)}
              </p>
              <p className="mt-3 font-body text-[0.75rem] leading-[1.8] text-charcoal/22">
                {ft(tasahil).join(sep)}
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-body text-[0.5rem] font-medium uppercase tracking-[0.2em] text-charcoal/12">
                  {s.startingInvestment}
                </span>
                <span className="font-body text-[0.75rem] font-light uppercase tracking-[0.06em] text-charcoal/22">
                  {pr(tasahil)}
                </span>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="mt-4 inline-flex items-center gap-1.5 border-b border-charcoal/6 pb-px font-body text-[0.65rem] font-medium text-charcoal/20 transition-colors duration-300 hover:border-charcoal/20 hover:text-charcoal"
              >
                {ct(tasahil)}
                <Arrow className={`h-2.5 w-2.5 ${rot}`} />
              </Link>
            </div>
          )}

          {absher && (
            <div id={absher.id} className="lg:w-[30%] lg:mx-auto">
              <h3 className="font-display text-[1.25rem] font-light leading-[1.12] tracking-[-0.005em] text-charcoal sm:text-[1.3125rem] lg:text-[1.375rem]">
                {n(absher)}
              </h3>
              <p className="mt-3 font-body text-[0.8125rem] leading-[1.7] text-charcoal/35">
                {tg(absher)}
              </p>
              <p className="mt-3 font-body text-[0.75rem] text-charcoal/25">
                {tl(absher)}
              </p>
              <p className="mt-3 font-body text-[0.75rem] leading-[1.8] text-charcoal/22">
                {ft(absher).join(sep)}
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-body text-[0.5rem] font-medium uppercase tracking-[0.2em] text-charcoal/12">
                  {s.startingInvestment}
                </span>
                <span className="font-body text-[0.75rem] font-light uppercase tracking-[0.06em] text-charcoal/22">
                  {pr(absher)}
                </span>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="mt-4 inline-flex items-center gap-1.5 border-b border-charcoal/6 pb-px font-body text-[0.65rem] font-medium text-charcoal/20 transition-colors duration-300 hover:border-charcoal/20 hover:text-charcoal"
              >
                {ct(absher)}
                <Arrow className={`h-2.5 w-2.5 ${rot}`} />
              </Link>
            </div>
          )}

          {supervision && (
            <div id={supervision.id} className="lg:w-[25%] lg:ml-auto">
              <h3 className="font-display text-[1.125rem] font-light leading-[1.15] tracking-[-0.003em] text-charcoal">
                {n(supervision)}
              </h3>
              <p className="mt-3 font-body text-[0.8125rem] leading-[1.7] text-charcoal/35">
                {tg(supervision)}
              </p>
              <p className="mt-3 font-body text-[0.75rem] text-charcoal/25">
                {tl(supervision)}
              </p>
              <p className="mt-3 font-body text-[0.75rem] leading-[1.8] text-charcoal/22">
                {ft(supervision).join(sep)}
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-body text-[0.5rem] font-medium uppercase tracking-[0.2em] text-charcoal/12">
                  {s.startingInvestment}
                </span>
                <span className="font-body text-[0.75rem] font-light uppercase tracking-[0.06em] text-charcoal/22">
                  {pr(supervision)}
                </span>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="mt-4 inline-flex items-center gap-1.5 border-b border-charcoal/6 pb-px font-body text-[0.65rem] font-medium text-charcoal/20 transition-colors duration-300 hover:border-charcoal/20 hover:text-charcoal"
              >
                {ct(supervision)}
                <Arrow className={`h-2.5 w-2.5 ${rot}`} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ─── Footer note ─── */}
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36">
        <p className="font-body text-[0.75rem] leading-[1.75] text-charcoal/25">
          {s.customQuote}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="mt-3 inline-flex items-center gap-2 border-b border-charcoal/8 pb-0.5 font-body text-[0.7rem] font-medium text-charcoal/20 transition-colors duration-300 hover:border-charcoal/20 hover:text-charcoal"
        >
          {s.customQuoteCta}
          <Arrow className={`h-3 w-3 ${rot}`} />
        </Link>
      </div>
    </section>
  );
}
