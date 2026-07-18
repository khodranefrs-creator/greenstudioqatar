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
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16">
        <h2 className="font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl md:text-5xl">
          {String(processSection.title)}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute top-4 hidden h-px w-full bg-border lg:block" />
                )}
                <div className="relative flex flex-col items-start">
                  <div className="flex h-8 w-8 items-center justify-center border border-border font-body text-xs text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-4 font-display text-base font-normal text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
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
