import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { blogPosts } from "@/data/blog-posts";
import { teamMap } from "@/data/team";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    ["en", "ar"].map((locale) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  const title = locale === "ar" ? post.titleAr : post.titleEn;
  const excerpt = locale === "ar" ? post.excerptAr : post.excerptEn;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const typedLocale = locale as Locale;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Container className="py-40 text-center">
        <h1 className="font-display text-3xl text-charcoal">Article not found</h1>
        <Link href={`/${locale}/journal`} className="mt-4 inline-block text-sm text-muted underline">
          Back to Journal
        </Link>
      </Container>
    );
  }

  const dict = await getDictionary(typedLocale) as Record<string, Record<string, unknown>>;
  const journal = dict.journal as Record<string, string>;

  const title = locale === "ar" ? post.titleAr : post.titleEn;
  const body = locale === "ar" ? post.bodyAr : post.bodyEn;
  const excerpt = locale === "ar" ? post.excerptAr : post.excerptEn;
  const author = teamMap.get(post.authorId);
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "ar" ? "ar-QA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    datePublished: post.publishedAt,
    author: author ? { "@type": "Person", name: author.name } : undefined,
    publisher: { "@type": "Organization", name: "Green Studio Qatar" },
    image: post.coverImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <section className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh]">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <Container className="absolute bottom-0 left-0 right-0 pb-12 sm:pb-16">
            <Link
              href={`/${locale}/journal`}
              className="mb-6 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-offwhite/60 hover:text-offwhite transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {journal.backToJournal ?? "Back to Journal"}
            </Link>
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block border border-offwhite/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-offwhite/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-3xl font-light tracking-tight text-offwhite sm:text-4xl md:text-5xl">
                {title}
              </h1>
            </div>
          </Container>
        </section>

        <section className="border-b border-border py-6">
          <Container>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <time dateTime={post.publishedAt}>{date}</time>
              {author && (
                <>
                  <span className="text-muted/30">·</span>
                  <span>{journal.by ?? "by"} {author.name}</span>
                </>
              )}
            </div>
          </Container>
        </section>

        <section className="py-section-lg sm:py-section-lg">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="font-body text-base leading-[1.8] text-charcoal/80 sm:text-lg whitespace-pre-line">
                {body}
              </div>
            </div>
          </Container>
        </section>

        {related.length > 0 && (
          <section className="border-t border-border py-section-sm sm:py-section-sm">
            <Container>
              <h2 className="font-display text-2xl text-charcoal mb-8">
                {journal.relatedPosts ?? "Related Posts"}
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {related.map((rPost) => {
                  const rTitle = locale === "ar" ? rPost.titleAr : rPost.titleEn;
                  const rDate = new Date(rPost.publishedAt).toLocaleDateString(
                    locale === "ar" ? "ar-QA" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  );

                  return (
                    <Link
                      key={rPost.id}
                      href={`/${locale}/journal/${rPost.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/5">
                        <Image
                          src={rPost.coverImage}
                          alt={rTitle}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="font-display text-lg font-normal text-charcoal group-hover:text-accent transition-colors">
                          {rTitle}
                        </h3>
                        <p className="mt-1 font-body text-xs text-muted">{rDate}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        <section className="bg-charcoal py-section-lg sm:py-section-lg">
          <Container className="text-center">
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-offwhite sm:text-4xl">
              {locale === "ar" ? "لديك مشروع في ذهنك؟" : "Have a Project in Mind?"}
            </h2>
            <div className="mt-10">
              <Link
                href={`/${locale}/consultation`}
                className="inline-flex h-12 items-center justify-center border border-offwhite/30 px-8 font-body text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10"
              >
                {locale === "ar" ? "احجز استشارة" : "Book a Consultation"}
              </Link>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
