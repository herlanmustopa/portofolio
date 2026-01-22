"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface ArticleStats {
  views: number;
  likes: number;
  shares: number;
}

interface Article {
  _id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  description: string;
}

interface ArticleCardProps {
  article: Article;
  index: number;
  stats?: ArticleStats;
}

export default function ArticleCard({ article, index, stats }: ArticleCardProps) {
  const t = useTranslations("blog");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <Link
        href={`/blog/${article.slug}`}
        className="block bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
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
            className={`text-xl font-bold text-black dark:text-dark-text mb-3 line-clamp-2 font-unbounded`}
          >
            {article.title}
          </h3>
          <p className={`text-black/70 dark:text-dark-text-muted text-sm line-clamp-3 font-albert-sans`}>
            {article.description || t("clickToReadMore")}
          </p>

          {/* Stats: Views, Likes, Shares */}
          <div className={`mt-3 pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-4 text-xs text-black/50 dark:text-dark-text-muted font-albert-sans`}>
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
              <span>{stats?.views?.toLocaleString() ?? "—"}</span>
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
              <span>{stats?.likes?.toLocaleString() ?? "—"}</span>
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
              <span>{stats?.shares?.toLocaleString() ?? "—"}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

