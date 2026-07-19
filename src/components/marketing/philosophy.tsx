import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';
import Image from 'next/image';

interface PhilosophyProps {
  locale: Locale;
}

export default async function Philosophy({ locale }: PhilosophyProps) {
  const dict = await getDictionary(locale);
  const phil = dict.philosophy as Record<string, string>;

  return (
    <section className="py-section-lg sm:py-section-xl">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/philosophy-architecture.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 border border-border sm:block" />
          </div>

          <div className="flex flex-col justify-center lg:col-span-7 lg:order-2">
            <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              {phil.title}
            </h2>

            <div className="mt-10 space-y-6">
              <p className="font-body text-base leading-[1.9] text-charcoal/65 sm:text-[1.05rem]">
                {phil.p1}
              </p>
              <p className="font-body text-base leading-[1.9] text-charcoal/65 sm:text-[1.05rem]">
                {phil.p2}
              </p>
            </div>

            <div className="my-12 border-l-2 border-charcoal/10 pl-8">
              <p className="font-display text-[1.5rem] font-light leading-[1.4] text-charcoal sm:text-[2rem] md:text-[2.25rem]">
                &ldquo;{phil.pullQuote}&rdquo;
              </p>
            </div>

            <p className="font-body text-base leading-[1.9] text-charcoal/65 sm:text-[1.05rem]">
              {phil.p3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
