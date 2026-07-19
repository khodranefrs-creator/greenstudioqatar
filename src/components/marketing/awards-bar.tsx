import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

interface AwardsBarProps {
  locale: Locale;
}

export default async function AwardsBar({ locale }: AwardsBarProps) {
  const dict = await getDictionary(locale);
  const awards = dict.awards as Record<string, string>;

  // TODO: Replace with the firm's REAL certifications and awards.
  // Current list contains individual credentials (AIA, RIBA, LEED) and unverifiable claims.
  // Each item should be a verifiable, firm-level credential or award.
  const certifications: string[] = [];

  if (certifications.length === 0) return null;

  return (
    <section className="border-y border-border py-section-sm sm:py-section-sm">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <h2 className="text-center font-body text-[0.65rem] font-medium tracking-[0.3em] text-muted uppercase">
          {awards.title}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-0 gap-y-5">
          {certifications.map((cert, index) => (
            <span key={cert} className="flex items-center">
              <span
                className="font-body text-[0.8rem] tracking-wide text-muted transition-colors duration-300 hover:text-charcoal px-6"
              >
                {cert}
              </span>
              {index < certifications.length - 1 && (
                <span className="hidden sm:block w-px h-4 bg-border" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
