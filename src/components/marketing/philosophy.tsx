import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

interface PhilosophyProps {
  locale: Locale;
}

export default async function Philosophy({ locale }: PhilosophyProps) {
  const dict = await getDictionary(locale);
  const phil = dict.philosophy as Record<string, string>;

  return (
    <section className="py-section-lg sm:py-section-xl">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {phil.title}
          </h2>

          <div className="mt-12 space-y-8">
            <p className="font-body text-base leading-[1.9] text-charcoal/65 sm:text-[1.1rem]">
              {phil.p1}
            </p>
            <p className="font-body text-base leading-[1.9] text-charcoal/65 sm:text-[1.1rem]">
              {phil.p2}
            </p>
          </div>
        </div>

        <div className="my-24 sm:my-32">
          <p className="mx-auto max-w-5xl px-6 text-center font-display text-[1.75rem] font-light leading-[1.3] text-charcoal sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
            &ldquo;{phil.pullQuote}&rdquo;
          </p>
        </div>

        <div className="max-w-3xl">
          <p className="font-body text-base leading-[1.9] text-charcoal/65 sm:text-[1.1rem]">
            {phil.p3}
          </p>
        </div>
      </div>
    </section>
  );
}
