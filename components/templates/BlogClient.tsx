"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import Breadcrumb from "../molecules/Breadcrumb";
import SearchInput from "../molecules/SearchInput";

interface Article {
  _id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  description: string;
}

interface BlogClientProps {
  articles: Article[];
}

export default function BlogClient({ articles }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;

    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  return (
    <main className="bg-primary dark:bg-dark-bg pt-32 pb-16 min-h-screen transition-colors duration-300">
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
        <header className="text-center mb-12">
          <h1
            className={`text-6xl lg:text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}
          >
            Blog
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text ${unbounded.className}`}
          >
            Writings & Insights
          </h2>
          <p
            className={`mt-4 text-black/70 dark:text-dark-text-muted max-w-2xl mx-auto ${albert_Sans.className}`}
          >
            Berbagi pengetahuan dan pengalaman seputar web development,
            teknologi, dan hal menarik lainnya.
          </p>
        </header>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari artikel..."
          />
        </div>

        {/* Results Count */}
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center mb-8 text-black/60 dark:text-dark-text-muted ${albert_Sans.className}`}
          >
            {filteredArticles.length} artikel ditemukan untuk &ldquo;{searchQuery}&rdquo;
          </motion.p>
        )}

        {/* Articles Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="block bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
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
                      className={`text-xl font-bold text-black dark:text-dark-text mb-3 line-clamp-2 ${unbounded.className}`}
                    >
                      {article.title}
                    </h3>
                    <p
                      className={`text-black/70 dark:text-dark-text-muted text-sm line-clamp-3 ${albert_Sans.className}`}
                    >
                      {article.description || "Klik untuk membaca lebih lanjut..."}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className={`text-xl font-semibold text-black dark:text-dark-text mb-2 ${unbounded.className}`}>
              {searchQuery ? "Tidak ada artikel ditemukan" : "Belum ada artikel"}
            </h3>
            <p className={`text-black/60 dark:text-dark-text-muted ${albert_Sans.className}`}>
              {searchQuery
                ? "Coba kata kunci lain atau hapus filter pencarian."
                : "Nantikan tulisan menarik dari saya!"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`mt-4 text-green dark:text-green-light hover:underline ${albert_Sans.className}`}
              >
                Hapus pencarian
              </button>
            )}
          </motion.div>
        )}
      </Page>
    </main>
  );
}
