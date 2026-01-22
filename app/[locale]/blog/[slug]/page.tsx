import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { albert_Sans, unbounded } from "@/app/fonts";
import Page from "@/components/organisms/pages";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import ArticleComments from "@/components/molecules/ArticleComments";
import BlogLayoutClient from "@/components/templates/BlogLayoutClient";
import { client } from "@/sanity/client";
import { getArticle, getAllArticleSlugs } from "@/sanity/queries";
import ViewCounter from "@/components/molecules/ViewCounter";
import LikeButton from "@/components/molecules/LikeButton";
import ShareButtons from "@/components/molecules/ShareButtons";
import { RiveRunningCharacters } from "@/components/molecules/RiveCharacter";

// Configure image builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate static params for all blog posts (SSG)
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: locale === "id" ? "Artikel tidak ditemukan | Herlan Mustopa" : "Article not found | Herlan Mustopa",
      description: locale === "id" ? "Artikel yang Anda cari tidak dapat ditemukan." : "The article you are looking for cannot be found.",
    };
  }

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : "/og-image.jpg";

  return {
    title: `${article.title} | Herlan Mustopa Blog`,
    description: article.description || `${locale === "id" ? "Artikel oleh" : "Article by"} ${article.authorName || "Herlan Mustopa"}`,
    authors: [{ name: article.authorName || "Herlan Mustopa" }],
    openGraph: {
      type: "article",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: `https://www.herlanmustopa.com/${locale}/blog/${slug}`,
      siteName: "Herlan Mustopa Blog",
      title: article.title,
      description: article.description || `${locale === "id" ? "Artikel oleh" : "Article by"} ${article.authorName || "Herlan Mustopa"}`,
      publishedTime: article.publishedAt,
      authors: [article.authorName || "Herlan Mustopa"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || `${locale === "id" ? "Artikel oleh" : "Article by"} ${article.authorName || "Herlan Mustopa"}`,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.herlanmustopa.com/${locale}/blog/${slug}`,
      languages: {
        "id": `https://www.herlanmustopa.com/id/blog/${slug}`,
        "en": `https://www.herlanmustopa.com/en/blog/${slug}`,
      },
    },
  };
}

// JSON-LD structured data for blog article
function generateArticleJsonLd(article: any, locale: string, slug: string) {
  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    author: {
      "@type": "Person",
      name: article.authorName || "Herlan Mustopa",
      url: "https://www.herlanmustopa.com",
    },
    publisher: {
      "@type": "Person",
      name: "Herlan Mustopa",
      url: "https://www.herlanmustopa.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.herlanmustopa.com/${locale}/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <BlogLayoutClient>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleJsonLd(article, locale, slug)),
        }}
      />

      <main className="bg-primary dark:bg-dark-bg pt-32 pb-16 min-h-screen transition-colors duration-300">
        <Page>
          {/* Breadcrumb */}
          <div className="max-w-3xl mx-auto mb-6">
            <Breadcrumb
              items={[
                { name: t("home"), href: "/" },
                { name: t("title"), href: "/blog" },
                { name: article.title },
              ]}
            />
          </div>

          <article
            className="max-w-3xl mx-auto"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            {/* Article Header */}
            <header className="mb-8 text-center">
              <h1
                className={`text-3xl md:text-5xl font-bold text-black dark:text-dark-text mb-4 ${unbounded.className}`}
                itemProp="headline"
              >
                {article.title}
              </h1>
              <p
                className={`text-black/60 dark:text-dark-text-muted ${albert_Sans.className}`}
              >
                {t("by")}{" "}
                <span
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <span itemProp="name">{article.authorName || "Admin"}</span>
                </span>{" "}
                •{" "}
                <time dateTime={article.publishedAt} itemProp="datePublished">
                  {new Date(article.publishedAt).toLocaleDateString(
                    locale === "id" ? "id-ID" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>{" "}
                • <ViewCounter slug={slug} increment={true} />
              </p>
            </header>

            {/* Main Image */}
            {article.mainImage && (
              <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={urlFor(article.mainImage).width(1200).url()}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  priority
                  itemProp="image"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className={`prose lg:prose-xl max-w-none text-black dark:text-dark-text dark:prose-invert ${albert_Sans.className}`}
              itemProp="articleBody"
            >
              <PortableText value={article.body} />
            </div>

            {/* Like & Share Section */}
            <div className="mt-8 py-6 border-y border-green/20 dark:border-green-light/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Like Button */}
                <LikeButton slug={slug} size="md" />

                {/* Share Buttons */}
                <ShareButtons
                  title={article.title}
                  description={article.description}
                  slug={slug}
                />
              </div>
              {/* Bottom Border with Running Characters */}
              <div className="relative max-w-3xl mt-4">
                <RiveRunningCharacters />
              </div>
            </div>
          </article>

          {/* Giscus Comments */}
          <div className="max-w-3xl mx-auto">
            <ArticleComments slug={slug} />
          </div>
        </Page>
      </main>
    </BlogLayoutClient>
  );
}

