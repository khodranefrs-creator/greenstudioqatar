// TODO: Verify +974 4412 3456 is a real working phone number before launch.

import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import Link from 'next/link';

interface CtaSectionProps {
  locale: Locale;
}

export default async function CtaSection({ locale }: CtaSectionProps) {
  const dict = await getDictionary(locale);
  const cta = (dict.cta ?? {}) as Record<string, string>;

  const headline = cta.headline ?? (locale === "ar" ? "لنبني شيئاً استثنائياً معاً" : "Let's Build Something Extraordinary Together");
  const button = cta.button ?? (locale === "ar" ? "ابدأ مشروعك" : "Start Your Project");

  return (
    <section className="relative overflow-hidden bg-charcoal py-section-lg sm:py-section-lg">
      <div className="relative mx-auto max-w-[90rem] px-6 text-center sm:px-10 md:px-12 lg:px-16">
        <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-offwhite/60">
          {locale === 'ar' ? 'جاهزين للعمل' : 'Ready to Start?'}
        </p>
        <h2 className="mt-5 font-display text-3xl font-light leading-[1.15] tracking-[-0.02em] text-offwhite sm:text-4xl md:text-5xl lg:text-6xl">
          {headline}
        </h2>
        <div className="mt-10">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex h-13 items-center justify-center bg-offwhite px-10 font-body text-[0.8rem] font-medium tracking-[0.08em] text-charcoal transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.15)]"
          >
            {button}
          </Link>
        </div>
        <p className="mt-6 font-body text-[0.75rem] text-offwhite/60">
          {locale === 'ar' ? 'أو اتصل بنا على ' : 'Or call us at '}
          <a href="tel:+97444123456" className="underline underline-offset-2 decoration-offwhite/30 hover:decoration-offwhite/70 transition-colors">
            +974 4412 3456
          </a>
        </p>
      </div>
    </section>
  );
}
