import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n/routing';

interface ProcessTimelineProps {
  locale: Locale;
}

interface StepData {
  title: string;
  description: string;
}

export default async function ProcessTimeline({ locale }: ProcessTimelineProps) {
  const dict = await getDictionary(locale);
  const processSection = dict.process as Record<string, unknown>;
  const steps = processSection.steps as StepData[];

  return (
    <section className="py-section-lg sm:py-section-lg">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <p className="font-body text-[0.7rem] font-medium tracking-[0.3em] uppercase text-muted">
            {locale === 'ar' ? 'كيف نعمل' : 'How We Work'}
          </p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-5xl">
            {String(processSection.title)}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <span className="font-display text-4xl font-light text-charcoal/[0.08] transition-colors duration-300 group-hover:text-accent/20">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-lg font-normal text-charcoal leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-[0.8rem] leading-[1.8] text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
