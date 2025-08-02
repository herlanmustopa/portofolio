import { client } from "../../../sanity/client"; // Sesuaikan path jika perlu
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { albert_Sans, unbounded } from "@/utils/font";
import Page from "@/components/organisms/pages";

// Fungsi untuk mengambil data satu artikel berdasarkan slug
async function getArticle(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    mainImage,
    "authorName": author->name, // Mengambil nama dari referensi author
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

// 👇 1. DEFINISIKAN TIPE UNTUK PROPS HALAMAN ANDA 👇
type Props = {
  params: {
    slug: string;
  };
};

// 2. TERAPKAN TIPE 'Props' PADA KOMPONEN
export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);

  if (!article) {
    // Anda bisa menggantinya dengan komponen notFound() dari Next.js
    return <div>Artikel tidak ditemukan.</div>;
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
                layout="fill"
                objectFit="cover"
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
