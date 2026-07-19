import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { alternates } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    alternates: alternates(locale, "team"),
    openGraph: { title: team.title ?? "Our Team", description: team.subtitle ?? "" },
  };
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full w-full items-center justify-center bg-charcoal/[0.04]">
      <span className="font-display text-3xl font-light tracking-wider text-charcoal/15">
        {initials}
      </span>
    </div>
  );
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
              <div key={member.id} className="group border border-border p-7 transition-all duration-500 hover:border-charcoal/20 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]">
                <div className="aspect-[3/4] overflow-hidden">
                  <InitialsAvatar name={member.name} />
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-xl font-normal text-charcoal">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted">
                    {locale === "ar" ? member.roleAr : member.roleEn}
                  </p>
                  {member.credentials && member.credentials.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {member.credentials.map((cred) => (
                        <span
                          key={cred}
                          className="inline-block border border-border px-2 py-0.5 font-body text-[0.6rem] tracking-wide text-muted"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  )}
                  {member.bioEn && (
                    <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70 line-clamp-4">
                      {locale === "ar" ? member.bioAr : member.bioEn}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
