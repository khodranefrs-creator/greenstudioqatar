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
    <section className="py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative overflow-hidden">
            <div className="aspect-[3/4] sm:aspect-[4/5] relative">
              <Image
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=1000&fit=crop"
                alt="Architectural detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block">
              <p className="font-display text-[8rem] font-light leading-none text-charcoal/[0.04]">
                GS
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
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
      </div>
    </section>
  );
}
