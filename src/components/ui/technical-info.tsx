import type { TechnicalSpec } from "@/types";

interface TechnicalInfoProps {
  specs: TechnicalSpec[];
  title?: string;
  titleAr?: string;
  locale?: string;
}

export default function TechnicalInfo({
  specs,
  title = "Technical Information",
  titleAr = "المعلومات التقنية",
  locale = "en",
}: TechnicalInfoProps) {
  if (specs.length === 0) return null;

  const displayTitle = locale === "ar" ? titleAr : title;

  return (
    <section className="py-12">
      <h2 className="font-display text-2xl text-charcoal mb-8">{displayTitle}</h2>
      <div className="border-t border-border">
        {specs.map((spec, index) => {
          const label = locale === "ar" && spec.labelAr ? spec.labelAr : spec.label;
          const value = locale === "ar" && spec.valueAr ? spec.valueAr : spec.value;

          return (
            <div
              key={`${spec.label}-${index}`}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between py-4 border-b border-border gap-1"
            >
              <span className="text-sm text-muted uppercase tracking-widest">{label}</span>
              <span className="text-sm text-charcoal font-medium">{value}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
