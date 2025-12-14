"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Konfigurasi builder untuk gambar dari Sanity
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Definisikan tipe data untuk artikel Anda
interface Article {
  _id: string;
  title: string;
  mainImage: any;
  slug: {
    current: string;
  };
  description: string;
}

export default function ArticlePreview() {
  const [articles, setArticles] = useState<Article[]>([]);

  // Mengambil data di sisi klien menggunakan useEffect
  useEffect(() => {
    const query = `*[_type == "post"]{
      _id,
      title,
      mainImage,
      slug,
      "description": pt::text(body[0..1])
    }`;

    client
      .fetch(query)
      .then((data) => {
        setArticles(data);
      })
      .catch(console.error); // Tambahkan error handling
  }, []); // Array dependensi kosong agar hanya berjalan sekali

  return (
    <section className="bg-primary py-24" id="article">
      <Page>
        <motion.div
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-7xl text-green mb-4 ${thesignature.className}`}>
            Writings & Insights
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black ${unbounded.className}`}
          >
            Sharing My Knowledge
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.a
              key={article._id}
              href={`/blog/${article.slug.current}`}
              className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {article.mainImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(article.mainImage).width(800).url()}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3
                  className={`text-xl font-bold text-black mb-3 ${unbounded.className}`}
                >
                  {article.title}
                </h3>
                <p className={`text-black/70 text-sm ${albert_Sans.className}`}>
                  {article.description || "Klik untuk membaca lebih lanjut..."}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </Page>
    </section>
  );
}
