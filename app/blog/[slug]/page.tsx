import { client } from "../../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { albert_Sans, unbounded } from "@/utils/font";
import Page from "@/components/organisms/pages";
import { SanityDocument } from "next-sanity";

// Definisikan tipe data untuk artikel Anda
interface Article extends SanityDocument {
  title: string;
  mainImage: any;
  authorName: string;
  publishedAt: string;
  body: any;
}

// Fungsi untuk mengambil data satu artikel berdasarkan slug
async function getArticle(slug: string): Promise<Article> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    mainImage,
    "authorName": author->name,
    publishedAt,
    body
  }`;

  const article = await client.fetch(query, { slug });
  return article;
}

// Konfigurasi builder untuk gambar dari Sanity
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// 👇 PERBAIKAN UTAMA: params sekarang adalah Promise 👇
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params untuk mendapatkan nilai slug
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return (
      <main className="bg-primary pt-32 pb-16">
        <Page>
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={`text-3xl md:text-5xl font-bold text-black mb-4 ${unbounded.className}`}
            >
              Artikel tidak ditemukan
            </h1>
            <p className={`text-black/60 ${albert_Sans.className}`}>
              Maaf, artikel yang Anda cari tidak dapat ditemukan.
            </p>
          </div>
        </Page>
      </main>
    );
  }

  return (
    <main className="bg-primary pt-32 pb-16">
      <Page>
        <article className="max-w-3xl mx-auto">
          {/* Judul dan Info Artikel */}
          <header className="mb-8 text-center">
            <h1
              className={`text-3xl md:text-5xl font-bold text-black mb-4 ${unbounded.className}`}
            >
              {article.title}
            </h1>
            <p className={`text-black/60 ${albert_Sans.className}`}>
              By {article.authorName || "Admin"} •{" "}
              {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          {/* Gambar Utama */}
          {article.mainImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={urlFor(article.mainImage).width(1200).url()}
                alt={article.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {/* Konten Artikel */}
          <div
            className={`prose lg:prose-xl max-w-none text-black ${albert_Sans.className}`}
          >
            <PortableText value={article.body} />
          </div>
        </article>
      </Page>
    </main>
  );
}

// 👇 TAMBAHAN: Jika Anda menggunakan generateMetadata 👇
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artikel tidak ditemukan",
      description: "Artikel yang Anda cari tidak dapat ditemukan.",
    };
  }

  return {
    title: article.title,
    description: `Artikel oleh ${article.authorName || "Admin"}`,
    openGraph: {
      title: article.title,
      description: `Artikel oleh ${article.authorName || "Admin"}`,
      images: article.mainImage
        ? [urlFor(article.mainImage).width(1200).url()]
        : [],
    },
  };
}
