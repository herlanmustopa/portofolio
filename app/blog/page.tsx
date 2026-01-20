import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "@/components/organisms/pages";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import { getArticles } from "@/sanity/queries";

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

      <main className="bg-primary pt-32 pb-16 min-h-screen">
        <Page>
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Blog" },
              ]}
            />
          </div>

          {/* Header */}
          <header className="text-center mb-16">
            <h1
              className={`text-6xl lg:text-7xl text-green mb-4 ${thesignature.className}`}
            >
              Blog
            </h1>
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black ${unbounded.className}`}
            >
              Writings & Insights
            </h2>
            <p
              className={`mt-4 text-black/70 max-w-2xl mx-auto ${albert_Sans.className}`}
            >
              Berbagi pengetahuan dan pengalaman seputar web development,
              teknologi, dan hal menarik lainnya.
            </p>
          </header>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/blog/${article.slug}`}
                className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {article.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold text-black mb-3 ${unbounded.className}`}
                  >
                    {article.title}
                  </h3>
                  <p
                    className={`text-black/70 text-sm line-clamp-3 ${albert_Sans.className}`}
                  >
                    {article.description || "Klik untuk membaca lebih lanjut..."}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className={`text-black/60 ${albert_Sans.className}`}>
                Belum ada artikel. Nantikan tulisan menarik dari saya!
              </p>
            </div>
          )}
        </Page>
      </main>
    </>
  );
}
