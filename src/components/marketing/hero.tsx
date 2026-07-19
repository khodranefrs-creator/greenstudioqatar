import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import Link from 'next/link';
import Image from 'next/image';

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const hero = dict.hero as Record<string, string>;

  const isRtl = locale === 'ar';

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <div className="hero-bg absolute inset-0">
        <Image
          src="/hero-architecture.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          quality={80}
          className="hero-image object-cover object-[center_40%]"
        />
      </div>

      <div className="absolute inset-0 bg-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(17,17,16,0.5) 100%)' }} />

      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-[90rem] px-6 pb-28 sm:px-10 md:pb-32 lg:px-16">
          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <p className="animate-fade-up animate-delay-100 font-body text-[0.65rem] font-medium tracking-[0.4em] uppercase text-offwhite/50 sm:text-[0.7rem]">
                {locale === 'ar' ? 'جريين ستوديو' : 'Green Studio'}
              </p>
            </div>
            <div className="overflow-hidden mt-5 sm:mt-6">
              <h1 className="animate-fade-up animate-delay-200 font-display text-[2.75rem] font-light leading-[1.05] tracking-[-0.02em] text-offwhite sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.5rem]">
                {hero.headline}
              </h1>
            </div>
            <div className="overflow-hidden mt-7 sm:mt-8">
              <p className="animate-fade-up animate-delay-300 font-body text-sm tracking-[0.08em] text-offwhite/55 sm:text-base sm:tracking-[0.1em] max-w-2xl leading-relaxed">
                {hero.subheadline}
              </p>
            </div>
            <div className="animate-fade-up animate-delay-400 mt-10 flex flex-col gap-5 sm:mt-12 sm:flex-row sm:items-center sm:gap-8">
              <Link
                href={`/${locale}/services`}
                className="group inline-flex items-center gap-3 font-body text-[0.8rem] font-medium tracking-[0.08em] text-offwhite transition-colors duration-300"
              >
                {hero.ctaPrimary}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 font-body text-[0.8rem] font-medium tracking-[0.08em] text-offwhite/50 transition-colors duration-300 hover:text-offwhite/80"
              >
                {hero.ctaSecondary}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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
