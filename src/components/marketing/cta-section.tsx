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

  const headline = cta.headline ?? (locale === "ar" ? "كل مبنى عظيم يبدأ بمحادثة" : "Every great building begins with a conversation.");
  const button = cta.button ?? (locale === "ar" ? "ابدأ استشارة" : "Begin a Consultation");
  const isRtl = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-charcoal py-section-lg pb-28 sm:py-section-xl lg:pb-0">
      <div className="relative mx-auto max-w-[90rem] px-6 text-center sm:px-10 md:px-12 lg:px-16">
        <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-offwhite/40">
          {locale === 'ar' ? 'جاهزين للعمل' : 'Next Step'}
        </p>
        <h2 className="mt-6 font-display text-3xl font-light leading-[1.15] tracking-[-0.02em] text-offwhite sm:text-4xl md:text-5xl lg:text-[4rem]">
          {headline}
        </h2>
        <div className="mt-10 sm:mt-12">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-3 border-b border-offwhite/30 pb-1 font-body text-[0.9rem] font-medium tracking-[0.1em] text-offwhite transition-colors duration-300 hover:border-offwhite/70"
          >
            {button}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <p className="mt-8 font-body text-[0.75rem] text-offwhite/45">
          {locale === 'ar' ? 'أو اتصل بنا على ' : 'Or reach us at '}
          <a href="tel:+97444123456" className="border-b border-offwhite/20 pb-px text-offwhite/60 transition-colors duration-300 hover:border-offwhite/50 hover:text-offwhite/80">
            +974 4412 3456
          </a>
        </p>
      </div>
    </section>
  );
}
