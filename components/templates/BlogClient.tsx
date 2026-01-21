"use client";
import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
  categories: string[];
}

interface BlogClientProps {
  articles: Article[];
}

interface ArticleStats {
  views: number;
  likes: number;
  shares: number;
}

export default function BlogClient({ articles }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articleStats, setArticleStats] = useState<Record<string, ArticleStats>>({});
  const t = useTranslations("blog");

  // Fetch all stats (views, likes, shares) at once
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const slugs = articles.map((a) => a.slug);
        const res = await fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slugs }),
        });
        const data = await res.json();
        setArticleStats(data.stats || {});
      } catch {
        // Silently fail
      }
    };
    if (articles.length > 0) {
      fetchStats();
    }
  }, [articles]);

  // Extract unique categories from all articles
  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    articles.forEach((article) => {
      article.categories?.forEach((category) => {
        if (category) categorySet.add(category);
      });
    });
    return Array.from(categorySet).sort();
  }, [articles]);

  // Filter articles based on search query and category
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((article) =>
        article.categories?.includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [articles, searchQuery, selectedCategory]);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <main className="bg-primary dark:bg-dark-bg pt-32 pb-16 min-h-screen transition-colors duration-300">
      <Page>
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { name: t("home"), href: "/" },
              { name: t("title") },
            ]}
          />
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <h1
            className={`text-6xl lg:text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}
          >
            {t("title")}
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text ${unbounded.className}`}
          >
            {t("subtitle")}
          </h2>
          <p
            className={`mt-4 text-black/70 dark:text-dark-text-muted max-w-2xl mx-auto ${albert_Sans.className}`}
          >
            {t("description")}
          </p>
        </header>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t("searchPlaceholder")}
          />
        </div>

        {/* Category Filter */}
        {allCategories.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className={`text-center text-sm text-black/60 dark:text-dark-text-muted mb-3 ${albert_Sans.className}`}>
              {t("filterByCategory")}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <motion.button
                onClick={() => handleCategoryClick(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === null
                    ? "bg-green dark:bg-green-light text-white"
                    : "bg-white dark:bg-dark-card text-black/70 dark:text-dark-text-muted hover:bg-green/10 dark:hover:bg-green-light/10"
                } ${albert_Sans.className}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("allCategories")}
              </motion.button>
              {allCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-green dark:bg-green-light text-white"
                      : "bg-white dark:bg-dark-card text-black/70 dark:text-dark-text-muted hover:bg-green/10 dark:hover:bg-green-light/10"
                  } ${albert_Sans.className}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Filters & Results Count */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center mb-8 ${albert_Sans.className}`}
          >
            <p className="text-black/60 dark:text-dark-text-muted">
              {t("articlesFound", { count: filteredArticles.length })}
              {selectedCategory && (
                <span className="ml-1">
                  {t("inCategory", { category: selectedCategory })}
                </span>
              )}
              {searchQuery && (
                <span className="ml-1">
                  {t("forQuery", { query: searchQuery })}
                </span>
              )}
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-2 text-green dark:text-green-light hover:underline text-sm"
            >
              {t("clearAllFilters")}
            </button>
          </motion.div>
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
                    {/* Category Tags */}
                    {article.categories && article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.categories.map((category) => (
                          <span
                            key={category}
                            className={`text-xs px-2 py-1 rounded-full bg-green/10 dark:bg-green-light/10 text-green dark:text-green-light ${albert_Sans.className}`}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3
                      className={`text-xl font-bold text-black dark:text-dark-text mb-3 line-clamp-2 ${unbounded.className}`}
                    >
                      {article.title}
                    </h3>
                    <p
                      className={`text-black/70 dark:text-dark-text-muted text-sm line-clamp-3 ${albert_Sans.className}`}
                    >
                      {article.description || t("clickToReadMore")}
                    </p>
                    {/* Stats: Views, Likes, Shares */}
                    <div className={`mt-3 pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-4 text-xs text-black/50 dark:text-dark-text-muted ${albert_Sans.className}`}>
                      {/* Views */}
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>
                          {articleStats[article.slug]?.views?.toLocaleString() ?? "—"}
                        </span>
                      </div>

                      {/* Likes */}
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        <span>
                          {articleStats[article.slug]?.likes?.toLocaleString() ?? "—"}
                        </span>
                      </div>

                      {/* Shares */}
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                        </svg>
                        <span>
                          {articleStats[article.slug]?.shares?.toLocaleString() ?? "—"}
                        </span>
                      </div>
                    </div>
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
              {hasActiveFilters ? t("noArticlesFound") : t("noArticles")}
            </h3>
            <p className={`text-black/60 dark:text-dark-text-muted ${albert_Sans.className}`}>
              {hasActiveFilters
                ? t("noArticlesDescription")
                : t("stayTuned")}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className={`mt-4 text-green dark:text-green-light hover:underline ${albert_Sans.className}`}
              >
                {t("clearAllFilters")}
              </button>
            )}
          </motion.div>
        )}
      </Page>
    </main>
  );
}
