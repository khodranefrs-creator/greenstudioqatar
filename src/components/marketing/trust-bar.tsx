import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

export default async function TrustBar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const trust = dict.trust as Record<string, string>;

  return (
    <section className="bg-charcoal">
      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-sm font-light leading-[1.9] tracking-[0.02em] text-offwhite/50 sm:text-[0.95rem]">
            {trust.description}
          </p>
        </div>
      </div>
    </section>
  );
}
