import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import Link from 'next/link';

interface CtaSectionProps {
  locale: Locale;
}

export default async function CtaSection({ locale }: CtaSectionProps) {
  const dict = await getDictionary(locale);
  const cta = dict.cta as Record<string, string>;

  return (
    <section className="bg-charcoal py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-7xl px-6 text-center sm:px-8 md:px-12 lg:px-16">
        <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-offwhite sm:text-4xl md:text-5xl lg:text-6xl">
          {cta.headline}
        </h2>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center border border-offwhite/30 px-8 font-body text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10"
          >
            {cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
