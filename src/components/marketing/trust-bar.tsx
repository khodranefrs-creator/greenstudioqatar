import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

export default async function TrustBar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const trust = dict.trust as Record<string, string>;

  const stats = [
    { value: '50+', label: trust.projectsCompleted },
    { value: '12', label: trust.yearsExperience },
    { value: '80+', label: trust.teamMembers },
    { value: '8', label: trust.countriesServed },
  ];

  return (
    <section className="bg-charcoal">
      <div className="mx-auto max-w-[90rem] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                index < stats.length - 1
                  ? 'border-e border-offwhite/10 pe-8 sm:border-e sm:pe-10'
                  : ''
              }`}
            >
              <span className="font-display text-3xl font-light text-offwhite sm:text-4xl lg:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 font-body text-[0.65rem] tracking-[0.2em] text-offwhite/40 uppercase sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-body text-sm leading-relaxed text-offwhite/35 max-w-2xl mx-auto">
          {trust.description}
        </p>
      </div>
    </section>
  );
}
