import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import Link from 'next/link';

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const hero = dict.hero as Record<string, string>;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <div className="hero-bg absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/60 to-charcoal/90" />
      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="font-display text-5xl font-light leading-[1.05] tracking-tight text-offwhite sm:text-6xl md:text-7xl lg:text-8xl">
              {hero.headline}
            </h1>
            <p className="mt-6 font-body text-sm tracking-[0.2em] text-muted sm:text-base">
              {hero.subline}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center bg-offwhite px-8 font-body text-sm font-medium tracking-wide text-charcoal transition-colors hover:bg-white"
              >
                {hero.ctaWork}
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center border border-offwhite/30 px-8 font-body text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10"
              >
                {hero.ctaConsultation}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-8">
          <div className="scroll-cue h-12 w-px bg-gradient-to-b from-transparent to-muted/40" />
        </div>
      </div>
    </section>
  );
}
