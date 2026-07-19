import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

interface PhilosophyProps {
  locale: Locale;
}

export default async function Philosophy({ locale }: PhilosophyProps) {
  const dict = await getDictionary(locale);
  const phil = dict.philosophy as Record<string, string>;

  return (
    <section className="py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
            {locale === 'ar' ? 'فلسفتنا' : 'Our Philosophy'}
          </p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl">
            {phil.title}
          </h2>

          <div className="mt-10 space-y-6">
            <p className="font-body text-base leading-[1.85] text-charcoal/70">
              {phil.p1}
            </p>
            <p className="font-body text-base leading-[1.85] text-charcoal/70">
              {phil.p2}
            </p>
          </div>

          <blockquote className="my-10 border-s-[1.5px] border-accent ps-8">
            <p className="font-display text-xl font-light leading-[1.5] text-charcoal sm:text-2xl italic">
              &ldquo;{phil.pullQuote}&rdquo;
            </p>
          </blockquote>

          <p className="font-body text-base leading-[1.85] text-charcoal/70">
            {phil.p3}
          </p>
        </div>
      </div>
    </section>
  );
}
