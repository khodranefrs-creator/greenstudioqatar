// TODO: Verify +974 4412 3456 is a real working phone number before launch.

import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import Link from 'next/link';
import Image from 'next/image';

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
    <section className="relative overflow-hidden bg-charcoal py-section-xl pb-32 sm:py-section-xl lg:pb-32">
      <Image
        src="/cta-cityscape.jpg"
        alt=""
        fill
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />

      <div className="relative mx-auto max-w-[90rem] px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="max-w-4xl">
          <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-offwhite/40">
            {locale === 'ar' ? 'جاهزين للعمل' : 'Next Step'}
          </p>
          <h2 className="mt-8 font-display text-4xl font-light leading-[1.1] tracking-[-0.02em] text-offwhite sm:text-5xl md:text-6xl lg:text-[5rem] lg:leading-[1.05]">
            {headline}
          </h2>
          <div className="mt-12 sm:mt-14">
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 border border-offwhite/25 px-12 py-4 font-body text-[0.85rem] font-medium tracking-[0.1em] text-offwhite transition-all duration-300 hover:border-offwhite/50 hover:bg-offwhite hover:text-charcoal"
            >
              {button}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <p className="mt-10 font-body text-[0.75rem] text-offwhite/35">
            {locale === 'ar' ? 'أو اتصل بنا على ' : 'Or reach us at '}
            <a href="tel:+97444123456" className="border-b border-offwhite/15 pb-px text-offwhite/50 transition-colors duration-300 hover:border-offwhite/40 hover:text-offwhite/70">
              +974 4412 3456
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
