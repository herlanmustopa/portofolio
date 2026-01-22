"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Page from "../organisms/pages";
import ArticleCard from "./ArticleCard";

interface Article {
  _id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  description: string;
}

interface ArticleStats {
  views: number;
  likes: number;
  shares: number;
}

interface ArticleSectionProps {
  articles: Article[];
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
  const t = useTranslations("articles");
  const [articleStats, setArticleStats] = useState<Record<string, ArticleStats>>({});

  // Fetch all stats at once
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
          <h1 className={`text-7xl text-green dark:text-green-light mb-4 font-thesignature`}>
            {t("title")}
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text font-unbounded`}
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
            <span className={`px-4 py-2 bg-green/10 dark:bg-green-light/10 text-green dark:text-green-light rounded-full text-sm font-medium font-albert-sans`}>
              {articles.length} {t("articleCount")}
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <ArticleCard
              key={article._id}
              article={article}
              index={index}
              stats={articleStats[article.slug]}
            />
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
              className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-green dark:bg-green-light text-white rounded-full font-medium overflow-hidden font-albert-sans`}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.button>
          </Link>

          {/* Additional text */}
          <p className={`mt-4 text-black/50 dark:text-dark-text-muted text-sm font-albert-sans`}>
            {t("exploreMore")}
          </p>
        </motion.div>
      </Page>
    </section>
  );
}

