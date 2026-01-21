"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  const [totalArticles, setTotalArticles] = useState(0);
  const t = useTranslations("articles");

  // Mengambil data di sisi klien menggunakan useEffect
  useEffect(() => {
    // Query untuk 3 artikel terbaru
    const query = `*[_type == "post"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      mainImage,
      slug,
      "description": pt::text(body[0..1])
    }`;

    // Query untuk total jumlah artikel
    const countQuery = `count(*[_type == "post"])`;

    Promise.all([
      client.fetch(query),
      client.fetch(countQuery)
    ])
      .then(([articlesData, count]) => {
        setArticles(articlesData);
        setTotalArticles(count);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="bg-primary dark:bg-dark-bg py-24 transition-colors duration-300" id="article">
      <Page>
        <motion.div
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}>
            {t("title")}
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text ${unbounded.className}`}
          >
            {t("subtitle")}
          </h2>

          {/* Article Count Badge */}
          <motion.div
            className="mt-4 inline-flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className={`px-4 py-2 bg-green/10 dark:bg-green-light/10 text-green dark:text-green-light rounded-full text-sm font-medium ${albert_Sans.className}`}>
              {totalArticles} {t("articleCount")}
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug.current}`}
                className="block bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full"
              >
                {article.mainImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor(article.mainImage).width(800).url()}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold text-black dark:text-dark-text mb-3 line-clamp-2 ${unbounded.className}`}
                  >
                    {article.title}
                  </h3>
                  <p className={`text-black/70 dark:text-dark-text-muted text-sm line-clamp-3 ${albert_Sans.className}`}>
                    {article.description || t("clickToRead")}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Articles Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/blog">
            <motion.button
              className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-green dark:bg-green-light text-white rounded-full font-medium overflow-hidden ${albert_Sans.className}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-light to-green dark:from-green dark:to-green-light"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />

              <span className="relative z-10">{t("viewAll")}</span>

              {/* Arrow icon */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </motion.button>
          </Link>

          {/* Additional text */}
          <p className={`mt-4 text-black/50 dark:text-dark-text-muted text-sm ${albert_Sans.className}`}>
            {t("exploreMore")}
          </p>
        </motion.div>
      </Page>
    </section>
  );
}
