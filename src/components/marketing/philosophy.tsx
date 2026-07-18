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
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16">
        <h2 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl md:text-5xl">
          {phil.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
            <Image
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=1000&fit=crop"
              alt="Architectural detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-body text-base leading-relaxed text-charcoal/80">
              {phil.p1}
            </p>
            <p className="mt-6 font-body text-base leading-relaxed text-charcoal/80">
              {phil.p2}
            </p>

            <blockquote className="my-10 border-s-2 border-accent ps-6">
              <p className="font-display text-2xl font-light leading-snug text-charcoal sm:text-3xl">
                {phil.pullQuote}
              </p>
            </blockquote>

            <p className="font-body text-base leading-relaxed text-charcoal/80">
              {phil.p3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
