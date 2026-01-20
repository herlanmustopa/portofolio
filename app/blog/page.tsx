import { Metadata } from "next";
import { getArticles } from "@/sanity/queries";
import BlogClient from "@/components/templates/BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artikel dan tulisan dari Herlan Mustopa tentang web development, React, Next.js, dan teknologi modern lainnya.",
  openGraph: {
    title: "Blog | Herlan Mustopa",
    description:
      "Artikel dan tulisan dari Herlan Mustopa tentang web development, React, Next.js, dan teknologi modern lainnya.",
    type: "website",
    url: "https://herlanmustopa.com/blog",
  },
  alternates: {
    canonical: "https://herlanmustopa.com/blog",
  },
};

// JSON-LD for Blog listing page
function generateBlogListJsonLd(articles: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://herlanmustopa.com/blog/#blog",
    name: "Herlan Mustopa Blog",
    description:
      "Artikel dan tulisan tentang web development, React, Next.js, dan teknologi modern",
    url: "https://herlanmustopa.com/blog",
    author: {
      "@id": "https://herlanmustopa.com/#person",
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `https://herlanmustopa.com/blog/${article.slug}`,
      image: article.imageUrl,
      description: article.description,
    })),
  };
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogListJsonLd(articles)),
        }}
      />

      <BlogClient articles={articles} />
    </>
  );
}
