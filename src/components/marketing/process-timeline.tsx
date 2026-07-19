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
    <section className="py-section-lg sm:py-section-xl">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-light tracking-[-0.02em] text-charcoal sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            {String(processSection.title)}
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          {steps.map((step, index) => (
            <div key={index} className="group flex gap-6 sm:gap-10">
              <span className="shrink-0 pt-0.5 font-display text-4xl font-light text-charcoal/[0.10] transition-colors duration-300 group-hover:text-charcoal/[0.18] sm:text-5xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={`flex-1 ${index < steps.length - 1 ? 'pb-12 sm:pb-16' : ''}`}>
                <h3 className="font-display text-lg font-normal text-charcoal leading-snug sm:text-xl sm:tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-[1.8] text-muted sm:text-[0.95rem]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
