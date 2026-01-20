import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { albert_Sans, unbounded } from "@/utils/font";
import Page from "@/components/organisms/pages";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import { client } from "@/sanity/client";
import { getArticle, getAllArticleSlugs } from "@/sanity/queries";

// Configure image builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Generate static params for all blog posts (SSG)
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artikel tidak ditemukan | Herlan Mustopa",
      description: "Artikel yang Anda cari tidak dapat ditemukan.",
    };
  }

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : "/og-image.jpg";

  return {
    title: `${article.title} | Herlan Mustopa Blog`,
    description: article.description || `Artikel oleh ${article.authorName || "Herlan Mustopa"}`,
    authors: [{ name: article.authorName || "Herlan Mustopa" }],
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: `https://herlanmustopa.com/blog/${slug}`,
      siteName: "Herlan Mustopa Blog",
      title: article.title,
      description: article.description || `Artikel oleh ${article.authorName || "Herlan Mustopa"}`,
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
      description: article.description || `Artikel oleh ${article.authorName || "Herlan Mustopa"}`,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// JSON-LD structured data for blog article
function generateArticleJsonLd(article: any, slug: string) {
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
    author: {
      "@type": "Person",
      name: article.authorName || "Herlan Mustopa",
      url: "https://herlanmustopa.com",
    },
    publisher: {
      "@type": "Person",
      name: "Herlan Mustopa",
      url: "https://herlanmustopa.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://herlanmustopa.com/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleJsonLd(article, slug)),
        }}
      />

      <main className="bg-primary pt-32 pb-16">
        <Page>
          {/* Breadcrumb */}
          <div className="max-w-3xl mx-auto mb-6">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: article.title },
              ]}
            />
          </div>

          <article className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
            {/* Article Header */}
            <header className="mb-8 text-center">
              <h1
                className={`text-3xl md:text-5xl font-bold text-black mb-4 ${unbounded.className}`}
                itemProp="headline"
              >
                {article.title}
              </h1>
              <p className={`text-black/60 ${albert_Sans.className}`}>
                By{" "}
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{article.authorName || "Admin"}</span>
                </span>{" "}
                •{" "}
                <time
                  dateTime={article.publishedAt}
                  itemProp="datePublished"
                >
                  {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
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
              className={`prose lg:prose-xl max-w-none text-black ${albert_Sans.className}`}
              itemProp="articleBody"
            >
              <PortableText value={article.body} />
            </div>
          </article>
        </Page>
      </main>
    </>
  );
}
