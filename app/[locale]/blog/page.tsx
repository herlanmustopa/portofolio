import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArticles } from "@/sanity/queries";
import BlogClient from "@/components/templates/BlogClient";
import BlogLayoutClient from "@/components/templates/BlogLayoutClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const isIndonesian = locale === "id";

  const title = t("title");
  const description = isIndonesian
    ? "Artikel dan tulisan dari Herlan Mustopa tentang web development, React, Next.js, dan teknologi modern lainnya."
    : "Articles and writings from Herlan Mustopa about web development, React, Next.js, and other modern technologies.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Herlan Mustopa`,
      description,
      type: "website",
      url: `https://herlanmustopa.com/${locale}/blog`,
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    alternates: {
      canonical: `https://herlanmustopa.com/${locale}/blog`,
      languages: {
        "id": "https://herlanmustopa.com/id/blog",
        "en": "https://herlanmustopa.com/en/blog",
      },
    },
  };
}

// JSON-LD for Blog listing page
function generateBlogListJsonLd(articles: any[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `https://herlanmustopa.com/${locale}/blog/#blog`,
    name: "Herlan Mustopa Blog",
    description:
      locale === "id"
        ? "Artikel dan tulisan tentang web development, React, Next.js, dan teknologi modern"
        : "Articles and writings about web development, React, Next.js, and modern technologies",
    url: `https://herlanmustopa.com/${locale}/blog`,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    author: {
      "@id": "https://herlanmustopa.com/#person",
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `https://herlanmustopa.com/${locale}/blog/${article.slug}`,
      image: article.imageUrl,
      description: article.description,
    })),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const articles = await getArticles();

  return (
    <BlogLayoutClient>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogListJsonLd(articles, locale)),
        }}
      />

      <BlogClient articles={articles} />
    </BlogLayoutClient>
  );
}

