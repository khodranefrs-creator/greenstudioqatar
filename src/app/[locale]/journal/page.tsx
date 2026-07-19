import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogPosts } from "@/data/blog-posts";
import { teamMap } from "@/data/team";
import { alternates } from "@/lib/seo/metadata";

interface JournalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const journal = dict.journal as Record<string, string>;

  return {
    title: journal.title ?? "Journal",
    description: journal.subtitle ?? "Thoughts on architecture and design.",
    alternates: alternates(locale, "journal"),
    openGraph: { title: journal.title ?? "Journal", description: journal.subtitle ?? "" },
  };
}

export default async function JournalPage({ params }: JournalPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale) as Record<string, Record<string, unknown>>;
  const journal = dict.journal as Record<string, string>;

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-32 sm:py-40">
        <div className="hero-bg absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={journal.title ?? ""}
            title={locale === "ar" ? "المدونة" : "Journal"}
            description={journal.subtitle ?? ""}
            align="center"
            className="mx-auto [&_h2]:text-offwhite [&_p]:text-offwhite/60"
          />
        </Container>
      </section>

      <section className="py-section-lg sm:py-section-lg">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => {
              const title = locale === "ar" ? post.titleAr : post.titleEn;
              const excerpt = locale === "ar" ? post.excerptAr : post.excerptEn;
              const author = teamMap.get(post.authorId);
              const date = new Date(post.publishedAt).toLocaleDateString(
                locale === "ar" ? "ar-QA" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              );

              return (
                <Link
                  key={post.id}
                  href={`/${locale}/journal/${post.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/5">
                    <Image
                      src={post.coverImage}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center gap-3 mb-3">
                      {post.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display text-xl font-normal text-charcoal leading-snug group-hover:text-accent transition-colors">
                      {title}
                    </h2>
                    <p className="mt-3 font-body text-sm leading-relaxed text-muted line-clamp-2">
                      {excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="font-body text-xs text-muted">{date}</span>
                      {author && (
                        <>
                          <span className="text-muted/30">·</span>
                          <span className="font-body text-xs text-muted">{author.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
