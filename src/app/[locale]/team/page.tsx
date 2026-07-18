import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import Image from "next/image";
import { teamMembers } from "@/data/team";

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const team = dict.team as Record<string, string>;

  return {
    title: team.title ?? "Our Team",
    description: team.subtitle ?? "Meet the people behind our projects.",
    openGraph: { title: team.title ?? "Our Team", description: team.subtitle ?? "" },
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const team = dict.team as Record<string, string>;

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-32 sm:py-40">
        <div className="hero-bg absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={team.title ?? ""}
            title={locale === "ar" ? "فريقنا" : "Our Team"}
            description={team.subtitle ?? ""}
            align="center"
            className="mx-auto [&_h2]:text-offwhite [&_p]:text-offwhite/60"
          />
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/5">
                  {member.photo && (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-xl font-normal text-charcoal">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted">
                    {locale === "ar" ? member.roleAr : member.roleEn}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70 line-clamp-3">
                    {locale === "ar" ? member.bioAr : member.bioEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
