import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

export default async function TrustBar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const trust = dict.trustBar as Record<string, string>;

  const stats = [
    { value: trust.yearsValue, label: trust.years },
    { value: trust.projectsValue, label: trust.projects },
    { value: trust.countriesValue, label: trust.countries },
    { value: trust.supervisedValue, label: trust.supervised },
    { value: '', label: trust.accredited },
    { value: '', label: trust.certified },
  ];

  return (
    <section className="border-b border-border bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                index < stats.length - 1
                  ? 'border-e border-border pe-8 sm:border-e sm:pe-8'
                  : ''
              }`}
            >
              {stat.value && (
                <span className="font-display text-2xl font-light text-charcoal sm:text-3xl">
                  {stat.value}
                </span>
              )}
              <span className="mt-1 font-body text-xs tracking-wider text-muted uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
