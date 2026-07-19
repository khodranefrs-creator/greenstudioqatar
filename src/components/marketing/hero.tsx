import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import Link from 'next/link';

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const hero = dict.hero as Record<string, string>;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <div className="hero-bg absolute inset-0">
        <div className="absolute inset-0 bg-charcoal" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-[90rem] px-6 pb-28 sm:px-10 md:pb-32 lg:px-16">
          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <p className="animate-fade-up animate-delay-100 font-body text-[0.7rem] font-medium tracking-[0.35em] uppercase text-offwhite/60 sm:text-[0.75rem]">
                {locale === 'ar' ? 'جريين ستوديو للتصميم والاستشارات' : 'Green Studio for Design & Consultancy'}
              </p>
            </div>
            <div className="overflow-hidden mt-5">
              <h1 className="animate-fade-up animate-delay-200 font-display text-[2.75rem] font-light leading-[1.05] tracking-[-0.02em] text-offwhite sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                {hero.headline}
              </h1>
            </div>
            <div className="overflow-hidden mt-6">
              <p className="animate-fade-up animate-delay-300 font-body text-sm tracking-[0.12em] text-offwhite/70 sm:text-base sm:tracking-[0.15em] max-w-2xl">
                {hero.subheadline}
              </p>
            </div>
            <div className="animate-fade-up animate-delay-400 mt-12 flex flex-col gap-4 sm:flex-row sm:gap-5">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex h-13 items-center justify-center bg-offwhite px-9 font-body text-[0.8rem] font-medium tracking-[0.08em] text-charcoal transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                {hero.ctaPrimary}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-13 items-center justify-center border border-offwhite/25 px-9 font-body text-[0.8rem] font-medium tracking-[0.08em] text-offwhite/90 transition-colors duration-300 hover:border-offwhite/50 hover:bg-offwhite/10 hover:text-offwhite"
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16 flex justify-end pb-10">
            <div className="scroll-cue h-16 w-px bg-gradient-to-b from-offwhite/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
