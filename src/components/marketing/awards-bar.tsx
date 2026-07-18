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
    <section className="border-y border-border py-section-sm sm:py-section-sm">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <h2 className="text-center font-body text-[0.65rem] font-medium tracking-[0.3em] text-muted uppercase">
          {awards.title}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {certifications.map((cert) => (
            <span
              key={cert}
              className="font-body text-[0.8rem] tracking-wide text-muted/50 transition-colors duration-300 hover:text-charcoal"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
