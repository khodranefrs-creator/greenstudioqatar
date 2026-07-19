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

  const stepColors = [
    'bg-accent',
    'bg-charcoal',
    'bg-accent-dark',
    'bg-charcoal',
  ];

  return (
    <section className="relative overflow-hidden bg-charcoal text-offwhite py-section-xl sm:py-section-xl">
      <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-offwhite/5 to-transparent" />

      <div className="relative mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-4xl font-light tracking-[-0.02em] text-offwhite sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
          {String(processSection.title)}
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex gap-8 border-t border-offwhite/10 pt-10"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center ${stepColors[index % stepColors.length]}`}>
                <span className="font-display text-lg font-light text-offwhite">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-normal text-offwhite sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md font-body text-sm leading-[1.8] text-offwhite/45 sm:text-[0.95rem]">
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
