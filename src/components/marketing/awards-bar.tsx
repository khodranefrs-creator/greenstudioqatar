import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

interface AwardsBarProps {
  locale: Locale;
}

export default async function AwardsBar({ locale }: AwardsBarProps) {
  const dict = await getDictionary(locale);
  const awards = dict.awards as Record<string, string>;

  const certifications = [
    'AIA Member',
    'RIBA Chartered',
    'ISO 9001:2015',
    'LEED Accredited',
    'Qatar Green Building Council',
    'Excellence in Design Award 2023',
  ];

  return (
    <section className="border-t border-border py-section-sm sm:py-section-sm">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16">
        <h2 className="text-center font-body text-xs font-medium tracking-[0.2em] text-muted uppercase">
          {awards.title}
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {certifications.map((cert) => (
            <span
              key={cert}
              className="font-body text-sm text-muted/60 transition-colors hover:text-charcoal"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
